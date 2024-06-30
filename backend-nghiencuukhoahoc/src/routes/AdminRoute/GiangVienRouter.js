const express = require("express");
const app = express();

const router = express.Router();
const {
    getAllGiangVien,
} = require("../../controllers/AdminController/giangVienAdminController");

const CRUDGiangVien = (app) => {

    //route cho giảng viên
    router.get("/xem", getAllGiangVien);
    // router.post("/tao", createKHOA);
    // router.put("/sua/:makhoa", updateKHOA);
    // router.delete("/xoa", deleteKHOA);

    return app.use("/api/v1/admin/giangvien", router);
}

module.exports = CRUDGiangVien;
