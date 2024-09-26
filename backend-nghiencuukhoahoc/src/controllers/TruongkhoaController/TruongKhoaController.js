const {
  xem_giangvien_khoa,
  timkiem_email_taikhoan,
  timkiem_email_taikhoan_ngoaitruong,
} = require("../../services/TruongkhoaServices/ServiceTruongKhoa");

const GiangVien_thuoc_KhoaController = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let TENKHOA = req.query.TENKHOA;
    // console.log("page: ", page)
    // console.log("limit: ", limit)
    // console.log("TENKHOA: ", TENKHOA)
    let results = await xem_giangvien_khoa(page, limit, TENKHOA);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi phía server",
      EC: -1,
      DT: null,
    });
  }
};

const timkiem_email_taikhoanController = async (req, res) => {
  try {
    let TEN_NAM_HOC = req.body.select_HocKiNienKhoa.TEN_NAM_HOC;
    let TENGV = req.body.TENGIANGVIEN;

    let results = await timkiem_email_taikhoan(TENGV, TEN_NAM_HOC);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi phía server",
      EC: -1,
      DT: null,
    });
  }
};

const timkiem_email_taikhoan_ngoaitruongController = async (req, res) => {
  try {
    let TENGV = req.body.TENGV;

    let results = await timkiem_email_taikhoan_ngoaitruong(TENGV);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi phía server",
      EC: -1,
      DT: null,
    });
  }
};

module.exports = {
  GiangVien_thuoc_KhoaController,
  timkiem_email_taikhoanController,
  timkiem_email_taikhoan_ngoaitruongController,
};
