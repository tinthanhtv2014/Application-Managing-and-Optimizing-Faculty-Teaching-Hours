const {
  getAll_hinhthucdanhgia,
  create_hinhthucdanhgia,
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
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const insert_hinhthucdanhgia = async (req, res) => {
  try {
    let TENDANHGIA = req.body.TENDANHGIA;
    let results = await create_hinhthucdanhgia(TENDANHGIA);

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

module.exports = { selectAll_hinhthucdanhgia, insert_hinhthucdanhgia };
