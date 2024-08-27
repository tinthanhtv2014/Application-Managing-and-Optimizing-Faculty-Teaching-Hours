const pool = require("../../config/database");
const moment = require("moment");
const {
  timnamhoc_TENNAMHOC,
  timtacgia_TEN_LOAI_TAC_GIA,
  timGiangVien_TENGV,
  selectBomon_TENBOMON,
  timGiangVien_TENGV_TENDANGNHAP,
  timdetai_TENDETAI,
} = require("../../services/AdminServices/helpers");

const get_thongtin_danhmuc = async (TENDANGNHAP, TENNAMHOC) => {
  try {
    ("TENDANGNHAP get_thongtin_danhmuc: ", TENDANGNHAP);
    ("TENNAMHOC get_thongtin_danhmuc: ", TENNAMHOC);
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

//xem số lượng đề tài đã đăng ký
const get_thongtin_dangky_giangvien = async (MAGV, TENNAMHOC) => {
  ("MAGV get_thongtin_dangky_giangvien:", MAGV);
  ("TENNAMHOC get_thongtin_dangky_giangvien:", TENNAMHOC);

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
    ("check MANAMHOC", MANAMHOC);
    const [results1, fields] = await pool.execute(
      `
      SELECT 
      giangvien.TENGV,
      ltg.TEN_LOAI_TAC_GIA,
      namhoc.TENNAMHOC,
      dkthqd.TEN_DE_TAI,
      dkthqd.SOGIOQUYDOI,
      nckh.THOI_GIAN_DANG_KY,
      dm.* 
      FROM 
      giangvien
      JOIN dang_ky_thuc_hien_quy_doi AS dkthqd ON giangvien.MAGV = dkthqd.MAGV
      JOIN namhoc ON namhoc.MANAMHOC = dkthqd.MANAMHOC
      JOIN danhmucquydoispkhcn AS dm ON dm.MA_DANH_MUC = dkthqd.MA_DANH_MUC
      JOIN nghien_cuu_kh AS nckh ON nckh.TEN_DE_TAI = dkthqd.TEN_DE_TAI
      JOIN loai_tac_gia AS ltg ON ltg.MA_LOAI_TAC_GIA = dkthqd.MA_LOAI_TAC_GIA
      WHERE
      giangvien.MAGV = ? 
      AND namhoc.MANAMHOC = ?`,
      [MAGV, MANAMHOC]
    );

    return {
      EM: "Lấy thông tin thành công",
      EC: 1,
      DT: results1,
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

const get_thongtin_dangky_giangvien_hoptac = async (TEN_NGHIEN_CUU) => {
  try {
    console.log("check TEN_NGHIEN_CUU", TEN_NGHIEN_CUU);
    const [results1, fields] = await pool.execute(
      `SELECT giangvien.TENGV,
      dkthqd.TEN_DE_TAI,
      ltg.TEN_LOAI_TAC_GIA 
      from 
      dang_ky_thuc_hien_quy_doi as dkthqd,
      loai_tac_gia as ltg,
      giangvien
      where giangvien.MAGV = dkthqd.MAGV 
      and ltg.MA_LOAI_TAC_GIA = dkthqd.MA_LOAI_TAC_GIA
      and dkthqd.TEN_DE_TAI = ?
     `,
      [TEN_NGHIEN_CUU]
    );

    return {
      EM: "Lấy thông tin thành công",
      EC: 1,
      DT: results1,
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

//tìm mã ngẫu nhiên
function getRandomNumber() {
  return Math.floor(Math.random() * 100000) + 1;
}

async function callbackMAGV(pool) {
  let randomMAGV = "GVNT" + getRandomNumber();

  // Kiểm tra mã MAGV trong cơ sở dữ liệu
  let [checkkq] = await pool.execute(
    `SELECT MAGV FROM giangvien WHERE MAGV = ?`,
    [randomMAGV]
  );
  console.log("Mã bị trùng1: ", checkkq);
  // Nếu mã bị trùng, tạo lại mã mới
  if (checkkq.length > 0 && checkkq[0].MAGV === randomMAGV) {
    console.log("Mã bị trùng: ", randomMAGV);
    randomMAGV = "GVNT" + getRandomNumber();
    console.log("Mã mới: ", randomMAGV);
  }
  return randomMAGV;
}

//đăng ký giảng viên
const dangky_thongtin_giangvien = async (dataDangKy) => {
  try {
    const time = moment().format("YYYY-MM-DD");
    const timNAMHOC = await timnamhoc_TENNAMHOC(dataDangKy.MANAMHOC);
    if (!timNAMHOC) {
      return {
        EM: "không có năm học",
        EC: 0,
        DT: [],
      };
    }

    for (var i = 0; i < dataDangKy.LISTGIANGVIEN.length; i++) {
      console.log(dataDangKy.LISTGIANGVIEN[i]);
      const timtacgia = await timtacgia_TEN_LOAI_TAC_GIA(
        dataDangKy.LISTGIANGVIEN[i].loai
      );
      const timbomon = await selectBomon_TENBOMON(
        dataDangKy.LISTGIANGVIEN[i].boMon
      );
      let timgiangvien = [];
      let selectgiangvien = [];
      if (dataDangKy.LISTGIANGVIEN[i].laVienChuc === true) {
        timgiangvien = await timGiangVien_TENGV_TENDANGNHAP(
          dataDangKy.LISTGIANGVIEN[i].tenGV,
          dataDangKy.LISTGIANGVIEN[i].emailGV
        );
      } else {
        timgiangvien = await timGiangVien_TENGV(
          dataDangKy.LISTGIANGVIEN[i].tenGV,
          dataDangKy.LISTGIANGVIEN[i].emailGV
        );
      }

      console.log("check timgv:", timgiangvien);
      if (timgiangvien === undefined) {
        const randomMAGV = await callbackMAGV(pool);

        await pool.execute(
          `insert into giangvien (MAGV,MABOMON,TENGV,EMAIL) values (?,?,?,?)
       `,
          [
            randomMAGV,
            timbomon[0].MABOMON,
            dataDangKy.LISTGIANGVIEN[i].tenGV,
            dataDangKy.LISTGIANGVIEN[i].emailGV,
          ]
        );
      }

      if (dataDangKy.LISTGIANGVIEN[i].laVienChuc === true) {
        selectgiangvien = await timGiangVien_TENGV_TENDANGNHAP(
          dataDangKy.LISTGIANGVIEN[i].tenGV,
          dataDangKy.LISTGIANGVIEN[i].emailGV
        );
      } else {
        selectgiangvien = await timGiangVien_TENGV(
          dataDangKy.LISTGIANGVIEN[i].tenGV,
          dataDangKy.LISTGIANGVIEN[i].emailGV
        );
      }

      const timdetai = await timdetai_TENDETAI(dataDangKy.TENDETAI);

      if (timdetai.length > 0) {
        await pool.execute(
          `insert into dang_ky_thuc_hien_quy_doi values (?,?,?,?,?,?,N'Đã đăng ký')
         `,
          [
            dataDangKy.MADANHMUC,
            selectgiangvien.MAGV,
            timNAMHOC,
            timtacgia,
            dataDangKy.TENDETAI,
            dataDangKy.LISTGIANGVIEN[i].soGio,
          ]
        );
      } else {
        await pool.execute(
          `insert into nghien_cuu_kh values (?,?)
           `,
          [dataDangKy.TENDETAI, time]
        );
        await pool.execute(
          `insert into dang_ky_thuc_hien_quy_doi values (?,?,?,?,?,?,N'Đã đăng ký')
         `,
          [
            dataDangKy.MADANHMUC,
            selectgiangvien.MAGV,
            timNAMHOC,
            timtacgia,
            dataDangKy.TENDETAI,
            dataDangKy.LISTGIANGVIEN[i].soGio,
          ]
        );
      }
    }

    const [results1, fields] = await pool.execute(
      `SELECT giangvien.TENGV,
      nkkh.TEN_DE_TAI,
      nkkh.THOI_GIAN_DANG_KY,
      dkthqd.SOGIOQUYDOI,
      ltg.TEN_LOAI_TAC_GIA 
      from 
      dang_ky_thuc_hien_quy_doi as dkthqd,
      loai_tac_gia as ltg,
      giangvien,
      nghien_cuu_kh as nkkh
      where giangvien.MAGV = dkthqd.MAGV 
      and dkthqd.TEN_DE_TAI = nkkh.TEN_DE_TAI
      and ltg.MA_LOAI_TAC_GIA = dkthqd.MA_LOAI_TAC_GIA
      and nkkh.TEN_DE_TAI = ?
     `,
      [dataDangKy.TENDETAI]
    );

    return {
      EM: "đăng ký đề tài thành công",
      EC: 1,
      DT: results1,
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

module.exports = {
  get_thongtin_danhmuc,
  getLoaiTacGiaByLoaiDanhMuc,
  get_thongtin_dangky_giangvien,
  get_thongtin_dangky_giangvien_hoptac,
  dangky_thongtin_giangvien,
};
