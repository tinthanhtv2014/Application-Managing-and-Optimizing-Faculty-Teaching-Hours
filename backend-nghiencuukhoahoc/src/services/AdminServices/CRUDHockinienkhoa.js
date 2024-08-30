const pool = require("../../config/database");
const {} = require("./helpers");
const moment = require("moment");
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
  console.log("datahockinienkhoa", dataHockinienkhoa.TENHKNK);
  try {
    let [results_kiemtra, fields_kiemtra] = await pool.execute(
      `select * from hockynienkhoa where TEN_NAM_HOC = ?`,
      [dataHockinienkhoa.TEN_NAM_HOC]
    );

    if (results_kiemtra.length >= 2) {
      return {
        EM: "Học kì niên khóa này đã tồn tại (đã đủ 2 học kỳ trong năm học này)",
        EC: 0,
        DT: [],
      };
    }
    // Kiểm tra xem học kỳ hiện tại đã tồn tại trong năm học chưa
    let hocKyTonTai = results_kiemtra.some(
      (item) => item.TENHKNK === dataHockinienkhoa.TENHKNK
    );

    if (hocKyTonTai) {
      return {
        EM: "Học kì niên khóa này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }
    // Chuyển đổi định dạng NGAYBATDAUNIENKHOA
    const ngayBatDauNienKhoa = moment(
      dataHockinienkhoa.NGAYBATDAUNIENKHOA
    ).format("YYYY-MM-DD");

    let [results_hockinienkhoa, fields_hockinienkhoa] = await pool.execute(
      `insert into hockynienkhoa (TENHKNK,TEN_NAM_HOC,NGAYBATDAUNIENKHOA) values (?,?,?)`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.TEN_NAM_HOC,
        ngayBatDauNienKhoa, // Sử dụng giá trị đã chuyển đổi
      ]
    );
    let [results_namhoc, fields_namhoc] = await pool.execute(
      `insert into namhoc (TENNAMHOC) values (?)`,
      [dataHockinienkhoa.TEN_NAM_HOC]
    );
    const results_data = await selectAll_hockinienkhoa();
    return {
      EM: " tạo học kì niên khóa thành công",
      EC: 1,
      DT: results_data.DT,
    };
  } catch (error) {
    console.log("error", error);
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
    const results_data = await selectAll_hockinienkhoa();
    return {
      EM: " xóa học kỳ niên khóa thành công",
      EC: 1,
      DT: results_data.DT,
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
