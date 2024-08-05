const pool = require("../../config/database");

const selectTyLeQuyDoi = async () => {
    try {
        let [results, fields] = await pool.execute(`SELECT * FROM ty_le_quy_doi_gio_chuan`);
        return {
            EM: "Xem thông tin tỷ lệ quy đổi thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        return {
            EM: "Lỗi services selectTyLeQuyDoi",
            EC: -1,
            DT: [],
        };
    }
};

const selectTyLeQuyDoi_TEN_QUY_DOI = async (TEN_QUY_DOI) => {
    try {
        let [results, fields] = await pool.execute(`SELECT * FROM ty_le_quy_doi_gio_chuan WHERE TEN_QUY_DOI = ?`, [TEN_QUY_DOI]);
        return results;
    } catch (error) {
        return {
            EM: "Lỗi services selectTyLeQuyDoi",
            EC: -1,
            DT: [],
        };
    }
};

const createTyLeQuyDoi = async (MA_QUY_DINH, TEN_QUY_DOI, TY_LE, TRANG_THAI_QUY_DOI, GHI_CHU_QUY_DOI) => {
    try {
        let results1 = await selectTyLeQuyDoi_TEN_QUY_DOI(TEN_QUY_DOI);
        if (results1.length > 0) {
            return {
                EM: "Tỷ lệ quy đổi này đã tồn tại",
                EC: 0,
                DT: [],
            };
        }

        let [results, fields] = await pool.execute(
            `INSERT INTO ty_le_quy_doi_gio_chuan (MA_QUY_DINH, TEN_QUY_DOI, TY_LE, TRANG_THAI_QUY_DOI, GHI_CHU_QUY_DOI) VALUES (?, ?, ?, ?, ?)`,
            [MA_QUY_DINH, TEN_QUY_DOI, TY_LE, TRANG_THAI_QUY_DOI, GHI_CHU_QUY_DOI]
        );
        return {
            EM: "Thêm tỷ lệ quy đổi mới thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        return {
            EM: "Lỗi services createTyLeQuyDoi",
            EC: -1,
            DT: [],
        };
    }
};

const updateTyLeQuyDoi = async (id, MA_QUY_DINH, TEN_QUY_DOI, TY_LE, TRANG_THAI_QUY_DOI, GHI_CHU_QUY_DOI) => {
    try {
        let results1 = await selectTyLeQuyDoi_TEN_QUY_DOI(TEN_QUY_DOI);
        if (results1.length === 0) {
            return {
                EM: "Tỷ lệ quy đổi này không tồn tại",
                EC: 0,
                DT: [],
            };
        }

        let [results, fields] = await pool.execute(
            `UPDATE ty_le_quy_doi_gio_chuan SET MA_QUY_DINH = ?, TEN_QUY_DOI = ?, TY_LE = ?, TRANG_THAI_QUY_DOI = ?, GHI_CHU_QUY_DOI = ? WHERE MA_QUY_DOI = ?`,
            [MA_QUY_DINH, TEN_QUY_DOI, TY_LE, TRANG_THAI_QUY_DOI, GHI_CHU_QUY_DOI, id]
        );
        return {
            EM: "Cập nhật tỷ lệ quy đổi thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        return {
            EM: "Lỗi services updateTyLeQuyDoi",
            EC: -1,
            DT: [],
        };
    }
};

const deleteTyLeQuyDoi = async (id) => {
    try {
        let [results, fields] = await pool.execute(`DELETE FROM ty_le_quy_doi_gio_chuan WHERE MA_QUY_DOI = ?`, [id]);
        return {
            EM: "Xóa tỷ lệ quy đổi thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        return {
            EM: "Lỗi services deleteTyLeQuyDoi",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    selectTyLeQuyDoi,
    createTyLeQuyDoi,
    updateTyLeQuyDoi,
    deleteTyLeQuyDoi,
};