const express = require("express");
const router = express.Router();

const {
  updateThongTinGiangVienController,
} = require("../../controllers/GiangvienController/GiangVienController");

const {
  getKhungGioChuan_TENCHUCDANH,
  getAllTenKhung_TENCHUCDANH,
} = require("../../controllers/AdminController/khunggiochuanController");

const {
  create_CHONKHUNG,
  select_CHONKHUNG,
  update_CHONKHUNG,
  create_THOIGIAN_XACNHAN,
  update_THOIGIAN_XACNHAN,
} = require("../../controllers/GiangvienController/ChonkhungGiangvienCONTROLLER");

const QuyenGiangVienRouter = (app) => {
  const router = require("express").Router(); // Thêm dòng này để khởi tạo router
  // route cho giảng viên
  router.put("/sua/thongtin/:TENDANGNHAP", updateThongTinGiangVienController);
  router.get("/xem/khunggiochuan/:TENCHUCDANH", getKhungGioChuan_TENCHUCDANH); // Sử dụng phương thức GET thay vì PUT
  router.get("/xem/all/tenkhung/:TENCHUCDANH", getAllTenKhung_TENCHUCDANH);
  //route chọn khung cho giảng viên
  router.post("/xem/canhan/khunggiochuan", select_CHONKHUNG); // xem thông tin khung chuẩn của 1 giảng viên
  router.post("/tao/khunggiochuan", create_CHONKHUNG); // tạo khung chuẩn cho 1 giảng viên chưa có
  router.post("/tao/thoigianxacnhan", create_THOIGIAN_XACNHAN);
  router.put("/sua/thoigianxacnhan/:SONGAYKETTHUC", update_THOIGIAN_XACNHAN);
  // router.put("/sua/khunggiochuan/:MAGV", update_CHONKHUNG); //phúc viểt

  return app.use("/api/v1/quyengiangvien/giangvien", router);
};

module.exports = QuyenGiangVienRouter;
