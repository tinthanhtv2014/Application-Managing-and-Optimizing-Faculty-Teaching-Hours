const pool = require("../../../config/database");

const Sevicel_LoaiDanhMuc_Excel = async (data) => {
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
            console.log("Trước khi thêm - i: ", i);
            let result = await createLoaiDanhMuc(data[i].TEN_LOAI_DANH_MUC);
            console.log("Sau khi thêm - i: ", i, " - result: ", result);
            if (result.EC !== 1) {
                console.log("Lỗi khi thêm - i: ", i, " - result: ", result);
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
        console.error("Lỗi trong try-catch: ", error);
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
        console.error("Lỗi services selectLoaiDanhMuc: ", error);
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
        console.log("Kết quả từ createLoaiDanhMuc: ", results);
        return {
            EM: "Thêm loại danh mục mới thành công",
            EC: 1,
            DT: results.insertId, // Trả về ID của bản ghi vừa thêm
        };
    } catch (error) {
        console.error("Lỗi services createLoaiDanhMuc: ", error);
        return {
            EM: "Lỗi services createLoaiDanhMuc",
            EC: -1,
            DT: [],
        };
    }
};

//========================================================================================================

const Sevicel_DanhMuc_Excel = async (dataDanhMuc) => {
    try {
        // Kiểm tra tất cả các mục trước khi thêm
        for (let i = 0; i < dataDanhMuc.length; i++) {
            let checkDanhMuc = await selectDanhMucQuyDoi_NOI_DUNG_DANH_MUC(dataDanhMuc[i].NOI_DUNG_DANH_MUC);
            if (checkDanhMuc.length !== 0) {
                console.log("Danh mục này đã tồn tại: " + dataDanhMuc[i].NOI_DUNG_DANH_MUC);
                return {
                    EM: "Danh mục này đã tồn tại: " + dataDanhMuc[i].NOI_DUNG_DANH_MUC,
                    EC: 0,
                    DT: [],
                };
            }
        }

        let results = [];
        console.log("dataDanhMuc.length: ", dataDanhMuc.length);

        // Thêm tất cả các mục
        for (let i = 0; i < dataDanhMuc.length; i++) {
            console.log("Trước khi thêm - i: ", i);
            let result = await createDanhMucQuyDoi(dataDanhMuc[i]);
            console.log("Sau khi thêm - i: ", i, " - result: ", result);
            if (result.EC !== 1) {
                console.log("Lỗi khi thêm - i: ", i, " - result: ", result);
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
        console.error("Lỗi trong try-catch: ", error);
        return {
            EM: "Đã xảy ra lỗi khi thêm dữ liệu",
            EC: -1,
            DT: null,
        };
    }
};

const selectDanhMucQuyDoi_NOI_DUNG_DANH_MUC = async (NOI_DUNG_DANH_MUC) => {
    try {
        let [results, fields] = await pool.execute(
            `SELECT * FROM danhmucquydoispkhcn WHERE NOI_DUNG_DANH_MUC = ?`,
            [NOI_DUNG_DANH_MUC]
        );
        return results;
    } catch (error) {
        return {
            EM: "Lỗi services selectDanhMucQuyDoi",
            EC: -1,
            DT: [],
        };
    }
};

const createDanhMucQuyDoi = async (dataDanhMuc) => {
    try {
        let [results, fields] = await pool.execute(
            `INSERT INTO danhmucquydoispkhcn (MA_LOAI_DANH_MUC, GIO_CHUAN, NOI_DUNG_DANH_MUC, ISBN, WOS_SCOUPUS, HANG_WOS_SCOUPUS, LOI_NHUAN, DON_VI_TINH, GIAI_THUONG, XEP_HANG_QUARTILES, NAM_THUC_HIEN, TRANG_THAI_DANH_MUC, GHI_CHU_DANH_MUC) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                dataDanhMuc.MA_LOAI_DANH_MUC,
                dataDanhMuc.GIO_CHUAN,
                dataDanhMuc.NOI_DUNG_DANH_MUC,
                dataDanhMuc.ISBN,
                dataDanhMuc.WOS_SCOUPUS,
                dataDanhMuc.HANG_WOS_SCOUPUS,
                dataDanhMuc.LOI_NHUAN,
                dataDanhMuc.DON_VI_TINH,
                dataDanhMuc.GIAI_THUONG,
                dataDanhMuc.XEP_HANG_QUARTILES,
                dataDanhMuc.NAM_THUC_HIEN,
                dataDanhMuc.TRANG_THAI_DANH_MUC,
                dataDanhMuc.GHI_CHU_DANH_MUC,
            ]
        );
        return {
            EM: "Thêm danh mục quy đổi mới thành công",
            EC: 1,
            DT: 'ok',
        };
    } catch (error) {
        console.log("Lỗi services: ", error)
        console.log("data bị lỗi: ", dataDanhMuc)
        return {
            EM: "Lỗi services createDanhMucQuyDoi",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    Sevicel_LoaiDanhMuc_Excel,
    Sevicel_DanhMuc_Excel
};