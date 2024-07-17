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
} = require("../../controllers/GiangvienController/ChonkhungGiangvienCONTROLLER");

const QuyenGiangVienRouter = (app) => {
  const router = require("express").Router(); // Thêm dòng này để khởi tạo router
  // route cho giảng viên
  router.put("/sua/thongtin/:TENDANGNHAP", updateThongTinGiangVienController);
  router.get("/xem/khunggiochuan/:TENCHUCDANH", getKhungGioChuan_TENCHUCDANH); // Sử dụng phương thức GET thay vì PUT

  //route chọn khung cho giảng viên
  router.post("/tao/khunggiochuan", create_CHONKHUNG);
  return app.use("/api/v1/quyengiangvien/giangvien", router);
};

module.exports = QuyenGiangVienRouter;
