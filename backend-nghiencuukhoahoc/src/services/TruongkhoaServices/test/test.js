const pool = require("../../../config/database");

const Sevicel_LoaiDanhMuc_Excel = async (data) => {
  try {
    // Kiểm tra tất cả các mục trước khi thêm
    for (let i = 0; i < data.length; i++) {
      let checkDanhMuc = await selectLoaiDanhMuc_TEN_LOAI_DANH_MUC(
        data[i].TEN_LOAI_DANH_MUC
      );
      if (checkDanhMuc.length !== 0) {
        console.log(
          "Loại danh mục này đã tồn tại: " + data[i].TEN_LOAI_DANH_MUC
        );
        return {
          EM: "Loại danh mục này đã tồn tại: " + data[i].TEN_LOAI_DANH_MUC,
          EC: 0,
          DT: [],
        };
      }
    }

    let results = [];
    console.log("data.length: ", data.length);

    // Thêm tất cả các mục
    for (let i = 0; i < data.length; i++) {
      console.log("Trước khi thêm - i: ", i);
      let result = await createLoaiDanhMuc(data[i].TEN_LOAI_DANH_MUC);
      console.log("Sau khi thêm - i: ", i, " - result: ", result);
      if (result.EC !== 1) {
        console.log("Lỗi khi thêm - i: ", i, " - result: ", result);
        return result; // Trả về nếu có lỗi khi thêm loại danh mục
      }
      results.push(result.DT); // Lưu ID của loại danh mục vào kết quả
    }

    return {
      EM: "Thêm dữ liệu thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Lỗi trong try-catch: ", error);
    return {
      EM: "Đã xảy ra lỗi khi thêm dữ liệu",
      EC: -1,
      DT: null,
    };
  }
};

const selectLoaiDanhMuc_TEN_LOAI_DANH_MUC = async (TEN_LOAI_DANH_MUC) => {
  try {
    let [results, fields] = await pool.execute(
      `SELECT * FROM loai_danh_muc WHERE TEN_LOAI_DANH_MUC = ?`,
      [TEN_LOAI_DANH_MUC]
    );
    return results;
  } catch (error) {
    console.error("Lỗi services selectLoaiDanhMuc: ", error);
    return {
      EM: "Lỗi services selectLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

const createLoaiDanhMuc = async (TEN_LOAI_DANH_MUC) => {
  try {
    let [results, fields] = await pool.execute(
      `INSERT INTO loai_danh_muc (TEN_LOAI_DANH_MUC, TRANG_THAI_DANH_MUC) VALUES (?, N'Đang áp dụng')`,
      [TEN_LOAI_DANH_MUC]
    );
    console.log("Kết quả từ createLoaiDanhMuc: ", results);
    return {
      EM: "Thêm loại danh mục mới thành công",
      EC: 1,
      DT: results.insertId, // Trả về ID của bản ghi vừa thêm
    };
  } catch (error) {
    console.error("Lỗi services createLoaiDanhMuc: ", error);
    return {
      EM: "Lỗi services createLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

//========================================================================================================

const Sevicel_DanhMuc_Excel = async (dataDanhMuc) => {
  try {
    console.log(
      "Bắt đầu thêm danh mục bằng excel ========================================"
    );
    // Kiểm tra tất cả các mục trước khi thêm
    for (let i = 0; i < dataDanhMuc.length; i++) {
      let checkDanhMuc = await selectDanhMucQuyDoi_NOI_DUNG_DANH_MUC(
        dataDanhMuc[i].NOI_DUNG_DANH_MUC
      );
      if (checkDanhMuc.length !== 0) {
        console.log(
          "Danh mục này đã tồn tại: " + dataDanhMuc[i].NOI_DUNG_DANH_MUC
        );
        return {
          EM: "Danh mục này đã tồn tại: " + dataDanhMuc[i].NOI_DUNG_DANH_MUC,
          EC: 0,
          DT: [],
        };
      }
    }

    let results = [];
    console.log("dataDanhMuc.length: ", dataDanhMuc.length);

    // Thêm tất cả các mục
    for (let i = 0; i < dataDanhMuc.length; i++) {
      console.log("Trước khi thêm - i: ", i);
      let result = await createDanhMucQuyDoi(dataDanhMuc[i]);
      console.log("Sau khi thêm - i: ", i, " - result: ", result);
      if (result.EC !== 1) {
        console.log("Lỗi khi thêm - i: ", i, " - result: ", result);
        return result; // Trả về nếu có lỗi khi thêm loại danh mục
      }
      results.push(result.DT); // Lưu ID của loại danh mục vào kết quả
    }

    return {
      EM: "Thêm dữ liệu thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Lỗi trong try-catch: ", error);
    return {
      EM: "Đã xảy ra lỗi khi thêm dữ liệu",
      EC: -1,
      DT: null,
    };
  }
};

const selectDanhMucQuyDoi_NOI_DUNG_DANH_MUC = async (NOI_DUNG_DANH_MUC) => {
  try {
    let [results, fields] = await pool.execute(
      `SELECT * FROM danhmucquydoispkhcn WHERE NOI_DUNG_DANH_MUC = ?`,
      [NOI_DUNG_DANH_MUC]
    );
    return results;
  } catch (error) {
    return {
      EM: "Lỗi services selectDanhMucQuyDoi",
      EC: -1,
      DT: [],
    };
  }
};

const createDanhMucQuyDoi = async (dataDanhMuc) => {
  try {
    let [results, fields] = await pool.execute(
      `INSERT INTO danhmucquydoispkhcn (MA_LOAI_DANH_MUC, GIO_CHUAN, NOI_DUNG_DANH_MUC, ISBN, WOS_SCOUPUS, HANG_WOS_SCOUPUS, LOI_NHUAN, DON_VI_TINH, GIAI_THUONG, XEP_HANG_QUARTILES, NAM_THUC_HIEN, TRANG_THAI_DANH_MUC, GHI_CHU_DANH_MUC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dataDanhMuc.MA_LOAI_DANH_MUC,
        dataDanhMuc.GIO_CHUAN,
        dataDanhMuc.NOI_DUNG_DANH_MUC,
        dataDanhMuc.ISBN,
        dataDanhMuc.WOS_SCOUPUS,
        dataDanhMuc.HANG_WOS_SCOUPUS,
        dataDanhMuc.LOI_NHUAN,
        dataDanhMuc.DON_VI_TINH,
        dataDanhMuc.GIAI_THUONG,
        dataDanhMuc.XEP_HANG_QUARTILES,
        dataDanhMuc.NAM_THUC_HIEN,
        dataDanhMuc.TRANG_THAI_DANH_MUC,
        dataDanhMuc.GHI_CHU_DANH_MUC,
      ]
    );
    return {
      EM: "Thêm danh mục quy đổi mới thành công",
      EC: 1,
      DT: "ok",
    };
  } catch (error) {
    console.log("Lỗi services: ", error);
    console.log("data bị lỗi: ", dataDanhMuc);
    return {
      EM: "Lỗi services createDanhMucQuyDoi",
      EC: -1,
      DT: [],
    };
  }
};

//========================================================================================================

const Sevicel_TyLe_Excel = async (dataTyLe) => {
  try {
    // Kiểm tra tất cả các mục trước khi thêm
    for (let i = 0; i < dataTyLe.length; i++) {
      let [checkTyLe, fields] = await pool.execute(
        `SELECT * FROM ty_le_quy_doi_gio_chuan WHERE TEN_QUY_DOI = ?`,
        [dataTyLe[i].TEN_QUY_DOI]
      );
      if (checkTyLe.length !== 0) {
        console.log("Tỷ lệ này đã tồn tại: " + dataTyLe[i].TEN_QUY_DOI);
        return {
          EM: "Tỷ lệ này đã tồn tại: " + dataTyLe[i].TEN_QUY_DOI,
          EC: 0,
          DT: [],
        };
      }
    }

    let results = [];
    console.log("dataTyLe.length: ", dataTyLe.length);

    // Thêm tất cả các mục
    for (let i = 0; i < dataTyLe.length; i++) {
      console.log("Trước khi thêm - i: ", i);
      let result = await pool.execute(
        `
                INSERT INTO ty_le_quy_doi_gio_chuan 
                (MA_QUY_DINH, TEN_QUY_DOI, TY_LE, VIEN_CHUC_TRUONG, THUC_HIEN_CHUAN, TRANG_THAI_QUY_DOI, GHI_CHU_QUY_DOI) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `,
        [
          dataTyLe[i].MA_QUY_DINH,
          dataTyLe[i].TEN_QUY_DOI,
          dataTyLe[i].TY_LE,
          dataTyLe[i].VIEN_CHUC_TRUONG,
          dataTyLe[i].THUC_HIEN_CHUAN,
          dataTyLe[i].TRANG_THAI_QUY_DOI,
          dataTyLe[i].GHI_CHU_QUY_DOI,
        ]
      );

      console.log("Sau khi thêm - i: ", i, " - result: ", result);
      if (result[0].affectedRows === 0) {
        console.log("Lỗi khi thêm - i: ", i, " - result: ", result);
        return {
          EM: "Không thể thêm tỷ lệ",
          EC: -1,
          DT: [],
        };
      }

      results.push(result[0].insertId); // Lưu ID của tỷ lệ vào kết quả
    }

    return {
      EM: "Thêm dữ liệu thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Lỗi trong try-catch: ", error);
    return {
      EM: "Đã xảy ra lỗi khi thêm dữ liệu",
      EC: -1,
      DT: null,
    };
  }
};

const Sevicel_CoTyLe_Excel = async (dataCoTyLe) => {
  try {
    console.log("dataCoTyLe: ", dataCoTyLe);
    // Kiểm tra tất cả các mục trước khi thêm
    for (let i = 0; i < dataCoTyLe.length; i++) {
      let [LoaiTacGai, fields0] = await pool.execute(
        `SELECT * FROM loai_tac_gia WHERE TEN_LOAI_TAC_GIA = ?`,
        [dataCoTyLe[i].TEN_LOAI_TAC_GIA]
      );
      let [TyLe, fields1] = await pool.execute(
        `SELECT * FROM ty_le_quy_doi_gio_chuan WHERE TEN_QUY_DOI = ? AND GHI_CHU_QUY_DOI = ?`,
        [dataCoTyLe[i].TEN_QUY_DOI, dataCoTyLe[i].GHI_CHU_QUY_DOI]
      );
      let [LoaiDanhmuc, fields2] = await pool.execute(
        `SELECT * FROM loai_danh_muc WHERE TEN_LOAI_DANH_MUC = ?`,
        [dataCoTyLe[i].TEN_LOAI_DANH_MUC]
      );
      if (
        LoaiTacGai.length === 0 ||
        TyLe.length === 0 ||
        LoaiDanhmuc.length === 0
      ) {
        if (LoaiTacGai.length === 0)
          console.log("Không có LoaiTacGai: ", dataCoTyLe[i].TEN_LOAI_TAC_GIA);
        if (TyLe.length === 0)
          console.log("Không có TyLe: ", dataCoTyLe[i].TEN_QUY_DOI);
        if (LoaiDanhmuc.length === 0)
          console.log(
            "Không có LoaiDanhmuc: ",
            dataCoTyLe[i].TEN_LOAI_DANH_MUC
          );
        return {
          EM: "Dữ liệu này không tồn tại: " + JSON.stringify(dataCoTyLe[i]),
          EC: 0,
          DT: [],
        };
      }
    }

    let results = [];
    console.log("dataCoTyLe.length: ", dataCoTyLe.length);

    // Thêm tất cả các mục
    for (let i = 0; i < dataCoTyLe.length; i++) {
      // Lấy các mã cần thiết từ các bảng
      let [LoaiTacGai, fields0] = await pool.execute(
        `SELECT MA_LOAI_TAC_GIA FROM loai_tac_gia WHERE TEN_LOAI_TAC_GIA = ?`,
        [dataCoTyLe[i].TEN_LOAI_TAC_GIA]
      );
      let [TyLe, fields1] = await pool.execute(
        `SELECT MA_QUY_DOI FROM ty_le_quy_doi_gio_chuan WHERE TEN_QUY_DOI = ? AND GHI_CHU_QUY_DOI = ?`,
        [dataCoTyLe[i].TEN_QUY_DOI, dataCoTyLe[i].GHI_CHU_QUY_DOI]
      );
      let [LoaiDanhmuc, fields2] = await pool.execute(
        `SELECT MA_LOAI_DANH_MUC FROM loai_danh_muc WHERE TEN_LOAI_DANH_MUC = ?`,
        [dataCoTyLe[i].TEN_LOAI_DANH_MUC]
      );

      // Thêm dữ liệu vào bảng CO_TY_LE
      let [result, fields3] = await pool.execute(
        `INSERT INTO co_ty_le (MA_QUY_DOI, MA_LOAI_DANH_MUC, MA_LOAI_TAC_GIA, SO_TAC_GIA_THUOC_LOAI, NHOM_CHIA_GIO) VALUES (?, ?, ?, ?, ?)`,
        [
          TyLe[0].MA_QUY_DOI,
          LoaiDanhmuc[0].MA_LOAI_DANH_MUC,
          LoaiTacGai[0].MA_LOAI_TAC_GIA,
          dataCoTyLe[i].SO_TAC_GIA_THUOC_LOAI,
          dataCoTyLe[i].NHOM_CHIA_GIO,
        ]
      );
      results.push(result.insertId); // Lưu ID của loại danh mục vào kết quả
    }

    console.log("results: ", results);
    return {
      EM: "Thêm dữ liệu thành công",
      EC: 1,
      DT: "ok",
    };
  } catch (error) {
    console.error("Lỗi trong try-catch: ", error);
    return {
      EM: "Đã xảy ra lỗi khi thêm dữ liệu",
      EC: -1,
      DT: null,
    };
  }
};

//========================================================================================================

const Sevicel_PhanCong_Test = async (dataPhanCong) => {
  try {
    // dataPhanCong:  {
    //     MAGV: '99999',
    //     MAHKNK: '1',
    //     MAMONHOC: '36',
    //     MALOP: 'DA21TTA',
    //     TONG_SO_GIO: '0'
    // }
    console.log("dataPhanCong: ", dataPhanCong);

    // Lấy thời gian hiện tại
    let THOIGIANLAP = new Date().toISOString().slice(0, 19).replace("T", " ");
    console.log("THOIGIANLAP: ", THOIGIANLAP);

    // Thực hiện câu lệnh INSERT vào bảng bangphancong
    let [result_bangphancong] = await pool.execute(
      `INSERT INTO bangphancong (MAHKNK, MAGV, THOIGIANLAP) VALUES (?, ?, ?)`,
      [dataPhanCong.MAHKNK, dataPhanCong.MAGV, THOIGIANLAP]
    );

    console.log(
      "Các hàng bị ảnh hưởng(Rows affected): ",
      result_bangphancong.affectedRows
    );

    // Kiểm tra xem có bao nhiêu bản ghi được thêm
    if (result_bangphancong.affectedRows === 0) {
      return {
        EM: "Không thêm được dữ liệu",
        EC: -1,
        DT: null,
      };
    }

    // Truy vấn lại bản ghi vừa thêm
    let [selectResult] = await pool.execute(
      `SELECT * FROM bangphancong WHERE MAHKNK = ? AND MAGV = ? AND DATE(THOIGIANLAP) = DATE(?)`,
      [dataPhanCong.MAHKNK, dataPhanCong.MAGV, THOIGIANLAP]
    );

    console.log("selectResult[0]: ", selectResult[0]);

    // Thực hiện câu lệnh INSERT vào bảng chitietphancong
    let [result_chitietphancong] = await pool.execute(
      `INSERT INTO chitietphancong (MAMONHOC, MAPHANCONG, MALOP, TONG_SO_GIO) VALUES (?, ?, ?, ?)`,
      [
        dataPhanCong.MAMONHOC,
        selectResult[0].MAPHANCONG,
        dataPhanCong.MALOP,
        dataPhanCong.TONG_SO_GIO,
      ]
    );

    // Truy vấn lại dữ liệu vừa thêm ở cả hai bảng
    let [selectOK] = await pool.execute(
      `SELECT * 
             FROM bangphancong BPC 
             JOIN chitietphancong CTPC ON BPC.MAPHANCONG = CTPC.MAPHANCONG
             JOIN monhoc MH ON MH.MAMONHOC = CTPC.MAMONHOC
             JOIN lop L ON L.MALOP = CTPC.MALOP
             JOIN giangvien GV ON BPC.MAGV = GV.MAGV 
             WHERE BPC.MAPHANCONG = ?`,
      [selectResult[0].MAPHANCONG]
    );

    console.log("Dữ liệu vừa thêm: ", selectOK);

    // Xóa dữ liệu mới thêm từ bảng chitietphancong trước
    await pool.execute(`DELETE FROM chitietphancong WHERE MAPHANCONG = ?`, [
      selectResult[0].MAPHANCONG,
    ]);

    // Sau đó xóa dữ liệu từ bảng bangphancong
    await pool.execute(`DELETE FROM bangphancong WHERE MAPHANCONG = ?`, [
      selectResult[0].MAPHANCONG,
    ]);

    console.log("Dữ liệu vừa thêm đã được xóa.");

    return {
      EM: "Thêm và xóa dữ liệu thành công",
      EC: 1,
      DT: "ok",
    };
  } catch (error) {
    console.error("Lỗi trong try-catch: ", error);
    return {
      EM: "Đã xảy ra lỗi khi thêm hoặc xóa dữ liệu",
      EC: -1,
      DT: null,
    };
  }
};

const XuLy_dataAutoPhanCong = async (dataAutoPhanCong) => {
  for (let i = 0; i < dataAutoPhanCong.data.length; i++) {
    // Truy xuất tên môn học của phần tử hiện tại
    const tenMonHoc = dataAutoPhanCong.data[i].TENMONHOC;

    // Truy vấn thông tin môn học từ cơ sở dữ liệu
    let [data_MonHoc] = await pool.execute(
      `SELECT * FROM monhoc MH WHERE MH.TENMONHOC = ?`,
      [tenMonHoc]
    );

    // Nếu tìm thấy môn học, cập nhật thông tin vào đối tượng hiện tại
    if (data_MonHoc.length > 0) {
      dataAutoPhanCong.data[i].TENMONHOC = data_MonHoc[0].TENMONHOC;
    } else {
      dataAutoPhanCong.data[i].TENMONHOC = -1;
    }
  }
  return dataAutoPhanCong;
};

const XuLy_data_GV_TungDay = async (dataAutoPhanCong) => {
  let [data_GV_TungDay] = await pool.execute(
    `SELECT BM.TENBOMON, L.MALOP, GV.MAGV, GV.TENGV, MH.MAMONHOC, MH.TENMONHOC
        FROM lop L
        JOIN chuongtrinhdaotao CTDT ON L.MACHUONGTRINH = CTDT.MACHUONGTRINH
        JOIN thuoc T ON T.MACHUONGTRINH = CTDT.MACHUONGTRINH
        JOIN monhoc MH ON MH.MAMONHOC = T.MAMONHOC
        JOIN bomon BM ON BM.MABOMON = CTDT.MABOMON
        JOIN giangvien GV ON GV.MABOMON = BM.MABOMON
        JOIN bangphancong BPC ON BPC.MAGV = GV.MAGV
        JOIN chitietphancong CTPC ON CTPC.MAPHANCONG = BPC.MAPHANCONG
        WHERE L.MALOP = ?
        GROUP BY BM.TENBOMON, L.MALOP, GV.MAGV, GV.TENGV, MH.MAMONHOC, MH.TENMONHOC;`,
    [dataAutoPhanCong.data[0].MALOP]
  );
  return data_GV_TungDay;
};

const XuLy_data_GV = async (dataAutoPhanCong) => {
  console.log("Nhận diện cho lớp: ", dataAutoPhanCong.data[0].MALOP);
  console.log("Số thứ tự học kỳ: ", dataAutoPhanCong.data[0].SOTHUTUHOCKI);
  let [data_GV] = await pool.execute(
    `SELECT BM.TENBOMON, L.MALOP, GV.MAGV, GV.TENGV
        FROM lop L
        JOIN chuongtrinhdaotao CTDT ON L.MACHUONGTRINH = CTDT.MACHUONGTRINH
        JOIN thuoc T ON T.MACHUONGTRINH = CTDT.MACHUONGTRINH
        JOIN monhoc MH ON MH.MAMONHOC = T.MAMONHOC
        JOIN bomon BM ON BM.MABOMON = CTDT.MABOMON
        JOIN giangvien GV ON GV.MABOMON = BM.MABOMON
        WHERE L.MALOP = ? AND T.SOTHUTUHOCKI = ?
        GROUP BY L.MALOP, BM.TENBOMON, GV.MAGV, GV.TENGV;`,
    [dataAutoPhanCong.data[0].MALOP, dataAutoPhanCong.data[0].SOTHUTUHOCKI]
  );

  return data_GV;
};

const XuLy_data_GV_TungDay_HocKy = async (dataAutoPhanCong) => {
  let [data_GV] = await pool.execute(
    `SELECT BM.TENBOMON, L.MALOP, GV.MAGV, GV.TENGV
        FROM lop L
        JOIN chuongtrinhdaotao CTDT ON L.MACHUONGTRINH = CTDT.MACHUONGTRINH
        JOIN thuoc T ON T.MACHUONGTRINH = CTDT.MACHUONGTRINH
        JOIN monhoc MH ON MH.MAMONHOC = T.MAMONHOC
        JOIN bomon BM ON BM.MABOMON = CTDT.MABOMON
        JOIN giangvien GV ON GV.MABOMON = BM.MABOMON
        JOIN bangphancong BPC ON BPC.MAGV = GV.MAGV
        WHERE T.SOTHUTUHOCKI = ?
        GROUP BY L.MALOP, BM.TENBOMON, GV.MAGV, GV.TENGV;`,
    [dataAutoPhanCong.data[0].SOTHUTUHOCKI]
  );

  return data_GV;
};

const Sevicel_AutoPhanCong_Test = async (dataAutoPhanCong) => {
  try {
    dataAutoPhanCong = await XuLy_dataAutoPhanCong(dataAutoPhanCong);
    console.log("Đã xủ lý dataAutoPhanCong: ", dataAutoPhanCong);

    //Lấy ds giảng viên từng dạy ở lớp này
    let data_GV_TungDay = await XuLy_data_GV_TungDay(dataAutoPhanCong);
    // console.log("data_GV_TungDay: ", data_GV_TungDay);

    //Lấy ds giảng viên từng dạy ở lớp này
    let data_GV_TungDay_HocKy = await XuLy_data_GV_TungDay_HocKy(
      dataAutoPhanCong
    );
    // console.log("data_GV_TungDay_HocKy: ", data_GV_TungDay);

    //Lấy ds giảng viên có thể dạy ở lớp này
    let data_GV = await XuLy_data_GV(dataAutoPhanCong);
    // console.log("Nhận danh sách GV có thể dạy lớp này data_GV: ", data_GV);
    // console.log("data_GV.length: ", data_GV.length);

    //Tìm GV trong bảng chuyên môn và Auto phân công
    let data_CMGV; //Dữ liệu chuyên môn của GV
    let data_AutoPhanCongFor; //Dữ liệu phân công auto
    let DO_UU_TIEN_PCGVTD = 0; //Độ ưu tiên của phân công auto

    for (let i = 0; i < data_GV.length; i++) {
      for (let y = 0; y < dataAutoPhanCong.data.length; y++) {
        [data_CMGV] = await pool.execute(
          `SELECT * FROM chuyen_mon_giang_vien WHERE MA_GV_CMGV = ? AND MA_MON_CMGV = ?`,
          [data_GV[i].MAGV, dataAutoPhanCong.data[y].MAMONHOC]
        );

        [data_AutoPhanCongFor] = await pool.execute(
          `SELECT * FROM phan_cong_gv_tu_dong 
                    WHERE MAGV_PCGVTD = ? AND MA_MON_HOC_PCGVTD = ? AND MA_LOP_PCGVTD = ?`,
          [
            data_GV[i].MAGV,
            dataAutoPhanCong.data[y].MAMONHOC,
            dataAutoPhanCong.data[y].MALOP,
          ]
        );

        DO_UU_TIEN_PCGVTD = 0;
        let countLop = 0; // Đặt lại biến countLop, biến này dùng để đếm GV đã dạy lớp mấy lần
        let countHocKy = 0; // Đặt lại biến countHocKy, biến này dùng để đếm GV đã dạy bao nhiêu môn

        // Tăng điểm ưu tiên dựa trên chuyên môn giảng viên
        data_CMGV.length === 0
          ? (DO_UU_TIEN_PCGVTD += 10)
          : (DO_UU_TIEN_PCGVTD += 25);

        // Kiểm tra xem giảng viên đã từng dạy lớp này chưa
        let exists = data_GV_TungDay.some(
          (giangvien) => giangvien.MAGV === data_AutoPhanCongFor[0].MAGV_PCGVTD
        );

        // Tăng điểm ưu tiên nếu giảng viên đã từng dạy
        exists ? (DO_UU_TIEN_PCGVTD += 10) : (DO_UU_TIEN_PCGVTD += 20);

        // Đếm số lần giảng viên xuất hiện trong data_GV_TungDay
        countLop = data_GV_TungDay.reduce((acc, giangvien) => {
          return giangvien.MAGV === data_AutoPhanCongFor[0].MAGV_PCGVTD
            ? acc + 1
            : acc;
        }, 0);

        // Nếu giảng viên xuất hiện nhiều hơn 2 lần, đặt lại ưu tiên
        // console.log("countLop: ", countLop)
        if (countLop >= 2) {
          DO_UU_TIEN_PCGVTD = 0; // Nếu xuất hiện nhiều hơn 2 lần thì đặt lại ưu tiên
        } else {
          DO_UU_TIEN_PCGVTD += 10; // Nếu xuất hiện ít hơn 2 lần thì tăng thêm điểm ưu tiên
        }

        // Đếm số lần giảng viên xuất hiện trong data_GV_TungDay_HocKy
        if (data_GV_TungDay_HocKy.length > 0) {
          countHocKy = data_GV_TungDay_HocKy.reduce((acc, giangvien) => {
            return giangvien.MAGV === data_AutoPhanCongFor[0].MAGV_PCGVTD
              ? acc + (acc < 1 ? 1 : acc)
              : acc;
          }, 0);
        }
        // console.log("data_GV_TungDay_HocKy.lengh: ", data_GV_TungDay_HocKy.length)
        // console.log("data_AutoPhanCongFor.lengh: ", data_AutoPhanCongFor.length)
        // console.log("countHocKy: ", countHocKy)
        if (countHocKy > 0) {
          console.log(`
                        GV: ${data_GV[i].TENGV}
                        Có acc: ${countHocKy}
                    `);
          DO_UU_TIEN_PCGVTD = DO_UU_TIEN_PCGVTD - countHocKy; // trừ độ ưu tiên cho mỗi môn GV dạy
        } else {
          DO_UU_TIEN_PCGVTD += 20; // Nếu GV không dạy bất kỳ lớp nào +10
        }
        //Không cho phép độ ưu tiên nhỏ hơn 0
        DO_UU_TIEN_PCGVTD <= 0 ? (DO_UU_TIEN_PCGVTD = 0) : DO_UU_TIEN_PCGVTD;
        // console.log("Tên: ", data_GV[i].TENGV, " Môn: ", dataAutoPhanCong.data[y].TENMONHOC, " Độ ưu tiên: ", DO_UU_TIEN_PCGVTD)

        //Kiểm tra bảng Phân Công Auto có chưa nếu chưa có thì tạo (sơ khai) !!!!!
        if (data_AutoPhanCongFor.length === 0) {
          await pool.execute(
            `INSERT INTO phan_cong_gv_tu_dong (MAGV_PCGVTD, MA_MON_HOC_PCGVTD, MA_LOP_PCGVTD, DO_UU_TIEN_PCGVTD) 
                        VALUES (?, ?, ?, ?);`,
            [
              data_GV[i].MAGV,
              dataAutoPhanCong.data[y].MAMONHOC,
              dataAutoPhanCong.data[y].MALOP,
              DO_UU_TIEN_PCGVTD,
            ]
          );
        }

        if (data_AutoPhanCongFor.length > 0) {
          await pool.execute(
            `UPDATE phan_cong_gv_tu_dong 
                        SET DO_UU_TIEN_PCGVTD = ? 
                        WHERE MAGV_PCGVTD = ? AND MA_MON_HOC_PCGVTD = ? AND MA_LOP_PCGVTD = ?;`,
            [
              DO_UU_TIEN_PCGVTD,
              data_GV[i].MAGV,
              dataAutoPhanCong.data[y].MAMONHOC,
              dataAutoPhanCong.data[y].MALOP,
            ]
          );
        }
      }
    }

    let checkTrungMAGV = []; // Khởi tạo mảng để lưu danh sách MAGV

    for (let i = 0; i < dataAutoPhanCong.data.length; i++) {
      // Tạo câu SQL cơ bản
      let query = `
            SELECT * 
            FROM phan_cong_gv_tu_dong PCGVTD
            WHERE PCGVTD.MA_MON_HOC_PCGVTD = ? 
            AND PCGVTD.MA_LOP_PCGVTD = ? 
            `;

      let params = [
        dataAutoPhanCong.data[i].MAMONHOC,
        dataAutoPhanCong.data[i].MALOP,
      ];

      // Nếu checkTrungMAGV có dữ liệu, thêm điều kiện NOT IN vào câu SQL
      if (checkTrungMAGV.length > 0) {
        // Loại bỏ giá trị trùng lặp và làm phẳng mảng
        let uniqueMAGV = [...new Set(checkTrungMAGV)];
        query += `AND PCGVTD.MAGV_PCGVTD NOT IN (${uniqueMAGV
          .map(() => "?")
          .join(", ")}) `;
        params.push(...uniqueMAGV); // Thêm các giá trị MAGV vào tham số
      }

      query += `ORDER BY PCGVTD.DO_UU_TIEN_PCGVTD DESC LIMIT 1;`;

      // Thực hiện truy vấn
      let [PhanCong] = await pool.execute(query, params);

      // Kiểm tra kết quả của truy vấn
      if (PhanCong.length > 0) {
        dataAutoPhanCong.data[i].MAGV = PhanCong[0].MAGV_PCGVTD;
        checkTrungMAGV.push(PhanCong[0].MAGV_PCGVTD); // Thêm MAGV vào mảng để kiểm tra lần sau
      } else {
        dataAutoPhanCong.data[i].MAGV = "";
      }
    }

    // console.log("dataAutoPhanCong: ", dataAutoPhanCong);

    // console.log("checkTrungMAGV: ", checkTrungMAGV);
    // console.log("dataAutoPhanCong.HOCKINIENKHOA.MAHKNK: ", dataAutoPhanCong.HOCKINIENKHOA.MAHKNK);
    for (let i = 0; i < dataAutoPhanCong.data.length; i++) {
      // Lấy tên GV
      let [data_TENGV] = await pool.execute(
        `SELECT * FROM giangvien GV WHERE GV.MAGV = ?`,
        [dataAutoPhanCong.data[i].MAGV]
      );

      // Data các môn GV đã dạy trong học kỳ dự đoán
      let [data_TinChi] = await pool.execute(
        `SELECT 
                    SUM(MH.SOTINCHILYTHUYET) AS TongSoTinChiLyThuyet,
                    SUM(MH.SOTINCHITHUCHANH) AS TongSoTinChiThucHanh
                FROM giangvien GV
                JOIN bangphancong BPC ON BPC.MAGV = GV.MAGV
                JOIN hockynienkhoa HKNK ON HKNK.MAHKNK = BPC.MAHKNK
                JOIN chitietphancong CTPC ON CTPC.MAPHANCONG = BPC.MAPHANCONG
                JOIN monhoc MH ON MH.MAMONHOC = CTPC.MAMONHOC
                WHERE GV.MAGV = ? AND HKNK.MAHKNK = ?;`,
        [dataAutoPhanCong.data[i].MAGV, dataAutoPhanCong.HOCKINIENKHOA.MAHKNK]
      );

      // Data môn học được dự đoán chưa lưu vào CSDL
      let [data_MonHoc_duoc_du_doan] = await pool.execute(
        `SELECT 
                    SUM(MH.SOTINCHILYTHUYET) AS TongSoTinChiLyThuyet,
                    SUM(MH.SOTINCHITHUCHANH) AS TongSoTinChiThucHanh
                FROM monhoc MH
                WHERE MH.MAMONHOC = ?;`,
        [dataAutoPhanCong.data[i].MAMONHOC]
      );

      // Tính toán số giờ GV đã dạy trong học kỳ này
      if (
        data_TinChi.length > 0 &&
        data_TinChi[0].TongSoTinChiLyThuyet !== null &&
        data_TinChi[0].TongSoTinChiThucHanh !== null
      ) {
        dataAutoPhanCong.data[i].TONG_SO_GIO =
          15 * data_TinChi[0].TongSoTinChiLyThuyet +
          30 * data_TinChi[0].TongSoTinChiThucHanh;
      } else {
        dataAutoPhanCong.data[i].TONG_SO_GIO = 0;
      }

      // Tính toán số giờ cho môn học được phân công
      if (
        data_MonHoc_duoc_du_doan.length > 0 &&
        data_MonHoc_duoc_du_doan[0].TongSoTinChiLyThuyet !== null &&
        data_MonHoc_duoc_du_doan[0].TongSoTinChiThucHanh !== null
      ) {
        let TONG_SO_GIO_MonHocDuocPhanCong =
          15 * data_MonHoc_duoc_du_doan[0].TongSoTinChiLyThuyet +
          30 * data_MonHoc_duoc_du_doan[0].TongSoTinChiThucHanh;
        dataAutoPhanCong.data[i].TONG_SO_GIO += TONG_SO_GIO_MonHocDuocPhanCong;
      }

      // Gán tên giảng viên
      if (data_TENGV.length > 0) {
        dataAutoPhanCong.data[i].TENGV = data_TENGV[0].TENGV;
      } else {
        dataAutoPhanCong.data[i].TENGV = "Không tìm thấy tên GV";
      }

      // Log kết quả cuối cùng
      console.log(`dataAutoPhanCong thứ ${i}:
                MAGV: ${dataAutoPhanCong.data[i].MAGV}
                Tên: ${dataAutoPhanCong.data[i].TENGV}
                Tổng giờ: ${dataAutoPhanCong.data[i].TONG_SO_GIO}
            `);
      // console.log(`dataAutoPhanCong cuối:`, dataAutoPhanCong.data[i]);
    }

    return {
      EM: "Đã nhận",
      EC: 1,
      DT: dataAutoPhanCong,
    };
  } catch (error) {
    console.error("Lỗi trong try-catch: ", error);
    return {
      EM: "Đã xảy ra lỗi khi phân công giảng viên tự động",
      EC: -1,
      DT: dataAutoPhanCong,
    };
  }
};

module.exports = {
  Sevicel_LoaiDanhMuc_Excel,
  Sevicel_DanhMuc_Excel,
  Sevicel_TyLe_Excel,
  Sevicel_CoTyLe_Excel,

  Sevicel_PhanCong_Test,
  Sevicel_AutoPhanCong_Test,
};
