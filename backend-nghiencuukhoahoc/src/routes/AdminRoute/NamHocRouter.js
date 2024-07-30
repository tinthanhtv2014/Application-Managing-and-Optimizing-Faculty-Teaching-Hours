const express = require("express");
const app = express();

const router = express.Router();
const {
  getAllNAMHOC,
  createNAMHOC,
  updateNAMHOC,
  deleteNAMHOC,
} = require("../../controllers/AdminController/namhocController");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");
const CRUDNamHoc = (app) => {
  // Route cho năm học, yêu cầu xác thực JWT
  router.get("/xem", checkUserJWT, getAllNAMHOC);
  router.post("/tao", checkUserJWT, createNAMHOC);
  router.put("/sua/:MANAMHOC", checkUserJWT, updateNAMHOC);
  router.delete("/xoa", checkUserJWT, deleteNAMHOC);

  return app.use("/api/v1/admin/namhoc", router);
};

module.exports = CRUDNamHoc;
