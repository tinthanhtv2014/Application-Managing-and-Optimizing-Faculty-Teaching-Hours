const {
  xem_giangvien,
  xem_giangvien_dachonkhung,
  xem_giangvien_chuachonkhung,
  xem_giangvien_MonHoc_daChonkhung,
} = require("../../services/TruongbomonServices/CRUDgiangvienbomon");

const get_giangvien_CNTT = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let TENBOMON = req.query.TENBOMON;
    let results = await xem_giangvien(page, limit, TENBOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi get_giangvien_CNTT",
      EC: -1,
      DT: [],
    });
  }
};

const get_giangvien_CNTT_da_chon_khung = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let TENBOMON = req.query.TENBOMON;
    let results = await xem_giangvien_dachonkhung(page, limit, TENBOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi get_giangvien_CNTT_da_chon_khung",
      EC: -1,
      DT: [],
    });
  }
};

const get_giangvien_CNTT_chua_chon_khung = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let TENBOMON = req.query.TENBOMON;
    let results = await xem_giangvien_chuachonkhung(page, limit, TENBOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi get_giangvien_CNTT_chua_chon_khung",
      EC: -1,
      DT: [],
    });
  }
};

//phúc note
const get_giangvien_MonHoc_daChonKhung = async (req, res) => {
  try {
    const MAMONHOC = req.body.MAMONHOC;

    let results = await xem_giangvien_MonHoc_daChonkhung(MAMONHOC);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi get_giangvien_CNTT_chua_chon_khung",
      EC: -1,
      DT: [],
    });
  }
};
module.exports = {
  get_giangvien_CNTT,
  get_giangvien_CNTT_da_chon_khung,
  get_giangvien_CNTT_chua_chon_khung,
  get_giangvien_MonHoc_daChonKhung,
};
