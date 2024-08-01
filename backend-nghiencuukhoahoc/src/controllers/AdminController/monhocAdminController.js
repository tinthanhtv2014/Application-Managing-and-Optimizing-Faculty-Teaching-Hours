const {
  selectMonHoc,
  createMonHoc,
  updateMonHoc,
  deleteMonHoc,
} = require("../../services/AdminServices/CRUDMonHoc");

const getAllMONHOC = async (req, res) => {
  try {
    let results = await selectMonHoc();

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

const createMONHOC = async (req, res) => {
  try {
    const dataMonHoc = req.body;
    let results = await createMonHoc(dataMonHoc);

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

const updateMONHOC = async (req, res) => {
  try {
    const MAMONHOC = req.params.MAMONHOC;
    const dataMonHoc = req.body;
    let results = await updateMonHoc(MAMONHOC, dataMonHoc);

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

const deleteMONHOC = async (req, res) => {
  try {
    const TENMONHOC = req.query.TENMONHOC;

    let results = await deleteMonHoc(TENMONHOC);

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
  getAllMONHOC,
  createMONHOC,
  updateMONHOC,
  deleteMONHOC,
};
