const express = require("express");
const app = express();

const router = express.Router();
const {
  getAllMONHOC,
  createMONHOC,
  updateMONHOC,
  deleteMONHOC,
} = require("../../controllers/AdminController/monhocAdminController");

const {
  getAllChuongtrinhdaotao,
  createChuongtrinhdaotaoControler,
  updateChuongtrinhdaotaoController,
  deleteChuongtrinhdaotaoController,
  createCHUONGTRINHDAOTAOExcelController,
} = require("../../controllers/AdminController/chuongtrinhdaotaoAdminCONTROLLER");

const CRUDMonHoc = (app) => {
  //route cho khoa
  router.get("/xem", getAllMONHOC);
  router.post("/tao", createMONHOC);
  router.put("/sua/:MAMONHOC", updateMONHOC);
  router.delete("/xoa", deleteMONHOC);

  //router cho chuong trinh dao tao
  router.get("/chuongtrinh/xem", getAllChuongtrinhdaotao);
  router.post("/chuongtrinh/tao", createCHUONGTRINHDAOTAOExcelController);
  router.put("/sua/:MAMONHOC", updateMONHOC);
  router.delete("/xoa", deleteMONHOC);
  return app.use("/api/v1/admin/monhoc", router);
};

module.exports = CRUDMonHoc;
