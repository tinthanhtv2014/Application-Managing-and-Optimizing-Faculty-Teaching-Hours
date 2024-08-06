const {
  get_thongtin_danhmuc,
} = require("../../services/GiangvienServices/danhmucGiangvienServices");

const select_thongtin_danhmuc = async (req, res) => {
  try {
    const MAGV = req.body.MAGV;
    const TENNAMHOC = req.body.TENNAMHOC;
    // console.log("TENNAMHOC", TENNAMHOC);
    // console.log("MAGV", MAGV);
    let results = await get_thongtin_danhmuc(MAGV, TENNAMHOC);
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
};
