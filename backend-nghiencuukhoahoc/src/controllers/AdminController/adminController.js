const { getAllTaiKhoan, createTaiKhoan, updateTaiKhoan } = require('../../services/AdminServices/CRUDAdmin')


const getAllTaiKhoanController = async (req, res) => {
    try {

        let danhSachTaiKhoang = await getAllTaiKhoan();
        console.log("Lấy dach sách tài khoảng thành công >>>> ", danhSachTaiKhoang)
        return res.status(200).json({
            EM: "Lấy dach sách tài khoảng thành công", //error mesage
            EC: 200, //error code
            DT: danhSachTaiKhoang //data
        })
    } catch (error) {
        console.log("getAllTaiKhoanController Lấy dach sách tài khoảng không thành công >>>> ", error)
        return res.status(200).json({
            EM: "Lấy dach sách tài khoảng không thành công", //error mesage
            EC: 400, //error code
            DT: '' //data
        })
    }
}

const createTaiKhoanController = async (req, res) => {
    try {

        const tendangnhap = req.body.tenDangNhap;
        const matkhau = req.body.matKhau;
        const phanQuyen = req.body.phanQuyen;

        let results = await createTaiKhoan(tendangnhap, matkhau, phanQuyen)
        if (results == 'error') {
            return res.status(200).json({
                EM: "Tạo tài khoảng không thành công do tài khoảng đã tồn tại", //error mesage
                EC: 400, //error code
                DT: '' //data
            })
        }

        return res.status(200).json({
            EM: "Tạo tài khoảng thành công", //error mesage
            EC: 200, //error code
            DT: results //data
        })
    } catch (error) {
        console.log("createTaiKhoanController error>>>> ", error)
        return res.status(200).json({
            EM: "Tạo tài khoảng không thành công", //error mesage
            EC: 400, //error code
            DT: '' //data
        })
    }
}

const updateTaiKhoanController = async (req, res) => {
    try {

        const tendangnhap = req.params.tenDangNhap;
        const matkhau = req.body.matKhau;
        const phanQuyen = req.body.phanQuyen;

        let results = await updateTaiKhoan(tendangnhap, matkhau, phanQuyen)
        if (results == 'error') {
            return res.status(200).json({
                EM: "Sửa tài khoảng không thành công do tài khoảng không tồn tại", //error mesage
                EC: 400, //error code
                DT: '' //data
            })
        }

        return res.status(200).json({
            EM: "Sửa tài khoảng thành công", //error mesage
            EC: 200, //error code
            DT: results //data
        })
    } catch (error) {
        console.log("updateTaiKhoanController error>>>> ", error)
        return res.status(200).json({
            EM: "Sửa tài khoảng không thành công", //error mesage
            EC: 400, //error code
            DT: '' //data
        })
    }
}

module.exports = {
    getAllTaiKhoanController,
    createTaiKhoanController,
    updateTaiKhoanController,
};