const pool = require("../../config/database");

const select_giangvien_chuachonkhung = async () => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT GIANGVIEN.*
        FROM GIANGVIEN
        LEFT JOIN CHON_KHUNG ON GIANGVIEN.MAGV = CHON_KHUNG.MAGV
        WHERE CHON_KHUNG.MAGV IS NULL;`
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
      `SELECT DISTINCT GIANGVIEN.*
        FROM GIANGVIEN
        INNER JOIN CHON_KHUNG ON GIANGVIEN.MAGV = CHON_KHUNG.MAGV;`
    );
    return {
      EM: "Xem thông tin giảng viên đã chọn khung chuẩn thành công",
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

module.exports = {
  select_giangvien_chuachonkhung,
  select_giangvien_dachonkhung,
};
