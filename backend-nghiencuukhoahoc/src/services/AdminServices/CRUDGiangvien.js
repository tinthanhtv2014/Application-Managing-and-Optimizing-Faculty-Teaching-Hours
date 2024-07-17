const pool = require("../../config/database");
const { selectBomon_MABOMON } = require("./CRUDBomon");

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
} = require("./helpers");

const selectGiangVien = async () => {
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

const selectOnlyGiangVienByTenDangNhap = async (TENDANGNHAP) => {
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
        GV.MAGV,
        CV.TENCHUCVU, 
        
        CD.TENCHUCDANH, 
        CCD.THOIGIANNHAN,

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

    if (results[0] && results[0].THOIGIANNHAN) {
      const date = new Date(results[0].THOIGIANNHAN);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      results[0].THOIGIANNHAN = `${year}-${month}-${day}`;
    }

    // console.log("selectOnlyGiangVienByTenDangNhap: ", results[0]);
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
    // console.log("check 2 =", MABOMON);
    let [results1, fields1] = await pool.execute(
      `select * from giangvien where MABOMON= ?`,
      [MABOMON]
    );
    // console.log("check 3 =", results1);
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

    let results0 = await dataFronEnd(isOpenGetAllApiGV, MABOMON);

    // console.log("results0.DT:  ", results0.DT)
    return {
      EM: "Cập nhật trạng thái tài khoản thành công",
      EC: 1,
      DT: results0.DT,
    };
    // if (isOpenGetAllApiGV) {
    //   let [results0, fields0] = await pool.execute(
    //     "SELECT bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN " +
    //     "FROM taikhoan as tk, giangvien as gv, bomon as bm " +
    //     "WHERE tk.MAGV = gv.MAGV AND bm.MABOMON = gv.MABOMON"
    //   );
    //   return {
    //     EM: "Cập nhật trạng thái tài khoản thành công",
    //     EC: 1,
    //     DT: results0,
    //   };
    // } else {
    //   let [results0, fields0] = await pool.execute(
    //     "SELECT bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN " +
    //     "FROM taikhoan as tk, giangvien as gv, bomon as bm " +
    //     "WHERE tk.MAGV = gv.MAGV AND bm.MABOMON = gv.MABOMON AND bm.MABOMON = ?",
    //     [MABOMON]
    //   );
    //   return {
    //     EM: "Cập nhật trạng thái tài khoản thành công",
    //     EC: 1,
    //     DT: results0,
    //   };
    // }
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
    // console.log("check MGV1 +>", MAGV);
    if (!timGiangVien_MAGV(MAGV)) {
      return {
        EM: "Giảng viên này không tồn tại",
        EC: 0,
        DT: [],
      };
    }
    // console.log("check MGV2 +>", MAGV);

    // Kiểm tra và xóa trong bảng giu_chuc_vu
    const [results1] = await pool.execute(
      `SELECT * FROM giu_chuc_vu WHERE MAGV = ?`,
      [MAGV]
    );
    if (results1.length > 0) {
      await pool.execute(`DELETE FROM giu_chuc_vu WHERE MAGV = ?`, [MAGV]);
    }

    // Kiểm tra và xóa trong bảng co_chuc_danh
    const [results2] = await pool.execute(
      `SELECT * FROM co_chuc_danh WHERE MAGV = ?`,
      [MAGV]
    );
    if (results2.length > 0) {
      await pool.execute(`DELETE FROM co_chuc_danh WHERE MAGV = ?`, [MAGV]);
    }

    // Kiểm tra và xóa trong bảng taikhoan
    const [results3] = await pool.execute(
      `SELECT * FROM taikhoan WHERE MAGV = ?`,
      [MAGV]
    );
    if (results3.length > 0) {
      await pool.execute(`DELETE FROM taikhoan WHERE MAGV = ?`, [MAGV]);
    }

    // Cuối cùng, xóa trong bảng giangvien
    await pool.execute(`DELETE FROM giangvien WHERE MAGV = ?`, [MAGV]);

    let results0 = await dataFronEnd(isOpenGetAllApiGV, MABOMON);

    // console.log("results0.DT:  ", results0.DT)
    return {
      EM: "Xóa Giảng Viên Thành Công",
      EC: 1,
      DT: results0.DT,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi Không Thể Xóa Giảng Viên",
      EC: -1,
      DT: [],
    };
  }
};

const updateGIANGVIEN = async (datagiangvien) => {
  try {
    let [results1, fields1] = await pool.execute(
      "select * from taikhoan where TENDANGNHAP = ?",
      [tenDangnhap]
    );
    console.log(results1);
    if (results1.length > 0) {
      const isCorrectPass = await bcrypt.compare(
        matKhaucu,
        results1[0].MATKHAU
      );
      if (isCorrectPass) {
        let hashpass = await hashPassword(matkhaumoi);
        let [results, fields] = await pool.execute(
          `UPDATE taikhoan SET MATKHAU = ?, PHANQUYEN = ?, TRANGTHAI = ? WHERE TENDANGNHAP = ?`,
          [hashpass, phanQuyen, trangThai, tenDangnhap]
        );
        return {
          EM: "update thành công",
          EC: 0,
          DT: [],
        };
      }
      return {
        EM: "mật khẩu cũ không khớp không thể update",
        EC: 0,
        DT: [],
      };
    }
    return {
      EM: "tài khoản không tồn tại",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "lỗi services createTaiKhoan",
      EC: 1,
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
