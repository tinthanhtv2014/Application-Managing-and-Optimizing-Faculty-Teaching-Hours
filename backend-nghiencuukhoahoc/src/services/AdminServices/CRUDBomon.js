const pool = require("../../config/database");

const selectBomon = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from bomon`);
    return {
      EM: " xem thông tin bộ môn thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectBomon",
      EC: -1,
      DT: [],
    };
  }
};

//Hàm tìm Bộ môn theo Mã khoa
const selectBomon_MAKHOA = async (MAKHOA) => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM bomon WHERE MAKHOA = ?`,
      [MAKHOA]
    );
    return {
      EM: "Xem thông tin bộ môn thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectBomon",
      EC: -1,
      DT: [],
    };
  }
};

//Hàm tìm bộ môn theo TENBOMON
const selectBomon_TENBOMON = async (TENBOMON) => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM bomon WHERE TENBOMON = ?`,
      [TENBOMON]
    );

    if (results1.length > 0) {
      return {
        EM: "Xem thông tin bộ môn thành công",
        EC: 1,
        DT: results1[0], // Chỉ lấy dòng đầu tiên của kết quả
      };
    } else {
      return {
        EM: "Không tìm thấy bộ môn",
        EC: 0,
        DT: {},
      };
    }
  } catch (error) {
    return {
      EM: "Lỗi services selectBomon_TENBOMON",
      EC: -1,
      DT: {},
    };
  }
};

const createBomon = async (makhoa, tenbomon) => {
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
      `INSERT INTO bomon (MAKHOA, TENBOMON) VALUES (?,?)`,
      [makhoa, tenbomon]
    );
    return {
      EM: "thêm bộ môn mới mới thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services createBomon",
      EC: -1,
      DT: [],
    };
  }
};

const updateBomon = async (mabomon, makhoa, tenbomon) => {
  try {
    console.log(mabomon);
    console.log(tenbomon);
    console.log(makhoa);
    let [results1, fields1] = await pool.execute(
      `select * from bomon where MABOMON = ?`,
      [mabomon]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `UPDATE bomon SET MAKHOA = ?,TENBOMON = ? WHERE MABOMON = ?`,
        [makhoa, tenbomon, mabomon]
      );
      let [results2, fields1] = await pool.execute(
        `select * from bomon where MAKHOA = ?`,
        [makhoa]
      );
      return {
        EM: "update thông tin bộ môn thành công",
        EC: 1,
        DT: results2,
      };
    }
    return {
      EM: "bộ môn này không tồn tại, không thể update",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services createTaiKhoan",
      EC: -1,
      DT: [],
    };
  }
};

const deleteBomon = async (mabomon) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from bomon where MABOMON = ?`,
      [mabomon]
    );
    console.log(results1.length);
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
    console.log(error);
    return {
      EM: "lỗi services createTaiKhoan",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectBomon,
  createBomon,
  updateBomon,
  deleteBomon,

  selectBomon_MAKHOA,
  selectBomon_TENBOMON,
};
