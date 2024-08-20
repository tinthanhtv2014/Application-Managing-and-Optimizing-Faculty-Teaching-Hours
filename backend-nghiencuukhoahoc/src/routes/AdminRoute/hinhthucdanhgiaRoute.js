const express = require("express");
const app = express();

const router = express.Router();

const {
  selectAll_hinhthucdanhgia,
  insert_hinhthucdanhgia,
} = require("../../controllers/AdminController/hinhthucdanhgiaAdminCONTROLLER");
const { checkUserJWT } = require("../../middlewares/JWTAction");
const CRUDHinhthucdanhgia = (app) => {
  // Route cho năm học, yêu cầu xác thực JWT
  router.get("/xem", selectAll_hinhthucdanhgia);
  router.post("/tao", insert_hinhthucdanhgia);
  //   router.put("/sua/:MAHKNK", checkUserJWT, sua_hockinienkhoa);
  //   router.delete("/xoa", checkUserJWT, xoa_hockinienkhoa);

  return app.use("/api/v1/admin/hinhthucdanhgia", router);
};

module.exports = CRUDHinhthucdanhgia;
