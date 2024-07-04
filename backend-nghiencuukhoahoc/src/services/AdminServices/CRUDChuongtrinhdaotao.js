const pool = require("../../config/database");

const selectChuongtrinhdaotao = async () => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chuongtrinhdaotao`
    );
    return {
      EM: " xem thông tin chương trình đào tạo thành công",
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

const selectChuongtrinhdaotao_TENCHUONGTRINH = async (TENCHUONGTRINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM chuongtrinhdaotao WHERE TENCHUONGTRINH = ?`,
      [TENCHUONGTRINH]
    );

    if (results1.length > 0) {
      return {
        EM: "Xem thông tin chương trình thành công",
        EC: 1,
        DT: results1[0], // Chỉ lấy dòng đầu tiên của kết quả
      };
    } else {
      return {
        EM: "Không tìm thấy chương trình này",
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

const createChuongtrinhdaotao = async (MABOMON, TENCHUONGTRINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chuongtrinhdaotao where TENCHUONGTRINH = ?`,
      [TENCHUONGTRINH]
    );
    if (results1.length > 0) {
      return {
        EM: "Chương trình này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO chuongtrinhdaotao (MABOMON,TENCHUONGTRINH) VALUES (?,?)`,
      [MABOMON, TENCHUONGTRINH]
    );
    return {
      EM: "thêm Chương trình mới thành công",
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

const updateChuongtrinhdaotao = async (
  MACHUONGTRINH,
  MABOMON,
  TENCHUONGTRINH
) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chuongtrinhdaotao where MACHUONGTRINH = ?`,
      [MACHUONGTRINH]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `UPDATE chuongtrinhdaotao
              SET TENCHUONGTRINH = ?,MABOMON = ? where MACHUONGTRINH = ?;`,
        [TENCHUONGTRINH, MABOMON, MACHUONGTRINH]
      );
      return {
        EM: "sửa chương trình thành công",
        EC: 1,
        DT: results,
      };
    }
    return {
      EM: "chương trình này không tồn tại",
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

const xoaChuongtrinh = async (MACHUONGTRINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chuongtrinhdaotao where MACHUONGTRINH = ?`,
      [MACHUONGTRINH]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `DELETE FROM chuongtrinhdaotao WHERE MACHUONGTRINH = ?`,
        [MACHUONGTRINH]
      );
      return {
        EM: "xóa chương trình thành công",
        EC: 1,
        DT: results,
      };
    }
    return {
      EM: " chương trình này không tồn tại",
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
  selectChuongtrinhdaotao,
  selectChuongtrinhdaotao_TENCHUONGTRINH,
  createChuongtrinhdaotao,
  updateChuongtrinhdaotao,
  xoaChuongtrinh,
};
