const express = require("express");
const app = express();

const router = express.Router();
const {
  getAllGiangVien,
  createGiangVienControler,
  updateGiangVienController,
  deleteGiangVienController,
} = require("../../controllers/AdminController/giangVienAdminController");
const {
  getAllChucvu,
  createChucVuControler,
  updateChucVuController,
  deleteChucVuController,
} = require("../../controllers/AdminController/chucvuAdminCONTROLLER");
const CRUDGiangVien = (app) => {
  //route cho giảng viên
  router.get("/xem", getAllGiangVien);
  router.post("/tao", createGiangVienControler);
  router.put("/sua/:maGV", updateGiangVienController);
  router.delete("/xoa", deleteGiangVienController);
  //Route cho chức vụ
  router.get("/xemchucvu", getAllChucvu);
  router.post("/taochucvu", createChucVuControler);
  router.put("/suachucvu/:MACHUCVU", updateChucVuController);
  router.delete("/xoachucvu", deleteChucVuController);

  return app.use("/api/v1/admin/giangvien", router);
};

module.exports = CRUDGiangVien;
