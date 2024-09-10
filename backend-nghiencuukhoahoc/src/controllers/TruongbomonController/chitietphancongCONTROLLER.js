const {
  createchitietphancong_excel,
  Dangky_chitietphancong,
  xem_chitietphancong_giangvien,
  xem_chitietphancong_lop,
} = require("../../services/TruongbomonServices/CRUDChitietphancong");

const selectChitietphancongController_giangvien = async (req, res) => {
  try {
    let results = await xem_chitietphancong_giangvien();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createChitietphancongExcelController",
      EC: -1,
      DT: [],
    });
  }
};

const selectChitietphancongController_lop = async (req, res) => {
  try {
    let results = await xem_chitietphancong_lop();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createChitietphancongExcelController",
      EC: -1,
      DT: [],
    });
  }
};

const createChitietphancongExcelController = async (req, res) => {
  try {
    const dataChitietphancongExcelArray = req.body;

    let results = await createchitietphancong_excel(
      dataChitietphancongExcelArray
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createChitietphancongExcelController",
      EC: -1,
      DT: [],
    });
  }
};

const Dangky_ChitietphancongExcelController = async (req, res) => {
  try {
    const dataChitietphancongExcelArray = req.body;

    let results = await Dangky_chitietphancong(dataChitietphancongExcelArray);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller createChitietphancongExcelController",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  createChitietphancongExcelController,
  Dangky_ChitietphancongExcelController,
  selectChitietphancongController_giangvien,
  selectChitietphancongController_lop,
};
