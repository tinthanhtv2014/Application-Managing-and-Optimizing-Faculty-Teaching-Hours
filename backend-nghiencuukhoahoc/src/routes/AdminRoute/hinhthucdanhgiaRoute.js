const express = require("express");
const app = express();

const router = express.Router();

const {
  selectAll_hinhthucdanhgia,
  insert_hinhthucdanhgia,
  sua_hinhthucdanhgia,
  xoa_hinhthucdanhgia,
} = require("../../controllers/AdminController/hinhthucdanhgiaAdminCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction");
const CRUDHinhthucdanhgia = (app) => {
  // Route cho năm học, yêu cầu xác thực JWT
  router.get("/xem", checkUserJWT, selectAll_hinhthucdanhgia);
  router.post("/tao", checkUserJWT, insert_hinhthucdanhgia);
  router.put("/sua/:MADANHGIAKETTHUC", checkUserJWT, sua_hinhthucdanhgia);
  router.delete("/xoa", checkUserJWT, xoa_hinhthucdanhgia);

  return app.use("/api/v1/admin/hinhthucdanhgia", router);
};

module.exports = CRUDHinhthucdanhgia;
