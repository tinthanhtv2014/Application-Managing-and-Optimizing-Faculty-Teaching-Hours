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
  getOnlyChuongtrinhdaotao,
  getAllChuongtrinhdaotao,
  createChuongtrinhdaotaoControler,
  updateChuongtrinhdaotaoController,
  deleteChuongtrinhdaotaoController,
  createCHUONGTRINHDAOTAOExcelController,
  getOnlyChuongtrinhdaotao_withHOCKI,
} = require("../../controllers/AdminController/chuongtrinhdaotaoAdminCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");
const CRUDMonHoc = (app) => {
  // Route cho môn học, yêu cầu xác thực JWT
  router.get("/xem", checkUserJWT, getAllMONHOC);
  router.post("/tao", checkUserJWT, createMONHOC);
  router.put("/sua/:MAMONHOC", checkUserJWT, updateMONHOC);
  router.delete("/xoa", checkUserJWT, deleteMONHOC);

  // Router cho chương trình đào tạo, yêu cầu xác thực JWT
  router.get("/chuongtrinh/xem", getAllChuongtrinhdaotao);
  router.post("/chuongtrinh/only/xem", checkUserJWT, getOnlyChuongtrinhdaotao);
  router.post(
    "/chuongtrinh/only/hocki/xem",
    checkUserJWT,
    getOnlyChuongtrinhdaotao_withHOCKI
  );
  router.post(
    "/chuongtrinh/tao",
    checkUserJWT,
    createCHUONGTRINHDAOTAOExcelController
  );
  router.put("/chuongtrinh/sua/:MAMONHOC", checkUserJWT, updateMONHOC);
  router.delete("/chuongtrinh/xoa", deleteChuongtrinhdaotaoController);
  return app.use("/api/v1/admin/monhoc", router);
};

module.exports = CRUDMonHoc;
