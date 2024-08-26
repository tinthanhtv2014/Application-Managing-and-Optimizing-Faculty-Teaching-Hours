const express = require("express");
const app = express();

const router = express.Router();

const {
  get_giangvien_CNTT,
  get_giangvien_CNTT_da_chon_khung,
  get_giangvien_CNTT_chua_chon_khung,
} = require("../../controllers/TruongbomonController/giangvienCONTROLLER");

const {
  get_giangvien_CNTT_chuachonkhung,
  get_giangvien_CNTT_dachonkhung,
  get_monhoc_lop_hocki,
  get_giangvien_CNTT_dachonkhung_chitietonly,

  get_listgiangvien_phancong,
  create_onlylistgiangvien_phancong,
} = require("../../controllers/TruongbomonController/phancongCONTROLLER");

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
  router.get("/xem/phancong/chuachonkhung", get_giangvien_CNTT_chuachonkhung);
  router.get("/xem/phancong/dachonkhung", get_giangvien_CNTT_dachonkhung);
  router.post("/xem/phancong/lophoc/hocki", get_monhoc_lop_hocki);
  router.post(
    "/xem/phancong/dachonkhung/chitiet",
    get_giangvien_CNTT_dachonkhung_chitietonly
  );

  //bảng phân công
  router.get("/xem/phancong/listgiangvien", get_listgiangvien_phancong);
  router.post("/tao/phancong/giangvien", create_onlylistgiangvien_phancong);
  return app.use("/api/v1/truongbomon/giangvien", router);
};

module.exports = CRUDgiangvien_CNTT;
