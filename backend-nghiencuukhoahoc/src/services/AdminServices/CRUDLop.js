const pool = require("../../config/database");
const { timchuongtrinh_TENCHUONGTRINH, timlop_MALOP } = require("./helpers");
const selectLop = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from lop`);
    return {
      EM: " xem thông tin lớp thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectMonHoc",
      EC: -1,
      DT: [],
    };
  }
};

const CreateLop = async (TENCHUONGTRINH, datalop) => {
  //   try {
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
  //   } catch (error) {
  //     return {
  //       EM: "lỗi services selectMonHoc",
  //       EC: -1,
  //       DT: [],
  //     };
  //   }
};

module.exports = {
  selectLop,
  CreateLop,
};
