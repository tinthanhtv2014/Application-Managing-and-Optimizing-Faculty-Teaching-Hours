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
const adminAPIRoute = require("./routes/AdminRoute/adminRoute");
const khoaadminAPIRoute = require("./routes/AdminRoute/KhoaRoute");

const corsOptions = {
  origin: process.env.URL_REACT, // Cho phép truy cập từ tất cả các nguồn
  credentials: true, // Cho phép gửi cookie
};
//===============================sử dụng các dependency
app.use(cors(corsOptions));
app.use(cors()); //config cors cho tất cả truy cập
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
configViewEngine(app);
//===============================
// ------------------route config
app.use("/admin", adminAPIRoute); // route dành cho admin
app.use("/admin/khoa", khoaadminAPIRoute);
//----------------------------------------

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
