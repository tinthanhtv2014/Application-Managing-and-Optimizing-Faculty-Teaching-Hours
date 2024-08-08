const pool = require("../../../config/database");

const add = async (data) => {
    try {
        // Kiểm tra tất cả các mục trước khi thêm
        for (let i = 0; i < data.length; i++) {
            let checkDanhMuc = await selectLoaiDanhMuc_TEN_LOAI_DANH_MUC(data[i].TEN_LOAI_DANH_MUC);
            if (checkDanhMuc.length !== 0) {
                console.log("Loại danh mục này đã tồn tại: " + data[i].TEN_LOAI_DANH_MUC);
                return {
                    EM: "Loại danh mục này đã tồn tại: " + data[i].TEN_LOAI_DANH_MUC,
                    EC: 0,
                    DT: [],
                };
            }
        }

        let results = [];
        console.log("data.length: ", data.length);

        // Thêm tất cả các mục
        for (let i = 0; i < data.length; i++) {
            let result = await createLoaiDanhMuc(data[i].TEN_LOAI_DANH_MUC);
            if (result.EC !== 1) {
                return result; // Trả về nếu có lỗi khi thêm loại danh mục
            }
            results.push(result.DT); // Lưu ID của loại danh mục vào kết quả
        }

        return {
            EM: "Thêm dữ liệu thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        console.error(error);
        return {
            EM: "Đã xảy ra lỗi khi thêm dữ liệu",
            EC: -1,
            DT: null,
        };
    }
};

const selectLoaiDanhMuc_TEN_LOAI_DANH_MUC = async (TEN_LOAI_DANH_MUC) => {
    try {
        let [results, fields] = await pool.execute(
            `SELECT * FROM loai_danh_muc WHERE TEN_LOAI_DANH_MUC = ?`,
            [TEN_LOAI_DANH_MUC]
        );
        return results;
    } catch (error) {
        return {
            EM: "Lỗi services selectLoaiDanhMuc",
            EC: -1,
            DT: [],
        };
    }
};

const createLoaiDanhMuc = async (TEN_LOAI_DANH_MUC) => {
    try {
        let [results, fields] = await pool.execute(
            `INSERT INTO loai_danh_muc (TEN_LOAI_DANH_MUC, TRANG_THAI_DANH_MUC) VALUES (?, N'Đang áp dụng')`,
            [TEN_LOAI_DANH_MUC]
        );
        return {
            EM: "Thêm loại danh mục mới thành công",
            EC: 1,
            DT: results.insertId, // Trả về ID của bản ghi vừa thêm
        };
    } catch (error) {
        return {
            EM: "Lỗi services createLoaiDanhMuc",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    add,
    selectLoaiDanhMuc_TEN_LOAI_DANH_MUC,
    createLoaiDanhMuc
};
