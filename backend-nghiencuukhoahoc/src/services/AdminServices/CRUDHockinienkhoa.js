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

    let [results_hockinienkhoa, fields_hockinienkhoa] = await pool.execute(
      `insert into hockynienkhoa (TENHKNK,TEN_NAM_HOC,NGAYBATDAUNIENKHOA) values (?,?,?)`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.TEN_NAM_HOC,
        dataHockinienkhoa.NGAYBATDAUNIENKHOA,
      ]
    );
    let [results_namhoc, fields_namhoc] = await pool.execute(
      `insert into namhoc (TENNAMHOC) values (?)`,
      [dataHockinienkhoa.TEN_NAM_HOC]
    );

    return {
      EM: " tạo học kì niên khóa thành công",
      EC: 1,
      DT: results_hockinienkhoa,
    };
  } catch (error) {
    return {
      EM: "lỗi services create_hockinienkhoa",
      EC: -1,
      DT: [],
    };
  }
};

const update_hockinienkhoa = async (MAHKNK, dataHockinienkhoa) => {
  // try {
  let [results_kiemtra_hockinienkhoa, fields_kiemtra] = await pool.execute(
    `select * from hockynienkhoa where MAHKNK = ?`,
    [MAHKNK]
  );

  if (results_kiemtra_hockinienkhoa.length > 0) {
    let [results1, fields1] = await pool.execute(
      `   UPDATE hockynienkhoa
              SET  TENHKNK = ?, TEN_NAM_HOC = ?, NGAYBATDAUNIENKHOA = ?
              WHERE MAHKNK = ?`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.TEN_NAM_HOC,
        dataHockinienkhoa.NGAYBATDAUNIENKHOA,
        MAHKNK,
      ]
    );

    let [results_kiemtra_namhoc, fields_kiemtra] = await pool.execute(
      `select * from namhoc where TENNAMHOC = ?`,
      [results_kiemtra_hockinienkhoa[0].TEN_NAM_HOC]
    );

    let [results_namhoc, fields_namhoc] = await pool.execute(
      `   UPDATE namhoc SET  TENNAMHOC = ? WHERE MANAMHOC = ?`,
      [dataHockinienkhoa.TEN_NAM_HOC, results_kiemtra_namhoc[0].MANAMHOC]
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
    let [results_hockinienkhoa, fields_hockinienkhoa] = await pool.execute(
      `insert into hockynienkhoa (TENHKNK,TEN_NAM_HOC,NGAYBATDAUNIENKHOA) values (?,?,?)`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.TEN_NAM_HOC,
        dataHockinienkhoa.NGAYBATDAUNIENKHOA,
      ]
    );

    let [results_namhoc, fields_namhoc] = await pool.execute(
      `insert into namhoc (TENNAMHOC) values (?)`,
      [dataHockinienkhoa.TEN_NAM_HOC]
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
  // } catch (error) {
  //   return {
  //     EM: "lỗi services update_hockinienkhoa",
  //     EC: -1,
  //     DT: [],
  //   };
  // }
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
