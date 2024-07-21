const express = require("express");
const app = express();

const router = express.Router();

const {
  get_giangvien_CNTT,
} = require("../../controllers/TruongbomonController/giangvienCONTROLLER");

const CRUDgiangvien_CNTT = (app) => {
  //route cho khoa
  router.get("/xem", get_giangvien_CNTT);
  //   router.post("/tao", createNAMHOC);
  //   router.put("/sua/:MANAMHOC", updateNAMHOC);
  //   router.delete("/xoa", deleteNAMHOC);

  return app.use("/api/v1/truongbomon/giangvien", router);
};

module.exports = CRUDgiangvien_CNTT;
