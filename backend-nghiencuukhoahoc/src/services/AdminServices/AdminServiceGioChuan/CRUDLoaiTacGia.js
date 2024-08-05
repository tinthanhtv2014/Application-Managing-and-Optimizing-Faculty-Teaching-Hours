const pool = require("../../config/database");

const selectLoaiTacGia = async () => {
    try {
        let [results, fields] = await pool.execute(`SELECT * FROM loai_tac_gia`);
        return {
            EM: "Xem thông tin loại tác giả thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        return {
            EM: "Lỗi services selectLoaiTacGia",
            EC: -1,
            DT: [],
        };
    }
};

const selectLoaiTacGia_TEN_LOAI_TAC_GIA = async (TEN_LOAI_TAC_GIA) => {
    try {
        let [results, fields] = await pool.execute(`SELECT * FROM loai_tac_gia WHERE TEN_LOAI_TAC_GIA = ?`, [TEN_LOAI_TAC_GIA]);
        return results;
    } catch (error) {
        return {
            EM: "Lỗi services selectLoaiTacGia",
            EC: -1,
            DT: [],
        };
    }
};

const createLoaiTacGia = async (TEN_LOAI_TAC_GIA) => {
    try {
        let results1 = await selectLoaiTacGia_TEN_LOAI_TAC_GIA(TEN_LOAI_TAC_GIA);
        if (results1.length > 0) {
            return {
                EM: "Loại tác giả này đã tồn tại",
                EC: 0,
                DT: [],
            };
        }

        let [results, fields] = await pool.execute(
            `INSERT INTO loai_tac_gia (TEN_LOAI_TAC_GIA) VALUES (?)`,
            [TEN_LOAI_TAC_GIA]
        );
        return {
            EM: "Thêm loại tác giả mới thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        return {
            EM: "Lỗi services createLoaiTacGia",
            EC: -1,
            DT: [],
        };
    }
};

const updateLoaiTacGia = async (id, TEN_LOAI_TAC_GIA) => {
    try {
        let results1 = await selectLoaiTacGia_TEN_LOAI_TAC_GIA(TEN_LOAI_TAC_GIA);
        if (results1.length === 0) {
            return {
                EM: "Loại tác giả này không tồn tại",
                EC: 0,
                DT: [],
            };
        }

        let [results, fields] = await pool.execute(
            `UPDATE loai_tac_gia SET TEN_LOAI_TAC_GIA = ? WHERE MA_LOAI_TAC_GIA = ?`,
            [TEN_LOAI_TAC_GIA, id]
        );
        return {
            EM: "Cập nhật loại tác giả thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        return {
            EM: "Lỗi services updateLoaiTacGia",
            EC: -1,
            DT: [],
        };
    }
};

const deleteLoaiTacGia = async (id) => {
    try {
        let [results, fields] = await pool.execute(`DELETE FROM loai_tac_gia WHERE MA_LOAI_TAC_GIA = ?`, [id]);
        return {
            EM: "Xóa loại tác giả thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        return {
            EM: "Lỗi services deleteLoaiTacGia",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    selectLoaiTacGia,
    createLoaiTacGia,
    updateLoaiTacGia,
    deleteLoaiTacGia,
};