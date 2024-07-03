const express = require("express");
const app = express();

const router = express.Router();

const {
  getAllGiangVien,
  createGiangVienControler,
  updateGiangVienController,
  deleteGiangVienController,
  getOnlyGiangVienbyBoMon,
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
  router.put("/sua/:maGV", updateGiangVienController);
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
