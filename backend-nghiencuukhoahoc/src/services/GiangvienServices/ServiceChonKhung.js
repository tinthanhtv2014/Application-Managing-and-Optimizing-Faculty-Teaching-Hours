const pool = require("../../config/database");

const {
  timTaiKhoan_TENDANGNHAP,
  timGiangVien_MAGV,
  selectBomon_TENBOMON,
  selectChucdanh_TENCHUCDANH,
  timChucVu_TENCHUCVU,
  timChucVu_MAGV,
  timCoChucDanh_MAGV,
  timChucVu_MACHUCVU,
  timChucDanh_MACHUCDANH,

  dataFronEnd,
  timchuongtrinh_TENCHUONGTRINH,
  timmonhoc_TENMONHOC,
  timnamhoc_MANAMHOC,
} = require("../AdminServices/helpers");

const timChucDanh_TENCHUCDANH = async (TENCHUCDANH) => {
  try {
    const [results1, fields] = await pool.execute(
      "SELECT * FROM chucdanh WHERE TENCHUCDANH = ?",
      [TENCHUCDANH]
    );
    // console.log("Check timChucVu_MACHUCVU:   ", results1)
    return results1[0];
  } catch (error) {
    console.log("timChucDanh_TENCHUCDANH errr >>>", error);
    return [];
  }
};

const timAllTenKhung_TENCHUCDANH = async (TENCHUCDANH) => {
  try {
    let chucdanh = await timChucDanh_TENCHUCDANH(TENCHUCDANH);
    console.log("TENCHUCDANH:  ", TENCHUCDANH);
    console.log("chucdanh:  ", chucdanh);
    console.log("chucdanh.MACHUCDANH:  ", chucdanh.MACHUCDANH);
    if (!chucdanh) {
      return {
        EM: "Không có chức danh này",
        EC: 0,
        DT: [],
      };
    }
    const [results1, fields] = await pool.execute(
      "SELECT TENKHUNGCHUAN FROM khunggiochuan WHERE khunggiochuan.MACHUCDANH = ?",
      [chucdanh.MACHUCDANH]
    );
    // console.log(results1);
    return {
      EM: "Xem thông tin tất cả tên khung giờ chuẩn theo tên chức danh thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services timKhungGioChuan_TENCHUCDANH",
      EC: -1,
      DT: [],
    };
  }
};

const timKhungGioChuan_TENCHUCDANH = async (TENCHUCDANH) => {
  try {
    let chucdanh = await timChucDanh_TENCHUCDANH(TENCHUCDANH);
    console.log("TENCHUCDANH:  ", TENCHUCDANH);
    console.log("chucdanh:  ", chucdanh);
    console.log("chucdanh.MACHUCDANH:  ", chucdanh.MACHUCDANH);
    if (!chucdanh) {
      return {
        EM: "Không có chức danh này",
        EC: 0,
        DT: [],
      };
    }
    const [results1, fields] = await pool.execute(
      "SELECT * FROM khunggiochuan WHERE khunggiochuan.MACHUCDANH = ?",
      [chucdanh.MACHUCDANH]
    );
    return {
      EM: "Xem thông tin khung giờ chuẩn theo tên chức danh thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services timKhungGioChuan_TENCHUCDANH",
      EC: -1,
      DT: [],
    };
  }
};

const tao_CHONKHUNG = async (MAGV, TENNAMHOC, MAKHUNG) => {
  try {
    const [results_MANAMHOC, fields__MANAMHOC] = await pool.execute(
      "SELECT MANAMHOC FROM namhoc WHERE TENNAMHOC =? ",
      [TENNAMHOC]
    );

    const MANAMHOC = results_MANAMHOC[0].MANAMHOC;
    const [results0, fields0] = await pool.execute(
      "SELECT * FROM chon_khung WHERE MAGV = ? AND MANAMHOC = ? AND MAKHUNG = ?",
      [MAGV, MANAMHOC, MAKHUNG]
    );

    if (results0.length > 0) {
      const [results1, fields1] = await pool.execute(
        "UPDATE chon_khung SET MAKHUNG = ? WHERE MAGV = ? AND MANAMHOC = ?",
        [MAKHUNG, MAGV, MANAMHOC]
      );
    } else {
      const [results1, fields1] = await pool.execute(
        "INSERT INTO chon_khung (MAGV, MANAMHOC, MAKHUNG) VALUES (?,?,?)",
        [MAGV, MANAMHOC, MAKHUNG]
      );
    }
    return {
      EM: "Thêm khung cho giảng viên mới thành công",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi services tao_CHONKHUNG",
      EC: -1,
      DT: [],
    };
  }
};

const xem_CHONKHUNG_cho_GIANGVIEN = async (MAGV, TENNAMHOC) => {
  try {
    const [results_MANAMHOC, fields__MANAMHOC] = await pool.execute(
      "SELECT MANAMHOC FROM namhoc WHERE TENNAMHOC =? ",
      [TENNAMHOC]
    );

    const MANAMHOC = results_MANAMHOC[0].MANAMHOC;
    console.log(MANAMHOC);
    const [results1, fields] = await pool.execute(
      "select giangvien.*,khunggiochuan.*,namhoc.TENNAMHOC from chon_khung, giangvien,khunggiochuan,namhoc where giangvien.MAGV = chon_khung.MAGV and namhoc.MANAMHOC = chon_khung.MANAMHOC and chon_khung.MAKHUNG = khunggiochuan.MAKHUNG and giangvien.MAGV = ? and namhoc.MANAMHOC = ?",
      [MAGV, MANAMHOC]
    );
    return {
      EM: "xem thông tin khung hiện tại thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services xem_CHONKHUNG_cho_GIANGVIEN",
      EC: -1,
      DT: [],
    };
  }
};

const sua_CHONKHUNG_cho_GIANGVIEN = async (MAGV, TENNAMHOC, MAKHUNG) => {
  try {
    const [results_MANAMHOC, fields__MANAMHOC] = await pool.execute(
      "SELECT MANAMHOC FROM namhoc WHERE TENNAMHOC =? ",
      [TENNAMHOC]
    );

    const MANAMHOC = results_MANAMHOC[0].MANAMHOC;
    const [results1, fields] = await pool.execute(
      "UPDATE chon_khung SET MAKHUNG = ? WHERE MAGV = ? and MANAMHOC = ?",
      [MAKHUNG, MAGV, MANAMHOC]
    );
    return {
      EM: "sửa khung cho giảng viên mới thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services sua_CHONKHUNG_cho_GIANGVIEN",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  timChucDanh_TENCHUCDANH,
  timKhungGioChuan_TENCHUCDANH,
  tao_CHONKHUNG,
  xem_CHONKHUNG_cho_GIANGVIEN,
  sua_CHONKHUNG_cho_GIANGVIEN,
  timAllTenKhung_TENCHUCDANH,
};
