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
        console.log("Bắt đầu thêm danh mục bằng excel ========================================");
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

//========================================================================================================

const Sevicel_TyLe_Excel = async (dataTyLe) => {
    try {
        // Kiểm tra tất cả các mục trước khi thêm
        for (let i = 0; i < dataTyLe.length; i++) {
            let [checkTyLe, fields] = await pool.execute(
                `SELECT * FROM ty_le_quy_doi_gio_chuan WHERE TEN_QUY_DOI = ?`,
                [dataTyLe[i].TEN_QUY_DOI]
            );
            if (checkTyLe.length !== 0) {
                console.log("Tỷ lệ này đã tồn tại: " + dataTyLe[i].TEN_QUY_DOI);
                return {
                    EM: "Tỷ lệ này đã tồn tại: " + dataTyLe[i].TEN_QUY_DOI,
                    EC: 0,
                    DT: [],
                };
            }
        }

        let results = [];
        console.log("dataTyLe.length: ", dataTyLe.length);

        // Thêm tất cả các mục
        for (let i = 0; i < dataTyLe.length; i++) {
            console.log("Trước khi thêm - i: ", i);
            let result = await pool.execute(
                `
                INSERT INTO ty_le_quy_doi_gio_chuan 
                (MA_QUY_DINH, TEN_QUY_DOI, TY_LE, VIEN_CHUC_TRUONG, THUC_HIEN_CHUAN, TRANG_THAI_QUY_DOI, GHI_CHU_QUY_DOI) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    dataTyLe[i].MA_QUY_DINH,
                    dataTyLe[i].TEN_QUY_DOI,
                    dataTyLe[i].TY_LE,
                    dataTyLe[i].VIEN_CHUC_TRUONG,
                    dataTyLe[i].THUC_HIEN_CHUAN,
                    dataTyLe[i].TRANG_THAI_QUY_DOI,
                    dataTyLe[i].GHI_CHU_QUY_DOI
                ]
            );

            console.log("Sau khi thêm - i: ", i, " - result: ", result);
            if (result[0].affectedRows === 0) {
                console.log("Lỗi khi thêm - i: ", i, " - result: ", result);
                return {
                    EM: "Không thể thêm tỷ lệ",
                    EC: -1,
                    DT: [],
                };
            }

            results.push(result[0].insertId); // Lưu ID của tỷ lệ vào kết quả
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

const Sevicel_CoTyLe_Excel = async (dataCoTyLe) => {
    try {
        console.log("dataCoTyLe: ", dataCoTyLe)
        // Kiểm tra tất cả các mục trước khi thêm
        for (let i = 0; i < dataCoTyLe.length; i++) {
            let [LoaiTacGai, fields0] = await pool.execute(
                `SELECT * FROM loai_tac_gia WHERE TEN_LOAI_TAC_GIA = ?`,
                [dataCoTyLe[i].TEN_LOAI_TAC_GIA]
            );
            let [TyLe, fields1] = await pool.execute(
                `SELECT * FROM ty_le_quy_doi_gio_chuan WHERE TEN_QUY_DOI = ? AND GHI_CHU_QUY_DOI = ?`,
                [dataCoTyLe[i].TEN_QUY_DOI, dataCoTyLe[i].GHI_CHU_QUY_DOI]
            );
            let [LoaiDanhmuc, fields2] = await pool.execute(
                `SELECT * FROM loai_danh_muc WHERE TEN_LOAI_DANH_MUC = ?`,
                [dataCoTyLe[i].TEN_LOAI_DANH_MUC]
            );
            if (LoaiTacGai.length === 0 || TyLe.length === 0 || LoaiDanhmuc.length === 0) {
                if (LoaiTacGai.length === 0) console.log("Không có LoaiTacGai: ", dataCoTyLe[i].TEN_LOAI_TAC_GIA);
                if (TyLe.length === 0) console.log("Không có TyLe: ", dataCoTyLe[i].TEN_QUY_DOI);
                if (LoaiDanhmuc.length === 0) console.log("Không có LoaiDanhmuc: ", dataCoTyLe[i].TEN_LOAI_DANH_MUC);
                return {
                    EM: "Dữ liệu này không tồn tại: " + JSON.stringify(dataCoTyLe[i]),
                    EC: 0,
                    DT: [],
                };
            }
        }

        let results = [];
        console.log("dataCoTyLe.length: ", dataCoTyLe.length);

        // Thêm tất cả các mục
        for (let i = 0; i < dataCoTyLe.length; i++) {
            // Lấy các mã cần thiết từ các bảng
            let [LoaiTacGai, fields0] = await pool.execute(
                `SELECT MA_LOAI_TAC_GIA FROM loai_tac_gia WHERE TEN_LOAI_TAC_GIA = ?`,
                [dataCoTyLe[i].TEN_LOAI_TAC_GIA]
            );
            let [TyLe, fields1] = await pool.execute(
                `SELECT MA_QUY_DOI FROM ty_le_quy_doi_gio_chuan WHERE TEN_QUY_DOI = ? AND GHI_CHU_QUY_DOI = ?`,
                [dataCoTyLe[i].TEN_QUY_DOI, dataCoTyLe[i].GHI_CHU_QUY_DOI]
            );
            let [LoaiDanhmuc, fields2] = await pool.execute(
                `SELECT MA_LOAI_DANH_MUC FROM loai_danh_muc WHERE TEN_LOAI_DANH_MUC = ?`,
                [dataCoTyLe[i].TEN_LOAI_DANH_MUC]
            );

            // Thêm dữ liệu vào bảng CO_TY_LE
            let [result, fields3] = await pool.execute(
                `INSERT INTO co_ty_le (MA_QUY_DOI, MA_LOAI_DANH_MUC, MA_LOAI_TAC_GIA, SO_TAC_GIA_THUOC_LOAI, NHOM_CHIA_GIO) VALUES (?, ?, ?, ?, ?)`,
                [
                    TyLe[0].MA_QUY_DOI,
                    LoaiDanhmuc[0].MA_LOAI_DANH_MUC,
                    LoaiTacGai[0].MA_LOAI_TAC_GIA,
                    dataCoTyLe[i].SO_TAC_GIA_THUOC_LOAI,
                    dataCoTyLe[i].NHOM_CHIA_GIO
                ]
            );
            results.push(result.insertId); // Lưu ID của loại danh mục vào kết quả
        }

        console.log("results: ", results)
        return {
            EM: "Thêm dữ liệu thành công",
            EC: 1,
            DT: 'ok',
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

module.exports = {
    Sevicel_LoaiDanhMuc_Excel,
    Sevicel_DanhMuc_Excel,
    Sevicel_TyLe_Excel,
    Sevicel_CoTyLe_Excel
};