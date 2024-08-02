const {
  selectOnlyChuongtrinhdaotao,
  selectChuongtrinhdaotao_tenbomon,
} = require("../../services/TruongbomonServices/CRUDchuongtrinhdaotao");

const get_chuongtrinhdaotao_tenbomon = async (req, res) => {
  try {
    let TENBOMON = req.query.TENBOMON;
    let results = await selectChuongtrinhdaotao_tenbomon(TENBOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    // return res.status(200).json({
    //   EM: results.EM,
    //   EC: results.EC,
    //   DT: results.DT,
    // });
  }
};

const get_chuongtrinhdaotao = async (req, res) => {
  try {
    let TENCHUONGTRINH = req.query.TENCHUONGTRINH;
    let results = await selectOnlyChuongtrinhdaotao(TENCHUONGTRINH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    // return res.status(200).json({
    //   EM: results.EM,
    //   EC: results.EC,
    //   DT: results.DT,
    // });
  }
};

module.exports = {
  get_chuongtrinhdaotao_tenbomon,
  get_chuongtrinhdaotao,
};
