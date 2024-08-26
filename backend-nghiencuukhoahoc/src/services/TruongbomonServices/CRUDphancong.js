const pool = require("../../config/database");
const moment = require("moment");
const select_giangvien_chuachonkhung = async () => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT giangvien.*
        FROM giangvien
        LEFT JOIN chon_khung ON giangvien.MAGV = chon_khung.MAGV
        WHERE chon_khung.MAGV IS NULL;`
    );
    return {
      EM: "Xem thông tin giảng viên chưa chọn khung chuẩn thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services select_giangvien_chuachonkhung",
      EC: -1,
      DT: [],
    };
  }
};

const select_giangvien_dachonkhung = async () => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT DISTINCT giangvien.*
        FROM giangvien
        INNER JOIN chon_khung ON giangvien.MAGV = chon_khung.MAGV;`
    );
    return {
      EM: "Xem thông tin giảng viên đã chọn khung chuẩn thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    console.log("error =>", error);
    return {
      EM: "Lỗi services select_giangvien_chuachonkhung",
      EC: -1,
      DT: [],
    };
  }
};

function tinhSoThuTuHocKi(n, SOHOCKI) {
  // Chuyển đổi các tham số thành kiểu số (nếu chúng là chuỗi)
  const nNumber = Number(n);
  const soHocKiNumber = Number(SOHOCKI);

  // Tính toán
  return 2 * (nNumber - 1) + soHocKiNumber;
}

const select_lophoc_monhoc = async (MALOP, SOHOCKI) => {
  try {
    let [results_malop, fields_malop] = await pool.execute(
      `SELECT NAMTUYENSINH from lop where MALOP = ?`,
      [MALOP]
    );

    const currentYear = moment().year();

    let n = currentYear - results_malop[0].NAMTUYENSINH;

    let SOTHUTUHOCKI = tinhSoThuTuHocKi(n, SOHOCKI);
    console.log("check sohocki: ", SOTHUTUHOCKI);
    console.log("check sohocki: ", SOHOCKI);
    console.log("check SOTHUTUHOCKI: ", SOTHUTUHOCKI);
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `select * from lop,
      monhoc,
      chuongtrinhdaotao as ctdt,
      thuoc 
      where lop.MACHUONGTRINH = ctdt.MACHUONGTRINH 
      and ctdt.MACHUONGTRINH = thuoc.MACHUONGTRINH 
      and thuoc.MAMONHOC = monhoc.MAMONHOC
      and thuoc.SOTHUTUHOCKI = ?
      and lop.MALOP = ?`,
      [SOTHUTUHOCKI, MALOP]
    );
    return {
      EM: "Xem thông tin môn học theo lớp thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services select_lophoc_monhoc",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  select_giangvien_chuachonkhung,
  select_giangvien_dachonkhung,
  select_lophoc_monhoc,
};
