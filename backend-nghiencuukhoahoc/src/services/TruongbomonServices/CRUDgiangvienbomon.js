const pool = require("../../config/database");

const xem_giangvien = async () => {
  try {
    let [results0, fields] = await pool.execute(
      `SELECT k.TENKHOA, bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, cd.TENCHUCDANH, cv.TENCHUCVU, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN
          FROM taikhoan AS tk
          LEFT JOIN giangvien AS gv ON tk.MAGV = gv.MAGV
          LEFT JOIN bomon AS bm ON bm.MABOMON = gv.MABOMON
          LEFT JOIN khoa AS k ON k.MAKHOA = bm.MAKHOA
          LEFT JOIN giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
          LEFT JOIN chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
          LEFT JOIN co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
          LEFT JOIN chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
          where bm.TENBOMON = 'Bộ môn Công nghệ thông tin'
          ORDER BY tk.TENDANGNHAP ASC;
        `
    );
    return {
      EM: " xem thông tin giảng viên thành công",
      EC: 1,
      DT: results0,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  xem_giangvien,
};
