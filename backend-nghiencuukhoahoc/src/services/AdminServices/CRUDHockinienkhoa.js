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

module.exports = { selectAll_hockinienkhoa, create_hockinienkhoa };
