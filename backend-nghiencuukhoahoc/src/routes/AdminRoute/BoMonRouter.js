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

const CRUDBoMon = (app) => {
  //route cho bộ môn
  router.get("/xem", getAllBOMON);
  router.post("/only/xem", getOnlyBoMon);
  router.post("/tao", createBOMON);
  router.put("/sua/:mabomon", updateBOMON);
  router.delete("/xoa", deleteBOMON);

  return app.use("/api/v1/admin/bomon", router);
};

module.exports = CRUDBoMon;
