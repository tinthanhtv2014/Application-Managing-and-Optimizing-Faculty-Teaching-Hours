const {
  selectLop,
  CreateLop,
} = require("../../services/AdminServices/CRUDLop");

const getAllLop = async (req, res) => {
  try {
    let results = await selectLop(selectLop);

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

const creatNEWLop = async (req, res) => {
  try {
    const datalop = req.body;
    const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    console.log(TENCHUONGTRINH);
    let results = await CreateLop(TENCHUONGTRINH, datalop);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller creatNEWLop",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = { getAllLop, creatNEWLop };
