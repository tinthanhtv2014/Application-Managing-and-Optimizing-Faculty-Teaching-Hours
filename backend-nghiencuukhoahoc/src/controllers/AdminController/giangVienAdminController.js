const {
  selectGiangVien,
  createGiangVien,
  updateGiangVien,
  deleteGiangVien,
  selectOnlyGiangVien,
} = require("../../services/AdminServices/CRUDGiangvien");

const getAllGiangVien = async (req, res) => {
  try {
    let results = await selectGiangVien();

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
const getOnlyGiangVienbyBoMon = async (req, res) => {
  try {
    const MABOMON = req.params.MABOMON;
    console.log(MABOMON);
    let results = await selectOnlyGiangVien(MABOMON);

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

const createGiangVienControler = async (req, res) => {
  try {
    let dataGiangVien = req.body;
    let results = await createGiangVien(dataGiangVien);

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

const updateGiangVienController = async (req, res) => {
  try {
    let dataGiangVien = req.body;
    let results = await updateGiangVien(dataGiangVien);

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

const deleteGiangVienController = async (req, res) => {
  try {
    let dataGiangVien = req.body;
    let results = await deleteGiangVien(dataGiangVien);

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
  getAllGiangVien,
  createGiangVienControler,
  updateGiangVienController,
  deleteGiangVienController,
  getOnlyGiangVienbyBoMon,
};
