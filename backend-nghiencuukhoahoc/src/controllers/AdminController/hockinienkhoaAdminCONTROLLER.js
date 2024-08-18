const {
  selectAll_hockinienkhoa,
  create_hockinienkhoa,
} = require("../../services/AdminServices/CRUDHockinienkhoa");
const getAll_hockinienkhoa = async (req, res) => {
  try {
    let results = await selectAll_hockinienkhoa();

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

const tao_hockinienkhoa = async (req, res) => {
  try {
    const datahockinienkhoa = req.body;
    let results = await create_hockinienkhoa(datahockinienkhoa);

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
  getAll_hockinienkhoa,
  tao_hockinienkhoa,
};
