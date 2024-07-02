const {
  selectChucdanh,
  createChucdanh,
  updateChucdanh,
  xoaChucdanh,
} = require("../../services/AdminServices/CRUDChucdanh");

const getAllChucdanh = async (req, res) => {
  try {
    let results = await selectChucdanh();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const createChucdanhControler = async (req, res) => {
  try {
    let TENCHUCDANH = req.body.TENCHUCDANH;
    let results = await createChucdanh(TENCHUCDANH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const updateChucdanhController = async (req, res) => {
  try {
    const MACHUCDANH = req.params.MACHUCDANH;
    const TENCHUCDANH = req.body.TENCHUCDANH;
    let results = await updateChucdanh(MACHUCDANH, TENCHUCDANH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const deleteChucdanhController = async (req, res) => {
  try {
    let MACHUCDANH = req.query.MACHUCDANH;
    let results = await xoaChucdanh(MACHUCDANH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

module.exports = {
  getAllChucdanh,
  createChucdanhControler,
  updateChucdanhController,
  deleteChucdanhController,
};
