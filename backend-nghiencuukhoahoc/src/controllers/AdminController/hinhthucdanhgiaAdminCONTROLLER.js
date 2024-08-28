const {
  getAll_hinhthucdanhgia,
  create_hinhthucdanhgia,
  update_hinhthucdanhgia,
  delete_hinhthucdanhgia,
} = require("../../services/AdminServices/CRUDHinhthucdanhgia");

const selectAll_hinhthucdanhgia = async (req, res) => {
  try {
    let results = await getAll_hinhthucdanhgia();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller selectAll_hinhthucdanhgia",
      EC: -1,
      DT: [],
    });
  }
};

const insert_hinhthucdanhgia = async (req, res) => {
  try {
    let TENDANHGIA = req.body.TENDANHGIA;
    console.log("check ", TENDANHGIA);
    let results = await create_hinhthucdanhgia(TENDANHGIA);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller insert_hinhthucdanhgia",
      EC: -1,
      DT: [],
    });
  }
};

const sua_hinhthucdanhgia = async (req, res) => {
  try {
    let MADANHGIAKETTHUC = req.params.MADANHGIAKETTHUC;
    let TENDANHGIA = req.body.TENDANHGIA;
    let results = await update_hinhthucdanhgia(MADANHGIAKETTHUC, TENDANHGIA);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller sua_hinhthucdanhgia",
      EC: -1,
      DT: [],
    });
  }
};

const xoa_hinhthucdanhgia = async (req, res) => {
  try {
    let MADANHGIAKETTHUC = req.query.MADANHGIAKETTHUC;
    let results = await delete_hinhthucdanhgia(MADANHGIAKETTHUC);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller xoa_hinhthucdanhgia",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  selectAll_hinhthucdanhgia,
  insert_hinhthucdanhgia,
  sua_hinhthucdanhgia,
  xoa_hinhthucdanhgia,
};
