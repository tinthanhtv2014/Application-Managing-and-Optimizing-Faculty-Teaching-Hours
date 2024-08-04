const pool = require("../../config/database");

const selectQuyDinh = async () => {
    try {
        let [results1, fields1] = await pool.execute(`select * from quy_dinh`);
        return {
            EM: " xem thông tin quy định thành công",
            EC: 1,
            DT: results1,
        };
    } catch (error) {
        return {
            EM: "lỗi services selectQuyDinh",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    selectQuyDinh,
};