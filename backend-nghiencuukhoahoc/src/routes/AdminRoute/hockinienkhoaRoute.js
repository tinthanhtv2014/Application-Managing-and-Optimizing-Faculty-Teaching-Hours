const express = require("express");
const app = express();

const router = express.Router();

const {
  getAll_hockinienkhoa,
  tao_hockinienkhoa,
} = require("../../controllers/AdminController/hockinienkhoaAdminCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction");
const CRUDHockinienkhoa = (app) => {
  // Route cho năm học, yêu cầu xác thực JWT
  router.get("/xem", getAll_hockinienkhoa);
  router.post("/tao", tao_hockinienkhoa);
  // router.put("/sua/:MANAMHOC", checkUserJWT, updateNAMHOC);
  // router.delete("/xoa", checkUserJWT, deleteNAMHOC);

  return app.use("/api/v1/admin/hockinienkhoa", router);
};

module.exports = CRUDHockinienkhoa;
