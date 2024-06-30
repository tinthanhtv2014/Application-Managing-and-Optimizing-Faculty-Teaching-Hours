const pool = require("../../config/database");

const selectGiangVien = async (makhoa, tenkhoa) => {
    try {
        let [results1, fields1] = await pool.execute(`select * from giangvien`);
        return {
            EM: " xem thông tin giảng viên thành công",
            EC: 0,
            DT: results1,
        };
    } catch (error) {
        return {
            EM: "lỗi services selectGiangVien",
            EC: 1,
            DT: [],
        };
    }
};

module.exports = {
    selectGiangVien,
};