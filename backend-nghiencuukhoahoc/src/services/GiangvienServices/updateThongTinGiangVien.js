const pool = require("../../config/database");

const { timTaiKhoan_TENDANGNHAP } = require("../AdminServices/helpers");

const updateThongTinGiangVien = async (TENDANGNHAP, dataGiangVien) => {
    try {
        // TENDANGNHAP bắt buộc
        // dataGiangVien gồm TENGV DIENTHOAI DIACHI TENCHUCDANH TENCHUCVU

        // Thay thế các giá trị null hoặc undefined bằng chuỗi rỗng
        const fields = ['TENGV', 'DIENTHOAI', 'DIACHI', 'TENCHUCDANH', 'TENCHUCVU', 'EMAIL'];
        fields.forEach(field => {
            if (dataGiangVien[field] === undefined || dataGiangVien[field] === null) {
                dataGiangVien[field] = '';
            }
        });

        let KiemTra_TENDANGNHAP = await timTaiKhoan_TENDANGNHAP(TENDANGNHAP); // Hàm kiểm tra TENDANGNHAP có tồn tại không
        if (!KiemTra_TENDANGNHAP.length > 0) {
            return {
                EM: "Tài khoản này không tồn tại",
                EC: 0,
                DT: [],
            };
        }

        let [results, fields1] = await pool.execute(
            `UPDATE giangvien
              SET TENGV = ?, EMAIL = ?, DIENTHOAI = ?, DIACHI = ? 
              WHERE MAGV = ?;`,
            [
                dataGiangVien.TENGV,
                dataGiangVien.EMAIL,
                dataGiangVien.DIENTHOAI,
                dataGiangVien.DIACHI,
                KiemTra_TENDANGNHAP[0].MAGV,
            ]
        );

        let [results1, fields2] = await pool.execute(
            `SELECT * FROM giangvien WHERE giangvien.MAGV= ?`,
            [
                KiemTra_TENDANGNHAP[0].MAGV,
            ]
        );

        return {
            EM: "Sửa giảng viên thành công",
            EC: 1,
            DT: results1,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Lỗi services GiangvienServices - updateThongTinGiangVien",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    updateThongTinGiangVien,
};


module.exports = {
    updateThongTinGiangVien,
};