const {
  xem_giangvien,
  xem_giangvien_dachonkhung,
  xem_giangvien_chuachonkhung,
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
    // return res.status(200).json({
    //   EM: results.EM,
    //   EC: results.EC,
    //   DT: results.DT,
    // });
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
    // return res.status(200).json({
    //   EM: results.EM,
    //   EC: results.EC,
    //   DT: results.DT,
    // });
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
    // return res.status(200).json({
    //   EM: results.EM,
    //   EC: results.EC,
    //   DT: results.DT,
    // });
  }
};

module.exports = {
  get_giangvien_CNTT,
  get_giangvien_CNTT_da_chon_khung,
  get_giangvien_CNTT_chua_chon_khung,
};
