const pool = require("../../../config/database");

const selectQuyDinh = async () => {
  try {
    let [results, fields] = await pool.execute(`SELECT * FROM quy_dinh`);
    return {
      EM: "Xem thông tin quy định thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectQuyDinh",
      EC: -1,
      DT: [],
    };
  }
};

const selectQuyDinh_TEN_QUY_DINH = async (TEN_QUY_DINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from quy_dinh where TEN_QUY_DINH = ?`,
      [TEN_QUY_DINH]
    );
    return results1;
  } catch (error) {
    return {
      EM: "lỗi services selectQuyDinh",
      EC: -1,
      DT: [],
    };
  }
};
const selectQuyDinh_TEN_QUY_DINHbyID = async (id) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from quy_dinh where MA_QUY_DINH = ?`,
      [id]
    );
    // console.log("check select quy dinh results1 =>", results1);
    return results1;
  } catch (error) {
    return {
      EM: "lỗi services selectQuyDinh",
      EC: -1,
      DT: [],
    };
  }
};
const createQuyDinh = async (TEN_QUY_DINH) => {
  // console.log(" check TEN_QUY_DINH", TEN_QUY_DINH);
  try {
    let results1 = await selectQuyDinh_TEN_QUY_DINH(TEN_QUY_DINH);
    if (results1.length > 0) {
      return {
        EM: "Quy định này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO quy_dinh (TEN_QUY_DINH,TRANG_THAI_QUY_DINH) VALUES (?,N'Đang áp dụng')`,
      [TEN_QUY_DINH]
    );
    let [resultsData, fieldsData] = await pool.execute(
      `SELECT * FROM quy_dinh`
    );
    // console.log("check resultsData", resultsData);
    return {
      EM: "Thêm quy định mới thành công",
      EC: 1,
      DT: resultsData,
    };
  } catch (error) {
    return {
      EM: "Lỗi services createQuyDinh",
      EC: -1,
      DT: [],
    };
  }
};

const updateQuyDinh = async (id, TRANG_THAI_QUY_DINH) => {
  try {
    let [results, fields] = await pool.execute(
      `UPDATE quy_dinh SET TRANG_THAI_QUY_DINH = ? WHERE MA_QUY_DINH = ?`,
      [TRANG_THAI_QUY_DINH, id]
    );
    const results1 = await selectQuyDinh();
    return {
      EM: "Cập nhật trạng thái quy định thành công",
      EC: 1,
      DT: results1.DT,
    };
  } catch (error) {
    return {
      EM: "Lỗi services updateQuyDinh",
      EC: -1,
      DT: [],
    };
  }
};

const deleteQuyDinh = async (id) => {
  try {
    // console.log("check id ", id);
    let results1 = await selectQuyDinh_TEN_QUY_DINHbyID(id);
    if (results1.length === 0) {
      return {
        EM: "Quy định này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `DELETE FROM quy_dinh WHERE MA_QUY_DINH = ?`,
      [id]
    );
    let [resultsData, fieldsData] = await pool.execute(
      `SELECT * FROM quy_dinh`
    );
    return {
      EM: "Xóa quy định thành công",
      EC: 1,
      DT: resultsData,
    };
  } catch (error) {
    console.log("check error = >", error);
    return {
      EM: "Lỗi services deleteQuyDinh",
      EC: -1,
      DT: [],
    };
  }
};

//select theo trạng thái

const selectQuyDinh_TRANGTHAI = async (TRANG_THAI_QUY_DINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select qd.TEN_QUY_DINH,qd.TRANG_THAI_QUY_DINH,tlqd.TEN_QUY_DOI,tlqd.TY_LE,ltg.TEN_LOAI_TAC_GIA,ldm.TEN_LOAI_DANH_MUC from quy_dinh as qd,ty_le_quy_doi_gio_chuan as tlqd,loai_danh_muc as ldm,loai_tac_gia as ltg where qd.TRANG_THAI_QUY_DINH = ?`,
      [TRANG_THAI_QUY_DINH]
    );
    return {
      EM: "xem quy định thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectQuyDinh",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectQuyDinh,
  createQuyDinh,
  updateQuyDinh,
  deleteQuyDinh,

  //select theo trạng thái
  selectQuyDinh_TRANGTHAI,
};
