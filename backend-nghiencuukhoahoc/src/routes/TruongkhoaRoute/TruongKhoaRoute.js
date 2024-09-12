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
} = require("../../controllers/TruongkhoaController/testControler");

const { GOI_Y_SERVER, GOI_Y_SERVER_rf } = require("../../utils/controllerTEST");

const { checkUserJWT } = require("../../middlewares/JWTAction");
const TruongKhoaRoute = (app) => {
  router.get("/xem", checkUserJWT, GiangVien_thuoc_KhoaController);
  router.post("/timkiem/email", checkUserJWT, timkiem_email_taikhoanController);
  router.post(
    "/timkiem/ngoaitruong/email",
    timkiem_email_taikhoan_ngoaitruongController
  );
  router.post("/test/tao/excel", CoTyLeExcelController); // Chạy CSDL bằng excel
  router.post("/test/phancong", PhanCongControllerTest);

  router.get("/test/dudoan", GOI_Y_SERVER);
  router.post("/test/dudoan/rf", GOI_Y_SERVER_rf);

  return app.use("/api/v1/truongkhoa", router);
};

module.exports = TruongKhoaRoute;
