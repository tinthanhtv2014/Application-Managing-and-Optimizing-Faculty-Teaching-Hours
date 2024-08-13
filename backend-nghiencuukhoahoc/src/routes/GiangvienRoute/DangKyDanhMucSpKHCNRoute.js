const express = require("express");
const app = express();
const router = express.Router();

const {
  select_thongtin_danhmuc,
  select_loaitacgia_loaidanhmuc,
  dangky_danhmuc_Controller,
} = require("../../controllers/GiangvienController/danhmucGiangVienCONTROLLER");

const DangKyDanhMucRoute = (app) => {
  router.post("/loaidanhmuc/loaitacgia", select_loaitacgia_loaidanhmuc);
  router.post("/dangky/danhmuc", dangky_danhmuc_Controller);

  return app.use("/api/v1/quyengiangvien/giangvien", router);
};

module.exports = DangKyDanhMucRoute;
