const pool = require("../../config/database");

const timChucVu_MaChucVu = async (MACHUCVU) => {
  let [results1, fields1] = await pool.execute(
    `select * from chucvu where TENCHUCVU = ?`,
    [MACHUCVU]
  );

  return results1;
};

const selectChucVu = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from chucvu`);
    return {
      EM: " xem thông tin bộ môn thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectChucVu",
      EC: -1,
      DT: [],
    };
  }
};

const createChucVu = async (dataChucVu) => {
  try {
    //dataChucVu phải bao gồm TENCHUCVU
    if (timChucVu_MaChucVu(dataChucVu.TENCHUCVU)) {
      return {
        EM: "Chức vụ này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO chucvu (TENCHUCVU) VALUES (?)`,
      [dataChucVu.TENCHUCVU]
    );
    return {
      EM: "thêm chức vụ mới mới thành công",
      EC: 1,
      DT: results,
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
  selectChucVu,
  createChucVu,
  updateChucVu,
};
