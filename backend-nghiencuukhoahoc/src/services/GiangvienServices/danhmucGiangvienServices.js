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
      dkthqd.SOGIOQUYDOI,
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

const dangky_danhmuc_giangvien = async (dataDangKyDanhMuc) => {
  try {
    console.log("dataDangKyDanhMuc: ", dataDangKyDanhMuc);

    // Khởi tạo một object để đếm các giá trị 'loai'
    const loaiCountObj = dataDangKyDanhMuc.LISTGIANGVIEN.reduce((acc, giangVien) => {
      acc[giangVien.loai] = (acc[giangVien.loai] || 0) + 1;
      return acc;
    }, {});

    // Chuyển đổi giá trị true/false và thêm số lượng 'loai' giống nhau vào dataDangKy
    const dataDangKy = dataDangKyDanhMuc.LISTGIANGVIEN.map((giangVien, index) => ({
      ...giangVien,
      laVienChuc: giangVien.laVienChuc ? 'Có' : 'Không',
      duocMien: giangVien.duocMien ? 'Không' : 'Có', //true = Không và false = Có
      soLuongLoai: loaiCountObj[giangVien.loai], // Thêm số lượng loại giống nhau
      Stt: index + 1 // Thêm thứ tự vào mỗi đối tượng
    }));

    console.log("dataDangKy: ", dataDangKy);

    // Lấy phần tử có loại là "Tác giả thứ nhất"
    const DaiDien = dataDangKy.find(giangVien => giangVien.loai === 'Tác giả thứ nhất');

    console.log("DaiDien: ", DaiDien);

    // Vòng lặp kiểm tra dữ liệu loại tác giả
    for (let i = 0; i < Object.keys(loaiCountObj).length; i++) {
      let [LoaiTacGia, LoaiTacGia_fields] = await pool.execute(
        `SELECT * FROM loai_tac_gia WHERE TEN_LOAI_TAC_GIA = ?`,
        [Object.keys(loaiCountObj)[i]]
      );
      if (LoaiTacGia.length === 0) {
        console.log("Không có LoaiTacGia: ", Object.keys(loaiCountObj)[i]);
        return {
          EM: "Dữ liệu loại tác giả này không tồn tại",
          EC: 0,
          DT: [],
        };
      }
    }

    // Tạo biến obj để lưu kết quả trả về
    const obj = [];

    // Vòng lặp thực hiện truy vấn DataTyLeTraVe và lưu kết quả vào obj
    let [TacGiaDaiDien, DataTyLeTraVe_fields] = await pool.execute(
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
          CO_TY_LE ctl
      JOIN 
          TY_LE_QUY_DOI_GIO_CHUAN tqd ON ctl.MA_QUY_DOI = tqd.MA_QUY_DOI
      JOIN 
          LOAI_TAC_GIA ltg ON ctl.MA_LOAI_TAC_GIA = ltg.MA_LOAI_TAC_GIA
      WHERE 
          ctl.MA_LOAI_DANH_MUC = ?
          AND ltg.TEN_LOAI_TAC_GIA = ?
          AND tqd.VIEN_CHUC_TRUONG = ?
          AND tqd.THUC_HIEN_CHUAN = ?
          AND ctl.SO_TAC_GIA_THUOC_LOAI = ?;
      `,
      [
        dataDangKyDanhMuc.MALOAIDANHMUC,
        DaiDien.loai,
        DaiDien.laVienChuc,
        DaiDien.duocMien,
        DaiDien.soLuongLoai,
      ]
    );
    console.log("TacGiaDaiDien: ", TacGiaDaiDien)

    for (let i = 0; i < dataDangKy.length; i++) {
      let [DataTyLeTraVe, DataTyLeTraVe_fields] = await pool.execute(
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
            CO_TY_LE ctl
        JOIN 
            TY_LE_QUY_DOI_GIO_CHUAN tqd ON ctl.MA_QUY_DOI = tqd.MA_QUY_DOI
        JOIN 
            LOAI_TAC_GIA ltg ON ctl.MA_LOAI_TAC_GIA = ltg.MA_LOAI_TAC_GIA
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
      obj.push({ ...DataTyLeTraVe[0], Stt: i + 1 }); // Thêm đối tượng vào obj với Stt
    }
    console.log("obj: ", obj)

    let results1 = 0;

    return {
      EM: "Đăng ký danh mục thành công",
      EC: 1,
      DT: obj
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
  dangky_danhmuc_giangvien
};
