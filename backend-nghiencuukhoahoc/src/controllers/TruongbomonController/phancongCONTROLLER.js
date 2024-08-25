const {
  select_giangvien_chuachonkhung,
  select_giangvien_dachonkhung,
} = require("../../services/TruongbomonServices/CRUDphancong");
const get_giangvien_CNTT_chuachonkhung = async (req, res) => {
  try {
    let results = await select_giangvien_chuachonkhung();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi get_giangvien_CNTT_chuachonkhung",
      EC: -1,
      DT: [],
    });
  }
};

const get_giangvien_CNTT_dachonkhung = async (req, res) => {
  try {
    let results = await select_giangvien_dachonkhung();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi get_giangvien_CNTT_chuachonkhung",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  get_giangvien_CNTT_chuachonkhung,
  get_giangvien_CNTT_dachonkhung,
};
