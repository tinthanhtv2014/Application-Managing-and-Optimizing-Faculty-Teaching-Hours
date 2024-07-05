const pool = require("../../config/database");
const { selectBomon_MABOMON, selectBomon_TENBOMON } = require('./CRUDBomon');
const { timChucVu_TENCHUCVU } = require("./CRUDChucVu")
const { selectChucdanh_TENCHUCDANH } = require('./CRUDChucdanh')
const { timTaiKhoan_TENDANGNHAP } = require('./CRUDTaiKhoan')

const timGiangVien = async (MAGV) => {
  let [results1, fields1] = await pool.execute(
    `select * from giangvien where MAGV = ?`,
    [MAGV]
  );

  return results1;
};

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

    if (timGiangVien(dataGiangVien.maGV)) {
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
  MABOMON
) => {
  try {
    if (!(await timGiangVien(MAGV))) {
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
    let [results0, fields0] = await pool.execute(
      "select bm.MABOMON,bm.TENBOMON,tk.TENDANGNHAP,gv.TENGV,gv.EMAIL,tk.MAGV,gv.DIENTHOAI,gv.DIACHI,tk.PHANQUYEN,tk.TRANGTHAITAIKHOAN from taikhoan as tk,giangvien as gv,bomon as bm where tk.MAGV = gv.MAGV and bm.MABOMON = gv.MABOMON and bm.MABOMON = ?",
      [MABOMON]
    );
    return {
      EM: "Cập nhật trạng thái tài khoản thành công",
      EC: 1,
      DT: results0,
    };
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

    let KiemTra_MAGV = await timGiangVien(MAGV)
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

const update_ChucVu_ChucDanh_GiangVien = async (MAGV, dataGiangVien) => {
  try {
    // MAGV
    // dataGiangVien gồm TENDANGNHAP, TENGV, TENCHUCVU, TENCHUCDANH, DIENTHOAI, DIACHI, TENBOMON, PHANQUYEN, TRANGTHAITAIKHOAN

    // console.log("MAGV >>>>>", MAGV);
    // console.log("dataGiangVien >>>>>", dataGiangVien);

    let KiemTra_MAGV = await timGiangVien(MAGV)
    //console.log("KiemTra_MAGV >>>>>", KiemTra_MAGV);
    if (!KiemTra_MAGV.length > 0) {
      return {
        EM: "Giảng viên này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    // Bị lỗi  Circular Dependency (Phụ thuộc vòng lặp) <---------------------

    // console.log("dataGiangVien.TENDANGNHAP >>>>>", dataGiangVien.TENDANGNHAP);
    // let KiemTra_TENDANGNHAP = await timTaiKhoan_TENDANGNHAP(dataGiangVien.TENDANGNHAP)
    // console.log("KiemTra_TENDANGNHAP >>>>>", KiemTra_TENDANGNHAP);
    // if (!KiemTra_TENDANGNHAP) {
    //   return {
    //     EM: "Giảng viên này không tồn tại",
    //     EC: 0,
    //     DT: [],
    //   };
    // }

    let KiemTra_TENCHUCVU = await timChucVu_TENCHUCVU(dataGiangVien.TENCHUCVU)
    console.log("KiemTra_TENCHUCVU >>>>>", KiemTra_TENCHUCVU);
    if (!KiemTra_TENCHUCVU) {
      return {
        EM: "Chức vụ này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let KiemTra_TENCHUCDANH = await selectChucdanh_TENCHUCDANH(dataGiangVien.TENCHUCDANH)
    console.log("KiemTra_TENCHUCDANH >>>>>", KiemTra_TENCHUCDANH);
    if (!KiemTra_TENCHUCDANH) {
      return {
        EM: "Chức danh này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let KiemTra_TENBOMON = await selectBomon_TENBOMON(dataGiangVien.TENBOMON)
    console.log("KiemTra_TENBOMON >>>>>", KiemTra_TENBOMON);
    if (!KiemTra_TENBOMON) {
      return {
        EM: "Bộ môn này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    //Mã SQL chưa được làm xong <---------------------------

    // let [results, fields] = await pool.execute(
    //   `UPDATE giangvien
    //         SET MABOMON = ?, TENGV = ?, EMAIL = ?, DIENTHOAI = ?, DIACHI = ? 
    //         WHERE MAGV = ?;`,
    //   [
    //     dataGiangVien.MABOMON,
    //     dataGiangVien.TENGV,
    //     dataGiangVien.EMAIL,
    //     dataGiangVien.DIENTHOAI,
    //     dataGiangVien.DIACHI,
    //     MAGV,
    //   ]
    // );

    return {
      EM: "Sửa giảng viên thành công",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi services update_ChucVu_ChucDanh_GiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const deleteGiangVien = async (MAGV, MABOMON) => {
  try {
    console.log("check MGV +>", MAGV);
    if (!timGiangVien(MAGV)) {
      return {
        EM: "Giảng viên này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    // Thực hiện xóa từng bảng dữ liệu liên quan
    await Promise.all([
      pool.execute(`DELETE FROM giu_chuc_vu WHERE MAGV = ?;`, [MAGV]),
      pool.execute(`DELETE FROM co_chuc_danh WHERE MAGV = ?;`, [MAGV]),
      pool.execute(`DELETE FROM taikhoan WHERE MAGV = ?;`, [MAGV]),
      pool.execute(`DELETE FROM giangvien WHERE MAGV = ?;`, [MAGV]),
    ]);
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
      WHERE bm.MABOMON = ?`,

      [MABOMON]
    );

    return {
      EM: "Xóa giảng viên thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi khi xóa giảng viên",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectGiangVien,
  selectOnlyGiangVien,

  createGiangVien,

  updateGiangVien,
  update_ChucVu_ChucDanh_GiangVien,

  deleteGiangVien,
  timGiangVien,
  updateTrangThaiTaiKhoanGiangVien,
};
