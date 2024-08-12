const express = require("express");
const app = express();
const router = express.Router();

const {
    select_loaitacgia_loaidanhmuc,
} = require("../../controllers/GiangvienController/danhmucGiangVienCONTROLLER");

const DangKyDanhMucRoute = (app) => {
    router.post("/loaidanhmuc/loaitacgia", select_loaitacgia_loaidanhmuc);

    return app.use("/api/v1/quyengiangvien/giangvien", router);
};

module.exports = DangKyDanhMucRoute;