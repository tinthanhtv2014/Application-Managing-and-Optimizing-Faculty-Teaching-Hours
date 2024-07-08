const {
  getAllTaiKhoan,
  createTaiKhoan,
  createTaiKhoanExcel,
  updateTaiKhoan,
  LoginTaikhoan,
  LoginTaikhoanwithGOOGLE,
  createOnlyTaiKhoan,
  getAllTaiKhoantheoPHANQUYEN,
  getAllTaiKhoantheoTRANGTHAI,
} = require("../../services/AdminServices/CRUDTaiKhoan");

const getAllTaiKhoanController = async (req, res) => {
  try {
    const MABOMON = req.params.MABOMON;
    console.log(MABOMON);
    let results = await getAllTaiKhoan(MABOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const getAllTaiKhoanPHANQUYENController = async (req, res) => {
  try {
    const MABOMON = req.params.MABOMON;
    const PHANQUYEN = req.body.PHANQUYEN;
    let results = await getAllTaiKhoantheoPHANQUYEN(PHANQUYEN, MABOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const getAllTaiKhoanTRANGTHAIController = async (req, res) => {
  try {
    const MABOMON = req.params.MABOMON;
    const TRANGTHAITAIKHOAN = req.body.TRANGTHAITAIKHOAN;
    let results = await getAllTaiKhoantheoTRANGTHAI(TRANGTHAITAIKHOAN, MABOMON);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const createTaiKhoanController = async (req, res) => {
  try {
    const dataTaiKhoan = req.body;

    let results = await createTaiKhoan(dataTaiKhoan);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const createTaiKhoanExcelController = async (req, res) => {
  try {
    const dataTaiKhoanExcelArray = req.body;

    let results = await createTaiKhoanExcel(dataTaiKhoanExcelArray);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const createTaiKhoanOnlyController = async (req, res) => {
  // tạo tài khoản thôi
  try {
    const dataTaiKhoan = req.body;

    let results = await createOnlyTaiKhoan(dataTaiKhoan);

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "Lỗi trong quá trình tạo tài khoản",
      EC: 1,
      DT: [],
    });
  }
};

const updateTaiKhoanController = async (req, res) => {
  try {
    const tendangnhap = req.params.tenDangNhap;
    const matkhaucu = req.body.matKhaucu;
    const phanQuyen = req.body.phanQuyen;
    const matkhaumoi = req.body.matKhaumoi;
    let results = await updateTaiKhoan(
      tendangnhap,
      matkhaucu,
      matkhaumoi,
      phanQuyen
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

//login với tài khoản và mật khẩu
const loginTaikhoanAdminController = async (req, res) => {
  try {
    const username = req.body.tendangnhap;
    const password = req.body.matkhau;
    const results = await LoginTaikhoan(username, password);
    if (results && results.DT && results.DT.access_token) {
      res.cookie("jwt", results.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

//login với email từ google
const loginTaikhoanGOOGLEController = async (req, res) => {
  console.log(req.body.tendangnhap);
  try {
    const username = req.body.tendangnhap;

    const results = await LoginTaikhoan(username);
    if (results && results.DT && results.DT.access_token) {
      res.cookie("jwt", results.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutTaikhoanAdminController = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Logout Thành Công !!!",
      EC: 0,
      DT: " ",
    });
  } catch {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: " ",
    });
  }
};

module.exports = {
  getAllTaiKhoanController,
  createTaiKhoanController,
  createTaiKhoanExcelController,
  updateTaiKhoanController,
  createTaiKhoanOnlyController,

  loginTaikhoanAdminController,
  logoutTaikhoanAdminController,
  loginTaikhoanGOOGLEController,
  getAllTaiKhoanPHANQUYENController,
  getAllTaiKhoanTRANGTHAIController,
};
