const pool = require("../../../config/database");

const selectLoaiDanhMuc = async () => {
  try {
    let [results, fields] = await pool.execute(` SELECT * FROM loai_danh_muc 
      ORDER BY MA_LOAI_DANH_MUC DESC`);
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
      `INSERT INTO loai_danh_muc (TEN_LOAI_DANH_MUC,TRANG_THAI_DANH_MUC) VALUES (?,N'Đang áp dụng')`,
      [TEN_LOAI_DANH_MUC]
    );
    const results_Data = await selectLoaiDanhMuc();
    ("check results_Data", results_Data.DT);
    return {
      EM: "Thêm loại danh mục mới thành công",
      EC: 1,
      DT: results_Data.DT,
    };
  } catch (error) {
    return {
      EM: "Lỗi services createLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

const updateLoaiDanhMuc = async (id, TRANG_THAI_DANH_MUC) => {
  try {
    let [results, fields] = await pool.execute(
      `UPDATE loai_danh_muc SET TRANG_THAI_DANH_MUC = ? WHERE MA_LOAI_DANH_MUC = ?`,
      [TRANG_THAI_DANH_MUC, id]
    );
    return {
      EM: "Cập nhật trạng thái loại danh mục thành công",
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
  ("check id =>", id);
  try {
    let [results, fields] = await pool.execute(
      `DELETE FROM loai_danh_muc WHERE MA_LOAI_DANH_MUC = ?`,
      [id]
    );
    const results_Data = await selectLoaiDanhMuc();
    return {
      EM: "Xóa loại danh mục thành công",
      EC: 1,
      DT: results_Data.DT,
    };
  } catch (error) {
    console.log("check error deleteLoaiDanhMuc ", error);
    return {
      EM: "Lỗi services deleteLoaiDanhMuc",
      EC: -1,
      DT: [],
    };
  }
};

const selectLoaiDanhMuc_TRANGTHAI = async (TRANG_THAI_DANH_MUC) => {
  try {
    let [results, fields] = await pool.execute(
      `select ldm.*, dm.* from danhmucquydoispkhcn as dm, loai_danh_muc as ldm where dm.MA_LOAI_DANH_MUC = ldm.MA_LOAI_DANH_MUC and ldm.TRANG_THAI_DANH_MUC = ?`,
      [TRANG_THAI_DANH_MUC]
    );
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

module.exports = {
  selectLoaiDanhMuc,
  createLoaiDanhMuc,
  updateLoaiDanhMuc,
  deleteLoaiDanhMuc,
  selectLoaiDanhMuc_TRANGTHAI,

  selectLoaiDanhMuc_TEN_LOAI_DANH_MUC
};
