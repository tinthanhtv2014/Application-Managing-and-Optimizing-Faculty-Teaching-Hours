const express = require("express");
const app = express();
const pool = require("../../config/database.js");
const router = express.Router();
// const { RandomForestClassifier } = require("ml-random-forest");
const {
  getAllTaiKhoanController,
  createTaiKhoanController,
  createTaiKhoanExcelController,
  updateTaiKhoanController,
  createTaiKhoanOnlyController,
  loginTaikhoanGOOGLEController,
  loginTaikhoanAdminController,
  logoutTaikhoanAdminController,
  getAllTaiKhoanPHANQUYENController,
  getAllTaiKhoanTRANGTHAIController,
} = require("../../controllers/AdminController/adminController.js");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");

const CRUDTaiKhoan = (app) => {
  // Routes không yêu cầu xác thực JWT
  router.post("/dangnhap", loginTaikhoanAdminController); // Đăng nhập với tài khoản và mật khẩu
  router.post("/dangxuat", logoutTaikhoanAdminController); // Đăng xuất
  router.post("/dangnhapgoogle", loginTaikhoanGOOGLEController); // Đăng nhập với email Google

  // Các routes yêu cầu xác thực JWT
  router.post("/tao", checkUserJWT, createTaiKhoanController); // Tạo tài khoản
  router.post("/tao/excel", checkUserJWT, createTaiKhoanExcelController); // Tạo hàng loạt tài khoản
  router.post("/only/tao", checkUserJWT, createTaiKhoanOnlyController); // Tạo tài khoản chỉ với thông tin cần thiết

  router.post("/xem", checkUserJWT, getAllTaiKhoanController); // Xem tất cả tài khoản theo mã bộ môn
  router.get(
    "/xem/phanquyen/:MABOMON",
    checkUserJWT,
    getAllTaiKhoanPHANQUYENController
  ); // Xem tài khoản theo phân quyền và mã bộ môn
  router.get(
    "/xem/trangthai/:MABOMON",
    checkUserJWT,
    getAllTaiKhoanTRANGTHAIController
  ); // Xem tài khoản theo trạng thái và mã bộ môn
  router.get("/protected", checkUserJWT, (req, res) => {
    res.json({ message: "Protected data", user: req.user }); // Sử dụng thông tin người dùng từ req.user
  });

  // Sửa tài khoản
  router.put("/sua/:tenDangNhap", checkUserJWT, updateTaiKhoanController);

  return app.use("/api/v1/admin/taikhoan", router);
};

module.exports = CRUDTaiKhoan;
