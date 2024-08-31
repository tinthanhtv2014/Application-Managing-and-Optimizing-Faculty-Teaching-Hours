const pool = require("../../config/database");

const createchitietphancong_excel = async (datachitietphancong) => {
  try {
    return {
      EM: "Xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services createchitietphancong_excel",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = { createchitietphancong_excel };
