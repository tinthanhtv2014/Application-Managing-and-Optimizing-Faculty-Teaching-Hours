const {
  xem_giangvien,
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

module.exports = {
  get_giangvien_CNTT,
};
