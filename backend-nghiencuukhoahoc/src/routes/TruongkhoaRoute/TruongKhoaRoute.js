const express = require("express");
const app = express();

const router = express.Router();

const {
    GiangVien_thuoc_KhoaController,
    timkiem_email_taikhoanController,
} = require("../../controllers/TruongkhoaController/TruongKhoaController");

const {
    LoaiDanhMucExcelController,
    DanhMucExcelController,
    TyLeExcelController,
    CoTyLeExcelController
} = require("../../controllers/TruongkhoaController/testControler");

const TruongKhoaRoute = (app) => {

    router.get("/xem", GiangVien_thuoc_KhoaController);
    router.post("/timkiem/email", timkiem_email_taikhoanController);

    router.post("/test/tao/excel", CoTyLeExcelController); // Chạy CSDL bằng excel

    return app.use("/api/v1/truongkhoa", router);
};

module.exports = TruongKhoaRoute;
