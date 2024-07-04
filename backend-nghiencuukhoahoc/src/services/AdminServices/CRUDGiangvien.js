const pool = require("../../config/database");

const timGiangVien = async (maGV) => {
  let [results1, fields1] = await pool.execute(
    `select * from giangvien where MAGV = ?`,
    [maGV]
  );

  return results1;
};

const selectGiangVien = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from giangvien`);
    return {
      EM: " xem thông tin giảng viên thành công",
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

const updateGiangVien = async (dataGiangVien) => {
  try {
    if (!timGiangVien(dataGiangVien.maGV)) {
      return {
        EM: "Giảng viên này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `UPDATE giangvien
            SET MABOMON = ?, TENDANGNHAP = ?, TENGV = ?, EMAIL = ?, DIENTHOAI = ?, DIACHI = ?, 
            WHERE MAGV = ?;`,
      [
        dataGiangVien.MABOMON,
        dataGiangVien.TENDANGNHAP,
        dataGiangVien.TENGV,
        dataGiangVien.EMAIL,
        dataGiangVien.DIENTHOAI,
        dataGiangVien.DIACHI,
        dataGiangVien.MAGV,
      ]
    );
    return {
      EM: "sửa giảng viên thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services updateGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const deleteGiangVien = async (dataGiangVien) => {
  try {
    if (!timGiangVien(dataGiangVien.MAGV)) {
      return {
        EM: "Giảng viên này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `DELETE FROM giu_chuc_vu
            WHERE MAGV = ?;`,
      [dataGiangVien.MAGV]
    );
    let [results3, fields3] = await pool.execute(
      `DELETE FROM co_chuc_danh
            WHERE MAGV = ?;`,
      [dataGiangVien.MAGV]
    );
    let [results2, fields2] = await pool.execute(
      `DELETE FROM taikhoan
            WHERE MAGV = ?;`,
      [dataGiangVien.MAGV]
    );
    let [results1, fields1] = await pool.execute(
      `DELETE FROM giangvien
            WHERE MAGV = ?;`,
      [dataGiangVien.MAGV]
    );
    return {
      EM: "xóa giảng viên thành công",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services deleteGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectGiangVien,
  createGiangVien,
  updateGiangVien,
  deleteGiangVien,
  selectOnlyGiangVien,
  timGiangVien,
  updateTrangThaiTaiKhoanGiangVien,
};
