const express = require("express");
const app = express();
const pool = require("../../config/database.js");
const router = express.Router();
// const { RandomForestClassifier } = require("ml-random-forest");
const {
  getAllTaiKhoanController,
  createTaiKhoanController,
  createTaiKhoanExcelController,
  updateTaiKhoanController,
  createTaiKhoanOnlyController,
  loginTaikhoanGOOGLEController,
  loginTaikhoanAdminController,
  logoutTaikhoanAdminController,
  getAllTaiKhoanPHANQUYENController,
  getAllTaiKhoanTRANGTHAIController,
} = require("../../controllers/AdminController/adminController.js");
const { checkUserJWT } = require("../../middlewares/JWTAction.js");

const CRUDTaiKhoan = (app) => {
  // Routes không yêu cầu xác thực JWT
  router.post("/dangnhap", loginTaikhoanAdminController); // Đăng nhập với tài khoản và mật khẩu
  router.post("/dangxuat", logoutTaikhoanAdminController); // Đăng xuất
  router.post("/dangnhapgoogle", loginTaikhoanGOOGLEController); // Đăng nhập với email Google

  // Các routes yêu cầu xác thực JWT
  router.post("/tao", checkUserJWT, createTaiKhoanController); // Tạo tài khoản
  router.post("/tao/excel", checkUserJWT, createTaiKhoanExcelController); // Tạo hàng loạt tài khoản
  router.post("/only/tao", checkUserJWT, createTaiKhoanOnlyController); // Tạo tài khoản chỉ với thông tin cần thiết

  router.get("/xem/:MABOMON", checkUserJWT, getAllTaiKhoanController); // Xem tất cả tài khoản theo mã bộ môn
  router.get(
    "/xem/phanquyen/:MABOMON",
    checkUserJWT,
    getAllTaiKhoanPHANQUYENController
  ); // Xem tài khoản theo phân quyền và mã bộ môn
  router.get(
    "/xem/trangthai/:MABOMON",
    checkUserJWT,
    getAllTaiKhoanTRANGTHAIController
  ); // Xem tài khoản theo trạng thái và mã bộ môn
  router.get("/protected", checkUserJWT, (req, res) => {
    res.json({ message: "Protected data", user: req.user }); // Sử dụng thông tin người dùng từ req.user
  });

  // Sửa tài khoản
  router.put("/sua/:tenDangNhap", checkUserJWT, updateTaiKhoanController);

  // router.get(
  //   "/thuattoan/get",
  //   (handleThuatToanController = async (req, res) => {
  //     try {
  //       const chitietphancong = [
  //         {
  //           MAMONHOC: "M01",
  //           MAPHANCONG: "PC01",
  //           MALOP: "L01",
  //           MAHKNK: "HK01",
  //           THOIGIANBATDAUPHANCONG: "2022-01-10",
  //           THOIGIANKETTHUCPHANCONG: "2022-05-10",
  //         },
  //         {
  //           MAMONHOC: "M02",
  //           MAPHANCONG: "PC02",
  //           MALOP: "L02",
  //           MAHKNK: "HK01",
  //           THOIGIANBATDAUPHANCONG: "2022-01-15",
  //           THOIGIANKETTHUCPHANCONG: "2022-05-15",
  //         },
  //         {
  //           MAMONHOC: "M03",
  //           MAPHANCONG: "PC03",
  //           MALOP: "L03",
  //           MAHKNK: "HK01",
  //           THOIGIANBATDAUPHANCONG: "2022-02-01",
  //           THOIGIANKETTHUCPHANCONG: "2022-06-01",
  //         },
  //         // Thêm nhiều dữ liệu mẫu khác...
  //       ];

  //       const lop = [
  //         { MALOP: "L01", TENLOP: "Class A", NAMTUYENSINH: 2021, SISO: 30 },
  //         { MALOP: "L02", TENLOP: "Class B", NAMTUYENSINH: 2021, SISO: 25 },
  //         { MALOP: "L03", TENLOP: "Class C", NAMTUYENSINH: 2021, SISO: 35 },
  //         // Thêm nhiều dữ liệu mẫu khác...
  //       ];

  //       const monhoc = [
  //         {
  //           MAMONHOC: "M01",
  //           TENMONHOC: "Math",
  //           SOTINCHILYTHUYET: 3,
  //           SOTINCHITHUCHANH: 1,
  //         },
  //         {
  //           MAMONHOC: "M02",
  //           TENMONHOC: "Physics",
  //           SOTINCHILYTHUYET: 2,
  //           SOTINCHITHUCHANH: 2,
  //         },
  //         {
  //           MAMONHOC: "M03",
  //           TENMONHOC: "Chemistry",
  //           SOTINCHILYTHUYET: 3,
  //           SOTINCHITHUCHANH: 1,
  //         },
  //         // Thêm nhiều dữ liệu mẫu khác...
  //       ];

  //       const bangphancong = [
  //         { MAGV: "GV01", MAPHANCONG: "PC01", THOIGIANLAP: "2022-01-05" },
  //         { MAGV: "GV02", MAPHANCONG: "PC02", THOIGIANLAP: "2022-01-10" },
  //         { MAGV: "GV03", MAPHANCONG: "PC03", THOIGIANLAP: "2022-01-15" },
  //         // Thêm nhiều dữ liệu mẫu khác...
  //       ];

  //       const data = chitietphancong
  //         .map((item) => {
  //           const lopInfo = lop.find((l) => l.MALOP === item.MALOP);
  //           const monhocInfo = monhoc.find((m) => m.MAMONHOC === item.MAMONHOC);
  //           const bangphancongInfo = bangphancong.find(
  //             (b) => b.MAPHANCONG === item.MAPHANCONG
  //           );

  //           if (!lopInfo || !monhocInfo || !bangphancongInfo) {
  //             console.error(
  //               `Thiếu thông tin cho MAPHANCONG: ${item.MAPHANCONG}`
  //             );
  //             return null; // Skip this item if any info is missing
  //           }

  //           return {
  //             MAMONHOC:
  //               monhocInfo.SOTINCHILYTHUYET + monhocInfo.SOTINCHITHUCHANH, // Tổng số tín chỉ
  //             SISO: lopInfo.SISO, // Sĩ số lớp
  //             THOIGIANBATDAU: new Date(item.THOIGIANBATDAUPHANCONG).getTime(), // Thời gian bắt đầu
  //             THOIGIANKETTHUC: new Date(item.THOIGIANKETTHUCPHANCONG).getTime(), // Thời gian kết thúc
  //             MAGV: bangphancongInfo.MAGV, // Mã giảng viên
  //           };
  //         })
  //         .filter((d) => d !== null); // Filter out any null values

  //       const features = data.map((d) => [
  //         d.MAMONHOC,
  //         d.SISO,
  //         d.THOIGIANBATDAU,
  //         d.THOIGIANKETTHUC,
  //       ]);
  //       const labels = data.map((d) => d.MAGV);
  //       const uniqueClasses = new Set(labels); // labels array contains MAGV values
  //       const numberOfClasses = uniqueClasses.size;
  //       console.log("check array => ", numberOfClasses);
  //       if (!numberOfClasses && numberOfClasses < 0) {
  //         console.log("underfind", numberOfClasses);
  //         return;
  //       }
  //       if (numberOfClasses <= 0) {
  //         // Điều kiện kiểm tra đơn giản hơn
  //         console.log("underfind", numberOfClasses);
  //         return;
  //       }
  //       let counts = new Array(numberOfClasses).fill(0);

  //       const rf = new RandomForestClassifier({ nEstimators: 10 });
  //       rf.train(features, labels);

  //       // Dự đoán giảng viên nên dạy môn học nào
  //       const newMonHoc = [
  //         4,
  //         30,
  //         new Date("2023-01-10").getTime(),
  //         new Date("2023-05-10").getTime(),
  //       ];
  //       const predictedGV = rf.predict([newMonHoc]);

  //       console.log("Giảng viên được gợi ý:", predictedGV[0]);
  //       console.log("Giảng viên được gợi ý:", counts);
  //       return res.status(200).json({
  //         DT: predictedGV[0],
  //       });
  //     } catch (error) {
  //       console.log("loi ", error);
  //     }
  //   })
  // );

  return app.use("/api/v1/admin/taikhoan", router);
};

module.exports = CRUDTaiKhoan;
