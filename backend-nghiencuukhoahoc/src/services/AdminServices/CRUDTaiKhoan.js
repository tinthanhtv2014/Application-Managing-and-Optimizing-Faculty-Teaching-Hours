const pool = require("../../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const { createJWT } = require("../../middlewares/JWTAction");

//hàm hash mật khẩu
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //let check = bcrypt.compareSync(password, hashPassword);
  return hashPassword;
};
//hàm ktr mật khẩu đã hash
const checkPassword = (inputpassword, hashpass) => {
  return bcrypt.compareSync(inputpassword, hashpass);
};

//hàm kiểm tra tài khoản
const timTaiKhoan_TENDANGNHAP = async (tenDangnhap) => {
  try {
    const [results, fields] = await pool.execute(
      "SELECT * FROM TAIKHOAN WHERE TENDANGNHAP = ?",
      [tenDangnhap]
    );

    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("timTaiKhoan_TENDANGNHAP errr >>>", error);
    return false;
  }
};

// =============================================================================================================================
//hàm chức năng
const getAllTaiKhoan = async () => {
  try {
    let [results, fields] = await pool.execute("select * from TAIKHOAN");
    return {
      EM: "xem thoong tin thanh cong",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "không thể xem thông tin",
      EC: 0,
      DT: [],
    };
  }
};

const createTaiKhoan = async (dataTaiKhoan) => {
  //dataTaiKhoan bao gồm TENDANGNHAP, MAGV, MATKHAU, PHANQUYEN, TRANGTHAITAIKHOAN	
  try {
    let exists = await timTaiKhoan_TENDANGNHAP(dataTaiKhoan.TENDANGNHAP);

    if (exists) {
      return {
        EM: "Tài khoản đã tồn tại không thể tạo thêm",
        EC: 0,
        DT: [],
      };
    }

    let hashpass = await hashPassword(matKhau);

    let [results, fields] = await pool.execute(
      `INSERT INTO TAIKHOAN (TENDANGNHAP, MATKHAU, PHANQUYEN, TRANGTHAI) VALUES (?, ?, ?, ?, ?)`,
      [
        dataTaiKhoan.TENDANGNHAP,
        dataTaiKhoan.MAGV,
        dataTaiKhoan.MATKHAU,
        dataTaiKhoan.PHANQUYEN,
        dataTaiKhoan.TRANGTHAITAIKHOAN
      ]
    );

    return {
      EM: "Tạo tài khoản thành công",
      EC: 1,
      DT: results,
    };

  } catch (error) {
    return {
      EM: "lỗi services createTaiKhoan",
      EC: 1,
      DT: [],
    };
  }
};

const createTaiKhoanExcel = async (dataTaiKhoanExcelArray) => {
  // dataTaiKhoanExcelArray phải bao gồm TENDANGNHAP, MAGV, MATKHAU, PHANQUYEN, TRANGTHAITAIKHOAN
  // không được để trống TENDANGNHAP và MAGV
  try {
    let results = [];
    for (let dataTaiKhoanExcel of dataTaiKhoanExcelArray) {
      // Kiểm tra TENDANGNHAP và MAGV
      if (!dataTaiKhoanExcel.TENDANGNHAP || !dataTaiKhoanExcel.MAGV) {
        results.push({
          EM: "TENDANGNHAP và MAGV không được để trống",
          EC: 0,
          DT: dataTaiKhoanExcel,
        });
        continue; // Tiếp tục thực hiện các lệnh khác
      }

      // Kiểm tra tài khoản đã tồn tại
      let exists = await timTaiKhoan_TENDANGNHAP(dataTaiKhoanExcel.TENDANGNHAP);
      if (exists) {
        results.push({
          EM: "Tài khoản đã tồn tại không thể tạo thêm",
          EC: 0,
          DT: dataTaiKhoanExcel,
        });
        continue; // Tiếp tục thực hiện các lệnh khác
      }

      // Hash mật khẩu
      let hashpass = await hashPassword(dataTaiKhoanExcel.MATKHAU);

      // Tạo tài khoản mới
      let [result, fields] = await pool.execute(
        `INSERT INTO TAIKHOAN (TENDANGNHAP, MAGV, MATKHAU, PHANQUYEN, TRANGTHAITAIKHOAN) VALUES (?, ?, ?, ?, ?)`,
        [
          dataTaiKhoanExcel.TENDANGNHAP,
          dataTaiKhoanExcel.MAGV,
          hashpass,
          dataTaiKhoanExcel.PHANQUYEN,
          dataTaiKhoanExcel.TRANGTHAITAIKHOAN,
        ]
      );

      results.push({
        EM: "Tạo tài khoản thành công",
        EC: 1,
        DT: result,
      });
    }

    return results;

  } catch (error) {
    return {
      EM: "Lỗi services createTaiKhoan",
      EC: 1,
      DT: [],
    };
  }
};

const LoginTaikhoan = async (tenDangnhap, matKhau) => {
  try {
    const [results, fields] = await pool.execute(
      "SELECT * FROM `TAIKHOAN` WHERE `TENDANGNHAP` = ?",
      [tenDangnhap]
    );

    if (results.length > 0) {
      const isCorrectPass = await bcrypt.compare(matKhau, results[0].MATKHAU);

      if (isCorrectPass) {
        let payload = {
          taikhoan: results[0].TENDANGNHAP,
          matkhau: results[0].MATKHAU,
          phanquyen: results[0].PHANQUYEN,
        };
        let token = createJWT(payload);
        return {
          EM: "đăng nhập thành công",
          EC: 1,
          DT: {
            access_token: token,
            data: results,
          },
        };
      } else {
        return {
          EM: "đăng nhập thất bại, mật khẩu không đúng",
          EC: 0,
          DT: {
            access_token: null,
            data: [],
          },
        };
      }
    } else {
      return {
        EM: "đăng nhập thất bại, tài khoản không đúng",
        EC: 0,
        DT: {
          access_token: null,
          data: [],
        },
      };
    }
  } catch (error) {
    console.error("Error in LoginTaikhoan:", error);
    return {
      EM: "lỗi services LoginTaikhoan",
      EC: 1,
      DT: [],
    };
  }
};

const updateTaiKhoan = async (
  tenDangnhap,
  matKhaucu,
  matkhaumoi,
  phanQuyen,
  trangThai
) => {
  try {
    let [results1, fields1] = await pool.execute(
      "select * from taikhoan where TENDANGNHAP = ?",
      [tenDangnhap]
    );
    console.log(results1);
    if (results1.length > 0) {
      const isCorrectPass = await bcrypt.compare(
        matKhaucu,
        results1[0].MATKHAU
      );
      if (isCorrectPass) {
        let hashpass = await hashPassword(matkhaumoi);
        let [results, fields] = await pool.execute(
          `UPDATE taikhoan SET MATKHAU = ?, PHANQUYEN = ?, TRANGTHAI = ? WHERE TENDANGNHAP = ?`,
          [hashpass, phanQuyen, trangThai, tenDangnhap]
        );
        return {
          EM: "update thành công",
          EC: 0,
          DT: [],
        };
      }
      return {
        EM: "mật khẩu cũ không khớp không thể update",
        EC: 0,
        DT: [],
      };
    }
    return {
      EM: "tài khoản không tồn tại",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "lỗi services createTaiKhoan",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllTaiKhoan,
  createTaiKhoan,
  createTaiKhoanExcel,
  updateTaiKhoan,

  LoginTaikhoan,
};
