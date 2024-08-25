const pool = require("../../config/database");

const selectChucdanh = async () => {
  try {
    let [results1, fields1] = await pool.execute(`
      SELECT * FROM chucdanh
      ORDER BY MACHUCDANH DESC
    `);
    return {
      EM: "Xem thông tin chức vụ thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectChucVu",
      EC: -1,
      DT: [],
    };
  }
};

const selectChucdanh_TENCHUCDANH = async (TENCHUCDANH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM chucdanh WHERE TENCHUCDANH = ?`,
      [TENCHUCDANH]
    );

    if (results1.length > 0) {
      return {
        EM: "Xem thông tin chức danh thành công",
        EC: 1,
        DT: results1[0], // Chỉ lấy dòng đầu tiên của kết quả
      };
    } else {
      return {
        EM: "Không tìm thấy chức danh này",
        EC: 0,
        DT: {},
      };
    }
  } catch (error) {
    return {
      EM: "Lỗi services selectChucdanh_TENCHUCDANH",
      EC: -1,
      DT: {},
    };
  }
};

const createChucdanh = async (TENCHUCDANH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chucdanh where TENCHUCDANH = ?`,
      [TENCHUCDANH]
    );
    if (results1.length > 0) {
      return {
        EM: "Chức danh này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO chucdanh (TENCHUCDANH) VALUES (?)`,
      [TENCHUCDANH]
    );
    const result_data = await selectChucdanh();
    return {
      EM: "thêm chức danh mới mới thành công",
      EC: 1,
      DT: result_data.DT,
    };
  } catch (error) {
    return {
      EM: "lỗi services createChucVu",
      EC: -1,
      DT: [],
    };
  }
};

const updateChucdanh = async (MACHUCDANH, TENCHUCDANH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chucdanh where MACHUCDANH = ?`,
      [MACHUCDANH]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `UPDATE chucdanh
              SET TENCHUCDANH = ? where MACHUCDANH = ?;`,
        [TENCHUCDANH, MACHUCDANH]
      );
      const result_data = await selectChucdanh();
      return {
        EM: "sửa chức danh thành công",
        EC: 1,
        DT: result_data.DT,
      };
    }
    return {
      EM: "chức danh này không tồn tại",
      EC: 0,
      DT: [],
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

const xoaChucdanh = async (MACHUCDANH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chucdanh where MACHUCDANH = ?`,
      [MACHUCDANH]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `DELETE FROM chucdanh WHERE MACHUCDANH = ?`,
        [MACHUCDANH]
      );
      const result_data = await selectChucdanh();
      return {
        EM: "xóa chức danh thành công",
        EC: 1,
        DT: result_data.DT,
      };
    }
    return {
      EM: "Chức danh này không tồn tại",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "lỗi services createChucVu",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectChucdanh,
  createChucdanh,
  updateChucdanh,
  xoaChucdanh,

  selectChucdanh_TENCHUCDANH,
};
