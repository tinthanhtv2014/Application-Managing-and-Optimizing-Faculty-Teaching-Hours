const pool = require("../../../config/database");

const select_Co_Quy_Dinh = async () => {
  try {
    let [results, fields] = await pool.execute(
      `SELECT 
          qd.TEN_QUY_DINH,
          ltg.TEN_LOAI_TAC_GIA,
          tlqd.TEN_QUY_DOI,
          tlqd.TY_LE,
          tlqd.TRANG_THAI_QUY_DOI,
          tlqd.GHI_CHU_QUY_DOI,
          dm.TEN_LOAI_DANH_MUC 
        FROM 
          loai_tac_gia as ltg,
          ty_le_quy_doi_gio_chuan as tlqd,
          loai_danh_muc as dm,
          quy_dinh as qd,
          co_ty_le as cqd 
        WHERE 
          ltg.MA_LOAI_TAC_GIA = cqd.MA_LOAI_TAC_GIA 
          AND dm.MA_LOAI_DANH_MUC = cqd.MA_LOAI_DANH_MUC 
          AND tlqd.MA_QUY_DOI = cqd.MA_QUY_DOI 
          AND qd.MA_QUY_DINH = tlqd.MA_QUY_DINH`
    );

    return {
      EM: "Xem thông tin danh mục quy đổi thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log("check errror", error);
    return {
      EM: "Lỗi services selectDanhMucQuyDoi",
      EC: -1,
      DT: [],
    };
  }
};

const create_Co_Quy_Dinh_excel = async () => {
  try {
    let [results, fields] = await pool.execute(``);
    return {
      EM: "thêm thông tin danh mục quy đổi thành công",
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
const create_Co_Quy_Dinh = async (
  MA_QUY_DOI,
  MA_LOAI_DANH_MUC,
  MA_LOAI_TAC_GIA,
  SO_TAC_GIA
) => {
  // if (SO_TAC_GIA == null || typeof SO_TAC_GIA !== "number") {
  //   return {
  //     EM: "SO_TAC_GIA không hợp lệ, phải là một số và không được null",
  //     EC: -1,
  //     DT: [],
  //   };
  // }

  try {
    let [results, fields] = await pool.execute(
      `INSERT INTO co_ty_le (MA_QUY_DOI,MA_LOAI_DANH_MUC,MA_LOAI_TAC_GIA,SO_TAC_GIA_THUOC_LOAI) VALUES (?,?,?,?)`,
      [MA_QUY_DOI, MA_LOAI_DANH_MUC, MA_LOAI_TAC_GIA, SO_TAC_GIA]
    );

    const results_Data = await select_Co_Quy_Dinh();
    console.log("check select_Co_Quy_Dinh", results_Data);
    return {
      EM: "Thêm có quy định thành công ",
      EC: 1,
      DT: results_Data.DT,
    };
  } catch (error) {
    console.log("check error ->", error);
    return {
      EM: "Lỗi services create_Co_Quy_Dinh",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  select_Co_Quy_Dinh,
  create_Co_Quy_Dinh,
  create_Co_Quy_Dinh_excel,
};
