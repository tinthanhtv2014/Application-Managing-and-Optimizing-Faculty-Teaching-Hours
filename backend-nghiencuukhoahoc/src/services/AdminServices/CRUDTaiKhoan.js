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

//hàm check mail
function isValidEmail(email) {
  // Biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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

    let hashpass = await hashPassword(dataTaiKhoan.MATKHAU);

    let [results, fields] = await pool.execute(
      `INSERT INTO taikhoan (TENDANGNHAP, MAGV, MATKHAU, PHANQUYEN, TRANGTHAITAIKHOAN) VALUES (?, ?, ?, ?, ?)`,
      [
        dataTaiKhoan.TENDANGNHAP,
        dataTaiKhoan.MAGV,
        hashpass,
        dataTaiKhoan.PHANQUYEN,
        dataTaiKhoan.TRANGTHAITAIKHOAN,
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
    for (var i = 0; i < dataTaiKhoanExcelArray.length; i++) {
      // Kiểm tra TENDANGNHAP và MAGV
      if (
        !dataTaiKhoanExcelArray[i].tenDangNhap ||
        !dataTaiKhoanExcelArray[i].MAGV
      ) {
        return {
          EM: "bị trống thông tin",
          EC: 0,
          DT: [],
        }; // Tiếp tục thực hiện các lệnh khác
      }

      // Kiểm tra tài khoản đã tồn tại
      let exists = await timTaiKhoan_TENDANGNHAP(
        dataTaiKhoanExcelArray[i].tenDangNhap
      );
      if (exists) {
        return {
          EM: "tồn tại tk rồi",
          EC: 0,
          DT: [],
        }; // Tiếp tục thực hiện các lệnh khác
      }

      // Hash mật khẩu
      // let hashpass = await hashPassword(dataTaiKhoanExcelArray[i].MATKHAU);
      let [result1, fields1] = await pool.execute(
        `INSERT INTO giangvien (MAGV) VALUES (?)`,
        [dataTaiKhoanExcelArray[i].MAGV]
      );
      // Tạo tài khoản mới
      let [result, fields] = await pool.execute(
        `INSERT INTO TAIKHOAN (TENDANGNHAP, MAGV, PHANQUYEN, TRANGTHAITAIKHOAN) VALUES (?, ?,  ?, ?)`,
        [
          dataTaiKhoanExcelArray[i].tenDangNhap,
          dataTaiKhoanExcelArray[i].MAGV,

          dataTaiKhoanExcelArray[i].phanQuyen,
          dataTaiKhoanExcelArray[i].trangThai,
        ]
      );
      results.push({
        EM: "tạo tài khoản thành công",
        EC: 0,
        DT: {
          result,
          result1,
        },
      });
    }

    return {
      EM: "thêm thông tin thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi services createTaiKhoan",
      EC: 1,
      DT: [],
    };
  }
};

const LoginTaikhoan = async (tenDangnhap, matKhau) => {
  try {
    const checkmail = isValidEmail(tenDangnhap);
    if (!checkmail) {
      return {
        EM: "định dạng mail không đúng",
        EC: 0,
        DT: [],
      };
    }

    const [results, fields] = await pool.execute(
      "SELECT * FROM `taikhoan` WHERE `TENDANGNHAP` = ?",
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

const LoginTaikhoanwithGOOGLE = async (tenDangnhap) => {
  try {
    const [results, fields] = await pool.execute(
      "SELECT * FROM `taikhoan` WHERE `TENDANGNHAP` = ?",
      [tenDangnhap]
    );

    if (results.length > 0) {
      let payload = {
        taikhoan: results[0].TENDANGNHAP,

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
  LoginTaikhoanwithGOOGLE,
};
