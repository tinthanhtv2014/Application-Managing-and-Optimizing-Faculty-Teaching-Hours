const {
  select_giangvien_chuachonkhung,
  select_giangvien_dachonkhung,
  select_lophoc_monhoc,
  select_giangvien_dachonkhung_chitiet,
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

const get_giangvien_CNTT_dachonkhung_chitietonly = async (req, res) => {
  try {
    const MAGV = req.body.MAGV;
    const TENNAMHOC = req.body.TENNAMHOC;
    let results = await select_giangvien_dachonkhung_chitiet(TENNAMHOC, MAGV);

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

const get_monhoc_lop_hocki = async (req, res) => {
  try {
    const MALOP = req.body.MALOP;
    const SOHOCKI = req.body.SOHOCKI;
    let results = await select_lophoc_monhoc(MALOP, SOHOCKI);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi get_monhoc_lop_hocki",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  get_giangvien_CNTT_chuachonkhung,
  get_giangvien_CNTT_dachonkhung,
  get_monhoc_lop_hocki,
  get_giangvien_CNTT_dachonkhung_chitietonly,
};
