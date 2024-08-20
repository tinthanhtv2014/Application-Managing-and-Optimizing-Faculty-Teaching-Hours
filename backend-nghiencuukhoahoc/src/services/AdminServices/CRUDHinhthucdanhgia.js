const pool = require("../../config/database");

const getAll_hinhthucdanhgia = async () => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM hinhthucdanhgia `
    );
    return {
      EM: "Xem thông tin hình thức đánh giá thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "Lỗi services getAll_hinhthucdanhgia",
      EC: -1,
      DT: [],
    };
  }
};

const create_hinhthucdanhgia = async (TENDANHGIA) => {
  try {
    let [results_timhinhthuc, fields_timhinhthuc] = await pool.execute(
      `SELECT * FROM hinhthucdanhgia where TENDANHGIA = ?`,
      [TENDANHGIA]
    );

    if (results_timhinhthuc.length > 0) {
      return {
        EM: "đã tồn tại trong csdl",
        EC: 0,
        DT: [],
      };
    }

    let [results1, fields1] = await pool.execute(
      `insert into hinhthucdanhgia (TENDANHGIA) values (?)`,
      [TENDANHGIA]
    );
    return {
      EM: "tạo thông tin hình thức đánh giá thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "Lỗi services create_hinhthucdanhgia",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = { getAll_hinhthucdanhgia, create_hinhthucdanhgia };
