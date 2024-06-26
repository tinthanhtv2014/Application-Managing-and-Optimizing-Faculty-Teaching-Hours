const express = require("express");
const router = express.Router();
const {
  getAllKHOA,
  createKHOA,
  updateKHOA,
  deleteKHOA,
} = require("../../controllers/AdminController/khoaAdminCONTROLLER");

//login cho admin
router.get("/xem-khoa", getAllKHOA);
router.post("/tao-khoa", createKHOA);
router.put("/sua-khoa/:makhoa", updateKHOA);
router.delete("/xoa-khoa", deleteKHOA);
module.exports = router;
