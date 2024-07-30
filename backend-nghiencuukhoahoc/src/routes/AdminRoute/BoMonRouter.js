const express = require("express");
const app = express();

const router = express.Router();
const {
  getAllBOMON,
  createBOMON,
  updateBOMON,
  deleteBOMON,
  getOnlyBoMon,
} = require("../../controllers/AdminController/khoaAdminCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");
const CRUDBoMon = (app) => {
  // Route cho bộ môn, yêu cầu xác thực JWT
  router.get("/xem", checkUserJWT, getAllBOMON);
  router.post("/only/xem", checkUserJWT, getOnlyBoMon);
  router.post("/tao", checkUserJWT, createBOMON);
  router.put("/sua/:mabomon", checkUserJWT, updateBOMON);
  router.delete("/xoa", checkUserJWT, deleteBOMON);

  return app.use("/api/v1/admin/bomon", router);
};

module.exports = CRUDBoMon;
