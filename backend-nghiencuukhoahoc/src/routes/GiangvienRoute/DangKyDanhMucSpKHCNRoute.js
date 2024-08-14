const express = require("express");
const app = express();
const router = express.Router();

const {
  select_loaitacgia_loaidanhmuc,
  dangky_danhmuc_Controller,
  select_thongtin_dangkydanhmuc_giangvien,
  select_thongtin_dangkydanhmuc__danhsach_giangvien,
} = require("../../controllers/GiangvienController/danhmucGiangVienCONTROLLER");

const { checkUserJWT } = require("../../middlewares/JWTAction");

const DangKyDanhMucRoute = (app) => {
  router.post(
    "/loaidanhmuc/loaitacgia",
    checkUserJWT,
    select_loaitacgia_loaidanhmuc
  );
  router.post("/dangky/danhmuc", checkUserJWT, dangky_danhmuc_Controller);
  router.post(
    "/dangky/danhmuc/thongtin",
    select_thongtin_dangkydanhmuc_giangvien
  );
  router.post(
    "/dangky/danhmuc/thongtindanhsach",
    select_thongtin_dangkydanhmuc__danhsach_giangvien
  );
  return app.use("/api/v1/quyengiangvien/giangvien", router);
};

module.exports = DangKyDanhMucRoute;
