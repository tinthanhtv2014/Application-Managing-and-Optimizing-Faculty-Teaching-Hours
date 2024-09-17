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
      EM: "lỗi controller getAllChuongtrinhdaotao",
      EC: -1,
      DT: [],
    });
  }
};

const getOnlyChuongtrinhdaotao_withHOCKI = async (req, res) => {
  const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
  const SOTHUTUHOCKI = req.body.SOTHUTUHOCKI;
  try {
    if (!TENCHUONGTRINH) {
      return res.status(400).json({
        EM: " TENCHUONGTRINH  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
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
      EM: "lỗi controller getOnlyChuongtrinhdaotao_withHOCKI",
      EC: -1,
      DT: [],
    });
  }
};

const getOnlyChuongtrinhdaotao_SoHocKi = async (req, res) => {
  const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
  try {
    if (!TENCHUONGTRINH) {
      return res.status(400).json({
        EM: " TENCHUONGTRINH  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await selectTongSoHocKi(TENCHUONGTRINH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getOnlyChuongtrinhdaotao_SoHocKi",
      EC: -1,
      DT: [],
    });
  }
};
const getOnlyChuongtrinhdaotao = async (req, res) => {
  const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
  try {
    if (!TENCHUONGTRINH) {
      return res.status(400).json({
        EM: " TENCHUONGTRINH  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await selectOnlyChuongtrinhdaotao(TENCHUONGTRINH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getOnlyChuongtrinhdaotao",
      EC: -1,
      DT: [],
    });
  }
};

const createChuongtrinhdaotaoControler = async (req, res) => {
  try {
    let TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    let MABOMON = req.body.MABOMON;
    let SO_QUYET_DINH = req.body.SO_QUYET_DINH;
    let TRINH_DO = req.body.TRINH_DO;
    let TONG_SO_TIN_CHI = req.body.TONG_SO_TIN_CHI;
    let MO_TA_HOC_KY = req.body.MO_TA_HOC_KY;
    let GHI_CHUONG_TRINH = req.body.GHI_CHUONG_TRINH;

    if (!TENCHUONGTRINH || !MABOMON) {
      return res.status(400).json({
        EM: " TENCHUONGTRINH hoặc MABOMON bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await createChuongtrinhdaotao(
      MABOMON,
      TENCHUONGTRINH,
      SO_QUYET_DINH,
      TRINH_DO,
      TONG_SO_TIN_CHI,
      MO_TA_HOC_KY,
      GHI_CHUONG_TRINH
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createChuongtrinhdaotaoControler",
      EC: -1,
      DT: [],
    });
  }
};

const updateChuongtrinhdaotaoController = async (req, res) => {
  try {
    const MACHUONGTRINH = req.params.MACHUONGTRINH;
    const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    let MABOMON = req.body.MABOMON;
    let SO_QUYET_DINH = req.body.SO_QUYET_DINH;
    let TRINH_DO = req.body.TRINH_DO;
    let TONG_SO_TIN_CHI = req.body.TONG_SO_TIN_CHI;
    let MO_TA_HOC_KY = req.body.MO_TA_HOC_KY;
    let GHI_CHUONG_TRINH = req.body.GHI_CHUONG_TRINH;
    if (!MACHUONGTRINH) {
      return res.status(400).json({
        EM: " MACHUONGTRINH  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await updateChuongtrinhdaotao(
      MACHUONGTRINH,
      MABOMON,
      TENCHUONGTRINH,
      SO_QUYET_DINH,
      TRINH_DO,
      TONG_SO_TIN_CHI,
      MO_TA_HOC_KY,
      GHI_CHUONG_TRINH
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller updateChuongtrinhdaotaoController",
      EC: -1,
      DT: [],
    });
  }
};

const deleteChuongtrinhdaotaoController = async (req, res) => {
  try {
    let TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    if (!TENCHUONGTRINH) {
      return res.status(400).json({
        EM: " TENCHUONGTRINH  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
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
    if (
      !dataChuongtrinhdaotaoExcelArray.TENCHUONGTRINH ||
      !dataChuongtrinhdaotaoExcelArray.TENMONHOC ||
      !dataChuongtrinhdaotaoExcelArray.MABOMON
    ) {
      return res.status(400).json({
        EM: " TENCHUONGTRINH hoặc TENMONHOC hoặc MABOMON  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
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
    return res.status(404).json({
      EM: "lỗi controller createCHUONGTRINHDAOTAOExcelController",
      EC: -1,
      DT: [],
    });
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
