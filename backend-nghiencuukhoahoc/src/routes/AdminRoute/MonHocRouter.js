const express = require("express");
const app = express();

const router = express.Router();
const {
    getAllMONHOC,
    createMONHOC,
    updateMONHOC,
    deleteMONHOC
} = require("../../controllers/AdminController/monhocAdminController");

const CRUDMonHoc = (app) => {
    //route cho khoa
    router.get("/xem", getAllMONHOC);
    router.post("/tao", createMONHOC);
    router.put("/sua/:MAMONHOC", updateMONHOC);
    router.delete("/xoa", deleteMONHOC);

    return app.use("/api/v1/admin/monhoc", router);
};

module.exports = CRUDMonHoc;
