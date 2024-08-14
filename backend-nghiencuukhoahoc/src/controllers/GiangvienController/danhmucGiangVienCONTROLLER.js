const {
  get_thongtin_danhmuc,
  getLoaiTacGiaByLoaiDanhMuc,
  get_thongtin_dangky_giangvien,
  dangky_danhmuc_giangvien,
} = require("../../services/GiangvienServices/danhmucGiangvienServices");

const select_thongtin_danhmuc = async (req, res) => {
  try {
    const TENDANGNHAP = req.body.TENDANGNHAP;
    const TENNAMHOC = req.body.TENNAMHOC;
    // console.log("TENNAMHOC", TENNAMHOC);
    // console.log("TENDANGNHAP", TENDANGNHAP);
    let results = await get_thongtin_danhmuc(TENDANGNHAP, TENNAMHOC);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi máy chủ",
      EC: 500,
      DT: null,
    });
  }
};

const select_loaitacgia_loaidanhmuc = async (req, res) => {
  try {
    const MA_LOAI_DANH_MUC = req.body.MA_LOAI_DANH_MUC;
    // console.log("req.body: ", req.body)
    // console.log("TEN_LOAI_DANH_MUC: ", TEN_LOAI_DANH_MUC)
    let results = await getLoaiTacGiaByLoaiDanhMuc(MA_LOAI_DANH_MUC);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi máy chủ",
      EC: 500,
      DT: null,
    });
  }
};

const dangky_danhmuc_Controller = async (req, res) => {
  try {
    // console.log("req.body dangky_danhmuc_Controller: ", req.body);
    let dataDangKyDanhMuc = req.body;
    // console.log("dataDangKyDanhMuc: ", dataDangKyDanhMuc);
    let results = await dangky_danhmuc_giangvien(dataDangKyDanhMuc);
    // let results = {
    //   EM: "ok",
    //   EC: 1,
    //   DT: "ok",
    // };
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi máy chủ",
      EC: 500,
      DT: null,
    });
  }
};

const luu_data_dangky_danhmuc_Controller = async (req, res) => {
  try {
    console.log("req.body: ", req.body)

    let results = {
      EM: 'ok',
      EC: 1,
      DT: 'ok',
    };
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi máy chủ",
      EC: 500,
      DT: null,
    });
  }
};

const select_thongtin_dangkydanhmuc_giangvien = async (req, res) => {
  try {
    const MAGV = req.body.MAGV;
    const TENNAMHOC = req.body.TENNAMHOC;
    console.log("MAGV", MAGV);
    let results = await get_thongtin_dangky_giangvien(MAGV, TENNAMHOC);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi máy chủ",
      EC: 500,
      DT: null,
    });
  }
};

module.exports = {
  select_thongtin_danhmuc,
  select_loaitacgia_loaidanhmuc,
  dangky_danhmuc_Controller,
  luu_data_dangky_danhmuc_Controller,
  select_thongtin_dangkydanhmuc_giangvien,
};
