const pool = require("../../../config/database");

const {
    timnamhoc_TENNAMHOC,
    timtacgia_TEN_LOAI_TAC_GIA,
    timGiangVien_TENGV,
    selectBomon_TENBOMON,
    timGiangVien_TENGV_TENDANGNHAP,
} = require("../../../services/AdminServices/helpers");

const dangky_danhmuc_giangvien = async (dataDangKyDanhMuc) => {
    try {
        // console.log("dataDangKyDanhMuc: ", dataDangKyDanhMuc);

        // Tính toán số lượng từng loại giảng viên
        const loaiCountObj = dataDangKyDanhMuc.LISTGIANGVIEN.reduce(
            (acc, giangVien) => {
                acc[giangVien.loai] = (acc[giangVien.loai] || 0) + 1;
                return acc;
            },
            {}
        );

        // Chuyển đổi dữ liệu giảng viên
        const dataDangKy = dataDangKyDanhMuc.LISTGIANGVIEN.map(
            (giangVien, index) => ({
                ...giangVien,
                laVienChuc: giangVien.laVienChuc ? "Có" : "Không",
                duocMien: giangVien.duocMien ? "Không" : "Có",
                soLuongLoai: loaiCountObj[giangVien.loai],
                Stt: index + 1,
            })
        );

        // Ưu tiên lấy giảng viên loại "Cá nhân" > "Tác giả thứ nhất" với các điều kiện ưu tiên
        let DaiDien = dataDangKy.find(
            (giangVien) => giangVien.loai === "Cá nhân"
        );

        if (!DaiDien) {
            DaiDien = dataDangKy.find(
                (giangVien) =>
                    giangVien.loai === "Tác giả thứ nhất"
                    &&
                    giangVien.laVienChuc === "Không" || giangVien.duocMien === "Không"
            );
        }

        // Nếu không tìm thấy theo ưu tiên trên, lấy giảng viên loại "Tác giả thứ nhất" đầu tiên
        if (!DaiDien) {
            DaiDien = dataDangKy.find(
                (giangVien) => giangVien.loai === "Tác giả thứ nhất"
            );
        }

        const obj = [];

        let [TacGiaDaiDien] = await pool.execute(
            `
        SELECT 
            ctl.MA_QUY_DOI, 
            ctl.MA_LOAI_DANH_MUC, 
            ctl.MA_LOAI_TAC_GIA, 
            ltg.TEN_LOAI_TAC_GIA,
            ctl.DA_LOAI_TAC_GIA, 
            ctl.SO_TAC_GIA_THUOC_LOAI, 
            tqd.TEN_QUY_DOI, 
            tqd.TY_LE, 
            tqd.VIEN_CHUC_TRUONG, 
            tqd.THUC_HIEN_CHUAN
        FROM 
            co_ty_le ctl
        JOIN 
            ty_le_quy_doi_gio_chuan tqd ON ctl.MA_QUY_DOI = tqd.MA_QUY_DOI
        JOIN 
            loai_tac_gia ltg ON ctl.MA_LOAI_TAC_GIA = ltg.MA_LOAI_TAC_GIA
        WHERE 
            ctl.MA_LOAI_DANH_MUC = ?
            AND ltg.TEN_LOAI_TAC_GIA = ?
            AND tqd.VIEN_CHUC_TRUONG = ?
            AND tqd.THUC_HIEN_CHUAN = ?
        `,
            [
                dataDangKyDanhMuc.MALOAIDANHMUC,
                DaiDien.loai,
                DaiDien.laVienChuc,
                DaiDien.duocMien,
            ]
        );

        console.log("DaiDien: ", DaiDien);
        console.log("TacGiaDaiDien: ", TacGiaDaiDien);
        console.log("dataDangKy: ", dataDangKy);

        for (let i = 0; i < dataDangKy.length; i++) {
            let DataTyLeTraVe; // Khai báo biến DataTyLeTraVe trước vòng lặp

            if (
                dataDangKy[i].loai === "Tác giả chịu trách nhiệm" &&
                (dataDangKy[i].soLuongLoai === 1 || dataDangKy[i].loai === 2) &&
                TacGiaDaiDien[0].VIEN_CHUC_TRUONG === "Không"
            ) {
                [DataTyLeTraVe] = await pool.execute(
                    `
            SELECT 
                ctl.MA_QUY_DOI, 
                ctl.MA_LOAI_DANH_MUC, 
                ctl.MA_LOAI_TAC_GIA, 
                ltg.TEN_LOAI_TAC_GIA,
                ctl.DA_LOAI_TAC_GIA, 
                ctl.SO_TAC_GIA_THUOC_LOAI, 
                tqd.TEN_QUY_DOI, 
                tqd.TY_LE, 
                tqd.VIEN_CHUC_TRUONG, 
                tqd.THUC_HIEN_CHUAN
            FROM 
                co_ty_le ctl
            JOIN 
                ty_le_quy_doi_gio_chuan tqd ON ctl.MA_QUY_DOI = tqd.MA_QUY_DOI
            JOIN 
                loai_tac_gia ltg ON ctl.MA_LOAI_TAC_GIA = ltg.MA_LOAI_TAC_GIA
            WHERE 
                ctl.MA_LOAI_DANH_MUC = ?
                AND ctl.SO_TAC_GIA_THUOC_LOAI = ?
                AND ltg.TEN_LOAI_TAC_GIA = ?
                AND tqd.TEN_QUY_DOI = ?
                AND tqd.VIEN_CHUC_TRUONG = ?
                AND tqd.THUC_HIEN_CHUAN = ?
          `,
                    [
                        dataDangKyDanhMuc.MALOAIDANHMUC,
                        dataDangKy[i].soLuongLoai,
                        dataDangKy[i].loai,
                        TacGiaDaiDien[0].TEN_QUY_DOI,
                        dataDangKy[i].laVienChuc,
                        dataDangKy[i].duocMien,
                    ]
                );
            } else {
                [DataTyLeTraVe] = await pool.execute(
                    `
            SELECT 
                ctl.MA_QUY_DOI, 
                ctl.MA_LOAI_DANH_MUC, 
                ctl.MA_LOAI_TAC_GIA, 
                ltg.TEN_LOAI_TAC_GIA,
                ctl.DA_LOAI_TAC_GIA, 
                ctl.SO_TAC_GIA_THUOC_LOAI, 
                tqd.TEN_QUY_DOI, 
                tqd.TY_LE, 
                tqd.VIEN_CHUC_TRUONG, 
                tqd.THUC_HIEN_CHUAN
            FROM 
                co_ty_le ctl
            JOIN 
                ty_le_quy_doi_gio_chuan tqd ON ctl.MA_QUY_DOI = tqd.MA_QUY_DOI
            JOIN 
                loai_tac_gia ltg ON ctl.MA_LOAI_TAC_GIA = ltg.MA_LOAI_TAC_GIA
            WHERE 
                ctl.MA_LOAI_DANH_MUC = ?
                AND ltg.TEN_LOAI_TAC_GIA = ?
                AND tqd.TEN_QUY_DOI = ?
                AND tqd.VIEN_CHUC_TRUONG = ?
                AND tqd.THUC_HIEN_CHUAN = ?
          `,
                    [
                        dataDangKyDanhMuc.MALOAIDANHMUC,
                        dataDangKy[i].loai,
                        TacGiaDaiDien[0].TEN_QUY_DOI,
                        dataDangKy[i].laVienChuc,
                        dataDangKy[i].duocMien,
                    ]
                );
            }

            if (DataTyLeTraVe.length === 0) {
                DataTyLeTraVe.push({
                    MA_QUY_DOI: null,
                    MA_LOAI_DANH_MUC: dataDangKyDanhMuc.MALOAIDANHMUC,
                    MA_LOAI_TAC_GIA: null,
                    TEN_LOAI_TAC_GIA: dataDangKy[i].loai,
                    DA_LOAI_TAC_GIA: "Không có dữ liệu",
                    SO_TAC_GIA_THUOC_LOAI: dataDangKy[i].soLuongLoai,
                    TEN_QUY_DOI: "Không có dữ liệu",
                    TY_LE: null,
                    VIEN_CHUC_TRUONG: dataDangKy[i].laVienChuc,
                    THUC_HIEN_CHUAN: dataDangKy[i].duocMien,
                });
            }

            obj.push({ ...DataTyLeTraVe[0], Stt: i + 1 });
        }

        console.log("obj: ", obj);

        return {
            EM: "Đăng ký danh mục thành công",
            EC: 1,
            DT: obj,
        };
    } catch (error) {
        console.log("dangky_danhmuc_giangvien errr >>>", error);
        return [];
    }
};


module.exports = {
    dangky_danhmuc_giangvien,
};