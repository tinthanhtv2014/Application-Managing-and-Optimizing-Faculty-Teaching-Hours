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

//========================================================================================================

const Sevicel_PhanCong_Test = async (dataPhanCong) => {
    try {
        // dataPhanCong:  {
        //     MAGV: '99999',
        //     MAHKNK: '1',
        //     MAMONHOC: '36',
        //     MALOP: 'DA21TTA',
        //     TONG_SO_GIO: '0'
        // }        
        console.log("dataPhanCong: ", dataPhanCong);

        // Lấy thời gian hiện tại
        let THOIGIANLAP = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log("THOIGIANLAP: ", THOIGIANLAP);

        // Thực hiện câu lệnh INSERT vào bảng bangphancong
        let [result_bangphancong] = await pool.execute(
            `INSERT INTO bangphancong (MAHKNK, MAGV, THOIGIANLAP) VALUES (?, ?, ?)`,
            [
                dataPhanCong.MAHKNK,
                dataPhanCong.MAGV,
                THOIGIANLAP
            ]
        );

        console.log("Các hàng bị ảnh hưởng(Rows affected): ", result_bangphancong.affectedRows);

        // Kiểm tra xem có bao nhiêu bản ghi được thêm
        if (result_bangphancong.affectedRows === 0) {
            return {
                EM: "Không thêm được dữ liệu",
                EC: -1,
                DT: null,
            };
        }

        // Truy vấn lại bản ghi vừa thêm
        let [selectResult] = await pool.execute(
            `SELECT * FROM bangphancong WHERE MAHKNK = ? AND MAGV = ? AND DATE(THOIGIANLAP) = DATE(?)`,
            [
                dataPhanCong.MAHKNK,
                dataPhanCong.MAGV,
                THOIGIANLAP
            ]
        );

        console.log("selectResult[0]: ", selectResult[0]);

        // Thực hiện câu lệnh INSERT vào bảng chitietphancong
        let [result_chitietphancong] = await pool.execute(
            `INSERT INTO chitietphancong (MAMONHOC, MAPHANCONG, MALOP, TONG_SO_GIO) VALUES (?, ?, ?, ?)`,
            [
                dataPhanCong.MAMONHOC,
                selectResult[0].MAPHANCONG,
                dataPhanCong.MALOP,
                dataPhanCong.TONG_SO_GIO
            ]
        );

        // Truy vấn lại dữ liệu vừa thêm ở cả hai bảng
        let [selectOK] = await pool.execute(
            `SELECT * 
             FROM bangphancong BPC 
             JOIN chitietphancong CTPC ON BPC.MAPHANCONG = CTPC.MAPHANCONG
             JOIN monhoc MH ON MH.MAMONHOC = CTPC.MAMONHOC
             JOIN lop L ON L.MALOP = CTPC.MALOP
             JOIN giangvien GV ON BPC.MAGV = GV.MAGV 
             WHERE BPC.MAPHANCONG = ?`,
            [
                selectResult[0].MAPHANCONG
            ]
        );

        console.log("Dữ liệu vừa thêm: ", selectOK);

        // Xóa dữ liệu mới thêm từ bảng chitietphancong trước
        await pool.execute(
            `DELETE FROM chitietphancong WHERE MAPHANCONG = ?`,
            [selectResult[0].MAPHANCONG]
        );

        // Sau đó xóa dữ liệu từ bảng bangphancong
        await pool.execute(
            `DELETE FROM bangphancong WHERE MAPHANCONG = ?`,
            [selectResult[0].MAPHANCONG]
        );

        console.log("Dữ liệu vừa thêm đã được xóa.");

        return {
            EM: "Thêm và xóa dữ liệu thành công",
            EC: 1,
            DT: 'ok',
        };
    } catch (error) {
        console.error("Lỗi trong try-catch: ", error);
        return {
            EM: "Đã xảy ra lỗi khi thêm hoặc xóa dữ liệu",
            EC: -1,
            DT: null,
        };
    }
};

const XuLy_dataAutoPhanCong = async (dataAutoPhanCong) => {
    for (let i = 0; i < dataAutoPhanCong.data.length; i++) {
        // Truy xuất tên môn học của phần tử hiện tại
        const tenMonHoc = dataAutoPhanCong.data[i].TENMONHOC;

        // Truy vấn thông tin môn học từ cơ sở dữ liệu
        let [data_MonHoc] = await pool.execute(
            `SELECT * FROM monhoc MH WHERE MH.TENMONHOC = ?`,
            [tenMonHoc]
        );

        // Nếu tìm thấy môn học, cập nhật thông tin vào đối tượng hiện tại
        if (data_MonHoc.length > 0) {
            dataAutoPhanCong.data[i].TENMONHOC = data_MonHoc[0].TENMONHOC;
        } else {
            dataAutoPhanCong.data[i].TENMONHOC = -1;
        }
    }
    return dataAutoPhanCong;
};

const XuLy_data_GV_TungDay = async (dataAutoPhanCong) => {
    let [data_GV_TungDay] = await pool.execute(
        `SELECT BM.TENBOMON, L.MALOP, GV.MAGV, GV.TENGV, MH.MAMONHOC, MH.TENMONHOC
        FROM lop L
        JOIN chuongtrinhdaotao CTDT ON L.MACHUONGTRINH = CTDT.MACHUONGTRINH
        JOIN thuoc T ON T.MACHUONGTRINH = CTDT.MACHUONGTRINH
        JOIN monhoc MH ON MH.MAMONHOC = T.MAMONHOC
        JOIN bomon BM ON BM.MABOMON = CTDT.MABOMON
        JOIN giangvien GV ON GV.MABOMON = BM.MABOMON
        JOIN bangphancong BPC ON BPC.MAGV = GV.MAGV
        JOIN chitietphancong CTPC ON CTPC.MAPHANCONG = BPC.MAPHANCONG
        WHERE L.MALOP = ?
        GROUP BY BM.TENBOMON, L.MALOP, GV.TENGV;`,
        [
            dataAutoPhanCong.data[0].MALOP,
        ]
    );
    return data_GV_TungDay;
};

const XuLy_data_GV = async (dataAutoPhanCong) => {
    console.log("Nhận diện cho lớp: ", dataAutoPhanCong.data[0].MALOP);
    console.log("Số thứ tự học kỳ: ", dataAutoPhanCong.data[0].SOTHUTUHOCKI);
    let [data_GV] = await pool.execute(
        `SELECT BM.TENBOMON, L.MALOP, GV.MAGV, GV.TENGV
            FROM lop L
            JOIN chuongtrinhdaotao CTDT ON L.MACHUONGTRINH = CTDT.MACHUONGTRINH
            JOIN thuoc T ON T.MACHUONGTRINH = CTDT.MACHUONGTRINH
            JOIN monhoc MH ON MH.MAMONHOC = T.MAMONHOC
            JOIN bomon BM ON BM.MABOMON = CTDT.MABOMON
            JOIN giangvien GV ON GV.MABOMON = BM.MABOMON
            WHERE L.MALOP = ? AND T.SOTHUTUHOCKI = ?
            GROUP BY BM.TENBOMON, L.MALOP, GV.TENGV;`,
        [
            dataAutoPhanCong.data[0].MALOP,
            dataAutoPhanCong.data[0].SOTHUTUHOCKI
        ]
    );
    return data_GV;
};

const Sevicel_AutoPhanCong_Test = async (dataAutoPhanCong) => {
    try {
        dataAutoPhanCong = await XuLy_dataAutoPhanCong(dataAutoPhanCong);
        console.log("Đã xủ lý dataAutoPhanCong: ", dataAutoPhanCong);

        //Lấy ds giảng viên từng dạy ở lớp này
        let data_GV_TungDay = await XuLy_data_GV_TungDay(dataAutoPhanCong);
        console.log("data_GV_TungDay: ", data_GV_TungDay);

        //Lấy ds giảng viên có thể dạy ở lớp này
        let data_GV = await XuLy_data_GV(dataAutoPhanCong);
        console.log("Nhận danh sách GV có thể dạy lớp này data_GV: ", data_GV);
        console.log("data_GV.length: ", data_GV.length);

        //Tìm GV trong bảng chuyên môn và Auto phân công
        let data_CMGV;
        let data_AutoPhanCong;
        for (let i = 0; i < data_GV.length; i++) {
            for (let y = 0; y < dataAutoPhanCong.data.length; y++) {
                // console.log("data_for: ", i, y, data_GV[i].MAGV, dataAutoPhanCong.data[y].MAMONHOC, dataAutoPhanCong.data[y].MALOP);
                [data_CMGV] = await pool.execute(
                    `SELECT * FROM chuyen_mon_giang_vien WHERE MA_GV_CMGV = ? AND MA_MON_CMGV = ?`,
                    [
                        data_GV[i].MAGV,
                        dataAutoPhanCong.data[y].MAMONHOC
                    ]
                );

                [data_AutoPhanCong] = await pool.execute(
                    `SELECT * FROM phan_cong_gv_tu_dong 
                    WHERE MAGV_PCGVTD = ? AND MA_MON_HOC_PCGVTD = ? AND MA_LOP_PCGVTD = ?`,
                    [
                        data_GV[i].MAGV, dataAutoPhanCong.data[y].MAMONHOC, dataAutoPhanCong.data[y].MALOP
                    ]
                );
            }
        }
        console.log("data_CMGV.length: ", data_CMGV.length);
        console.log("data_AutoPhanCong.length: ", data_AutoPhanCong.length);

        return {
            EM: "Đã nhận",
            EC: 1,
            DT: 'ok',
        };
    } catch (error) {
        console.error("Lỗi trong try-catch: ", error);
        return {
            EM: "Đã xảy ra lỗi khi phân công giảng viên tự động",
            EC: -1,
            DT: null,
        };
    }
};

module.exports = {
    Sevicel_LoaiDanhMuc_Excel,
    Sevicel_DanhMuc_Excel,
    Sevicel_TyLe_Excel,
    Sevicel_CoTyLe_Excel,

    Sevicel_PhanCong_Test,
    Sevicel_AutoPhanCong_Test
};