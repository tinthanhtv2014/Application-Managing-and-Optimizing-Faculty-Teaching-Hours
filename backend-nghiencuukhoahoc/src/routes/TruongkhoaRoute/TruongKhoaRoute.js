const express = require("express");
const app = express();

const router = express.Router();

const {
  GiangVien_thuoc_KhoaController,
  timkiem_email_taikhoanController,
  timkiem_email_taikhoan_ngoaitruongController,
} = require("../../controllers/TruongkhoaController/TruongKhoaController");

const {
  LoaiDanhMucExcelController,
  DanhMucExcelController,
  TyLeExcelController,
  CoTyLeExcelController,

  PhanCongControllerTest,

  Training_RandomForestControllerTest,
} = require("../../controllers/TruongkhoaController/testControler");

const { GOI_Y_SERVER, GOI_Y_SERVER_rf } = require("../../utils/controllerTEST");

const { checkUserJWT } = require("../../middlewares/JWTAction");
const TruongKhoaRoute = (app) => {
  router.get("/xem", checkUserJWT, GiangVien_thuoc_KhoaController);
  router.post("/timkiem/email", checkUserJWT, timkiem_email_taikhoanController);
  router.post(
    "/timkiem/ngoaitruong/email",
    checkUserJWT,
    timkiem_email_taikhoan_ngoaitruongController
  );
  router.post("/test/tao/excel", checkUserJWT, CoTyLeExcelController); // Chạy CSDL bằng excel
  // router.post("/test/phancong", checkUserJWT, PhanCongControllerTest);
  router.post("/test/phancong", checkUserJWT, Training_RandomForestControllerTest);


  // router.post("/test/python", checkUserJWT, Training_RandomForestControllerTest);

  router.get("/test/dudoan", checkUserJWT, GOI_Y_SERVER);
  router.post("/test/dudoan/rf", checkUserJWT, GOI_Y_SERVER_rf);

  return app.use("/api/v1/truongkhoa", router);
};

module.exports = TruongKhoaRoute;
