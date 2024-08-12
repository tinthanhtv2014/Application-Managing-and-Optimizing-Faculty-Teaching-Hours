const {
  get_thongtin_danhmuc,
  getLoaiTacGiaByLoaiDanhMuc,
} = require("../../services/GiangvienServices/danhmucGiangvienServices");

const select_thongtin_danhmuc = async (req, res) => {
  try {
    const TENDANGNHAP = req.body.TENDANGNHAP;
    const TENNAMHOC = req.body.TENNAMHOC;
    console.log("TENNAMHOC", TENNAMHOC);
    console.log("TENDANGNHAP", TENDANGNHAP);
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
    const TEN_LOAI_DANH_MUC = req.body.TEN_LOAI_DANH_MUC;
    // console.log("req.body: ", req.body)
    // console.log("TEN_LOAI_DANH_MUC: ", TEN_LOAI_DANH_MUC)
    let results = await getLoaiTacGiaByLoaiDanhMuc(TEN_LOAI_DANH_MUC);
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
};
