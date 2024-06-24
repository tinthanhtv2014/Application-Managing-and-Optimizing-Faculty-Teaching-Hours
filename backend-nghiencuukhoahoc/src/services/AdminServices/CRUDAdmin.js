const pool = require("../../config/database");

const getAllTaiKhoan = async () => {
    try {
        let [results, fields] =
            await pool.execute("select * from taikhoan");
        return results;
    } catch (error) {
        console.log("getAllTaiKhoan >>>", error)
        return '';
    }
};

const checkTaiKhoanExists = async (tenDangnhap) => {
    try {
        const [results, fields] = await pool.execute(
            "SELECT * FROM taikhoan WHERE TENDANGNHAP = ?",
            [tenDangnhap]
        );
        if (results) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("checkTaiKhoanExists errr >>>", error);
        return false;
    }
};

const createTaiKhoan = async (tenDangnhap, matKhau, phanQuyen) => {
    try {
        let exists = await checkTaiKhoanExists(tenDangnhap);
        if (exists) {
            console.log("TENDANGNHAP đã tồn tại");
            return 'error';
        }

        let [results, fields] = await pool.execute(
            `INSERT INTO taikhoan (TENDANGNHAP, MATKHAU, PHANQUYEN) VALUES (?, ?, ?)`,
            [tenDangnhap, matKhau, phanQuyen]
        );
        return results;
    } catch (error) {
        console.log("createTaiKhoan errr >>>", error);
        return '';
    }
};

module.exports = {
    getAllTaiKhoan,
    createTaiKhoan,
};