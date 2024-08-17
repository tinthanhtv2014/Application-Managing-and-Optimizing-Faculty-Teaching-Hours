const express = require("express");
const app = express();

const router = express.Router();

const {
  get_chuongtrinhdaotao_tenbomon,
  get_chuongtrinhdaotao,
  getOnlyChuongtrinhdaotao_withHOCKI,
} = require("../../controllers/TruongbomonController/chuongtrinhdaotaoCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction");
const CRUDchuongtrinh_CNTT = (app) => {
  //route cho khoa
  router.post("/xem", get_chuongtrinhdaotao);
  router.post("/xem/bomon", checkUserJWT, get_chuongtrinhdaotao_tenbomon);
  router.post("/xem/hocki", checkUserJWT, getOnlyChuongtrinhdaotao_withHOCKI);
  //   router.post("/tao", createNAMHOC);
  //   router.put("/sua/:MANAMHOC", updateNAMHOC);
  //   router.delete("/xoa", deleteNAMHOC);

  return app.use("/api/v1/truongbomon/chuongtrinh", router);
};

module.exports = CRUDchuongtrinh_CNTT;
