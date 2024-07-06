const express = require("express");
const app = express();

const router = express.Router();

const {
  getAllGiangVien,
  getOnlyGiangVienbyBoMon,

  createGiangVienControler,

  updateGiangVienController,
  updateTrangThaiTaiKhoanGiangVienController,
  update_ChucVu_ChucDanh_GiangVien_Controller,

  deleteGiangVienController,
} = require("../../controllers/AdminController/giangVienAdminController");

const {
  getAllChucvu,
  createChucVuControler,
  updateChucVuController,
  deleteChucVuController,
} = require("../../controllers/AdminController/chucvuAdminCONTROLLER");

const {
  getAllChucdanh,
  createChucdanhControler,
  updateChucdanhController,
  deleteChucdanhController,
} = require("../../controllers/AdminController/chucdanhAdminCONTROLLER");

const CRUDGiangVien = (app) => {
  //route cho giảng viên
  router.get("/xem", getAllGiangVien);

  router.get("/only/xem/:MABOMON", getOnlyGiangVienbyBoMon);

  router.post("/tao", createGiangVienControler);

  router.put(
    "/sua/trangthai/:MAGV",
    updateTrangThaiTaiKhoanGiangVienController
  ); //phúc viết
  router.put("/sua/:MAGV", updateGiangVienController);
  router.put(
    "/sua/thongtin/:TENDANGNHAP",
    update_ChucVu_ChucDanh_GiangVien_Controller
  ); //lam

  router.delete("/xoa", deleteGiangVienController);

  //Route cho chức vụ
  router.get("/xemchucvu", getAllChucvu);
  router.post("/taochucvu", createChucVuControler);
  router.put("/suachucvu/:MACHUCVU", updateChucVuController);
  router.delete("/xoachucvu", deleteChucVuController);

  //route cho chức danh
  router.get("/xemchucdanh", getAllChucdanh);
  router.post("/taochucdanh", createChucdanhControler);
  router.put("/suachucdanh/:MACHUCDANH", updateChucdanhController);
  router.delete("/xoachucdanh", deleteChucdanhController);

  return app.use("/api/v1/admin/giangvien", router);
};

module.exports = CRUDGiangVien;
