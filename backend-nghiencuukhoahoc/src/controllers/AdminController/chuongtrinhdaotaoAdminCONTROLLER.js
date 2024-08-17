const {
  selectChuongtrinhdaotao,
  selectOnlyChuongtrinhdaotao,
  selectChuongtrinhdaotao_TENCHUONGTRINH,
  createChuongtrinhdaotao,
  updateChuongtrinhdaotao,
  xoaChuongtrinh,
  createChuongtrinhdaotaoExcel,
  selectOnlyChuongtrinhdaotao_withHOCKI,
  selectTongSoHocKi,
} = require("../../services/AdminServices/CRUDChuongtrinhdaotao");

const getAllChuongtrinhdaotao = async (req, res) => {
  try {
    let results = await selectChuongtrinhdaotao();

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

const getOnlyChuongtrinhdaotao_withHOCKI = async (req, res) => {
  const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
  const SOTHUTUHOCKI = req.body.SOTHUTUHOCKI;
  try {
    let results = await selectOnlyChuongtrinhdaotao_withHOCKI(
      TENCHUONGTRINH,
      SOTHUTUHOCKI
    );

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

const getOnlyChuongtrinhdaotao_SoHocKi = async (req, res) => {
  const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
  try {
    let results = await selectTongSoHocKi(TENCHUONGTRINH);

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
const getOnlyChuongtrinhdaotao = async (req, res) => {
  const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
  try {
    let results = await selectOnlyChuongtrinhdaotao(TENCHUONGTRINH);

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

const createChuongtrinhdaotaoControler = async (req, res) => {
  try {
    let TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    let MABOMON = req.body.MABOMON;
    let results = await createChuongtrinhdaotao(MABOMON, TENCHUONGTRINH);

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

const updateChuongtrinhdaotaoController = async (req, res) => {
  try {
    const MACHUONGTRINH = req.params.MACHUONGTRINH;
    const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    let MABOMON = req.body.MABOMON;
    let results = await updateChuongtrinhdaotao(
      MACHUONGTRINH,
      MABOMON,
      TENCHUONGTRINH
    );

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

const deleteChuongtrinhdaotaoController = async (req, res) => {
  try {
    let TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    let results = await xoaChuongtrinh(TENCHUONGTRINH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "có lỗi ở deleteChuongtrinhdaotaoController",
      EC: -1,
      DT: [],
    });
  }
};

const createCHUONGTRINHDAOTAOExcelController = async (req, res) => {
  try {
    const dataChuongtrinhdaotaoExcelArray = req.body;

    let results = await createChuongtrinhdaotaoExcel(
      dataChuongtrinhdaotaoExcelArray
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllChuongtrinhdaotao,
  createChuongtrinhdaotaoControler,
  updateChuongtrinhdaotaoController,
  deleteChuongtrinhdaotaoController,
  createCHUONGTRINHDAOTAOExcelController,
  getOnlyChuongtrinhdaotao,
  getOnlyChuongtrinhdaotao_withHOCKI,
  getOnlyChuongtrinhdaotao_SoHocKi,
};
