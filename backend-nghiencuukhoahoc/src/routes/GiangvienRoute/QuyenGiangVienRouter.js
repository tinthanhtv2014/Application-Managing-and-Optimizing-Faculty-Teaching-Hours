const express = require("express");
const router = express.Router();

const {
  updateThongTinGiangVienController,
} = require("../../controllers/GiangvienController/GiangVienController");
const {
  select_thongtin_danhmuc,
} = require("../../controllers/GiangvienController/danhmucGiangVienCONTROLLER");

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
  xem_THOIGIAN_XACNHAN,
  xem_THOIGIAN_XACNHAN_theoTENKHOA,
  delete_THOIGIAN_XACNHAN,
} = require("../../controllers/GiangvienController/ChonkhungGiangvienCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction");
const QuyenGiangVienRouter = (app) => {
  const router = require("express").Router(); // Thêm dòng này để khởi tạo router
  // route cho giảng viên
  router.put(
    "/sua/thongtin/:TENDANGNHAP",
    checkUserJWT,
    updateThongTinGiangVienController
  );
  router.get(
    "/xem/khunggiochuan/:TENCHUCDANH",
    checkUserJWT,
    getKhungGioChuan_TENCHUCDANH
  ); // Sử dụng phương thức GET thay vì PUT
  router.get(
    "/xem/all/tenkhung/:TENCHUCDANH",
    checkUserJWT,
    getAllTenKhung_TENCHUCDANH
  );
  //route chọn khung cho giảng viên
  router.post("/xem/canhan/khunggiochuan", checkUserJWT, select_CHONKHUNG); // xem thông tin khung chuẩn của 1 giảng viên
  router.post("/tao/khunggiochuan", checkUserJWT, create_CHONKHUNG); // tạo khung chuẩn cho 1 giảng viên chưa có
  router.post("/tao/thoigianxacnhan", checkUserJWT, create_THOIGIAN_XACNHAN);
  router.post("/xoa/thoigianxacnhan", checkUserJWT, delete_THOIGIAN_XACNHAN);
  router.put(
    "/sua/thoigianxacnhan/:SONGAYKETTHUC",
    checkUserJWT,
    update_THOIGIAN_XACNHAN
  );
  router.get("/xem/thoigianxacnhan", checkUserJWT, xem_THOIGIAN_XACNHAN);
  router.get(
    "/xem/thoigianxacnhantheokhoa/:tenKhoa",
    checkUserJWT,
    xem_THOIGIAN_XACNHAN_theoTENKHOA
  );

  // router.put("/sua/khunggiochuan/:MAGV", update_CHONKHUNG); //phúc viểt

  //router cho danh mục chọn khung
  router.post(
    "/xem/canhan/thongtinkhung",
    checkUserJWT,
    select_thongtin_danhmuc
  );

  return app.use("/api/v1/quyengiangvien/giangvien", router);
};

module.exports = QuyenGiangVienRouter;
