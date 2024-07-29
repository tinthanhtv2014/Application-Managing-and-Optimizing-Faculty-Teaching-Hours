const express = require("express");
const app = express();

const router = express.Router();

const {
  get_giangvien_CNTT,
  get_giangvien_CNTT_da_chon_khung,
  get_giangvien_CNTT_chua_chon_khung,
} = require("../../controllers/TruongbomonController/giangvienCONTROLLER");

const CRUDgiangvien_CNTT = (app) => {
  //route cho khoa
  router.get("/xem", get_giangvien_CNTT);
  router.get("/xem/dachonkhung", get_giangvien_CNTT_da_chon_khung);
  router.get("/xem/chuachonkhung", get_giangvien_CNTT_chua_chon_khung);
  //   router.post("/tao", createNAMHOC);
  //   router.put("/sua/:MANAMHOC", updateNAMHOC);
  //   router.delete("/xoa", deleteNAMHOC);

  return app.use("/api/v1/truongbomon/giangvien", router);
};

module.exports = CRUDgiangvien_CNTT;
