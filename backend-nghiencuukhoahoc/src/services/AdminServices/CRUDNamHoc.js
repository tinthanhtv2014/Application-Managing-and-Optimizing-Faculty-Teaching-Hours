const pool = require("../../config/database");

const {
    timNamHoc_MANAMHOC
} = require('./helpers')

const selectNamHoc = async () => {
    try {
        let [results1, fields1] = await pool.execute(`select * from namhoc`);
        return {
            EM: " xem thông tin năm học thành công",
            EC: 1,
            DT: results1,
        };
    } catch (error) {
        return {
            EM: "lỗi services selectNamHoc",
            EC: -1,
            DT: [],
        };
    }
}

const createNamHoc = async (TENNAMHOC) => {
    try {
        // Thêm năm học mới vào bảng
        await pool.execute(`INSERT INTO namhoc (TENNAMHOC) VALUES (?)`, [TENNAMHOC]);

        return {
            EM: "Thêm thông tin năm học thành công",
            EC: 1,
            DT: [],
        };
    } catch (error) {
        return {
            EM: "Lỗi services createNamHoc",
            EC: -1,
            DT: [],
        };
    }
}

const updateNamHoc = async (MANAMHOC, TENNAMHOC) => {
    try {
        // Kiểm tra xem có tìm thấy kết quả không
        let results = await timNamHoc_MANAMHOC(MANAMHOC);
        if (results.length === 0) {
            return {
                EM: "Không tìm thấy năm học",
                EC: 0,
                DT: [],
            };
        }

        // Cập nhật thông tin năm học trong bảng
        await pool.execute(`UPDATE namhoc SET TENNAMHOC = ? WHERE MANAMHOC = ?`, [TENNAMHOC, MANAMHOC]);

        return {
            EM: "Sửa thông tin năm học thành công",
            EC: 1,
            DT: [],
        };
    } catch (error) {
        return {
            EM: "Lỗi services updateNamHoc",
            EC: -1,
            DT: [],
        };
    }
}

const deleteNamHoc = async (MANAMHOC) => {
    try {
        // Kiểm tra xem năm học có tồn tại hay không
        const results = await timNamHoc_MANAMHOC(MANAMHOC);
        if (results.length === 0) {
            return {
                EM: "Không tìm thấy năm học để xóa",
                EC: 0,
                DT: [],
            };
        }

        // Xóa năm học từ bảng
        await pool.execute(`DELETE FROM namhoc WHERE MANAMHOC = ?`, [MANAMHOC]);

        return {
            EM: "Xóa năm học thành công",
            EC: 1,
            DT: [],
        };
    } catch (error) {
        return {
            EM: "Lỗi services deleteNamHoc",
            EC: -1,
            DT: [],
        };
    }
}

module.exports = {
    selectNamHoc,
    createNamHoc,
    updateNamHoc,
    deleteNamHoc,
};