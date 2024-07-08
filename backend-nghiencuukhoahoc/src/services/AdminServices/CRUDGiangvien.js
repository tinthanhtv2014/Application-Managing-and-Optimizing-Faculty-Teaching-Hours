const pool = require("../../config/database");
const { selectBomon_MABOMON } = require("./CRUDBomon");

const { timGiangVien_MAGV } = require("./helpers");

const selectGiangVien = async () => {
  try {
    let [results, fields] = await pool.execute(
      `SELECT k.TENKHOA, bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, cd.TENCHUCDANH, cv.TENCHUCVU, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN
      FROM taikhoan AS tk
      LEFT JOIN giangvien AS gv ON tk.MAGV = gv.MAGV
      LEFT JOIN bomon AS bm ON bm.MABOMON = gv.MABOMON
      LEFT JOIN khoa AS k ON k.MAKHOA = bm.MAKHOA
      LEFT JOIN giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
      LEFT JOIN chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
      LEFT JOIN co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
      LEFT JOIN chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
    `
    );
    return {
      EM: " xem thông tin giảng viên thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const selectOnlyGiangVienByTenDangNhap = async (TENDANGNHAP) => {
  console.log("CHECK1", TENDANGNHAP);

  if (!TENDANGNHAP) {
    console.error("Tên đăng nhập không được truyền vào.");
    return {
      EM: "Tên đăng nhập không được truyền vào.",
      EC: -1,
      DT: [],
    };
  }

  try {
    let [results, fields] = await pool.execute(
      `SELECT 
        TK.TENDANGNHAP,
        GV.TENGV, 
        CV.TENCHUCVU, 
        CD.TENCHUCDANH, 
        GV.DIENTHOAI, 
        GV.DIACHI, 
        BM.TENBOMON, 
        TK.PHANQUYEN, 
        TK.TRANGTHAITAIKHOAN
      FROM 
        taikhoan AS TK
      LEFT JOIN 
        giangvien AS GV ON TK.MAGV = GV.MAGV
      LEFT JOIN 
        giu_chuc_vu AS GCV ON GV.MAGV = GCV.MAGV
      LEFT JOIN 
        chucvu AS CV ON GCV.MACHUCVU = CV.MACHUCVU
      LEFT JOIN 
        co_chuc_danh AS CCD ON GV.MAGV = CCD.MAGV
      LEFT JOIN 
        chucdanh AS CD ON CCD.MACHUCDANH = CD.MACHUCDANH
      LEFT JOIN 
        bomon AS BM ON GV.MABOMON = BM.MABOMON
      WHERE 
        TK.TENDANGNHAP = ?;`,
      [TENDANGNHAP]
    );

    console.log(results[0]);
    return {
      EM: "Xem thông tin giảng viên thành công",
      EC: 1,
      DT: results[0],
    };
  } catch (error) {
    console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
    return {
      EM: "Lỗi services selectGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const selectOnlyGiangVien = async (MABOMON) => {
  try {
    console.log("check 2 =", MABOMON);
    let [results1, fields1] = await pool.execute(
      `select * from giangvien where MABOMON= ?`,
      [MABOMON]
    );
    console.log("check 3 =", results1);
    return {
      EM: " xem thông tin giảng viên của bộ môn đó thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const createGiangVien = async (dataGiangVien) => {
  try {
    //dataGiangVien phải bao gồm MAGV, MABOMON, TENDANGNHAP, TENGV, EMAIL, DIENTHOAI, DIACHI

    if (timGiangVien_MAGV(dataGiangVien.maGV)) {
      return {
        EM: "Giảng viên này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO giangvien VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        dataGiangVien.MAGV,
        dataGiangVien.MABOMON,
        dataGiangVien.TENDANGNHAP,
        dataGiangVien.TENGV,
        dataGiangVien.EMAIL,
        dataGiangVien.DIENTHOAI,
        dataGiangVien.DIACHI,
      ]
    );
    return {
      EM: "thêm giảng viên mới thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services createGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const updateTrangThaiTaiKhoanGiangVien = async (
  MAGV,
  TRANGTHAITAIKHOAN,
  MABOMON,
  isOpenGetAllApiGV
) => {
  try {
    if (!(await timGiangVien_MAGV(MAGV))) {
      return {
        EM: "Giảng viên này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `UPDATE taikhoan SET TRANGTHAITAIKHOAN = ? WHERE MAGV = ?;`,
      [TRANGTHAITAIKHOAN, MAGV]
    );

    if (isOpenGetAllApiGV) {
      let [results0, fields0] = await pool.execute(
        "SELECT bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN " +
          "FROM taikhoan as tk, giangvien as gv, bomon as bm " +
          "WHERE tk.MAGV = gv.MAGV AND bm.MABOMON = gv.MABOMON"
      );
      return {
        EM: "Cập nhật trạng thái tài khoản thành công",
        EC: 1,
        DT: results0,
      };
    } else {
      let [results0, fields0] = await pool.execute(
        "SELECT bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN " +
          "FROM taikhoan as tk, giangvien as gv, bomon as bm " +
          "WHERE tk.MAGV = gv.MAGV AND bm.MABOMON = gv.MABOMON AND bm.MABOMON = ?",
        [MABOMON]
      );
      return {
        EM: "Cập nhật trạng thái tài khoản thành công",
        EC: 1,
        DT: results0,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi services updateTrangThaiTaiKhoanGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const updateGiangVien = async (MAGV, dataGiangVien) => {
  try {
    // MAGV
    // dataGiangVien gồm MABOMON TENGV EMAIL DIENTHOAI DIACHI

    //console.log("MAGV >>>>>", MAGV);
    //console.log("dataGiangVien >>>>>", dataGiangVien);

    let KiemTra_MAGV = await timGiangVien_MAGV(MAGV);
    //console.log("KiemTra_MAGV >>>>>", KiemTra_MAGV);
    if (!KiemTra_MAGV.length > 0) {
      return {
        EM: "Giảng viên này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let KiemTra_MABOMON = await selectBomon_MABOMON(dataGiangVien.MABOMON);
    //console.log("KiemTra_MABOMON >>>>>", KiemTra_MABOMON);
    if (!KiemTra_MABOMON) {
      return {
        EM: "Bộ môn này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `UPDATE giangvien
            SET MABOMON = ?, TENGV = ?, EMAIL = ?, DIENTHOAI = ?, DIACHI = ? 
            WHERE MAGV = ?;`,
      [
        dataGiangVien.MABOMON,
        dataGiangVien.TENGV,
        dataGiangVien.EMAIL,
        dataGiangVien.DIENTHOAI,
        dataGiangVien.DIACHI,
        MAGV,
      ]
    );

    return {
      EM: "Sửa giảng viên thành công",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi services updateGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const deleteGiangVien = async (MAGV, MABOMON, isOpenGetAllApiGV) => {
  try {
    console.log("check MGV +>", MAGV);
    if (!timGiangVien_MAGV(MAGV)) {
      return {
        EM: "Giảng viên này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    // Thực hiện xóa từng bảng dữ liệu liên quan
    await Promise.all([
      pool.execute(`DELETE FROM giu_chuc_vu WHERE MAGV = ?;`, [MAGV]),
      pool.execute(`DELETE FROM co_chuc_danh WHERE MAGV = ?; `, [MAGV]),
      pool.execute(`DELETE FROM taikhoan WHERE MAGV = ?; `, [MAGV]),
      pool.execute(`DELETE FROM giangvien WHERE MAGV = ?; `, [MAGV]),
    ]);
    if (isOpenGetAllApiGV) {
      let [results0, fields0] = await pool.execute(
        "SELECT bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN " +
          "FROM taikhoan as tk, giangvien as gv, bomon as bm " +
          "WHERE tk.MAGV = gv.MAGV AND bm.MABOMON = gv.MABOMON"
      );
      return {
        EM: "Xóa Giảng Viên Thành Công",
        EC: 1,
        DT: results0,
      };
    } else {
      let [results0, fields0] = await pool.execute(
        "SELECT bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN " +
          "FROM taikhoan as tk, giangvien as gv, bomon as bm " +
          "WHERE tk.MAGV = gv.MAGV AND bm.MABOMON = gv.MABOMON AND bm.MABOMON = ?",
        [MABOMON]
      );
      return {
        EM: "Xóa Giảng Viên Thành Công",
        EC: 1,
        DT: results0,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi Không Thể Xóa Giảng Viên",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectGiangVien,
  selectOnlyGiangVien,
  selectOnlyGiangVienByTenDangNhap,
  createGiangVien,

  updateGiangVien,
  updateTrangThaiTaiKhoanGiangVien,

  deleteGiangVien,
};
