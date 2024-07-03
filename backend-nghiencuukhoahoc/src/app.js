const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connection = require("./config/database");
const configViewEngine = require("./config/ViewEngine");

// Router =========================================================================
const CRUDTaiKhoan = require("./routes/AdminRoute/adminRoute");
const CRUDKhoa = require("./routes/AdminRoute/KhoaRoute");
const CRUDBoMon = require("./routes/AdminRoute/BoMonRouter");
const CRUDGiangVien = require("./routes/AdminRoute/GiangVienRouter");
const CRUDMonHoc = require("./routes/AdminRoute/MonHocRouter");

//=================================================================================

const corsOptions = {
  origin: process.env.URL_REACT, // Cho phép truy cập từ tất cả các nguồn
  credentials: true, // Cho phép gửi cookie
};

//===============================sử dụng các dependency
app.use(cors(corsOptions));
// app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

configViewEngine(app);
//===============================

//route config ========================================================================================
CRUDTaiKhoan(app); // route CRUD bảng taikhoan dành cho admin
CRUDKhoa(app); //CRUD bảng khoa
CRUDBoMon(app); // CRUD bộ môn
CRUDGiangVien(app); // CRUD giảng viên
CRUDMonHoc(app)//CRUD môn học
//=====================================================================================================

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
