const pool = require("../../config/database");

const xem_giangvien_khoa = async (page, limit, TENKHOA) => {
  try {
    if (page && limit) {
      let offset = (page - 1) * limit;
      let [results0, fields] = await pool.execute(
        `SELECT 
  bomon.TENBOMON,
  giangvien.TENGV,
  taikhoan.TENDANGNHAP,
  chucdanh.TENCHUCDANH,
  chucvu.TENCHUCVU,
  taikhoan.PHANQUYEN
FROM 
  taikhoan
LEFT JOIN 
  giangvien ON taikhoan.MAGV = giangvien.MAGV
LEFT JOIN 
  bomon ON giangvien.MABOMON = bomon.MABOMON
LEFT JOIN 
  khoa ON bomon.MAKHOA = khoa.MAKHOA
LEFT JOIN 
  giu_chuc_vu ON giangvien.MAGV = giu_chuc_vu.MAGV
LEFT JOIN 
  chucvu ON giu_chuc_vu.MACHUCVU = chucvu.MACHUCVU
LEFT JOIN 
  co_chuc_danh ON giangvien.MAGV = co_chuc_danh.MAGV
LEFT JOIN 
  chucdanh ON co_chuc_danh.MACHUCDANH = chucdanh.MACHUCDANH
WHERE 
  khoa.TENKHOA = ?
ORDER BY 
  taikhoan.TENDANGNHAP ASC
LIMIT ? OFFSET ?;
`,
        [TENKHOA, limit, offset]
      );

      const [totalCountResult] = await pool.execute(
        `SELECT 
  COUNT(*) AS total
FROM 
  taikhoan
LEFT JOIN 
  giangvien ON taikhoan.MAGV = giangvien.MAGV
LEFT JOIN 
  bomon ON giangvien.MABOMON = bomon.MABOMON
LEFT JOIN 
  khoa ON bomon.MAKHOA = khoa.MAKHOA
LEFT JOIN 
  giu_chuc_vu ON giangvien.MAGV = giu_chuc_vu.MAGV
LEFT JOIN 
  chucvu ON giu_chuc_vu.MACHUCVU = chucvu.MACHUCVU
LEFT JOIN 
  co_chuc_danh ON giangvien.MAGV = co_chuc_danh.MAGV
LEFT JOIN 
  chucdanh ON co_chuc_danh.MACHUCDANH = chucdanh.MACHUCDANH
WHERE 
  khoa.TENKHOA = ?;
`,
        [TENKHOA]
      );

      const totalCount = totalCountResult[0].total;
      let totalPages = Math.ceil(totalCount / limit);
      let data = {
        totalRows: results0,
        totalPages: totalPages,
        users: fields,
      };
      return {
        EM: "Xem thông tin giảng viên thành công",
        EC: 1,
        DT: data,
      };
    } else {
      let [results0, fields] = await pool.execute(
        `SELECT 
  bomon.TENBOMON,
  giangvien.TENGV,
  taikhoan.TENDANGNHAP,
  chucdanh.TENCHUCDANH,
  chucvu.TENCHUCVU,
  taikhoan.PHANQUYEN
FROM 
  taikhoan
LEFT JOIN 
  giangvien ON taikhoan.MAGV = giangvien.MAGV
LEFT JOIN 
  bomon ON giangvien.MABOMON = bomon.MABOMON
LEFT JOIN 
  khoa ON bomon.MAKHOA = khoa.MAKHOA
LEFT JOIN 
  giu_chuc_vu ON giangvien.MAGV = giu_chuc_vu.MAGV
LEFT JOIN 
  chucvu ON giu_chuc_vu.MACHUCVU = chucvu.MACHUCVU
LEFT JOIN 
  co_chuc_danh ON giangvien.MAGV = co_chuc_danh.MAGV
LEFT JOIN 
  chucdanh ON co_chuc_danh.MACHUCDANH = chucdanh.MACHUCDANH
WHERE 
  khoa.TENKHOA = ?
ORDER BY 
  taikhoan.TENDANGNHAP ASC;
`,
        [TENKHOA]
      );
      return {
        EM: "Xem thông tin giảng viên thành công",
        EC: 1,
        DT: results0,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EM: "Đã xảy ra lỗi khi xem thông tin giảng viên",
      EC: -1,
      DT: null,
    };
  }
};

const timkiem_email_taikhoan = async (TENGV) => {
  // console.log("check", TENGV);
  try {
    const connection = await pool.getConnection();
    const query =
      "SELECT k.TENKHOA, bomon.TENBOMON, giangvien.MAGV, giangvien.TENGV,taikhoan.TENDANGNHAP FROM giangvien ,taikhoan, khoa as k , bomon WHERE k.MAKHOA = bomon.MAKHOA and bomon.MABOMON = giangvien.MABOMON and taikhoan.MAGV = giangvien.MAGV and giangvien.TENGV LIKE ? LIMIT 5";
    const [rows] = await connection.execute(query, [`%${TENGV}%`]);
    connection.release();
    // console.log(rows);
    if (rows.length > 0) {
      return {
        EM: "Tìm thấy các email gần đúng",
        EC: 1,
        DT: rows, // Trả về danh sách tối đa 5 tài khoản tìm được
      };
    } else {
      return {
        EM: "Không tìm thấy email gần đúng",
        EC: 0,
        DT: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EM: "Đã xảy ra lỗi tìm kiếm email",
      EC: -1,
      DT: null,
    };
  }
};

const timkiem_email_taikhoan_ngoaitruong = async (TENGV) => {
  // console.log("check", TENGV);
  try {
    const connection = await pool.getConnection();
    const query =
      "SELECT k.TENKHOA, bomon.TENBOMON, giangvien.MAGV, giangvien.TENGV,giangvien.EMAIL FROM giangvien , khoa as k , bomon WHERE k.MAKHOA = bomon.MAKHOA and bomon.MABOMON = giangvien.MABOMON and bomon.TENBOMON = N'Ngoài trường' and giangvien.TENGV LIKE ? LIMIT 5";
    const [rows] = await connection.execute(query, [`%${TENGV}%`]);
    connection.release();
    // console.log(rows);
    if (rows.length > 0) {
      return {
        EM: "Tìm thấy các email gần đúng",
        EC: 1,
        DT: rows, // Trả về danh sách tối đa 5 tài khoản tìm được
      };
    } else {
      return {
        EM: "Không tìm thấy email gần đúng",
        EC: 0,
        DT: null,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EM: "Đã xảy ra lỗi tìm kiếm email",
      EC: -1,
      DT: null,
    };
  }
};

module.exports = {
  xem_giangvien_khoa,
  timkiem_email_taikhoan,
  timkiem_email_taikhoan_ngoaitruong,
};
