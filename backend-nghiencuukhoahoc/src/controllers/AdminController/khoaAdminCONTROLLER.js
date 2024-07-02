const {
  createKhoa,
  selectKhoa,
  updateKhoa,
  deleteKhoa,
  selectOneKhoa,
} = require("../../services/AdminServices/CRUDKhoa");

const {
  selectOnlyBomon,
  selectBomon,
  createBomon,
  updateBomon,
  deleteBomon,
} = require("../../services/AdminServices/CRUDBomon");
//Controller for KHOA
const getAllKHOA = async (req, res) => {
  try {
    let results = await selectKhoa();

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

const getOneKHOA = async (req, res) => {
  try {
    const makhoa = req.body.MAKHOA;
    let results = await selectOneKhoa(makhoa);

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

const createKHOA = async (req, res) => {
  try {
    // const makhoa = req.body.makhoa;
    const tenkhoa = req.body.tenkhoa;
    let results = await createKhoa(tenkhoa);

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

const updateKHOA = async (req, res) => {
  try {
    const makhoa = req.params.makhoa;
    const tenkhoa = req.body.tenkhoa;
    let results = await updateKhoa(makhoa, tenkhoa);

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

const deleteKHOA = async (req, res) => {
  try {
    const makhoa = req.query.makhoa;

    let results = await deleteKhoa(makhoa);

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
//===========================================================================
//Controller for BOMON
const getAllBOMON = async (req, res) => {
  try {
    let results = await selectBomon();

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
const getOnlyBoMon = async (req, res) => {
  try {
    const MAKHOA = req.body.MAKHOA;
    let results = await selectOnlyBomon(MAKHOA);

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
const createBOMON = async (req, res) => {
  try {
    const makhoa = req.body.MAKHOA;
    const tenbomon = req.body.TENBOMON;
    console.log(makhoa);
    console.log(tenbomon);
    let results = await createBomon(makhoa, tenbomon);

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

const updateBOMON = async (req, res) => {
  try {
    const mabomon = req.params.mabomon;
    const makhoa = req.body.makhoa;
    const tenbomon = req.body.tenbomon;
    let results = await updateBomon(mabomon, makhoa, tenbomon);

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

const deleteBOMON = async (req, res) => {
  try {
    const mabomon = req.query.mabomon;
    console.log(mabomon);
    let results = await deleteBomon(mabomon);

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
  getAllKHOA,
  getOneKHOA,
  createKHOA,
  updateKHOA,
  deleteKHOA,
  getAllBOMON,
  createBOMON,
  updateBOMON,
  deleteBOMON,
  getOnlyBoMon,
};
