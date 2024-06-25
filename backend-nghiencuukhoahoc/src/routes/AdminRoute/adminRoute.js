const express = require("express");
const router = express.Router();
const {
  getAllTaiKhoanController,
  createTaiKhoanController,
  updateTaiKhoanController,
} = require("../../controllers/AdminController/adminController.js");

//login cho admin
router.get("/tai-khoan", getAllTaiKhoanController);
router.post("/tao-tai-khoan", createTaiKhoanController);
router.put("/sua-tai-khoan/:tenDangNhap", updateTaiKhoanController);

module.exports = router;
