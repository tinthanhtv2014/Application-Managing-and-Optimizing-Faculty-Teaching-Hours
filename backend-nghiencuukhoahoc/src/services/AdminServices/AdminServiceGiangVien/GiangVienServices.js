const pool = require("../../../config/database");

const {
  timTaiKhoan_TENDANGNHAP,
  timGiangVien_MAGV,
  selectBomon_TENBOMON,
  selectChucdanh_TENCHUCDANH,
  timChucVu_TENCHUCVU,
  timChucVu_MAGV,
  timCoChucDanh_MAGV,
  timChucVu_MACHUCVU,
  timChucDanh_MACHUCDANH,
  timNamHoc_MANAMHOC,

  dataFronEnd,
} = require("../helpers");

const update_ChucVu_ChucDanh_GiangVien = async (
  dataGiangVien,
  isOpenGetAllApiGV
) => {
  try {
    // TENDANGNHAP là bắt buộc
    // dataGiangVien gồm TENDANGNHAP, TENGV, TENCHUCVU, TUNGAY, TENCHUCDANH, THOIGIANNHAN, DIENTHOAI, DIACHI, TENBOMON, PHANQUYEN, TRANGTHAITAIKHOAN
    // Thay thế các giá trị null hoặc undefined bằng chuỗi rỗng
    const fields0 = [
      "TENDANGNHAP",
      "TENGV",

      "TENCHUCVU",
      "TUNGAY",

      "TENCHUCDANH",
      "THOIGIANNHAN",
      "SOQUYETDINH",
      "DIENTHOAI",
      "DIACHI",
      "TENBOMON",
      "PHANQUYEN",
      "TRANGTHAITAIKHOAN",
    ];
    fields0.forEach((field) => {
      if (dataGiangVien[field] === undefined || dataGiangVien[field] === null) {
        dataGiangVien[field] = "";
      }
    });

    const {
      TENDANGNHAP,
      TENGV,
      TENCHUCVU,
      TUNGAY,
      TENCHUCDANH,
      THOIGIANNHAN,
      SOQUYETDINH,
      DIENTHOAI,
      DIACHI,
      TENBOMON,
      PHANQUYEN,
      TRANGTHAITAIKHOAN,
    } = dataGiangVien;

    let taikhoan = await timTaiKhoan_TENDANGNHAP(TENDANGNHAP);
    if (!taikhoan) {
      return {
        EM: "Tên đăng nhập này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let KiemTra_TENCHUCVU = await timChucVu_TENCHUCVU(TENCHUCVU);
    if (!KiemTra_TENCHUCVU && TENCHUCVU !== "") {
      return {
        EM: "Chức vụ này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let KiemTra_TENCHUCDANH = await selectChucdanh_TENCHUCDANH(TENCHUCDANH);
    if (!KiemTra_TENCHUCDANH && TENCHUCDANH !== "") {
      return {
        EM: "Chức danh này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    const bomon = await selectBomon_TENBOMON(TENBOMON);
    if (!bomon) {
      return {
        EM: "Bộ môn này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let MAGV = taikhoan[0].MAGV; // MAGV lấy từ bảng taikhoan

    let MACHUCVU =
      KiemTra_TENCHUCVU.length > 0 ? KiemTra_TENCHUCVU[0].MACHUCVU : "";
    let MACHUCDANH =
      KiemTra_TENCHUCDANH.length > 0 ? KiemTra_TENCHUCDANH[0].MACHUCDANH : "";

    let MABOMON = bomon[0].MABOMON; //MABOMON được nhập vào

    let giangvien = await timGiangVien_MAGV(taikhoan[0].MAGV);
    let MABOMON_cu = giangvien[0].MABOMON; // MABOMON có sẵn trước khi update giảng viên

    // Lấy ngày giờ hiện tại
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`; // Ngày giờ hiện tại

    // Hàm kiểm tra định dạng ngày hợp lệ
    function isValidDate(dateString) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString);
    }

    // Kiểm tra giá trị TUNGAY
    if (TUNGAY && isValidDate(TUNGAY) && TUNGAY > formattedDate) {
      return {
        EM: "Không thể nhận thời gian ở tương lai",
        EC: 0,
        DT: [],
      };
    }

    // Kiểm tra giá trị THOIGIANNHAN
    if (
      THOIGIANNHAN &&
      isValidDate(THOIGIANNHAN) &&
      THOIGIANNHAN > formattedDate
    ) {
      return {
        EM: "Không thể nhận thời gian ở tương lai",
        EC: 0,
        DT: [],
      };
    }

    // update bảng tài khoản
    let [resultsTAIKHOAN, fieldsTAIKHOAN] = await pool.execute(
      `UPDATE taikhoan SET PHANQUYEN = ?, TRANGTHAITAIKHOAN = ? WHERE TENDANGNHAP = ?`,
      [PHANQUYEN, TRANGTHAITAIKHOAN, TENDANGNHAP]
    );
    let kiemTraUpdateTAIKHOANG = "Update tài khoảng không thành công";
    if (resultsTAIKHOAN) {
      kiemTraUpdateTAIKHOANG = "Update tài khoảng thành công";
    }

    //update bảng giảng viên
    let [resultsGIANGVIEN, fieldsGIANGVIEN] = await pool.execute(
      `UPDATE giangvien
                SET MABOMON = ?, TENGV = ?, EMAIL = ?, DIENTHOAI = ?, DIACHI = ? 
                WHERE MAGV = ?;`,
      [MABOMON, TENGV, TENDANGNHAP, DIENTHOAI, DIACHI, MAGV]
    );
    let kiemTraUpdateGIANGVIEN = "Update giảng viên không thành công";
    if (resultsGIANGVIEN) {
      kiemTraUpdateGIANGVIEN = "Update giảng viên thành công";
    }

    //Các trường hợp cho xử lý thay đổi chức vụ =========================================================
    //update bảng chức vụ, giữ chức vụ
    let kiemTraSQL = false;
    let thongBaoUpdateCHUCVU_GIU_CHUC_VU = `Không có sự thay đổi chức vụ`;
    let ChucVu_cua_GiangVien = await timChucVu_MAGV(MAGV); //Danh sách các chức vụ của MAGV này

    let chucvu_TUNGAY = formattedDate;
    if (TUNGAY !== "") {
      chucvu_TUNGAY = TUNGAY;
    }

    if (TENCHUCVU != "") {
      //Trường hợp giảng viên có sự thai đổi về chức vụ

      //Xóa tất cả dữ liệu của bảng giu_chuc_vu
      if (ChucVu_cua_GiangVien.length > 0) {
        let [resultsGIU_CHUC_VU, fieldsGIU_CHUC_VU] = await pool.execute(
          `
            DELETE FROM giu_chuc_vu
            WHERE giu_chuc_vu.MAGV = ?;
          `,
          [MAGV]
        );
      }
    }

    if (TENCHUCVU) {
      thongBaoUpdateCHUCVU_GIU_CHUC_VU = "Có sự thay đổi chức vụ";
      kiemTraSQL = true;

      //INSERT INTO chức vụ cho giảng viên
      let [resultsGIU_CHUC_VU, fieldsGIU_CHUC_VU] = await pool.execute(
        `INSERT INTO giu_chuc_vu (MAGV, MACHUCVU, SOQUYETDINH, TUNGAY) 
            VALUES (?, ?, ?, ?)`,
        [MAGV, MACHUCVU, SOQUYETDINH, chucvu_TUNGAY]
      );
    }

    let kiemTraUpdateChucVu_cua_GiangVien = `Update chức vụ của giảng viên không thành công, giảng viên có ${ChucVu_cua_GiangVien.length} chức vụ`;
    if (kiemTraSQL) {
      kiemTraUpdateChucVu_cua_GiangVien = `Update chức vụ của giảng viên thành công, giảng viên có ${ChucVu_cua_GiangVien.length} chức vụ`;
    }
    kiemTraSQL = false;
    //===============================================================================================

    //Các trường hợp cho bảng Chức danh ================================================================
    let thongBaoChucDanh = "Không có sự thay đổi chức danh";
    let kiemTraCHUCDANH_CO_CHUC_DANH = await timCoChucDanh_MAGV(MAGV);

    let chucdanh_THOIGIANNHAN = formattedDate;
    if (THOIGIANNHAN !== "") {
      chucdanh_THOIGIANNHAN = THOIGIANNHAN;
    }

    if (TENCHUCDANH !== "") {
      //kiểm tra tên chức danh có phải '' không

      //Trường hợp giảng viên bị xóa chức danh
      if (kiemTraCHUCDANH_CO_CHUC_DANH.length > 0) {
        let [resultsCO_CHUC_DANH, fieldsCO_CHUC_DANH] = await pool.execute(
          `
                  DELETE FROM co_chuc_danh 
                  WHERE co_chuc_danh.MAGV = ?
                  `,
          [MAGV]
        );
      }

      if (TENCHUCDANH) {
        thongBaoChucDanh = "Có sự thay đổi chức danh";
        kiemTraSQL = true;

        let [resultsCO_CHUC_DANH, fieldsCO_CHUC_DANH] = await pool.execute(
          `
                  INSERT INTO co_chuc_danh (MACHUCDANH, MAGV, THOIGIANNHAN, TRANGTHAI) 
                  VALUES (?, ?, ?, ?);
                  `,
          [MACHUCDANH, MAGV, chucdanh_THOIGIANNHAN, "Đang giữ chức danh"]
        );
      }
    }

    let kiemTraUpdateChucDanh = "Update chức danh không thành công";
    if (kiemTraSQL) {
      kiemTraUpdateChucDanh = "Update chức danh thành công";
    }
    //==================================================================================================

    //Các trường hợp cho bảng bộ môn ===================================================================
    let thongBaoBoMon = "Không có sự thay đổi bộ môn";
    if (MABOMON_cu != MABOMON) {
      thongBaoBoMon = "Có sự thay đổi bộ môn";
    }
    //==================================================================================================

    let results0 = await dataFronEnd(isOpenGetAllApiGV, MABOMON);
    console.log("check", results0);
    return {
      EM: `Trạng thái sửa: ${kiemTraUpdateTAIKHOANG}, ${kiemTraUpdateGIANGVIEN}, ${thongBaoUpdateCHUCVU_GIU_CHUC_VU} > ${kiemTraUpdateChucVu_cua_GiangVien}, ${thongBaoChucDanh} > ${kiemTraUpdateChucDanh}, ${thongBaoBoMon}`,
      EC: 1,
      DT: results0.DT,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi services updateTrangThaiTaiKhoanGiangVien",
      EC: -1,
      DT: null,
    };
  }
};

const xem_Khung_Gio_Chuan_Theo_Chuc_Danh = async (MAGV) => {};

module.exports = {
  update_ChucVu_ChucDanh_GiangVien,
  xem_Khung_Gio_Chuan_Theo_Chuc_Danh,
};
