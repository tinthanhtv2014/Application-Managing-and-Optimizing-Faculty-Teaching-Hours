const pool = require("../../src/config/database");
const knn = require("ml-knn");
const { RandomForestClassifier } = require("ml-random-forest");
const knn_server = async () => {
  try {
    let [results_data] = await pool.execute(
      `SELECT chitietphancong.*,bangphancong.* from chitietphancong,bangphancong,hockynienkhoa where chitietphancong.MAPHANCONG = bangphancong.MAPHANCONG and bangphancong.MAHKNK = hockynienkhoa.MAHKNK and hockynienkhoa.TEN_NAM_HOC = N'Năm học 2024' `
    );
    results_data = results_data.map((item, index) => {
      return { ...item, THOIGIAN: 10 + index }; // Thêm thuộc tính THOIGIAN vào mỗi object
    });

    const trainingData = results_data.map((item) => [
      item.MAMONHOC,
      item.MAPHANCONG,
    ]);

    const labels = results_data.map((item) => item.MACHITIETPHANCONG);

    const newData = {
      MAMONHOC: 31,
      MAPHANCONG: 27,
    };

    // Huấn luyện mô hình KNN
    const knnModel = new knn(trainingData, labels);
    const predictedLecturerId = knnModel.predict([
      newData.MAMONHOC,
      newData.MAPHANCONG,
    ]);

    let [results_data_dudoan] = await pool.execute(
      `SELECT giangvien.* from chitietphancong,bangphancong,giangvien where chitietphancong.MAPHANCONG = bangphancong.MAPHANCONG and bangphancong.MAGV = giangvien.MAGV and chitietphancong.MACHITIETPHANCONG = ? `,
      [predictedLecturerId]
    );

    return {
      EM: "giảng viên được dự đoán là: ",

      EC: 1,
      DT: results_data_dudoan,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectChuongtrinhdaotao_tenbomon",
      EC: -1,
      DT: [],
    };
  }
};

const mergeData = (data1, data2) => {
  // Tạo một đối tượng để lưu trữ dữ liệu từ data1
  const data1Map = new Map(data1.map((item) => [item.MAPHANCONG, item]));

  // Tạo mảng để lưu kết quả gộp
  const mergedData = [];

  // Duyệt qua data2 và kết hợp với data1 dựa trên MAPHANCONG
  for (const item2 of data2) {
    const item1 = data1Map.get(item2.MAPHANCONG);
    if (item1) {
      // Thêm một mảng con chứa dữ liệu từ item1 và item2
      mergedData.push([item1, item2]);
    }
  }

  return mergedData;
};

const encodeCategoricalData = (data) => {
  const uniqueLops = Array.from(new Set(data.map((item) => item.MALOP)));
  return data.map((item) => {
    const encoded = { ...item };
    uniqueLops.forEach((lop) => {
      encoded[`MALOP_${lop}`] = item.MALOP === lop ? 1 : 0;
    });
    delete encoded.MALOP;
    return encoded;
  });
};
const randomForest_server = async () => {
  //   try {
  let [results_data] = await pool.execute(
    `SELECT chitietphancong.*, bangphancong.MAHKNK, bangphancong.MAGV 
             FROM chitietphancong
             INNER JOIN bangphancong ON chitietphancong.MAPHANCONG = bangphancong.MAPHANCONG
             INNER JOIN hockynienkhoa ON bangphancong.MAHKNK = hockynienkhoa.MAHKNK
             WHERE hockynienkhoa.TEN_NAM_HOC = N'Năm học 2024'`
  );
  let [results_data_2] = await pool.execute(
    `SELECT bangphancong.MAPHANCONG, bangphancong.MAGV 
               FROM chitietphancong
               INNER JOIN bangphancong ON chitietphancong.MAPHANCONG = bangphancong.MAPHANCONG
               INNER JOIN hockynienkhoa ON bangphancong.MAHKNK = hockynienkhoa.MAHKNK
               WHERE hockynienkhoa.TEN_NAM_HOC = N'Năm học 2024'`
  );

  const mergedData = mergeData(results_data, results_data_2);
  console.log("Merged Data:", mergedData);

  // Chuẩn bị dữ liệu huấn luyện
  const trainingData = mergedData
    .map(([data1, data2]) => {
      if (data1 && data2) {
        return [Number(data1.MAMONHOC), Number(data1.MAGV)];
      } else {
        console.warn("Dữ liệu không hợp lệ:", [data1, data2]);
        return [NaN, NaN]; // Hoặc bạn có thể bỏ qua phần tử này
      }
    })
    .filter((item) => !item.includes(NaN)); // Loại bỏ các phần tử không hợp lệ

  console.log("Training Data:", trainingData); // Kiểm tra trainingData

  const labels = mergedData.map(([data1, data2]) => data1.MACHITIETPHANCONG);
  console.log("Labels:", labels); // Kiểm tra labels

  // Dữ liệu mới cần dự đoán
  const newData = [
    [44, 250],
    [69, 254],
    [63, 253], // Đảm bảo rằng dữ liệu mới cần dự đoán là mảng 2 chiều
  ];
  console.log("New Data:", newData); //
  // Kiểm tra định dạng của newData
  if (newData.some((item) => !Array.isArray(item) || item.length !== 2)) {
    throw new Error("Dữ liệu mới cần dự đoán không đúng định dạng.");
  }

  // Huấn luyện mô hình Random Forest
  const rf = new RandomForestClassifier({ nEstimators: 100 });
  rf.train(trainingData, labels);
  console.log("New Data dấda:", newData); //
  // Dự đoán giảng viên
  const prediction = rf.predict(newData);
  console.log("Prediction:", prediction.length); // Kiểm tra dự đoán

  // Kiểm tra tính hợp lệ của giảng viên dự đoán
  const lecturers = []; // Khởi tạo mảng để lưu kết quả
  for (let i = 0; i < prediction.length; i++) {
    const [lecturer] = await pool.execute(
      `SELECT 
      giangvien.*,
      chitietphancong.MALOP,
      lop.TENLOP,
      hockynienkhoa.TEN_NAM_HOC,
      hockynienkhoa.TENHKNK,
      monhoc.TENMONHOC
      FROM chitietphancong,
      monhoc,
      giangvien,
      bangphancong,
      hockynienkhoa,
      lop
      WHERE 
      chitietphancong.MAMONHOC = monhoc.MAMONHOC
      and chitietphancong.MAPHANCONG = bangphancong.MAPHANCONG
      and bangphancong.MAGV = giangvien.MAGV
      and bangphancong.MAHKNK = hockynienkhoa.MAHKNK
      and chitietphancong.MALOP = lop.MALOP
      and chitietphancong.MACHITIETPHANCONG = ?`,
      [prediction[i]]
    );
    console.log("Lecturer:", lecturer); // Kiểm tra giảng viên

    if (lecturer.length) {
      lecturers.push(...lecturer); // Thêm các kết quả vào mảng
    }
  }

  if (lecturers.length === 0) {
    return {
      EM: "Không tìm thấy giảng viên với mã dự đoán",
      EC: -1,
      DT: [],
    };
  }

  return {
    EM: "xem dự đoán",
    EC: 1,
    DT: lecturers,
  };
  //   } catch (error) {
  //     console.error("Lỗi dự đoán Random Forest:", error);
  //     return {
  //       EM: "Lỗi khi dự đoán giảng viên",
  //       EC: -1,
  //       DT: [],
  //     };
  //   }
};

module.exports = { knn_server, randomForest_server };
