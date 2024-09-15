const {
  selectOnlyChuongtrinhdaotao,
  selectChuongtrinhdaotao_tenbomon,
  selectOnlyChuongtrinhdaotao_withHOCKI,
} = require("../../services/TruongbomonServices/CRUDchuongtrinhdaotao");

const get_chuongtrinhdaotao_tenbomon = async (req, res) => {
  try {
    let TENBOMON = req.body.TENBOMON;
    // Kiểm tra dữ liệu đầu vào
    if (!TENBOMON) {
      return res.status(400).json({
        EM: "Tên bộ môn không được bỏ trống",
        EC: 400,
        DT: null,
      });
    }
    let results = await selectChuongtrinhdaotao_tenbomon(TENBOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller get_chuongtrinhdaotao_tenbomon",
      EC: -1,
      DT: [],
    });
  }
};

const get_chuongtrinhdaotao = async (req, res) => {
  try {
    let TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    if (!TENCHUONGTRINH) {
      return res.status(400).json({
        EM: "Tên chương trình không được bỏ trống",
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
      EM: "lỗi controller get_chuongtrinhdaotao",
      EC: -1,
      DT: [],
    });
  }
};

const getOnlyChuongtrinhdaotao_withHOCKI = async (req, res) => {
  try {
    const TENCHUONGTRINH = req.body.TENCHUONGTRINH;
    const SOTHUTUHOCKI = req.body.SOTHUTUHOCKI;
    if (!TENCHUONGTRINH || !SOTHUTUHOCKI) {
      return res.status(400).json({
        EM: "Tên chương trình và số thứ tự học kỳ không được bỏ trống",
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

module.exports = {
  get_chuongtrinhdaotao_tenbomon,
  get_chuongtrinhdaotao,
  getOnlyChuongtrinhdaotao_withHOCKI,
};
