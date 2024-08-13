const {
  get_thongtin_danhmuc,
  getLoaiTacGiaByLoaiDanhMuc,
  get_thongtin_dangky_giangvien,
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
    //Tặng ông nếu ông có xài

    // const soTacGiaThuNhat = vaiTro.filter(
    //   (role) => role === "Tác giả thứ nhất"
    // ).length; // Đếm số tác giả thứ nhất
    // const soTacGiaChiuTrachNhiem = vaiTro.filter(
    //   (role) => role === "Tác giả chịu trách nhiệm"
    // ).length; // Đếm số tác giả chịu trách nhiệm
    // const soTacGiaKhac =
    //   vaiTro.length - soTacGiaThuNhat - soTacGiaChiuTrachNhiem; // Số tác giả khác

    // const tacGiaThuNhat = tacGiaList.find(
    //   (tacGia) => tacGia.loai === "Tác giả thứ nhất"
    // ); // Tìm tác giả thứ nhất

    console.log("req.body dangky_danhmuc_Controller: ", req.body);
    let results = {
      EM: "ok",
      EC: 1,
      DT: "ok",
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
  select_thongtin_dangkydanhmuc_giangvien,
};
