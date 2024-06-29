const express = require("express");
const router = express.Router();
const {
  getAllKHOA,
  createKHOA,
  updateKHOA,
  deleteKHOA,
  getAllBOMON,
  createBOMON,
  updateBOMON,
  deleteBOMON,
} = require("../../controllers/AdminController/khoaAdminCONTROLLER");

//route cho khoa
router.get("/xem-khoa", getAllKHOA);
router.post("/tao-khoa", createKHOA);
router.put("/sua-khoa/:makhoa", updateKHOA);
router.delete("/xoa-khoa", deleteKHOA);

//route cho bộ môn
router.get("/bomon/xem-bomon", getAllBOMON);
router.post("/bomon/tao-bomon", createBOMON);
router.put("/bomon/sua-bomon/:mabomon", updateBOMON);
router.delete("/bomon/xoa-bomon", deleteBOMON);
module.exports = router;
