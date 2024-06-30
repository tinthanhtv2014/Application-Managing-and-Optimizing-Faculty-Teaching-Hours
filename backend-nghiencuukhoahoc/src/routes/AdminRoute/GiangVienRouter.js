const express = require("express");
const app = express();

const router = express.Router();
const {
    getAllGiangVien,
    createGiangVienControler,
    updateGiangVienController,
    deleteGiangVienController
} = require("../../controllers/AdminController/giangVienAdminController");

const CRUDGiangVien = (app) => {

    //route cho giảng viên
    router.get("/xem", getAllGiangVien);
    router.post("/tao", createGiangVienControler);
    router.put("/sua/:maGV", updateGiangVienController);
    router.delete("/xoa", deleteGiangVienController);

    return app.use("/api/v1/admin/giangvien", router);
}

module.exports = CRUDGiangVien;
