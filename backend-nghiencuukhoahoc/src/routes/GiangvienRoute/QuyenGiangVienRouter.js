const express = require("express");
const router = express.Router();

const {
  updateThongTinGiangVienController,
} = require("../../controllers/GiangvienController/GiangVienController");

const {
  getKhungGioChuan_TENCHUCDANH,
} = require("../../controllers/AdminController/khunggiochuanController");

const {
  create_CHONKHUNG,
  select_CHONKHUNG,
} = require("../../controllers/GiangvienController/ChonkhungGiangvienCONTROLLER");

const QuyenGiangVienRouter = (app) => {
  const router = require("express").Router(); // Thêm dòng này để khởi tạo router
  // route cho giảng viên
  router.put("/sua/thongtin/:TENDANGNHAP", updateThongTinGiangVienController);
  router.get("/xem/khunggiochuan/:TENCHUCDANH", getKhungGioChuan_TENCHUCDANH); // Sử dụng phương thức GET thay vì PUT

  //route chọn khung cho giảng viên
  router.get("/xem/canhan/khunggiochuan", select_CHONKHUNG); // xem thông tin khung chuẩn của 1 giảng viên
  router.post("/tao/khunggiochuan", create_CHONKHUNG); // tạo khung chuẩn cho 1 giảng viên chưa có
  return app.use("/api/v1/quyengiangvien/giangvien", router);
};

module.exports = QuyenGiangVienRouter;
