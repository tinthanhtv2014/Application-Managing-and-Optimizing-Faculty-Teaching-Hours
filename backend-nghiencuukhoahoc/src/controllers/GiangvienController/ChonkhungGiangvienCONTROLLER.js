const {
  timKhungGioChuan_TENCHUCDANH,
  tao_CHONKHUNG,
  xem_CHONKHUNG_cho_GIANGVIEN,
  sua_CHONKHUNG_cho_GIANGVIEN,
} = require("../../services/GiangvienServices/ServiceChonKhung");

const select_CHONKHUNG = async (req, res) => {
  try {
    const MAGV = req.body.MAGV;
    const MANAMHOC = req.body.MANAMHOC;

    let results = await xem_CHONKHUNG_cho_GIANGVIEN(MAGV, MANAMHOC);
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

const update_CHONKHUNG = async (req, res) => {
  try {
    const MAGV = req.params.MAGV;
    const MANAMHOC = req.body.MANAMHOC;
    const MAKHUNG = req.body.MAKHUNG;
    console.log("check 1: ", MAGV);
    console.log("check 2: ", MANAMHOC);
    console.log("check 3: ", MAKHUNG);
    let results = await sua_CHONKHUNG_cho_GIANGVIEN(MAGV, MANAMHOC, MAKHUNG);
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
  select_CHONKHUNG,
  update_CHONKHUNG,
};
