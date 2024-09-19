const express = require("express");
const app = express();

const router = express.Router();

const {
  getAllGiangVien,
  getAllGiangVien_indatabase,
  getOnlyGiangVienbyBoMon,
  getOnlyGiangVienbyTENDANGNHAP,
  createGiangVienControler,

  updateGiangVienController,
  updateTrangThaiTaiKhoanGiangVienController,
  update_ChucVu_ChucDanh_GiangVien_Controller,

  deleteGiangVienController,
  searchEmailGiangVienController,
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
const { checkUserJWT } = require("../../middlewares/JWTAction");
const CRUDGiangVien = (app) => {
  //route cho giảng viên

  router.get("/xem/tatca", getAllGiangVien_indatabase);

  router.post("/xem", checkUserJWT, getAllGiangVien);

  router.get("/only/xem/:MABOMON", checkUserJWT, getOnlyGiangVienbyBoMon);
  router.get(
    "/only/xemprofile/:TENDANGNHAP",
    checkUserJWT,

    getOnlyGiangVienbyTENDANGNHAP
  );

  router.post("/tao", checkUserJWT, createGiangVienControler);

  router.put(
    "/sua/trangthai/:MAGV",
    checkUserJWT,

    updateTrangThaiTaiKhoanGiangVienController
  ); //phúc viết
  router.put("/sua/:MAGV", checkUserJWT, updateGiangVienController);
  router.put(
    "/sua/thongtin/:TENDANGNHAP",
    checkUserJWT,

    update_ChucVu_ChucDanh_GiangVien_Controller
  ); //lam

  router.delete("/xoa", checkUserJWT, deleteGiangVienController);

  //Route cho chức vụ
  router.get("/xemchucvu", checkUserJWT, getAllChucvu);
  router.post("/taochucvu", checkUserJWT, createChucVuControler);
  router.put("/suachucvu/:MACHUCVU", checkUserJWT, updateChucVuController);
  router.delete("/xoachucvu", checkUserJWT, deleteChucVuController);

  //route cho chức danh
  router.get("/xemchucdanh", checkUserJWT, getAllChucdanh);
  router.post("/taochucdanh", checkUserJWT, createChucdanhControler);
  router.put(
    "/suachucdanh/:MACHUCDANH",
    checkUserJWT,
    updateChucdanhController
  );
  router.delete("/xoachucdanh", checkUserJWT, deleteChucdanhController);
  router.post("/email/search", checkUserJWT, searchEmailGiangVienController);
  return app.use("/api/v1/admin/giangvien", router);
};

module.exports = CRUDGiangVien;
