const {
  selectGiangVien,
  createGiangVien,
  updateGiangVien,
  deleteGiangVien,
  selectOnlyGiangVien,
  updateTrangThaiTaiKhoanGiangVien,
} = require("../../services/AdminServices/CRUDGiangvien");

const getAllGiangVien = async (req, res) => {
  try {
    let results = await selectGiangVien();

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
    const { TRANGTHAITAIKHOAN, MABOMON } = req.body;
    const MAGV = req.params.MAGV;
    console.log(req.body);
    let results = await updateTrangThaiTaiKhoanGiangVien(
      MAGV,
      TRANGTHAITAIKHOAN,
      MABOMON
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
    let dataGiangVien = req.body;
    let results = await updateGiangVien(dataGiangVien);

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
    let dataGiangVien = req.body;
    let results = await deleteGiangVien(dataGiangVien);

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
  createGiangVienControler,
  updateGiangVienController,
  deleteGiangVienController,
  getOnlyGiangVienbyBoMon,
  updateTrangThaiTaiKhoanGiangVienController,
};
