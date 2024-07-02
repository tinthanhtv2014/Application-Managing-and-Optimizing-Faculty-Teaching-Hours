const pool = require("../../config/database");

const selectBomon = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from bomon`);
    return {
      EM: " xem thông tin bộ môn thành công",
      EC: 0,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectBomon",
      EC: 1,
      DT: [],
    };
  }
};
const selectOnlyBomon = async (MAKHOA) => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM bomon WHERE MAKHOA = ?`,
      [MAKHOA]
    );
    return {
      EM: "Xem thông tin bộ môn thành công",
      EC: 0,
      DT: results1,
      MAKHOA: MAKHOA,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectBomon",
      EC: 1,
      DT: [],
      MAKHOA: MAKHOA,
    };
  }
};

const createBomon = async (mabomon, makhoa, tenbomon) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from bomon where TENBOMON = ?`,
      [tenbomon]
    );
    if (results1.length > 0) {
      return {
        EM: "bộ môn này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO bomon VALUES (?,?,?)`,
      [mabomon, makhoa, tenbomon]
    );
    return {
      EM: "thêm bộ môn mới mới thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "lỗi services createBomon",
      EC: -1,
      DT: [],
    };
  }
};

const updateBomon = async (mabomon, makhoa, tenbomon) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from bomon where MABOMON = ?`,
      [mabomon]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `UPDATE bomon SET MAKHOA = ?,TENBOMON = ? WHERE MABOMON = ?`,
        [makhoa, tenbomon, mabomon]
      );
      return {
        EM: "update thông tin bộ môn thành công",
        EC: 1,
        DT: results,
      };
    }
    return {
      EM: "bộ môn này không tồn tại, không thể update",
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

const deleteBomon = async (mabomon) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from khoa where MABOMON = ?`,
      [mabomon]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `DELETE FROM bomon WHERE MABOMON = ?`,
        [mabomon]
      );
      return {
        EM: "xóa bộ môn hiện tại thành công",
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
  selectBomon,
  createBomon,
  updateBomon,
  deleteBomon,
  selectOnlyBomon,
};
