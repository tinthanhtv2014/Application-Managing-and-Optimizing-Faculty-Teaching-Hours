const pool = require("../../config/database");
const {} = require("./helpers");

const selectAll_hockinienkhoa = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from hockynienkhoa`);
    return {
      EM: " xem thông tin học kì niên khóa thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectAll_hockinienkhoa",
      EC: -1,
      DT: [],
    };
  }
};

const create_hockinienkhoa = async (dataHockinienkhoa) => {
  try {
    let [results_kiemtra, fields_kiemtra] = await pool.execute(
      `select * from hockynienkhoa where TENHKNK = ?`,
      [dataHockinienkhoa.TENHKNK]
    );

    if (results_kiemtra.length > 0) {
      return {
        EM: "học kì niên khóa này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results1, fields1] = await pool.execute(
      `insert into hockynienkhoa (TENHKNK,NGAYBATDAUNIENKHOA,NGAYKETTHUCNIENKHOA) values (?,?,?)`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.NGAYBATDAUNIENKHOA,
        dataHockinienkhoa.NGAYKETTHUCNIENKHOA,
      ]
    );
    return {
      EM: " tạo học kì niên khóa thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectAll_hockinienkhoa",
      EC: -1,
      DT: [],
    };
  }
};

const update_hockinienkhoa = async (MAHKNK, dataHockinienkhoa) => {
  try {
    let [results_kiemtra, fields_kiemtra] = await pool.execute(
      `select * from hockynienkhoa where MAHKNK = ?`,
      [MAHKNK]
    );
    if (results_kiemtra.length > 0) {
      let [results1, fields1] = await pool.execute(
        `   UPDATE hockynienkhoa
              SET  TENHKNK = ?, NGAYBATDAUNIENKHOA = ?, NGAYKETTHUCNIENKHOA = ?
              WHERE MAHKNK = ?`,
        [
          dataHockinienkhoa.TENHKNK,
          dataHockinienkhoa.NGAYBATDAUNIENKHOA,
          dataHockinienkhoa.NGAYKETTHUCNIENKHOA,
          MAHKNK,
        ]
      );

      let [results_ketqua, fields_ketqua] = await pool.execute(
        `select * from hockynienkhoa where MAHKNK = ?`,
        [MAHKNK]
      );

      return {
        EM: " thay đổi thông tin hoc kì niên khóa thành công",
        EC: 1,
        DT: results_ketqua,
      };
    } else {
      let [results1, fields1] = await pool.execute(
        `insert into hockynienkhoa (TENHKNK,NGAYBATDAUNIENKHOA,NGAYKETTHUCNIENKHOA) values (?,?,?)`,
        [
          dataHockinienkhoa.TENHKNK,
          dataHockinienkhoa.NGAYBATDAUNIENKHOA,
          dataHockinienkhoa.NGAYKETTHUCNIENKHOA,
        ]
      );
      let [results_ketqua, fields_ketqua] = await pool.execute(
        `select * from hockynienkhoa where MAHKNK = ?`,
        [MAHKNK]
      );
      return {
        EM: " tạo học kì niên khóa thành công",
        EC: 1,
        DT: results_ketqua,
      };
    }
  } catch (error) {
    return {
      EM: "lỗi services update_hockinienkhoa",
      EC: -1,
      DT: [],
    };
  }
};

const delete_hockinienkhoa = async (MAHKNK) => {
  try {
    let [results1, fields1] = await pool.execute(
      `DELETE FROM hockynienkhoa WHERE MAHKNK = ?;`,
      [MAHKNK]
    );
    return {
      EM: " xóa học kỳ niên khóa thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services delete_hockinienkhoa",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectAll_hockinienkhoa,
  create_hockinienkhoa,
  update_hockinienkhoa,
  delete_hockinienkhoa,
};
