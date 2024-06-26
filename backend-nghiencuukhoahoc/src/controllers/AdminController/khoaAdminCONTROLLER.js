const {
  createKhoa,
  selectKhoa,
  updateKhoa,
  deleteKhoa,
} = require("../../services/AdminServices/CRUDKhoa");

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

const createKHOA = async (req, res) => {
  try {
    const makhoa = req.body.makhoa;
    const tenkhoa = req.body.tenkhoa;
    let results = await createKhoa(makhoa, tenkhoa);

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

module.exports = {
  getAllKHOA,
  createKHOA,
  updateKHOA,
  deleteKHOA,
};
