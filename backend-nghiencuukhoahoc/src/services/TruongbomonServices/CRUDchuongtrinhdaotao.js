const pool = require("../../config/database");

const selectOnlyChuongtrinhdaotao = async (TENCHUONGTRINH) => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT ctdt.*,mh.*,t.SOTHUTUHOCKI FROM chuongtrinhdaotao as ctdt,thuoc as t, monhoc as mh WHERE ctdt.MACHUONGTRINH = t.MACHUONGTRINH and t.MAMONHOC = mh.MAMONHOC and ctdt.TENCHUONGTRINH = ?`,
      [TENCHUONGTRINH]
    );
    return {
      EM: "Xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectOnlyChuongtrinhdaotao",
      EC: -1,
      DT: [],
    };
  }
};

const selectChuongtrinhdaotao_tenbomon = async (TENBOMON) => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT ctdt.*,bm.TENBOMON from chuongtrinhdaotao as ctdt, bomon as bm where ctdt.MABOMON = bm.MABOMON and bm.TENBOMON = ?`,
      [TENBOMON]
    );
    return {
      EM: "Xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectChuongtrinhdaotao_tenbomon",
      EC: -1,
      DT: [],
    };
  }
};

const selectOnlyChuongtrinhdaotao_withHOCKI = async (
  TENCHUONGTRINH,
  SOTHUTUHOCKI
) => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT ctdt.*,mh.*,t.SOTHUTUHOCKI FROM chuongtrinhdaotao as ctdt,thuoc as t, monhoc as mh WHERE ctdt.MACHUONGTRINH = t.MACHUONGTRINH and t.MAMONHOC = mh.MAMONHOC and ctdt.TENCHUONGTRINH = ? and t.SOTHUTUHOCKI = ?`,
      [TENCHUONGTRINH, SOTHUTUHOCKI]
    );
    return {
      EM: "Xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectOnlyChuongtrinhdaotao",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectOnlyChuongtrinhdaotao,
  selectChuongtrinhdaotao_tenbomon,
  selectOnlyChuongtrinhdaotao_withHOCKI,
};
