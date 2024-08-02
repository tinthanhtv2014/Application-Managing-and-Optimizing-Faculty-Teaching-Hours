const express = require("express");
const app = express();

const router = express.Router();

const {
  get_chuongtrinhdaotao_tenbomon,
  get_chuongtrinhdaotao,
} = require("../../controllers/TruongbomonController/chuongtrinhdaotaoCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction");
const CRUDgiangvien_CNTT = (app) => {
  //route cho khoa
  router.get("/xem", checkUserJWT, get_chuongtrinhdaotao);
  router.get("/xem/bomon", get_chuongtrinhdaotao_tenbomon);

  //   router.post("/tao", createNAMHOC);
  //   router.put("/sua/:MANAMHOC", updateNAMHOC);
  //   router.delete("/xoa", deleteNAMHOC);

  return app.use("/api/v1/truongbomon/chuongtrinh", router);
};

module.exports = CRUDgiangvien_CNTT;
