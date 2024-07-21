const {
  xem_giangvien,
} = require("../../services/TruongbomonServices/CRUDgiangvienbomon");

const get_giangvien_CNTT = async (req, res) => {
  try {
    let results = await xem_giangvien();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

module.exports = {
  get_giangvien_CNTT,
};
