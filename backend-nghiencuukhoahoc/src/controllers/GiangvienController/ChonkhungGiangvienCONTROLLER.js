const {
  timKhungGioChuan_TENCHUCDANH,
  tao_CHONKHUNG,
} = require("../../services/GiangvienServices/ServiceChonKhung");
const create_CHONKHUNG = async (req, res) => {
  try {
    const MAGV = req.body.MAGV;
    const MANAMHOC = req.body.MANAMHOC;
    const MAKHUNG = req.body.MAKHUNG;
    let results = await tao_CHONKHUNG(MAGV, MANAMHOC, MAKHUNG);
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
  create_CHONKHUNG,
};
