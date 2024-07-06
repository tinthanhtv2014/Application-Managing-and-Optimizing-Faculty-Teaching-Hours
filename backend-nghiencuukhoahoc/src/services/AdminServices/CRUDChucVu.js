const pool = require("../../config/database");

const timChucVu_MaChucVu = async (MACHUCVU) => {
  let [results1, fields1] = await pool.execute(
    `select * from chucvu where TENCHUCVU = ?`,
    [MACHUCVU]
  );

  return results1.length > 0;
};

const timChucVu_TENCHUCVU = async (TENCHUCVU) => {
  let [results1, fields1] = await pool.execute(
    `select * from chucvu where TENCHUCVU = ?`,
    [TENCHUCVU]
  );

  return results1.length > 0;
};

const selectChucVu = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from chucvu`);
    return {
      EM: " xem thông tin chức vụ thành công",
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

const selectChucvu_TENCHUCVU = async (TENCHUCVU) => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM chucvu WHERE TENCHUCVU = ?`,
      [TENCHUCVU]
    );

    if (results1.length > 0) {
      return {
        EM: "Xem thông tin chức vụ thành công",
        EC: 1,
        DT: results1[0], // Chỉ lấy dòng đầu tiên của kết quả
      };
    } else {
      return {
        EM: "Không tìm thấy chức vụ này",
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

const createChucVu = async (TENCHUCVU) => {
  // try {
  let [results1, fields1] = await pool.execute(
    `select * from chucvu where TENCHUCVU = ?`,
    [TENCHUCVU]
  );
  if (results1.length > 0) {
    return {
      EM: "Chức vụ này đã tồn tại",
      EC: 0,
      DT: [],
    };
  }

  let [results, fields] = await pool.execute(
    `INSERT INTO chucvu (TENCHUCVU) VALUES (?)`,
    [TENCHUCVU]
  );
  return {
    EM: "thêm chức vụ mới mới thành công",
    EC: 1,
    DT: results,
  };
  // } catch (error) {
  //   return {
  //     EM: "lỗi services createChucVu",
  //     EC: -1,
  //     DT: [],
  //   };
  // }
};

const updateChucVu = async (MACHUCVU, TENCHUCVU) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chucvu where MACHUCVU = ?`,
      [MACHUCVU]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `UPDATE chucvu
              SET TENCHUCVU = ? where MACHUCVU = ?;`,
        [TENCHUCVU, MACHUCVU]
      );
      return {
        EM: "sửa chức vụ thành công",
        EC: 1,
        DT: results,
      };
    }
    return {
      EM: "chức vụ này không tồn tại",
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

const xoaChucVu = async (MACHUCVU) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chucvu where MACHUCVU = ?`,
      [MACHUCVU]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `DELETE FROM chucvu WHERE MACHUCVU = ?`,
        [MACHUCVU]
      );
      return {
        EM: "xóa chức vụ thành công",
        EC: 1,
        DT: results,
      };
    }
    return {
      EM: "Chức vụ này không tồn tại",
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
  selectChucVu,
  createChucVu,
  updateChucVu,
  xoaChucVu,
  selectChucvu_TENCHUCVU,

  timChucVu_MaChucVu,
  timChucVu_TENCHUCVU,
};
