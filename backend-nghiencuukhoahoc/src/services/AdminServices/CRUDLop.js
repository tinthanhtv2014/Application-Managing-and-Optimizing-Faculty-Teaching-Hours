const pool = require("../../config/database");
const { timchuongtrinh_TENCHUONGTRINH, timlop_MALOP } = require("./helpers");
const selectLop = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from lop`);
    return {
      EM: " Xem thông tin lớp thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    console.log("error", error);
    return {
      EM: "lỗi services selectMonHoc",
      EC: -1,
      DT: [],
    };
  }
};

const CreateLop = async (TENCHUONGTRINH, datalop) => {
  try {
    const MACHUONGTRINH = await timchuongtrinh_TENCHUONGTRINH(TENCHUONGTRINH);
    console.log("check machuongtrinh", MACHUONGTRINH);
    const timlop = await timlop_MALOP(datalop.MALOP);
    if (timlop.length > 0) {
      return {
        EM: " lớp này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results1, fields1] = await pool.execute(
      `insert into lop values (?,?,?,?,?)`,
      [
        datalop.MALOP,
        MACHUONGTRINH.MACHUONGTRINH,
        datalop.TENLOP,
        datalop.NAMTUYENSINH,
        datalop.SISO,
      ]
    );
    return {
      EM: " tạo lớp thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services CreateLop",
      EC: -1,
      DT: [],
    };
  }
};

const updateLop = async (MALOP, datalop) => {
  try {
    const MACHUONGTRINH = await timchuongtrinh_TENCHUONGTRINH(
      datalop.TENCHUONGTRINH
    );
    console.log("check machuongtrinh", MACHUONGTRINH);
    const timlop = await timlop_MALOP(MALOP);
    if (timlop.length > 0) {
      let [results1, fields1] = await pool.execute(
        `   UPDATE lop
            SET MACHUONGTRINH = ? , TENLOP = ?, NAMTUYENSINH = ?, SISO = ?
            WHERE MALOP = ?`,
        [
          MACHUONGTRINH.MACHUONGTRINH,
          datalop.TENLOP,
          datalop.NAMTUYENSINH,
          datalop.SISO,
          MALOP,
        ]
      );

      let [results_ketqua, fields_ketqua] = await pool.execute(
        `select * from lop where MALOP = ?`,
        [MALOP]
      );

      return {
        EM: " thay đổi thông tin lớp thành công",
        EC: 1,
        DT: results_ketqua,
      };
    } else {
      let [results1, fields1] = await pool.execute(
        `insert into lop values (?,?,?,?,?)`,
        [
          MALOP,
          MACHUONGTRINH.MACHUONGTRINH,
          datalop.TENLOP,
          datalop.NAMTUYENSINH,
          datalop.SISO,
        ]
      );

      let [results_ketqua, fields_ketqua] = await pool.execute(
        `select * from lop where MALOP = ?`,
        [MALOP]
      );
      return {
        EM: " tạo lớp thành công",
        EC: 1,
        DT: results_ketqua,
      };
    }
  } catch (error) {
    return {
      EM: "lỗi services updateLop",
      EC: -1,
      DT: [],
    };
  }
};

const deleteLop = async (MALOP) => {
  try {
    let [results1, fields1] = await pool.execute(
      `DELETE FROM lop WHERE MALOP = ?;`,
      [MALOP]
    );
    return {
      EM: " xóa lớp thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services deleteLop",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectLop,
  CreateLop,
  updateLop,
  deleteLop,
};
