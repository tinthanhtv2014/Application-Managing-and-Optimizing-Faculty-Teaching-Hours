const pool = require("../../config/database");

const xem_giangvien_khoa = async (page, limit, TENKHOA) => {
  try {
    if (page && limit) {
      let offset = (page - 1) * limit;
      let [results0, fields] = await pool.execute(
        `SELECT 
          BOMON.TENBOMON,
          GIANGVIEN.TENGV,
          TAIKHOAN.TENDANGNHAP,
          CHUCDANH.TENCHUCDANH,
          CHUCVU.TENCHUCVU,
          TAIKHOAN.PHANQUYEN
        FROM 
          TAIKHOAN
        LEFT JOIN 
          GIANGVIEN ON TAIKHOAN.MAGV = GIANGVIEN.MAGV
        LEFT JOIN 
          BOMON ON GIANGVIEN.MABOMON = BOMON.MABOMON
        LEFT JOIN 
          KHOA ON BOMON.MAKHOA = KHOA.MAKHOA
        LEFT JOIN 
          GIU_CHUC_VU ON GIANGVIEN.MAGV = GIU_CHUC_VU.MAGV
        LEFT JOIN 
          CHUCVU ON GIU_CHUC_VU.MACHUCVU = CHUCVU.MACHUCVU
        LEFT JOIN 
          CO_CHUC_DANH ON GIANGVIEN.MAGV = CO_CHUC_DANH.MAGV
        LEFT JOIN 
          CHUCDANH ON CO_CHUC_DANH.MACHUCDANH = CHUCDANH.MACHUCDANH
        WHERE 
          KHOA.TENKHOA = ?
        ORDER BY 
          TAIKHOAN.TENDANGNHAP ASC
        LIMIT ? OFFSET ?;`,
        [TENKHOA, limit, offset]
      );

      const [totalCountResult] = await pool.execute(
        `SELECT 
          COUNT(*) as total
        FROM 
          TAIKHOAN
        LEFT JOIN 
          GIANGVIEN ON TAIKHOAN.MAGV = GIANGVIEN.MAGV
        LEFT JOIN 
          BOMON ON GIANGVIEN.MABOMON = BOMON.MABOMON
        LEFT JOIN 
          KHOA ON BOMON.MAKHOA = KHOA.MAKHOA
        LEFT JOIN 
          GIU_CHUC_VU ON GIANGVIEN.MAGV = GIU_CHUC_VU.MAGV
        LEFT JOIN 
          CHUCVU ON GIU_CHUC_VU.MACHUCVU = CHUCVU.MACHUCVU
        LEFT JOIN 
          CO_CHUC_DANH ON GIANGVIEN.MAGV = CO_CHUC_DANH.MAGV
        LEFT JOIN 
          CHUCDANH ON CO_CHUC_DANH.MACHUCDANH = CHUCDANH.MACHUCDANH
        WHERE 
          KHOA.TENKHOA = ?;`, [TENKHOA]
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
          BOMON.TENBOMON,
          GIANGVIEN.TENGV,
          TAIKHOAN.TENDANGNHAP,
          CHUCDANH.TENCHUCDANH,
          CHUCVU.TENCHUCVU,
          TAIKHOAN.PHANQUYEN
        FROM 
          TAIKHOAN
        LEFT JOIN 
          GIANGVIEN ON TAIKHOAN.MAGV = GIANGVIEN.MAGV
        LEFT JOIN 
          BOMON ON GIANGVIEN.MABOMON = BOMON.MABOMON
        LEFT JOIN 
          KHOA ON BOMON.MAKHOA = KHOA.MAKHOA
        LEFT JOIN 
          GIU_CHUC_VU ON GIANGVIEN.MAGV = GIU_CHUC_VU.MAGV
        LEFT JOIN 
          CHUCVU ON GIU_CHUC_VU.MACHUCVU = CHUCVU.MACHUCVU
        LEFT JOIN 
          CO_CHUC_DANH ON GIANGVIEN.MAGV = CO_CHUC_DANH.MAGV
        LEFT JOIN 
          CHUCDANH ON CO_CHUC_DANH.MACHUCDANH = CHUCDANH.MACHUCDANH
        WHERE 
          KHOA.TENKHOA = ?
        ORDER BY 
          TAIKHOAN.TENDANGNHAP ASC;`
        , [TENKHOA]
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

module.exports = {
  xem_giangvien_khoa,
};