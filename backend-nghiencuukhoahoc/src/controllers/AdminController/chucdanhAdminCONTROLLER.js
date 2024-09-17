const {
  selectChucdanh,
  createChucdanh,
  updateChucdanh,
  xoaChucdanh,
} = require("../../services/AdminServices/CRUDChucdanh");

const getAllChucdanh = async (req, res) => {
  try {
    let results = await selectChucdanh();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getAllChucdanh",
      EC: -1,
      DT: [],
    });
  }
};

const createChucdanhControler = async (req, res) => {
  try {
    let TENCHUCDANH = req.body.TENCHUCDANH;
    if (!TENCHUCDANH) {
      return res.status(400).json({
        EM: " tên chức danh  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await createChucdanh(TENCHUCDANH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createChucdanhControler",
      EC: -1,
      DT: [],
    });
  }
};

const updateChucdanhController = async (req, res) => {
  try {
    const MACHUCDANH = req.params.MACHUCDANH;
    const TENCHUCDANH = req.body.TENCHUCDANH;
    if (!MACHUCDANH) {
      return res.status(400).json({
        EM: " MACHUCDANH  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await updateChucdanh(MACHUCDANH, TENCHUCDANH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller updateChucdanhController",
      EC: -1,
      DT: [],
    });
  }
};

const deleteChucdanhController = async (req, res) => {
  try {
    let MACHUCDANH = req.query.MACHUCDANH;
    if (!MACHUCDANH) {
      return res.status(400).json({
        EM: " MACHUCDANH  bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    let results = await xoaChucdanh(MACHUCDANH);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller deleteChucdanhController",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  getAllChucdanh,
  createChucdanhControler,
  updateChucdanhController,
  deleteChucdanhController,
};
