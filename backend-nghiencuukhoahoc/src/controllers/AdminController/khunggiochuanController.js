const {
  timKhungGioChuan_TENCHUCDANH,
  timAllTenKhung_TENCHUCDANH,
} = require("../../services/GiangvienServices/ServiceChonKhung");

const getKhungGioChuan_TENCHUCDANH = async (req, res) => {
  try {
    let TENCHUCDANH = req.params.TENCHUCDANH;
    let results = await timKhungGioChuan_TENCHUCDANH(TENCHUCDANH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi khi xử lý yêu cầu",
      EC: -1,
      DT: [],
    });
  }
};
const getAllTenKhung_TENCHUCDANH = async (req, res) => {
  try {
    let TENCHUCDANH = req.params.TENCHUCDANH;
    let results = await timAllTenKhung_TENCHUCDANH(TENCHUCDANH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi khi xử lý yêu cầu",
      EC: -1,
      DT: [],
    });
  }
};
module.exports = {
  getKhungGioChuan_TENCHUCDANH,
  getAllTenKhung_TENCHUCDANH,
};
