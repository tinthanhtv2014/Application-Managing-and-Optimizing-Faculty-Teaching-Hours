const {
  Sevicel_LoaiDanhMuc_Excel,
  Sevicel_DanhMuc_Excel,
  Sevicel_TyLe_Excel,
  Sevicel_CoTyLe_Excel,

  Sevicel_PhanCong_Test,
  Sevicel_AutoPhanCong_Test,
} = require("../../services/TruongkhoaServices/test/test");

const {
  Sevicel_DongBoNamHoc_HocKy,
  Sevicel_Training_RandomForest_Python
} = require("../../services/TruongkhoaServices/test/test2");

const LoaiDanhMucExcelController = async (req, res) => {
  try {
    let data = req.body;
    // console.log("data: ", data)
    let results = await Sevicel_LoaiDanhMuc_Excel(data);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi LoaiDanhMucExcelController",
      EC: -1,
      DT: [],
    });
  }
};

const DanhMucExcelController = async (req, res) => {
  try {
    let dataDanhMuc = req.body;
    // console.log("dataDanhMuc: ", dataDanhMuc)
    let results = await Sevicel_DanhMuc_Excel(dataDanhMuc);
    // let results = {
    //     EM: "Thêm danh mục quy đổi mới thành công",
    //     EC: 1,
    //     DT: 'ok',
    // }
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi DanhMucExcelController",
      EC: -1,
      DT: [],
    });
  }
};

const TyLeExcelController = async (req, res) => {
  try {
    let dataTyLe = req.body;
    // console.log("dataTyLe: ", dataTyLe)
    let results = await Sevicel_TyLe_Excel(dataTyLe);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi TyLeExcelController",
      EC: -1,
      DT: [],
    });
  }
};

const CoTyLeExcelController = async (req, res) => {
  try {
    let dataCoTyLe = req.body;
    // console.log("dataCoTyLe: ", dataCoTyLe)
    let results = await Sevicel_CoTyLe_Excel(dataCoTyLe);
    // let results = {
    //     EM: "Thêm danh mục quy đổi mới thành công",
    //     EC: 1,
    //     DT: 'ok',
    // }
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi CoTyLeExcelController",
      EC: -1,
      DT: [],
    });
  }
};

const PhanCongControllerTest = async (req, res) => {
  try {
    let data = req.body;
    let HOCKINIENKHOA = req.body.HOCKINIENKHOA;
    // console.log("data", data);
    // console.log("HOCKINIENKHOA", HOCKINIENKHOA);

    let results = await Sevicel_AutoPhanCong_Test(data);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi LoaiDanhMucExcelController",
      EC: -1,
      DT: [],
    });
  }
};

const Training_RandomForestControllerTest = async (req, res) => {
  try {
    // console.log("Chạy Training_RandomForestControllerTest")
    let data = req.body;
    let HOCKINIENKHOA = req.body.HOCKINIENKHOA;
    let results = await Sevicel_Training_RandomForest_Python(data, HOCKINIENKHOA);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "lỗi LoaiDanhMucExcelController",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  LoaiDanhMucExcelController,
  DanhMucExcelController,
  TyLeExcelController,
  CoTyLeExcelController,

  PhanCongControllerTest,

  Training_RandomForestControllerTest,
};
