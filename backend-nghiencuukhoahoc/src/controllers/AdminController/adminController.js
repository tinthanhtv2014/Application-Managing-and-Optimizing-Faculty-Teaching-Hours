const {
  getAllTaiKhoan,
  createTaiKhoan,
  updateTaiKhoan,
} = require("../../services/AdminServices/CRUDAdmin");

const getAllTaiKhoanController = async (req, res) => {
  try {
    let results = await getAllTaiKhoan();
    console.log("Lấy dach sách tài khoảng thành công >>>> ", results);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(
      "getAllTaiKhoanController Lấy dach sách tài khoảng không thành công >>>> ",
      error
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const createTaiKhoanController = async (req, res) => {
  try {
    const tendangnhap = req.body.tenDangNhap;
    const matkhau = req.body.matKhau;
    const phanQuyen = req.body.phanQuyen;

    let results = await createTaiKhoan(tendangnhap, matkhau, phanQuyen);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log("createTaiKhoanController error>>>> ", error);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
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

module.exports = {
  getAllTaiKhoanController,
  createTaiKhoanController,
  updateTaiKhoanController,
};
