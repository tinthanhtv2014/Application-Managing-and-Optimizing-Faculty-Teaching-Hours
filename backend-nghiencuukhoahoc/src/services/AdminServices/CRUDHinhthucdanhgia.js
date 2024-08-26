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
    const results_data = await getAll_hinhthucdanhgia();
    return {
      EM: "tạo thông tin hình thức đánh giá thành công",
      EC: 1,
      DT: results_data.DT,
    };
  } catch (error) {
    console.log("check erorr", error);
    return {
      EM: "Lỗi services create_hinhthucdanhgia",
      EC: -1,
      DT: [],
    };
  }
};

const update_hinhthucdanhgia = async (MADANHGIAKETTHUC, TENDANHGIA) => {
  try {
    let [results_timhinhthuc, fields_timhinhthuc] = await pool.execute(
      `SELECT * FROM hinhthucdanhgia where MADANHGIAKETTHUC = ?`,
      [MADANHGIAKETTHUC]
    );

    if (results_timhinhthuc.length > 0) {
      let [results1, fields1] = await pool.execute(
        `   UPDATE hinhthucdanhgia
                  SET  TENDANHGIA = ?
                  WHERE MADANHGIAKETTHUC = ?`,
        [TENDANHGIA, MADANHGIAKETTHUC]
      );

      let [results_ketqua, fields_ketqua] = await pool.execute(
        `select * from hinhthucdanhgia where MADANHGIAKETTHUC = ?`,
        [MADANHGIAKETTHUC]
      );
      return {
        EM: "update thông tin hình thức đánh giá thành công",
        EC: 1,
        DT: results_ketqua,
      };
    }
    return {
      EM: "không tìm thấy hình thức đánh giá",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Lỗi services update_hinhthucdanhgia",
      EC: -1,
      DT: [],
    };
  }
};
const delete_hinhthucdanhgia = async (MADANHGIAKETTHUC) => {
  try {
    let [results1, fields1] = await pool.execute(
      `DELETE FROM hinhthucdanhgia WHERE MADANHGIAKETTHUC = ?;`,
      [MADANHGIAKETTHUC]
    );
    return {
      EM: " xóa hình thức đánh giá thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services delete_hinhthucdanhgia",
      EC: -1,
      DT: [],
    };
  }
};
module.exports = {
  getAll_hinhthucdanhgia,
  create_hinhthucdanhgia,
  update_hinhthucdanhgia,
  delete_hinhthucdanhgia,
};
