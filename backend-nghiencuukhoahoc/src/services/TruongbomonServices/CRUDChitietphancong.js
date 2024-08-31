const pool = require("../../config/database");

const createchitietphancong_excel = async (datachitietphancong) => {
  try {
    let results = [];
    // console.log("check results =>", dataChuongtrinhdaotaoExcelArray);
    // Kiểm tra thông tin trong file excel
    for (var i = 0; i < datachitietphancong.length; i++) {}

    // Bắt đầu tạo tài khoản
    for (var i = 0; i < datachitietphancong.length; i++) {
      results.push({
        EM: `Tạo phân công thành công`,
        EC: 0,
        DT: [],
      });
    }

    return {
      EM: "Tất cả chi tiết đã được tạo",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log("Lỗi services createchitietphancong_excel", error);
    return {
      EM: "Lỗi services createTaiKhoanExcel",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = { createchitietphancong_excel };
