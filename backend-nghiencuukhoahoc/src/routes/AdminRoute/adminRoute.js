const express = require("express");
const app = express();

const router = express.Router();
const {
  getAllTaiKhoanController,
  createTaiKhoanController,
  createTaiKhoanExcelController,
  updateTaiKhoanController,


  loginTaikhoanAdminController,
  logoutTaikhoanAdminController,
} = require("../../controllers/AdminController/adminController.js");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");

const CRUDTaiKhoan = (app) => {
  //login cho admin
  router.post("/dangnhap", loginTaikhoanAdminController); //đăng nhập
  router.post("/dangxuat", logoutTaikhoanAdminController); // đăng xuất

  //chức năng CRUD tài khoản của admin
  router.post("/tao", createTaiKhoanController); //Tạo
  router.post("/tao/excel", createTaiKhoanExcelController); //Tạo hàng loạt tài khoản bằng một mảng
  router.get("/xem", checkUserJWT, getAllTaiKhoanController); //xem

  router.get("/protected", checkUserJWT, (req, res) => {
    res.json({ message: "Protected data", user: req.user }); // Sử dụng thông tin người dùng từ req.user
  });

  //Sửa
  router.put("/sua/:tenDangNhap", checkUserJWT, updateTaiKhoanController);

  return app.use("/api/v1/admin/taikhoan", router);
};

module.exports = CRUDTaiKhoan;
