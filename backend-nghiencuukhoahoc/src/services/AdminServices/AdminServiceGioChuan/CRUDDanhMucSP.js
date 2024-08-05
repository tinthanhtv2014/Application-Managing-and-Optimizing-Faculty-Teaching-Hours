const pool = require("../../../config/database");

const selectDanhMucQuyDoi = async () => {
  try {
    let [results, fields] = await pool.execute(
      `SELECT * FROM danhmucquydoispkhcn`
    );
    return {
      EM: "Xem thông tin danh mục quy đổi thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectDanhMucQuyDoi",
      EC: -1,
      DT: [],
    };
  }
};

const selectDanhMucQuyDoi_NOI_DUNG_DANH_MUC = async (NOI_DUNG_DANH_MUC) => {
  try {
    let [results, fields] = await pool.execute(
      `SELECT * FROM danhmucquydoispkhcn WHERE NOI_DUNG_DANH_MUC = ?`,
      [NOI_DUNG_DANH_MUC]
    );
    return results;
  } catch (error) {
    return {
      EM: "Lỗi services selectDanhMucQuyDoi",
      EC: -1,
      DT: [],
    };
  }
};

const createDanhMucQuyDoi = async (
  MA_LOAI_DANH_MUC,
  GIO_CHUAN,
  NOI_DUNG_DANH_MUC,
  ISBN,
  WOS_SCOUPUS,
  HANG_WOS_SCOUPUS,
  LOI_NHUAN,
  DON_VI_TINH,
  GIAI_THUONG,
  XEP_HANG_QUARTILES,
  NAM_THUC_HIEN,
  TRANG_THAI_DANH_MUC,
  GHI_CHU_DANH_MUC
) => {
  try {
    let results1 = await selectDanhMucQuyDoi_NOI_DUNG_DANH_MUC(
      NOI_DUNG_DANH_MUC
    );
    if (results1.length > 0) {
      return {
        EM: "Danh mục quy đổi này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO danhmucquydoispkhcn (MA_LOAI_DANH_MUC, GIO_CHUAN, NOI_DUNG_DANH_MUC, ISBN, WOS_SCOUPUS, HANG_WOS_SCOUPUS, LOI_NHUAN, DON_VI_TINH, GIAI_THUONG, XEP_HANG_QUARTILES, NAM_THUC_HIEN, TRANG_THAI_DANH_MUC, GHI_CHU_DANH_MUC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        MA_LOAI_DANH_MUC,
        GIO_CHUAN,
        NOI_DUNG_DANH_MUC,
        ISBN,
        WOS_SCOUPUS,
        HANG_WOS_SCOUPUS,
        LOI_NHUAN,
        DON_VI_TINH,
        GIAI_THUONG,
        XEP_HANG_QUARTILES,
        NAM_THUC_HIEN,
        TRANG_THAI_DANH_MUC,
        GHI_CHU_DANH_MUC,
      ]
    );
    return {
      EM: "Thêm danh mục quy đổi mới thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services createDanhMucQuyDoi",
      EC: -1,
      DT: [],
    };
  }
};

const updateDanhMucQuyDoi = async (
  id,
  MA_LOAI_DANH_MUC,
  GIO_CHUAN,
  NOI_DUNG_DANH_MUC,
  ISBN,
  WOS_SCOUPUS,
  HANG_WOS_SCOUPUS,
  LOI_NHUAN,
  DON_VI_TINH,
  GIAI_THUONG,
  XEP_HANG_QUARTILES,
  NAM_THUC_HIEN,
  TRANG_THAI_DANH_MUC,
  GHI_CHU_DANH_MUC
) => {
  try {
    let results1 = await selectDanhMucQuyDoi_NOI_DUNG_DANH_MUC(
      NOI_DUNG_DANH_MUC
    );
    if (results1.length === 0) {
      return {
        EM: "Danh mục quy đổi này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `UPDATE danhmucquydoispkhcn SET MA_LOAI_DANH_MUC = ?, GIO_CHUAN = ?, NOI_DUNG_DANH_MUC = ?, ISBN = ?, WOS_SCOUPUS = ?, HANG_WOS_SCOUPUS = ?, LOI_NHUAN = ?, DON_VI_TINH = ?, GIAI_THUONG = ?, XEP_HANG_QUARTILES = ?, NAM_THUC_HIEN = ?, TRANG_THAI_DANH_MUC = ?, GHI_CHU_DANH_MUC = ? WHERE MA_DANH_MUC = ?`,
      [
        MA_LOAI_DANH_MUC,
        GIO_CHUAN,
        NOI_DUNG_DANH_MUC,
        ISBN,
        WOS_SCOUPUS,
        HANG_WOS_SCOUPUS,
        LOI_NHUAN,
        DON_VI_TINH,
        GIAI_THUONG,
        XEP_HANG_QUARTILES,
        NAM_THUC_HIEN,
        TRANG_THAI_DANH_MUC,
        GHI_CHU_DANH_MUC,
        id,
      ]
    );
    return {
      EM: "Cập nhật danh mục quy đổi thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services updateDanhMucQuyDoi",
      EC: -1,
      DT: [],
    };
  }
};

const deleteDanhMucQuyDoi = async (id) => {
  try {
    let [results, fields] = await pool.execute(
      `DELETE FROM danhmucquydoispkhcn WHERE MA_DANH_MUC = ?`,
      [id]
    );
    return {
      EM: "Xóa danh mục quy đổi thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services deleteDanhMucQuyDoi",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectDanhMucQuyDoi,
  createDanhMucQuyDoi,
  updateDanhMucQuyDoi,
  deleteDanhMucQuyDoi,
};
