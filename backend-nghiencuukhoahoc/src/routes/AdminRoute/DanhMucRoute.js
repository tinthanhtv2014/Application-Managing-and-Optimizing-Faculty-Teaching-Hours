const express = require("express");
const router = express.Router();
const {
  getDanhMucQuyDoi,
  addDanhMucQuyDoi,
  editDanhMucQuyDoi,
  removeDanhMucQuyDoi,

  getQuyDinh,
  addQuyDinh,
  editQuyDinh,
  removeQuyDinh,

  getLoaiDanhMuc,
  addLoaiDanhMuc,
  editLoaiDanhMuc,
  removeLoaiDanhMuc,

  getLoaiTacGia,
  addLoaiTacGia,
  editLoaiTacGia,
  removeLoaiTacGia,

  getTyLeQuyDoi,
  addTyLeQuyDoi,
  editTyLeQuyDoi,
  removeTyLeQuyDoi,

  getAll_Co_Quy_Dinh,
  create_Co_Quy_Dinh_excel,
} = require("../../controllers/AdminController/danhmucAdminController.js");

const { checkUserJWT } = require("../../middlewares/JWTAction.js");

const CRUDDanhMuc = (app) => {
  // Route cho các API quản lý quy định, yêu cầu xác thực JWT
  router.get("/quydinh", checkUserJWT, getQuyDinh);
  router.post("/quydinh", checkUserJWT, addQuyDinh);
  router.put("/quydinh/:id", checkUserJWT, editQuyDinh);
  router.delete("/quydinh/:id", checkUserJWT, removeQuyDinh);

  // Route cho các API quản lý danh mục quy đổi, yêu cầu xác thực JWT
  router.get("/danhmucquydoi", checkUserJWT, getDanhMucQuyDoi);
  router.post("/danhmucquydoi", checkUserJWT, addDanhMucQuyDoi);
  router.put("/danhmucquydoi/:id", checkUserJWT, editDanhMucQuyDoi);
  router.delete("/danhmucquydoi/:id", checkUserJWT, removeDanhMucQuyDoi);

  // Route cho các API quản lý loại danh mục, yêu cầu xác thực JWT
  router.get("/loaidanhmuc", checkUserJWT, getLoaiDanhMuc);
  router.post("/loaidanhmuc", checkUserJWT, addLoaiDanhMuc);
  router.put("/loaidanhmuc/:id", checkUserJWT, editLoaiDanhMuc);
  router.delete("/loaidanhmuc/:id", checkUserJWT, removeLoaiDanhMuc);

  // Route cho các API quản lý loại tác giả, yêu cầu xác thực JWT
  router.get("/loaitacgia", checkUserJWT, getLoaiTacGia);
  router.post("/loaitacgia", checkUserJWT, addLoaiTacGia);
  router.put("/loaitacgia/:id", checkUserJWT, editLoaiTacGia);
  router.delete("/loaitacgia/:id", checkUserJWT, removeLoaiTacGia);

  // Route cho các API quản lý tỷ lệ quy đổi, yêu cầu xác thực JWT
  router.get("/tylequydoi", checkUserJWT, getTyLeQuyDoi);
  router.post("/tylequydoi", checkUserJWT, addTyLeQuyDoi);
  router.put("/tylequydoi/:id", checkUserJWT, editTyLeQuyDoi);
  router.delete("/tylequydoi/:id", checkUserJWT, removeTyLeQuyDoi);

  // Route cho các API bảng có quy định yêu cầu xác thực JWT
  router.get("/coquydinh", getAll_Co_Quy_Dinh);
  router.post("/coquydinh", create_Co_Quy_Dinh_excel);
  return app.use("/api/v1/admin/danhmuc", router);
};

module.exports = CRUDDanhMuc;
