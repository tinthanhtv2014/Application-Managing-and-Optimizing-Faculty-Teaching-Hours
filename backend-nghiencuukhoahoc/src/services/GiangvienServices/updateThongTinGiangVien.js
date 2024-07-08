const pool = require("../../config/database");

const { timTaiKhoan_TENDANGNHAP } = require("../AdminServices/helpers");

const updateThongTinGiangVien = async (TENDANGNHAP, dataGiangVien) => {
  try {
    // TENDANGNHAP bắt buộc
    // dataGiangVien gồm TENGV DIENTHOAI DIACHI TENCHUCDANH TENCHUCVU

    // Thay thế các giá trị null hoặc undefined bằng chuỗi rỗng
    const fields = [
      "TENGV",
      "DIENTHOAI",
      "DIACHI",
      "TENCHUCDANH",
      "TENCHUCVU",
      "EMAIL",
    ];
    fields.forEach((field) => {
      if (dataGiangVien[field] === undefined || dataGiangVien[field] === null) {
        dataGiangVien[field] = "";
      }
    });

    let KiemTra_TENDANGNHAP = await timTaiKhoan_TENDANGNHAP(TENDANGNHAP); // Hàm kiểm tra TENDANGNHAP có tồn tại không
    if (!KiemTra_TENDANGNHAP.length > 0) {
      return {
        EM: "Tài khoản này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields1] = await pool.execute(
      `UPDATE giangvien
              SET TENGV = ?, EMAIL = ?, DIENTHOAI = ?, DIACHI = ? 
              WHERE MAGV = ?;`,
      [
        dataGiangVien.TENGV,
        dataGiangVien.EMAIL,
        dataGiangVien.DIENTHOAI,
        dataGiangVien.DIACHI,
        KiemTra_TENDANGNHAP[0].MAGV,
      ]
    );

    // ----------------PHÚC THÊM NÈ--------------------------------------------------
    let [resultsDatatofront, fieldsDatatofront] = await pool.execute(
      `SELECT 
              TK.TENDANGNHAP,
              GV.TENGV, 
              CV.TENCHUCVU, 
              CD.TENCHUCDANH, 
              GV.DIENTHOAI, 
              GV.DIACHI, 
              BM.TENBOMON, 
              TK.PHANQUYEN, 
              TK.TRANGTHAITAIKHOAN
            FROM 
              taikhoan AS TK
            LEFT JOIN 
              giangvien AS GV ON TK.MAGV = GV.MAGV
            LEFT JOIN 
              giu_chuc_vu AS GCV ON GV.MAGV = GCV.MAGV
            LEFT JOIN 
              chucvu AS CV ON GCV.MACHUCVU = CV.MACHUCVU
            LEFT JOIN 
              co_chuc_danh AS CCD ON GV.MAGV = CCD.MAGV
            LEFT JOIN 
              chucdanh AS CD ON CCD.MACHUCDANH = CD.MACHUCDANH
            LEFT JOIN 
              bomon AS BM ON GV.MABOMON = BM.MABOMON
            WHERE 
              TK.TENDANGNHAP = ?;`,
      [TENDANGNHAP]
    ); // ----------------PHÚC THÊM NÈ--------------------------------------------------
    return {
      EM: "Sửa giảng viên thành công",
      EC: 1,
      DT: resultsDatatofront,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi services GiangvienServices - updateThongTinGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  updateThongTinGiangVien,
};
