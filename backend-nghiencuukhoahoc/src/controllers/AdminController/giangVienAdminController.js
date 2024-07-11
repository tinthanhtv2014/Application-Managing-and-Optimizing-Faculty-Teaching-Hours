const {
  selectGiangVien,
  selectOnlyGiangVien,
  selectOnlyGiangVienByTenDangNhap,
  createGiangVien,

  updateGiangVien,
  updateTrangThaiTaiKhoanGiangVien,

  deleteGiangVien,
} = require("../../services/AdminServices/CRUDGiangvien");

const {
  update_ChucVu_ChucDanh_GiangVien,
} = require("../../services/AdminServices/AdminServiceGiangVien/GiangVienServices");

const {
  timTaiKhoan_TENDANGNHAP,
  timGiangVien_MAGV,
  selectBomon_TENBOMON,
  selectChucdanh_TENCHUCDANH,
  timChucVu_TENCHUCVU,
  timChucVu_MAGV,
  timCoChucDanh_MAGV,
  timChucVu_MACHUCVU,
  timChucDanh_MACHUCDANH,

  dataFronEnd,
} = require("../../services/AdminServices/helpers");

const getAllGiangVien = async (req, res) => {
  try {
    const isOpenGetAllApiGV = req.body.isOpenGetAllApiGV;
    const MABOMON = req.body.MABOMON;

    let results = await dataFronEnd(isOpenGetAllApiGV, MABOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const getOnlyGiangVienbyTENDANGNHAP = async (req, res) => {
  try {
    const TENDANGNHAP = req.params.TENDANGNHAP;

    let results;
    results = await selectOnlyGiangVienByTenDangNhap(TENDANGNHAP);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const getOnlyGiangVienbyBoMon = async (req, res) => {
  try {
    const MABOMON = req.params.MABOMON;
    console.log(MABOMON);
    let results = await selectOnlyGiangVien(MABOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const createGiangVienControler = async (req, res) => {
  try {
    let dataGiangVien = req.body;
    let results = await createGiangVien(dataGiangVien);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const updateTrangThaiTaiKhoanGiangVienController = async (req, res) => {
  try {
    //api này dùng để đình chỉ hoạt động của 1 tài khoản
    const { TRANGTHAITAIKHOAN, MABOMON, isOpenGetAllApiGV } = req.body;
    const MAGV = req.params.MAGV;
    // console.log(MAGV);
    console.log("TRANGTHAITAIKHOAN:  ", TRANGTHAITAIKHOAN);
    // console.log(MABOMON);
    let results = await updateTrangThaiTaiKhoanGiangVien(
      MAGV,
      TRANGTHAITAIKHOAN,
      MABOMON,
      isOpenGetAllApiGV
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Lỗi server",
      EC: -1,
      DT: [],
    });
  }
};

const updateGiangVienController = async (req, res) => {
  try {
    const MAGV = req.params.MAGV;
    let dataGiangVien = req.body;
    let results = await updateGiangVien(MAGV, dataGiangVien);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const update_ChucVu_ChucDanh_GiangVien_Controller = async (req, res) => {
  console.log("check req.body =>>", req.body);
  try {
    const a = req.params.TENDANGNHAP;
    const isOpenGetAllApiGV = req.body.isOpenGetAllApiGV;

    // Khởi tạo dataGiangVien với các trường cần thiết, mặc định là ''
    let dataGiangVien = {
      TENDANGNHAP: "",
      TENGV: "",

      TENCHUCVU: "",
      TUNGAY: "", //Từ ngày

      TENCHUCDANH: "",
      THOIGIANNHAN: "", // Thời gian nhận
      SOQUYETDINH: "",
      DIENTHOAI: "",
      DIACHI: "",
      TENBOMON: "",
      PHANQUYEN: "",
      TRANGTHAITAIKHOAN: "",
    };

    // Cập nhật giá trị từ req.body vào dataGiangVien
    Object.keys(dataGiangVien).forEach((field) => {
      if (req.body[field]) {
        dataGiangVien[field] = req.body[field];
      }
    });

    // console.log("TENDANGNHAP: ", a);
    // console.log("dataGiangVien controller: ", dataGiangVien);

    let results = await update_ChucVu_ChucDanh_GiangVien(
      dataGiangVien,
      isOpenGetAllApiGV
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const deleteGiangVienController = async (req, res) => {
  try {
    let MAGV = req.query.MAGV;
    let MABOMON = req.query.MABOMON;
    let isOpenGetAllApiGV = req.query.isOpenGetAllApiGV;
    console.log(MAGV);
    console.log(MABOMON);
    let results = await deleteGiangVien(MAGV, MABOMON, isOpenGetAllApiGV);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

module.exports = {
  getAllGiangVien,
  getOnlyGiangVienbyBoMon,
  getOnlyGiangVienbyTENDANGNHAP,
  createGiangVienControler,

  updateGiangVienController,
  updateTrangThaiTaiKhoanGiangVienController,
  update_ChucVu_ChucDanh_GiangVien_Controller,

  deleteGiangVienController,
};
