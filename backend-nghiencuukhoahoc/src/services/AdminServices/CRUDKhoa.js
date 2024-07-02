const pool = require("../../config/database");

const selectKhoa = async (makhoa, tenkhoa) => {
  try {
    let [results1, fields1] = await pool.execute(`select * from khoa`);
    return {
      EM: " xem thông tin khoa thành công",
      EC: 0,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services createTaiKhoan",
      EC: 1,
      DT: [],
    };
  }
};

const createKhoa = async (tenkhoa) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from khoa where TENKHOA = ?`,
      [tenkhoa]
    );

    if (results1.length > 0) {
      return {
        EM: "khoa này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    const [results, fields] = await pool.execute(
      `INSERT INTO khoa (tenkhoa) VALUES (?)`,
      [tenkhoa]
    );
    return {
      EM: "thêm khoa mới thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services createTaiKhoan",
      EC: 1,
      DT: [],
    };
  }
};

const updateKhoa = async (makhoa, tenkhoa) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from khoa where MAKHOA = ?`,
      [makhoa]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `UPDATE khoa SET TENKHOA = ? WHERE MAKHOA = ?`,
        [tenkhoa, makhoa]
      );
      return {
        EM: "update thông tin khoa thành công",
        EC: 1,
        DT: results,
      };
    }
    return {
      EM: "khoa này không tồn tại, không thể update",
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

const deleteKhoa = async (makhoa) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from khoa where MAKHOA = ?`,
      [makhoa]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `DELETE FROM khoa WHERE makhoa = ?`,
        [makhoa]
      );
      return {
        EM: "xóa khoa thành công",
        EC: 1,
        DT: [],
      };
    }
    return {
      EM: "khoa này không tồn tại, không thể xóa",
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
  createKhoa,
  selectKhoa,
  updateKhoa,
  deleteKhoa,
};
