const pool = require("../../../config/database");

const selectLoaiDanhMuc = async () => {
  try {
    let [results, fields] = await pool.execute(`SELECT * FROM loai_danh_muc`);
    return {
      EM: "Xem thông tin loại danh mục thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

const selectLoaiDanhMuc_TEN_LOAI_DANH_MUC = async (TEN_LOAI_DANH_MUC) => {
  try {
    let [results, fields] = await pool.execute(
      `SELECT * FROM loai_danh_muc WHERE TEN_LOAI_DANH_MUC = ?`,
      [TEN_LOAI_DANH_MUC]
    );
    return results;
  } catch (error) {
    return {
      EM: "Lỗi services selectLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

const createLoaiDanhMuc = async (TEN_LOAI_DANH_MUC) => {
  try {
    let results1 = await selectLoaiDanhMuc_TEN_LOAI_DANH_MUC(TEN_LOAI_DANH_MUC);
    if (results1.length > 0) {
      return {
        EM: "Loại danh mục này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO loai_danh_muc (TEN_LOAI_DANH_MUC) VALUES (?)`,
      [TEN_LOAI_DANH_MUC]
    );
    return {
      EM: "Thêm loại danh mục mới thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services createLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

const updateLoaiDanhMuc = async (id, TEN_LOAI_DANH_MUC) => {
  try {
    let results1 = await selectLoaiDanhMuc_TEN_LOAI_DANH_MUC(TEN_LOAI_DANH_MUC);
    if (results1.length === 0) {
      return {
        EM: "Loại danh mục này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `UPDATE loai_danh_muc SET TEN_LOAI_DANH_MUC = ? WHERE MA_LOAI_DANH_MUC = ?`,
      [TEN_LOAI_DANH_MUC, id]
    );
    return {
      EM: "Cập nhật loại danh mục thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services updateLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

const deleteLoaiDanhMuc = async (id) => {
  try {
    let [results, fields] = await pool.execute(
      `DELETE FROM loai_danh_muc WHERE MA_LOAI_DANH_MUC = ?`,
      [id]
    );
    return {
      EM: "Xóa loại danh mục thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services deleteLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectLoaiDanhMuc,
  createLoaiDanhMuc,
  updateLoaiDanhMuc,
  deleteLoaiDanhMuc,
};
