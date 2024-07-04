const express = require("express");
const app = express();

const router = express.Router();
const {
  getAllTaiKhoanController,
  createTaiKhoanController,
  createTaiKhoanExcelController,
  updateTaiKhoanController,
  createTaiKhoanOnlyController,
  loginTaikhoanGOOGLEController,
  loginTaikhoanAdminController,
  logoutTaikhoanAdminController,
} = require("../../controllers/AdminController/adminController.js");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");

const CRUDTaiKhoan = (app) => {
  //login cho admin
  router.post("/dangnhap", loginTaikhoanAdminController); //đăng nhập với tài khoản và mk
  router.post("/dangxuat", logoutTaikhoanAdminController); // đăng xuất
  router.post("/dangnhapgoogle", loginTaikhoanGOOGLEController); // đăng nhập với email google
  //chức năng CRUD tài khoản của admin
  router.post("/tao", createTaiKhoanController); //Tạo
  router.post("/login");

  //Tạo hàng loạt tài khoản bằng một mảng
  // dataTaiKhoanExcelArray phải bao gồm TENDANGNHAP, MAGV, MATKHAU, PHANQUYEN, TRANGTHAITAIKHOAN
  router.post("/tao/excel", createTaiKhoanExcelController);
  router.post("/only/tao", createTaiKhoanOnlyController); // bao gồm tên đăng nhập, trạng thái hoạt động, phân quyền, mã GV, MABOMON

  router.get("/xem/:MABOMON", getAllTaiKhoanController); //xem

  router.get("/protected", checkUserJWT, (req, res) => {
    res.json({ message: "Protected data", user: req.user }); // Sử dụng thông tin người dùng từ req.user
  });
  //Sửa
  router.put("/sua/:tenDangNhap", checkUserJWT, updateTaiKhoanController);

  return app.use("/api/v1/admin/taikhoan", router);
};

module.exports = CRUDTaiKhoan;
