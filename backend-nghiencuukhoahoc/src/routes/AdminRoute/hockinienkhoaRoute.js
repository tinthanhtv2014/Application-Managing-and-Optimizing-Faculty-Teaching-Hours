const express = require("express");
const app = express();

const router = express.Router();

const {
  getAll_hockinienkhoa,
  tao_hockinienkhoa,
  sua_hockinienkhoa,
  xoa_hockinienkhoa,
} = require("../../controllers/AdminController/hockinienkhoaAdminCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction");
const CRUDHockinienkhoa = (app) => {
  // Route cho năm học, yêu cầu xác thực JWT
  router.get("/xem", checkUserJWT, getAll_hockinienkhoa);
  router.post("/tao", tao_hockinienkhoa);
  router.put("/sua/:MAHKNK", sua_hockinienkhoa);
  router.delete("/xoa", checkUserJWT, xoa_hockinienkhoa);

  return app.use("/api/v1/admin/hockinienkhoa", router);
};

module.exports = CRUDHockinienkhoa;
