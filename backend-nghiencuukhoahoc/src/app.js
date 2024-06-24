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
const corsOptions = {
  origin: process.env.URL_REACT, // Cho phép truy cập từ tất cả các nguồn
  credentials: true, // Cho phép gửi cookie
};

app.use(cors()); //config cors cho tất cả truy cập
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
configViewEngine(app);

// ------------------Test api
const { getAllTaiKhoanController, createTaiKhoanController, updateTaiKhoanController } = require('./controllers/AdminController/adminController');

app.get("/api/tai-khoan", getAllTaiKhoanController);
app.post("/api/tao-tai-khoan", createTaiKhoanController);
app.put("/api/sua-tai-khoan/:tenDangNhap", updateTaiKhoanController);


//----------------------------------------

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

