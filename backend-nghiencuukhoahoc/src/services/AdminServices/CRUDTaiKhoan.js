const pool = require("../../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const { createJWT } = require("../../middlewares/JWTAction");

const { selectBomon_TENBOMON } = require("./CRUDBomon");

const { selectChucdanh_TENCHUCDANH } = require("./CRUDChucdanh");
const { selectChucvu_TENCHUCVU } = require("./CRUDChucVu");

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
const timTaiKhoan_TENDANGNHAP = async (TENDANGNHAP) => {
  try {
    const [results, fields] = await pool.execute(
      "SELECT * FROM taikhoan WHERE TENDANGNHAP = ?",
      [TENDANGNHAP]
    );

    return results.length > 0;
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
const getAllTaiKhoan = async (TENBOMON) => {
  try {
    if (TENBOMON === "Ngoài trường") {
      let [results, fields] = await pool.execute(
        `SELECT k.TENKHOA, bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, cd.TENCHUCDANH, cv.TENCHUCVU, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN
      FROM taikhoan AS tk
      LEFT JOIN giangvien AS gv ON tk.MAGV = gv.MAGV
      LEFT JOIN bomon AS bm ON bm.MABOMON = gv.MABOMON
      LEFT JOIN khoa AS k ON k.MAKHOA = bm.MAKHOA
      LEFT JOIN giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
      LEFT JOIN chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
      LEFT JOIN co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
      LEFT JOIN chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
      WHERE bm.TENBOMON = ?
      ORDER BY tk.TENDANGNHAP ASC;
      `,

        [TENBOMON]
      );
      return {
        EM: "xem thoong tin thanh cong",
        EC: 1,
        DT: results,
      };
    } else {
      let [results, fields] = await pool.execute(
        `SELECT k.TENKHOA, bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, cd.TENCHUCDANH, cv.TENCHUCVU, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN
      FROM taikhoan AS tk
      LEFT JOIN giangvien AS gv ON tk.MAGV = gv.MAGV
      LEFT JOIN bomon AS bm ON bm.MABOMON = gv.MABOMON
      LEFT JOIN khoa AS k ON k.MAKHOA = bm.MAKHOA
      LEFT JOIN giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
      LEFT JOIN chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
      LEFT JOIN co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
      LEFT JOIN chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
      WHERE bm.TENBOMON = ?
      ORDER BY tk.TENDANGNHAP ASC;
      `,

        [TENBOMON]
      );
      return {
        EM: "xem thoong tin thanh cong",
        EC: 1,
        DT: results,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "không thể xem thông tin",
      EC: 0,
      DT: [],
    };
  }
};

const getAllTaiKhoantheoPHANQUYEN = async (PHANQUYEN, MABOMON) => {
  try {
    let [results, fields] = await pool.execute(
      "select k.TENKHOA,bm.MABOMON,bm.TENBOMON,tk.TENDANGNHAP,gv.TENGV,gv.EMAIL,tk.MAGV,cd.TENCHUCDANH,cv.TENCHUCVU,gv.DIENTHOAI,gv.DIACHI,tk.PHANQUYEN,tk.TRANGTHAITAIKHOAN from taikhoan as tk,giangvien as gv,bomon as bm, chucvu as cv, chucdanh as cd,giu_chuc_vu as gcv, co_chuc_danh as ccd, khoa as k where k.MAKHOA = bm.MAKHOA and tk.MAGV = gv.MAGV and bm.MABOMON = gv.MABOMON and gv.MAGV = gcv.MAGV and gcv.MACHUCVU = cv.MACHUCVU and ccd.MAGV = gv.MAGV and ccd.MACHUCDANH = cd.MACHUCDANH and bm.MABOMON = ? and tk.PHANQUYEN = ?",
      [MABOMON, PHANQUYEN]
    );
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

const getAllTaiKhoantheoTRANGTHAI = async (TRANGTHAITAIKHOAN, MABOMON) => {
  try {
    let [results, fields] = await pool.execute(
      "select k.TENKHOA,bm.MABOMON,bm.TENBOMON,tk.TENDANGNHAP,gv.TENGV,gv.EMAIL,tk.MAGV,cd.TENCHUCDANH,cv.TENCHUCVU,gv.DIENTHOAI,gv.DIACHI,tk.PHANQUYEN,tk.TRANGTHAITAIKHOAN from taikhoan as tk,giangvien as gv,bomon as bm, chucvu as cv, chucdanh as cd,giu_chuc_vu as gcv, co_chuc_danh as ccd, khoa as k where k.MAKHOA = bm.MAKHOA and tk.MAGV = gv.MAGV and bm.MABOMON = gv.MABOMON and gv.MAGV = gcv.MAGV and gcv.MACHUCVU = cv.MACHUCVU and ccd.MAGV = gv.MAGV and ccd.MACHUCDANH = cd.MACHUCDANH and bm.MABOMON = ? and tk.TRANGTHAITAIKHOAN = ?",
      [MABOMON, TRANGTHAITAIKHOAN]
    );
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

const createOnlyTaiKhoan = async (dataTaiKhoanOnly) => {
  // chỉ tạo tài khoản thôi chứ không thêm thông tin
  // dataTaiKhoan bao gồm tên đăng nhập, trạng thái hoạt động, phân quyền, mã GV, MABOMON

  try {
    let exists = await timTaiKhoan_TENDANGNHAP(dataTaiKhoanOnly.TENDANGNHAP);

    if (exists) {
      return {
        EM: "Tài khoản đã tồn tại không thể tạo !",
        EC: 0,
        DT: [],
      };
    }

    let [results0, fields0] = await pool.execute(
      `INSERT INTO giangvien (MAGV, MABOMON) VALUES (?, ?)`,
      [dataTaiKhoanOnly.MAGV, dataTaiKhoanOnly.MABOMON]
    );

    let [results, fields] = await pool.execute(
      `INSERT INTO taikhoan (TENDANGNHAP, MAGV, PHANQUYEN, TRANGTHAITAIKHOAN) VALUES (?, ?, ?, ?)`,
      [
        dataTaiKhoanOnly.TENDANGNHAP,
        dataTaiKhoanOnly.MAGV,
        dataTaiKhoanOnly.PHANQUYEN,
        dataTaiKhoanOnly.TRANGTHAITAIKHOAN,
      ]
    );

    // Commit transaction nếu tất cả các câu lệnh thành công
    let [results3, fields3] = await pool.execute(
      "select bm.MABOMON,bm.TENBOMON,tk.TENDANGNHAP,gv.TENGV,gv.EMAIL,tk.MAGV,gv.DIENTHOAI,gv.DIACHI,tk.PHANQUYEN,tk.TRANGTHAITAIKHOAN from taikhoan as tk,giangvien as gv,bomon as bm where tk.MAGV = gv.MAGV and bm.MABOMON = gv.MABOMON and bm.MABOMON = ?",
      [dataTaiKhoanOnly.MABOMON]
    );
    return {
      EM: "Tạo tài khoản thành công",
      EC: 1,
      DT: results3,
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

const createTaiKhoanExcel = async (dataTaiKhoanExcelArray) => {
  // dataTaiKhoanExcelArray phải bao gồm TENDANGNHAP, MAGV, MATKHAU, PHANQUYEN, TRANGTHAITAIKHOAN
  // không được để trống TENDANGNHAP và MAGV
  try {
    let results = [];

    // Kiểm tra trước khi tạo tài khoản
    for (var i = 0; i < dataTaiKhoanExcelArray.length; i++) {
      // Kiểm tra TENDANGNHAP và MAGV
      if (
        !dataTaiKhoanExcelArray[i].TENDANGNHAP ||
        !dataTaiKhoanExcelArray[i].MAGV ||
        !dataTaiKhoanExcelArray[i].TENBOMON ||
        !dataTaiKhoanExcelArray[i].TENGV
      ) {
        return {
          EM: `Bị trống thông tin tại dòng số ${i}: ${JSON.stringify(
            dataTaiKhoanExcelArray[i]
          )}`,
          EC: 0,
          DT: [],
        }; // Tiếp tục thực hiện các lệnh khác
      }

      // Kiểm tra tài khoản đã tồn tại
      let exists = await timTaiKhoan_TENDANGNHAP(
        dataTaiKhoanExcelArray[i].TENDANGNHAP
      );
      if (exists) {
        return {
          EM: `Tài khoản: ${dataTaiKhoanExcelArray[i].TENDANGNHAP} đã tồn tại`,
          EC: 0,
          DT: [],
        };
      }

      // Kiểm tra bộ môn
      const kiemtraTENBOMON = await selectBomon_TENBOMON(
        dataTaiKhoanExcelArray[i].TENBOMON
      );

      if (!kiemtraTENBOMON.DT || !kiemtraTENBOMON.DT.MABOMON) {
        return {
          EM: `Dòng số ${i} Bộ môn <${dataTaiKhoanExcelArray[i].TENBOMON}> không tồn tại`,
          EC: 0,
          DT: [],
        };
      }

      let [kiemtraMAGV, fields1] = await pool.execute(
        `SELECT * FROM giangvien WHERE MAGV = ?`,
        [dataTaiKhoanExcelArray[i].MAGV]
      );
      if (kiemtraMAGV.length > 0) {
        return {
          EM: `Dòng ${i} Giảng viên ${dataTaiKhoanExcelArray[i].MAGV} đã tồn tại`,
          EC: 0,
          DT: kiemtraMAGV,
        };
      }
    }

    // Bắt đầu tạo tài khoản
    for (var i = 0; i < dataTaiKhoanExcelArray.length; i++) {
      // Lấy mã bộ môn thông qua hàm selectBomon_TENBOMON
      let timMABOMON = await selectBomon_TENBOMON(
        dataTaiKhoanExcelArray[i].TENBOMON
      );
      let timMACHUCDANH = await selectChucdanh_TENCHUCDANH(
        dataTaiKhoanExcelArray[i].TENCHUCDANH
      );
      const timMACHUCVU = await selectChucvu_TENCHUCVU(
        dataTaiKhoanExcelArray[i].TENCHUCVU
      );

      await pool.execute(
        `INSERT INTO giangvien (MAGV, MABOMON,TENGV) VALUES (?, ?,?)`,
        [
          dataTaiKhoanExcelArray[i].MAGV,
          timMABOMON.DT.MABOMON,
          dataTaiKhoanExcelArray[i].TENGV,
        ]
      );

      // Tạo tài khoản mới
      await pool.execute(
        `INSERT INTO taikhoan (TENDANGNHAP, MAGV, PHANQUYEN, TRANGTHAITAIKHOAN) VALUES (?, ?, ?, ?)`,
        [
          dataTaiKhoanExcelArray[i].TENDANGNHAP,
          dataTaiKhoanExcelArray[i].MAGV,
          dataTaiKhoanExcelArray[i].PHANQUYEN,
          dataTaiKhoanExcelArray[i].TRANGTHAITAIKHOAN,
        ]
      );
      // await pool.execute(
      //   `INSERT INTO co_chuc_danh (MACHUCDANH, MAGV,  TRANGTHAI) VALUES (?, ?,  ?)`,
      //   [
      //     timMACHUCDANH.DT.MACHUCDANH,
      //     dataTaiKhoanExcelArray[i].MAGV,

      //     dataTaiKhoanExcelArray[i].TRANGTHAITAIKHOAN,
      //   ]
      // );

      if (dataTaiKhoanExcelArray[i].TENCHUCVU) {
        await pool.execute(
          `INSERT INTO giu_chuc_vu (MAGV,MACHUCVU ) VALUES (?, ?)`,
          [dataTaiKhoanExcelArray[i].MAGV, timMACHUCVU.DT.MACHUCVU]
        );
      } else {
        continue;
      }

      results.push({
        EM: `Tạo tài khoản ${dataTaiKhoanExcelArray[i].TENDANGNHAP} thành công`,
        EC: 0,
        DT: [],
      });
    }

    return {
      EM: "Tất cả tài khoản đã được tạo",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log("Lỗi services createTaiKhoanExcel", error);
    return {
      EM: "Lỗi services createTaiKhoanExcel",
      EC: 1,
      DT: [],
    };
  }
};

const LoginTaikhoan = async (tenDangnhap, matKhau) => {
  try {
    // console.log("tenDangnhap: ", tenDangnhap)
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
      if (results[0].TRANGTHAITAIKHOAN === "Ngưng hoạt động") {
        // console.log("results: ", results)
        return {
          EM: "Đăng nhập thất bại, tài khoản của bạn đã bị ngưng hoạt động",
          EC: 0,
          DT: {
            access_token: null,
            data: [],
          },
        };
      }
      // const isCorrectPass = await bcrypt.compare(matKhau, results[0].MATKHAU);

      let payload = {
        taikhoan: results[0].TENDANGNHAP,
        //  matkhau: results[0].MATKHAU, cái này không cần mật khẩu => phúc note
        phanquyen: results[0].PHANQUYEN,
        trangthai: results[0].TRANGTHAITAIKHOAN,
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
        EM: "Đăng nhập thất bại, tài khoản không đúng",
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
  createOnlyTaiKhoan,
  getAllTaiKhoantheoPHANQUYEN,
  getAllTaiKhoantheoTRANGTHAI,

  timTaiKhoan_TENDANGNHAP,
};
