const pool = require("../../src/config/database");
const knn = require("ml-knn");

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

module.exports = { knn_server };
