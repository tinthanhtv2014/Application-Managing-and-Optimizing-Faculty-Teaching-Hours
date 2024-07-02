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

const CRUDKhoa = (app) => {
  //route cho khoa
  router.get("/xem", getAllKHOA);
  router.post("/only/xem", getOneKHOA);
  router.post("/tao", createKHOA);
  router.put("/sua/:makhoa", updateKHOA);
  router.delete("/xoa", deleteKHOA);

  return app.use("/api/v1/admin/khoa", router);
};

module.exports = CRUDKhoa;
