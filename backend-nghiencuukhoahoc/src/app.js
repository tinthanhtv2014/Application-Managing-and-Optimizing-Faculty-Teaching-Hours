const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3307;
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connection = require("./config/database");
const configViewEngine = require("./config/ViewEngine");
const moment = require("moment");
const { spawn } = require("child_process");
const { exec } = require("child_process");
const axios = require("axios");
const knn = require("ml-knn");
// Router =========================================================================
const CRUDTaiKhoan = require("./routes/AdminRoute/adminRoute");
const CRUDKhoa = require("./routes/AdminRoute/KhoaRoute");
const CRUDBoMon = require("./routes/AdminRoute/BoMonRouter");
const CRUDGiangVien = require("./routes/AdminRoute/GiangVienRouter");
const CRUDMonHoc = require("./routes/AdminRoute/MonHocRouter");
const CRUDNamHoc = require("./routes/AdminRoute/NamHocRouter");
const CRUDgiangvien_CNTT = require("./routes/TruongbomonRoute/giangvienRoute");
const CRUDchuongtrinh_CNTT = require("./routes/TruongbomonRoute/chuongtrinhRoute");
const QuyenGiangVienRouter = require("./routes/GiangvienRoute/QuyenGiangVienRouter");
const CURDanhMuc = require("./routes/AdminRoute/DanhMucRoute");
const TruongKhoaRoute = require("./routes/TruongkhoaRoute/TruongKhoaRoute");
const CRUDHockinienkhoa = require("./routes/AdminRoute/hockinienkhoaRoute");
const DangKyDanhMucRoute = require("./routes/GiangvienRoute/DangKyDanhMucSpKHCNRoute");
const CRUDHinhthucdanhgia = require("./routes/AdminRoute/hinhthucdanhgiaRoute");
//=================================================================================

const corsOptions = {
  origin: process.env.URL_REACT, // Cho phép truy cập từ tất cả các nguồn
  credentials: true, // Cho phép gửi cookie
};

//===============================sử dụng các dependency
app.use(cors(corsOptions));
// app.use(cors());

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

configViewEngine(app);
//===============================

//route config ========================================================================================
CRUDTaiKhoan(app); // route CRUD bảng taikhoan dành cho admin
CRUDKhoa(app); //CRUD bảng khoa
CRUDBoMon(app); // CRUD bộ môn
CRUDGiangVien(app); // CRUD giảng viên
CRUDMonHoc(app); //CRUD môn học
CRUDNamHoc(app); // CRUD năm học
CRUDgiangvien_CNTT(app);
QuyenGiangVienRouter(app); // Api cho quyền giảng viên
CRUDchuongtrinh_CNTT(app);
TruongKhoaRoute(app); // Các router cho trưởng khoa sử dụng
CURDanhMuc(app); // route CRUD bảng taikhoan dành cho admin
CRUDHockinienkhoa(app); // route CRUD
DangKyDanhMucRoute(app); // route chức năng cho quy đổi giờ chuẩn
CRUDHinhthucdanhgia(app); //route hình thức đánh giá
//=====================================================================================================

app.post("/test-hello", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5000/predict");
    res.send(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error connecting to Python server");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// -----------------------------------------------------------------------------------------------------------------------

// const cluster = require("cluster");
// const http = require("http");
// const os = require("os");
// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const configViewEngine = require("./config/ViewEngine");

// // Router =========================================================================
// const CRUDTaiKhoan = require("./routes/AdminRoute/adminRoute");
// const CRUDKhoa = require("./routes/AdminRoute/KhoaRoute");
// const CRUDBoMon = require("./routes/AdminRoute/BoMonRouter");
// const CRUDGiangVien = require("./routes/AdminRoute/GiangVienRouter");
// const CRUDMonHoc = require("./routes/AdminRoute/MonHocRouter");
// const CRUDNamHoc = require("./routes/AdminRoute/NamHocRouter");
// const CRUDgiangvien_CNTT = require("./routes/TruongbomonRoute/giangvienRoute");
// const CRUDchuongtrinh_CNTT = require("./routes/TruongbomonRoute/chuongtrinhRoute");
// const QuyenGiangVienRouter = require("./routes/GiangvienRoute/QuyenGiangVienRouter");
// const CURDanhMuc = require("./routes/AdminRoute/DanhMucRoute");
// const TruongKhoaRoute = require("./routes/TruongkhoaRoute/TruongKhoaRoute");
// const CRUDHockinienkhoa = require("./routes/AdminRoute/hockinienkhoaRoute");
// const DangKyDanhMucRoute = require("./routes/GiangvienRoute/DangKyDanhMucSpKHCNRoute");
// const CRUDHinhthucdanhgia = require("./routes/AdminRoute/hinhthucdanhgiaRoute");
// //=================================================================================

// const corsOptions = {
//   origin: process.env.URL_REACT,
//   credentials: true,
// };

// const numCPUs = os.cpus().length;

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     cluster.fork(); // Restart a new worker if one dies
//   });
// } else {
//   const app = express();
//   const port = process.env.PORT || 3307;

//   app.use(cors(corsOptions));
//   app.use(cookieParser());
//   app.use(express.json({ limit: "50mb" }));
//   app.use(express.urlencoded({ limit: "50mb", extended: true }));
//   app.use(bodyParser.urlencoded({ extended: false }));
//   app.use(bodyParser.json());

//   configViewEngine(app);

//   // Route configuration
//   CRUDTaiKhoan(app);
//   CRUDKhoa(app);
//   CRUDBoMon(app);
//   CRUDGiangVien(app);
//   CRUDMonHoc(app);
//   CRUDNamHoc(app);
//   CRUDgiangvien_CNTT(app);
//   QuyenGiangVienRouter(app);
//   CRUDchuongtrinh_CNTT(app);
//   TruongKhoaRoute(app);
//   CURDanhMuc(app);
//   CRUDHockinienkhoa(app);
//   DangKyDanhMucRoute(app);
//   CRUDHinhthucdanhgia(app);

//   app.get("/", (req, res) => {
//     res.send("Hello World!");
//   });

//   app.listen(port, () => {
//     console.log(`Worker ${process.pid} started on http://localhost:${port}`);
//   });
// }
