const express = require("express");
const app = express();

const router = express.Router();
const {
  getAllKHOA,
  createKHOA,
  updateKHOA,
  deleteKHOA,
  getOneKHOA,
} = require("../../controllers/AdminController/khoaAdminCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");
const CRUDKhoa = (app) => {
  // Route cho khoa, yêu cầu xác thực JWT
  router.get("/xem", checkUserJWT, getAllKHOA);
  router.post("/only/xem", checkUserJWT, getOneKHOA);
  router.post("/tao", checkUserJWT, createKHOA);
  router.put("/sua/:makhoa", checkUserJWT, updateKHOA);
  router.delete("/xoa", checkUserJWT, deleteKHOA);

  return app.use("/api/v1/admin/khoa", router);
};

module.exports = CRUDKhoa;
