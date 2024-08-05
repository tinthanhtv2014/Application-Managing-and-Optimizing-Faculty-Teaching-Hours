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
    console.log("check select quy dinh results1 =>", results1);
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
  console.log(" check TEN_QUY_DINH", TEN_QUY_DINH);
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
    console.log("check resultsData", resultsData);
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

const updateQuyDinh = async (id, TEN_QUY_DINH) => {
  try {
    let results1 = await selectQuyDinh_TEN_QUY_DINH(TEN_QUY_DINH);
    if (results1.length === 0) {
      return {
        EM: "Quy định này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `UPDATE quy_dinh SET TRANG_THAI_QUY_DINH = N'Ngưng áp dụng' WHERE MA_QUY_DINH = ?`,
      [id]
    );
    return {
      EM: "Cập nhật quy định thành công",
      EC: 1,
      DT: results,
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
    console.log("check id ", id);
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
    console.log("check resultsData", resultsData);
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

module.exports = {
  selectQuyDinh,
  createQuyDinh,
  updateQuyDinh,
  deleteQuyDinh,
};
