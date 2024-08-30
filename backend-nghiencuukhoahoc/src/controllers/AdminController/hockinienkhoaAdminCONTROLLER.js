const {
  selectAll_hockinienkhoa,
  create_hockinienkhoa,
  update_hockinienkhoa,
  delete_hockinienkhoa,
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
    return res.status(404).json({
      EM: "lỗi controller getAll_hockinienkhoa",
      EC: -1,
      DT: [],
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
    return res.status(404).json({
      EM: "lỗi controller tao_hockinienkhoa",
      EC: -1,
      DT: [],
    });
  }
};

const sua_hockinienkhoa = async (req, res) => {
  try {
    const datahockinienkhoa = req.body;
    const MAHKNK = req.params.MAHKNK;
    let results = await update_hockinienkhoa(MAHKNK, datahockinienkhoa);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller sua_hockinienkhoa",
      EC: -1,
      DT: [],
    });
  }
};

const xoa_hockinienkhoa = async (req, res) => {
  try {
    const MAHKNK = req.body.MAHKNK;
    let results = await delete_hockinienkhoa(MAHKNK);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller xoa_hockinienkhoa",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  getAll_hockinienkhoa,
  tao_hockinienkhoa,
  sua_hockinienkhoa,
  xoa_hockinienkhoa,
};
