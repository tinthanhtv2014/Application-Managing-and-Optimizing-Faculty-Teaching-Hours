const express = require("express");
const router = express.Router();
const {
  getAllTaiKhoanController,
  createTaiKhoanController,
  updateTaiKhoanController,
  loginTaikhoanAdminController,
  logoutTaikhoanAdminController,
} = require("../../controllers/AdminController/adminController.js");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");
//login cho admin
router.post("/login", loginTaikhoanAdminController);
router.post("/logout", logoutTaikhoanAdminController);
router.post("/register", createTaiKhoanController);
//chức năng của admin
router.get("/tai-khoan", checkUserJWT, getAllTaiKhoanController);
router.get("/protected", checkUserJWT, (req, res) => {
  res.json({ message: "Protected data", user: req.user }); // Sử dụng thông tin người dùng từ req.user
});
router.put(
  "/sua-tai-khoan/:tenDangNhap",
  checkUserJWT,
  updateTaiKhoanController
);

module.exports = router;
