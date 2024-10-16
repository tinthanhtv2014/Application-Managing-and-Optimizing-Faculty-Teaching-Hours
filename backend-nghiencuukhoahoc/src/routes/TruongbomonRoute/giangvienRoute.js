const express = require("express");
const app = express();

const router = express.Router();

const {
  get_giangvien_CNTT,
  get_giangvien_CNTT_da_chon_khung,
  get_giangvien_CNTT_chua_chon_khung,
  get_giangvien_MonHoc_daChonKhung,
} = require("../../controllers/TruongbomonController/giangvienCONTROLLER");

const {
  getAllLop_BoMon_controller,
  get_giangvien_CNTT_chuachonkhung,
  get_giangvien_CNTT_dachonkhung,
  get_monhoc_lop_hocki,
  get_giangvien_CNTT_dachonkhung_chitietonly,

  get_listgiangvien_phancong,
  create_onlylistgiangvien_phancong,
  phancongtudong_giangvien_Controller,
} = require("../../controllers/TruongbomonController/phancongCONTROLLER");

const {
  createChitietphancongExcelController,
  Dangky_ChitietphancongExcelController,
  selectChitietphancongController_giangvien,
  selectChitietphancongController_lop,
  Xem_Chitietphancong_banthan_Controller,
  select_giophancong_giangvienkhac_CONTROLLER,
} = require("../../controllers/TruongbomonController/chitietphancongCONTROLLER");

const { checkUserJWT } = require("../../middlewares/JWTAction");
const CRUDgiangvien_CNTT = (app) => {
  //route cho khoa
  router.get("/xem", checkUserJWT, get_giangvien_CNTT);
  router.get(
    "/xem/dachonkhung",
    checkUserJWT,
    get_giangvien_CNTT_da_chon_khung
  );
  router.get(
    "/xem/chuachonkhung",
    checkUserJWT,
    get_giangvien_CNTT_chua_chon_khung
  );
  //   router.post("/tao", createNAMHOC);
  //   router.put("/sua/:MANAMHOC", updateNAMHOC);
  //   router.delete("/xoa", deleteNAMHOC);

  //route bên phân công
  router.get(
    "/xem/phancong/chuachonkhung",
    checkUserJWT,
    get_giangvien_CNTT_chuachonkhung
  );
  router.get(
    "/xem/phancong/dachonkhung",
    checkUserJWT,
    get_giangvien_CNTT_dachonkhung
  );
  router.post("/xem/phancong/lophoc/hocki", checkUserJWT, get_monhoc_lop_hocki);
  router.post(
    "/xem/phancong/dachonkhung/chitiet",
    checkUserJWT,
    get_giangvien_CNTT_dachonkhung_chitietonly
  );
  router.post("/lop/bomon/xem", checkUserJWT, getAllLop_BoMon_controller);
  //bảng phân côngA
  router.get(
    "/xem/phancong/listgiangvien",
    checkUserJWT,
    get_listgiangvien_phancong
  );
  router.post(
    "/tao/phancong/giangvien",
    checkUserJWT,
    create_onlylistgiangvien_phancong
  );

  //chi tiết phân công route
  router.post(
    "/tao/chitietphancong/giangvien",
    checkUserJWT,
    createChitietphancongExcelController
  );

  router.post(
    "/dangky/chitietphancong/giangvien",
    checkUserJWT,
    Dangky_ChitietphancongExcelController
  );

  router.post(
    "/xem/danhsach/monhoc/giangvien",
    checkUserJWT,
    get_giangvien_MonHoc_daChonKhung
  );
  router.get(
    "/xem/danhsach/monhoc/giangvien/lop",
    checkUserJWT,
    selectChitietphancongController_lop
  );

  router.post(
    "/xem/danhsach/monhoc/danhsach/giangvien",
    checkUserJWT,
    selectChitietphancongController_giangvien
  );

  router.post(
    "/xem/danhsach/monhoc/giangvien/canhan",
    checkUserJWT,
    Xem_Chitietphancong_banthan_Controller
  );

  router.post(
    "/phancong/tudong/giangvien",
    checkUserJWT,
    phancongtudong_giangvien_Controller
  );

  router.post(
    "/xem/phancong/gio/giangvien",

    select_giophancong_giangvienkhac_CONTROLLER
  );

  return app.use("/api/v1/truongbomon/giangvien", router);
};

module.exports = CRUDgiangvien_CNTT;
