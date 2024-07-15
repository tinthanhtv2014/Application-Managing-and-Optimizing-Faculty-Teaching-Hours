const express = require("express");
const app = express();

const router = express.Router();
const {
    getAllNAMHOC,
    createNAMHOC,
    updateNAMHOC,
    deleteNAMHOC
} = require("../../controllers/AdminController/namhocController");

const CRUDNamHoc = (app) => {
    //route cho khoa
    router.get("/xem", getAllNAMHOC);
    router.post("/tao", createNAMHOC);
    router.put("/sua/:MANAMHOC", updateNAMHOC);
    router.delete("/xoa", deleteNAMHOC);

    return app.use("/api/v1/admin/namhoc", router);
};

module.exports = CRUDNamHoc;