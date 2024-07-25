const pool = require("../../config/database");

const xem_giangvien = async (page, limit, TENBOMON) => {
  // try {
  if (page && limit) {
    let offset = (page - 1) * limit;
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
            where bm.TENBOMON = ?
            ORDER BY tk.TENDANGNHAP ASC
            LIMIT ? OFFSET ?;`,
      [TENBOMON, limit, offset]
    );

    const totalCountResult = await pool.execute(
      ` SELECT COUNT(*) AS total
          FROM taikhoan AS tk
          LEFT JOIN giangvien AS gv ON tk.MAGV = gv.MAGV
          LEFT JOIN bomon AS bm ON bm.MABOMON = gv.MABOMON
          LEFT JOIN khoa AS k ON k.MAKHOA = bm.MAKHOA
          LEFT JOIN giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
          LEFT JOIN chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
          LEFT JOIN co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
          LEFT JOIN chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
          WHERE bm.TENBOMON = ?;`,
      [TENBOMON]
    );
    const totalCount = totalCountResult[0][0].total;
    let totalPages = Math.ceil(totalCount / limit);
    let data = {
      totalRows: results0,
      totalPages: totalPages,
      users: fields,
    };
    return {
      EM: " xem thông tin giảng viên thành công",
      EC: 1,
      DT: data,
    };
  } else {
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
            where bm.TENBOMON = ?
            ORDER BY tk.TENDANGNHAP ASC;`,
      [TENBOMON]
    );
    return {
      EM: " xem thông tin giảng viên thành công",
      EC: 1,
      DT: results0,
    };
  }
  // } catch (error) {
  //   return {
  //     EM: "lỗi services selectGiangVien",
  //     EC: -1,
  //     DT: [],
  //   };
  // }
};

module.exports = {
  xem_giangvien,
};
