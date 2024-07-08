const express = require("express");
const router = express.Router();

const {
    updateThongTinGiangVienController,
} = require("../../controllers/GiangvienController/GiangVienController");

const QuyenGiangVienRouter = (app) => {
    //route cho giảng viên
    router.put("/sua/thongtin/:TENDANGNHAP", updateThongTinGiangVienController);

    return app.use("/api/v1/quyengiangvien/giangvien", router);
};

module.exports = QuyenGiangVienRouter;