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
        const loaiCountObj = dataDangKyDanhMuc.LISTGIANGVIEN.reduce(
            (acc, giangVien) => {
                acc[giangVien.loai] = (acc[giangVien.loai] || 0) + 1;
                return acc;
            },
            {}
        );

        const dataDangKy = dataDangKyDanhMuc.LISTGIANGVIEN.map(
            (giangVien, index) => ({
                ...giangVien,
                laVienChuc: giangVien.laVienChuc ? "Có" : "Không",
                duocMien: giangVien.duocMien ? "Không" : "Có",
                soLuongLoai: loaiCountObj[giangVien.loai],
                Stt: index + 1,
            })
        );

        let [LoaiTacGia_LoaiDanhMuc] = await pool.execute(
            `
        SELECT 
            ltg.TEN_LOAI_TAC_GIA,
            ltg.DO_UU_TIEN,
            GROUP_CONCAT(ldm.TEN_LOAI_DANH_MUC SEPARATOR ', ') AS TEN_LOAI_DANH_MUC
        FROM 
            co_ty_le AS ctl
        JOIN 
            loai_danh_muc AS ldm ON ctl.MA_LOAI_DANH_MUC = ldm.MA_LOAI_DANH_MUC
        JOIN 
            loai_tac_gia AS ltg ON ctl.MA_LOAI_TAC_GIA = ltg.MA_LOAI_TAC_GIA 
        WHERE 
            ldm.MA_LOAI_DANH_MUC = ?
        GROUP BY 
            ltg.TEN_LOAI_TAC_GIA, ltg.DO_UU_TIEN
        ORDER BY 
            ltg.DO_UU_TIEN ASC;
        `,
            [dataDangKyDanhMuc.MALOAIDANHMUC]
        );

        let DaiDien = null;

        for (let i = 0; i < LoaiTacGia_LoaiDanhMuc.length; i++) {
            const candidates = dataDangKy.filter(
                (giangVien) => giangVien.loai === LoaiTacGia_LoaiDanhMuc[i].TEN_LOAI_TAC_GIA
            );

            DaiDien = candidates.find(
                (giangVien) =>
                    giangVien.laVienChuc === "Không" && giangVien.duocMien === "Không"
            );

            if (!DaiDien) {
                DaiDien = candidates.find((giangVien) => giangVien.duocMien === "Không");
            }

            if (!DaiDien) {
                DaiDien = candidates[0];
            }

            if (DaiDien) break;
        }

        const obj = [];
        let [TacGiaDaiDien] = await pool.execute(
            `
        SELECT 
            ctl.MA_QUY_DOI, 
            ctl.MA_LOAI_DANH_MUC, 
            ctl.MA_LOAI_TAC_GIA, 
            ltg.TEN_LOAI_TAC_GIA,
            ctl.NHOM_CHIA_GIO, 
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

        for (let i = 0; i < dataDangKy.length; i++) {
            let DataTyLeTraVe;

            if (
                dataDangKy[i].loai === "Tác giả chịu trách nhiệm" &&
                (dataDangKy[i].soLuongLoai === 1 || dataDangKy[i].soLuongLoai === 2) &&
                TacGiaDaiDien[0].VIEN_CHUC_TRUONG === "Không"
            ) {
                [DataTyLeTraVe] = await pool.execute(
                    `
            SELECT 
                ctl.MA_QUY_DOI, 
                ctl.MA_LOAI_DANH_MUC, 
                ctl.MA_LOAI_TAC_GIA, 
                ltg.TEN_LOAI_TAC_GIA,
                ctl.NHOM_CHIA_GIO, 
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
                ctl.NHOM_CHIA_GIO, 
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
                    NHOM_CHIA_GIO: "Không có dữ liệu",
                    SO_TAC_GIA_THUOC_LOAI: dataDangKy[i].soLuongLoai,
                    TEN_QUY_DOI: "Không có dữ liệu",
                    TY_LE: null,
                    VIEN_CHUC_TRUONG: dataDangKy[i].laVienChuc,
                    THUC_HIEN_CHUAN: dataDangKy[i].duocMien,
                });
            }

            obj.push(...DataTyLeTraVe);
        }

        return obj;
    } catch (error) {
        console.error("Có lỗi xảy ra trong quá trình đăng ký danh mục giảng viên:", error);
        throw error;
    }
};

module.exports = {
    dangky_danhmuc_giangvien,
};