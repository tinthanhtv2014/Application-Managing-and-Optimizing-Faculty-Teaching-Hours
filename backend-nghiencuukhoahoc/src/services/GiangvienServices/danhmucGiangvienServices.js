const pool = require("../../config/database");

const { timnamhoc_TENNAMHOC } = require("../../services/AdminServices/helpers");

const get_thongtin_danhmuc = async (TENDANGNHAP, TENNAMHOC) => {
  try {
    console.log("TENDANGNHAP: ", TENDANGNHAP);
    console.log("TENNAMHOC: ", TENNAMHOC);
    let MANAMHOC = await timnamhoc_TENNAMHOC(TENNAMHOC);

    const [results_MAGV] = await pool.execute(
      "SELECT MAGV FROM taikhoan WHERE TENDANGNHAP =? ",
      [TENDANGNHAP]
    );

    if (results_MAGV.length === 0) {
      return {
        EM: "Không tìm thấy mã giảng viên",
        EC: 0,
        DT: [],
      };
    }

    const MAGV = results_MAGV[0].MAGV;

    if (MANAMHOC === 0) {
      return {
        EM: "Không có năm học này",
        EC: 0,
        DT: [],
      };
    }

    // Kiểm tra lại câu truy vấn để đảm bảo không sử dụng trường JSON
    const [results1] = await pool.execute(
      "SELECT gv.MAGV, gv.TENGV, nh.*, kgc.GIONGHIENCUUKHOAHOC_CHUAN " +
      "FROM giangvien AS gv " +
      "LEFT JOIN chon_khung AS ck ON gv.MAGV = ck.MAGV " +
      "LEFT JOIN namhoc AS nh ON nh.MANAMHOC = ck.MANAMHOC " +
      "LEFT JOIN khunggiochuan AS kgc ON kgc.MAKHUNG = ck.MAKHUNG " +
      "WHERE gv.MAGV = ? AND nh.MANAMHOC = ?",
      [MAGV, MANAMHOC]
    );

    return {
      EM: "Lấy thông tin thành công",
      EC: 1,
      DT: results1[0] || {}, // Trả về đối tượng rỗng nếu không có kết quả
    };
  } catch (error) {
    console.log("timChucDanh_TENCHUCDANH errr >>>", error);
    return {
      EM: "Đã xảy ra lỗi trong quá trình lấy thông tin",
      EC: 0,
      DT: [],
    };
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
  console.log("MAGV", MAGV);
  console.log("TENNAMHOC", TENNAMHOC);

  if (!MAGV || !TENNAMHOC) {
    return {
      EM: "Mã giảng viên hoặc tên năm học bị thiếu",
      EC: 0,
      DT: [],
    };
  }

  try {
    const [results1_NAMHOC, fields_NAMHOC] = await pool.execute(
      `SELECT MANAMHOC FROM namhoc WHERE TENNAMHOC = ?`,
      [TENNAMHOC]
    );

    if (results1_NAMHOC.length === 0) {
      return {
        EM: "Không có năm học này",
        EC: 0,
        DT: [],
      };
    }

    const MANAMHOC = results1_NAMHOC[0].MANAMHOC; // Now safe to access
    console.log("check MANAMHOC", MANAMHOC);
    const [results1, fields] = await pool.execute(
      `SELECT 
      giangvien.TENGV,
      ltg.TEN_LOAI_TAC_GIA,
      namhoc.TENNAMHOC,
      dkthqd.TEN_NGHIEN_CUU,
      dkthqd.SOGIOQUYDOI,
      dkthqd.THOI_GIAN_DANG_KY,
      dm.* 
      FROM 
      giangvien
      JOIN dang_ky_thuc_hien_quy_doi AS dkthqd ON giangvien.MAGV = dkthqd.MAGV
      JOIN namhoc ON namhoc.MANAMHOC = dkthqd.MANAMHOC
      JOIN danhmucquydoispkhcn AS dm ON dm.MA_DANH_MUC = dkthqd.MA_DANH_MUC
      JOIN loai_tac_gia AS ltg ON ltg.MA_LOAI_TAC_GIA = dkthqd.MA_LOAI_TAC_GIA
      WHERE
      giangvien.MAGV = ? 
      AND namhoc.MANAMHOC = ?`,
      [MAGV, MANAMHOC]
    );

    return {
      EM: "Lấy thông tin thành công",
      EC: 1,
      DT: results1[0],
    };
  } catch (error) {
    console.log("get_thongtin_dangky_giangvien error >>>", error);
    return {
      EM: "Đã xảy ra lỗi trong quá trình lấy thông tin",
      EC: 0,
      DT: [],
    };
  }
};

const dangky_danhmuc_giangvien = async (dataDangKyDanhMuc) => {
  try {
    console.log("dataDangKyDanhMuc: ", dataDangKyDanhMuc);

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

    // Ưu tiên lấy giảng viên loại "Tác giả thứ nhất" với các điều kiện ưu tiên
    let DaiDien = dataDangKy.find(
      (giangVien) =>
        giangVien.loai === "Tác giả thứ nhất" &&
        giangVien.laVienChuc === "Không" &&
        giangVien.duocMien === "Không"
    );

    // Nếu không tìm thấy theo ưu tiên trên, lấy giảng viên loại "Tác giả thứ nhất" đầu tiên
    if (!DaiDien) {
      DaiDien = dataDangKy.find(
        (giangVien) => giangVien.loai === "Tác giả thứ nhất"
      );
    }

    for (let i = 0; i < Object.keys(loaiCountObj).length; i++) {
      let [LoaiTacGia] = await pool.execute(
        `SELECT * FROM loai_tac_gia WHERE TEN_LOAI_TAC_GIA = ?`,
        [Object.keys(loaiCountObj)[i]]
      );
      if (LoaiTacGia.length === 0) {
        return {
          EM: "Dữ liệu loại tác giả này không tồn tại",
          EC: 0,
          DT: [],
        };
      }
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

      if (dataDangKy[i].loai === 'Tác giả chịu trách nhiệm' && dataDangKy[i].soLuongLoai === 1 || dataDangKy[i].loai === 2) {
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
  get_thongtin_danhmuc,
  getLoaiTacGiaByLoaiDanhMuc,
  get_thongtin_dangky_giangvien,
  dangky_danhmuc_giangvien,
};
