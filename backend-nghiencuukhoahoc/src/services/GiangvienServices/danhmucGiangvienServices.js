const pool = require("../../config/database");

const { timnamhoc_TENNAMHOC } = require("../../services/AdminServices/helpers");

const get_thongtin_danhmuc = async (TENDANGNHAP, TENNAMHOC) => {
  try {
    let MANAMHOC = await timnamhoc_TENNAMHOC(TENNAMHOC);
    const [results_MAGV, fields__MAGV] = await pool.execute(
      "SELECT MAGV FROM taikhoan WHERE TENDANGNHAP =? ",
      [TENDANGNHAP]
    );

    const MAGV = results_MAGV[0].MAGV;
    // console.log("check results_MAGV=>", MAGV);
    if (MANAMHOC === 0) {
      return {
        EM: "Không có năm học này",
        EC: 0,
        DT: [],
      };
    }
    // console.log("Check MANAMHOC:   ", MANAMHOC);
    const [results1, fields] = await pool.execute(
      "select gv.MAGV,gv.TENGV,nh.*,kgc.GIONGHIENCUUKHOAHOC_CHUAN from giangvien as gv, namhoc as nh,chon_khung as ck,khunggiochuan as kgc where gv.MAGV = ck.MAGV and nh.MANAMHOC = ck.MANAMHOC and kgc.MAKHUNG = ck.MAKHUNG and gv.MAGV = ? and nh.MANAMHOC = ?",
      [MAGV, MANAMHOC]
    );

    return {
      EM: "lấy thông tin thành công",
      EC: 1,
      DT: results1[0],
    };
  } catch (error) {
    console.log("timChucDanh_TENCHUCDANH errr >>>", error);
    return [];
  }
};

const getLoaiTacGiaByLoaiDanhMuc = async (MA_LOAI_DANH_MUC) => {
  try {
    // Truy vấn MA_LOAI_DANH_MUC từ bảng LOAI_DANH_MUC dựa vào TEN_LOAI_DANH_MUC
    // let [LoaiDanhMuc, fields1] = await pool.execute(
    //   `SELECT MA_LOAI_DANH_MUC FROM loai_danh_muc WHERE TEN_LOAI_DANH_MUC = ?`,
    //   [TEN_LOAI_DANH_MUC]
    // );

    // if (LoaiDanhMuc.length === 0) {
    //   return {
    //     EM: "Loại danh mục không tồn tại",
    //     EC: 0,
    //     DT: [],
    //   };
    // }

    // Truy vấn MA_LOAI_TAC_GIA từ bảng CO_TY_LE dựa vào MA_LOAI_DANH_MUC
    let [CoTyLe, fields2] = await pool.execute(
      `SELECT DISTINCT MA_LOAI_TAC_GIA FROM co_ty_le WHERE MA_LOAI_DANH_MUC = ?`,
      [MA_LOAI_DANH_MUC]
    );

    if (CoTyLe.length === 0) {
      return {
        EM: "Không có tác giả nào thuộc loại danh mục này",
        EC: 0,
        DT: [],
      };
    }

    // Truy vấn TEN_LOAI_TAC_GIA từ bảng LOAI_TAC_GIA dựa vào MA_LOAI_TAC_GIA
    let tenLoaiTacGias = [];
    for (let i = 0; i < CoTyLe.length; i++) {
      let [LoaiTacGia, fields3] = await pool.execute(
        `SELECT TEN_LOAI_TAC_GIA FROM loai_tac_gia WHERE MA_LOAI_TAC_GIA = ?`,
        [CoTyLe[i].MA_LOAI_TAC_GIA]
      );

      if (LoaiTacGia.length > 0) {
        tenLoaiTacGias.push(LoaiTacGia[0]);
      }
    }

    return {
      EM: "Lấy dữ liệu thành công",
      EC: 1,
      DT: tenLoaiTacGias,
    };
  } catch (error) {
    console.error("Lỗi trong try-catch: ", error);
    return {
      EM: "Đã xảy ra lỗi khi lấy dữ liệu",
      EC: -1,
      DT: null,
    };
  }
};

const get_thongtin_dangky_giangvien = async (MAGV, TENNAMHOC) => {
  try {
    let MANAMHOC = await timnamhoc_TENNAMHOC(TENNAMHOC);
    if (MANAMHOC === 0) {
      return {
        EM: "Không có năm học này",
        EC: 0,
        DT: [],
      };
    }
    // console.log("Check MANAMHOC:   ", MANAMHOC);
    const [results1, fields] = await pool.execute(
      `select 
      giangvien.TENGV,
      ltg.TEN_LOAI_TAC_GIA,
      namhoc.TENNAMHOC,
      dkthqd.TEN_NGHIEN_CUU,
      dkthqd.THOI_GIAN_DANG_KY,
      dm.* 
      from 
      giangvien,
      namhoc,
      dang_ky_thuc_hien_quy_doi as dkthqd, 
      danhmucquydoispkhcn as dm, 
      loai_tac_gia as ltg
      where
      giangvien.MAGV = dkthqd.MAGV
      and dm.MA_DANH_MUC = dkthqd.MA_DANH_MUC
      and namhoc.MANAMHOC = dkthqd.MANAMHOC
      and ltg.MA_LOAI_TAC_GIA = dkthqd.MA_LOAI_TAC_GIA
      and giangvien.MAGV = ? and namhoc.MANAMHOC = ?`,
      [MAGV, MANAMHOC]
    );

    return {
      EM: "lấy thông tin thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    console.log("timChucDanh_TENCHUCDANH errr >>>", error);
    return [];
  }
};

module.exports = {
  get_thongtin_danhmuc,
  getLoaiTacGiaByLoaiDanhMuc,
  get_thongtin_dangky_giangvien,
};
