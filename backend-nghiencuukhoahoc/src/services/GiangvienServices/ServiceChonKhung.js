const pool = require("../../config/database");
const moment = require("moment");
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
    const [results_MAKHUNG, fields_MAKHUNG] = await pool.execute(
      "SELECT * FROM khunggiochuan WHERE MAKHUNG = ? ",
      [MAKHUNG]
    );
    let giangvien = await timGiangVien_MAGV(MAGV);

    if (
      !results_MANAMHOC.length ||
      !giangvien.length ||
      !results_MAKHUNG.length
    ) {
      return {
        EM: "Dữ liệu truyền vào không đúng",
        EC: 0,
        DT: [],
      };
    }

    const MANAMHOC = results_MANAMHOC[0].MANAMHOC;
    const [results0, fields0] = await pool.execute(
      "SELECT * FROM chon_khung WHERE MANAMHOC = ? AND MAGV = ?",
      [MANAMHOC, MAGV]
    );

    if (results0.length > 0) {
      const [results1, fields1] = await pool.execute(
        "UPDATE chon_khung SET MAKHUNG = ? WHERE MAGV = ? AND MANAMHOC = ?",
        [MAKHUNG, MAGV, MANAMHOC]
      );

      return {
        EM: "Sửa khung cho giảng viên mới thành công",
        EC: 1,
        DT: [],
      };
    } else {
      const [results1, fields1] = await pool.execute(
        "INSERT INTO chon_khung (MAGV, MANAMHOC, MAKHUNG) VALUES (?,?,?)",
        [MAGV, MANAMHOC, MAKHUNG]
      );

      return {
        EM: "Thêm khung cho giảng viên mới thành công",
        EC: 1,
        DT: [],
      };
    }
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
    console.log(MAGV);
    console.log("MANAMHOC", MANAMHOC);
    const [results1, fields] = await pool.execute(
      "select giangvien.*,khunggiochuan.*,namhoc.TENNAMHOC from chon_khung, giangvien,khunggiochuan,namhoc where giangvien.MAGV = chon_khung.MAGV and namhoc.MANAMHOC = chon_khung.MANAMHOC and chon_khung.MAKHUNG = khunggiochuan.MAKHUNG and giangvien.MAGV = ? and namhoc.MANAMHOC = ?",
      [MAGV, MANAMHOC]
    );
    console.log(results1);
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

const tao_THOIGIAN_CHONKHUNG = async (THOIGIANBATDAU, THOIGIANKETTHUC) => {
  console.log("THOIGIANBATDAU", THOIGIANBATDAU);
  console.log("THOIGIANKETTHUC", THOIGIANKETTHUC);
  try {
    // Định dạng lại ngày tháng để đảm bảo đúng định dạng YYYY-MM-DD HH:mm:ss
    const formattedStartTime = moment(THOIGIANBATDAU).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const formattedEndTime = moment(THOIGIANKETTHUC).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    // Kiểm tra xem thời gian đã tồn tại trong bảng chưa
    delete_THOIGIAN_CHONKHUNG();

    // Nếu bản ghi không tồn tại, thực hiện thêm mới
    await pool.execute(
      "INSERT INTO thoigian_xacnhan (THOIGIANBATDAU, THOIGIANKETTHUC) VALUES (?, ?)",
      [formattedStartTime, formattedEndTime]
    );
    const [results] = await pool.execute(
      "SELECT * FROM thoigian_xacnhan WHERE THOIGIANBATDAU = ?",
      [formattedStartTime]
    );
    return {
      EM: "Thêm thời gian chọn khung thành công",
      EC: 1,
      DT: results[0],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi khi thực hiện thêm hoặc cập nhật thời gian chọn khung",
      EC: -1,
      DT: results[0],
    };
  }
};

const delete_THOIGIAN_CHONKHUNG = async () => {
  try {
    await pool.execute("TRUNCATE TABLE thoigian_xacnhan");
    return {
      EM: "Xóa thời gian chọn khung thành công",
      EC: 1,
      DT: null,
    };
  } catch (error) {
    return {
      EM: "Có lỗi xảy ra khi xóa thời gian chọn khung: delete_THOIGIAN_CHONKHUNG",
      EC: -1,
      DT: error.message,
    };
  }
};

const sua_THOIGIAN_CHONKHUNG = async (SONGAYKETTHUC) => {
  try {
    const [results, fields] = await pool.execute(
      "select * from thoigian_xacnhan"
    );
    const THOIGIANKETTHUC = moment(results[0].THOIGIANBATDAU)
      .add(SONGAYKETTHUC, "days")
      .format("YYYY-MM-DD HH:mm:ss");
    const [results1, fields1] = await pool.execute(
      "UPDATE thoigian_xacnhan SET THOIGIANKETTHUC = ?",
      [THOIGIANKETTHUC]
    );

    const [results_thoigian, fields_thoigian] = await pool.execute(
      "select * from thoigian_xacnhan"
    );
    return {
      EM: "sửa thời gian kết thúc chọn khung thành công",
      EC: 1,
      DT: results_thoigian,
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

const tim_THOIGIAN_CHONKHUNG = async () => {
  const [results, fields] = await pool.execute(
    "select * from thoigian_xacnhan"
  );
  return {
    EM: "Xem thời gian thành công !",
    EC: 1,
    DT: results,
  };
};

module.exports = {
  timChucDanh_TENCHUCDANH,
  timKhungGioChuan_TENCHUCDANH,
  tao_CHONKHUNG,
  xem_CHONKHUNG_cho_GIANGVIEN,
  sua_CHONKHUNG_cho_GIANGVIEN,
  timAllTenKhung_TENCHUCDANH,
  tao_THOIGIAN_CHONKHUNG,
  sua_THOIGIAN_CHONKHUNG,
  tim_THOIGIAN_CHONKHUNG,
  delete_THOIGIAN_CHONKHUNG,
};
