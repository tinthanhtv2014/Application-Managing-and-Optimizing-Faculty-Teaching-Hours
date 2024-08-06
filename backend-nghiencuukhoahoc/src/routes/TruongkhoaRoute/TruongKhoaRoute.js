const express = require("express");
const app = express();

const router = express.Router();

const {
    GiangVien_thuoc_KhoaController,
    testController,
} = require("../../controllers/TruongkhoaController/TruongKhoaController");

const TruongKhoaRoute = (app) => {

    router.get("/xem", GiangVien_thuoc_KhoaController);

    router.post("/test/tao/excel", testController);

    return app.use("/api/v1/truongkhoa", router);
};

module.exports = TruongKhoaRoute;
