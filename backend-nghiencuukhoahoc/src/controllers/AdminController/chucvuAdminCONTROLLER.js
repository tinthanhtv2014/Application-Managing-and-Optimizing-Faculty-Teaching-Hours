const {
  selectChucVu,
  createChucVu,
  updateChucVu,
  xoaChucVu,
} = require("../../services/AdminServices/CRUDChucVu");

const getAllChucvu = async (req, res) => {
  try {
    let results = await selectChucVu();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getAllChucvu",
      EC: -1,
      DT: [],
    });
  }
};

const createChucVuControler = async (req, res) => {
  try {
    let TENCHUCVU = req.body.TENCHUCVU;
    let results = await createChucVu(TENCHUCVU);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createChucVuControler",
      EC: -1,
      DT: [],
    });
  }
};

const updateChucVuController = async (req, res) => {
  try {
    const MACHUCVU = req.params.MACHUCVU;
    const TENCHUCVU = req.body.TENCHUCVU;
    let results = await updateChucVu(MACHUCVU, TENCHUCVU);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller updateChucVuController",
      EC: -1,
      DT: [],
    });
  }
};

const deleteChucVuController = async (req, res) => {
  try {
    let MACHUCVU = req.query.MACHUCVU;
    let results = await xoaChucVu(MACHUCVU);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller deleteChucVuController",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  getAllChucvu,
  createChucVuControler,
  updateChucVuController,
  deleteChucVuController,
};
