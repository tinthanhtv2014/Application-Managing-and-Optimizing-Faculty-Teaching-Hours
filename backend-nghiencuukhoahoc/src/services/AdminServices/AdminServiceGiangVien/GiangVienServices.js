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
} = require("../helpers");

const update_ChucVu_ChucDanh_GiangVien = async (dataGiangVien) => {
  try {
    // dataGiangVien gồm TENDANGNHAP, TENGV, TENCHUCVU, TENCHUCDANH, DIENTHOAI, DIACHI, TENBOMON, PHANQUYEN, TRANGTHAITAIKHOAN

    console.log("dataGiangVien >>>>>", dataGiangVien);

    //console.log("dataGiangVien.TENDANGNHAP >>>>>", dataGiangVien.TENDANGNHAP);
    let KiemTra_TENDANGNHAP = await timTaiKhoan_TENDANGNHAP(
      dataGiangVien.TENDANGNHAP
    );
    //console.log("KiemTra_TENDANGNHAP >>>>>", KiemTra_TENDANGNHAP[0].MAGV);
    if (!KiemTra_TENDANGNHAP) {
      return {
        EM: "Tên đăng nhập này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let KiemTra_TENCHUCVU = await timChucVu_TENCHUCVU(dataGiangVien.TENCHUCVU);
    //console.log("KiemTra_TENCHUCVU >>>>>", KiemTra_TENCHUCVU[0].MACHUCVU);
    if (!KiemTra_TENCHUCVU) {
      return {
        EM: "Chức vụ này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let KiemTra_TENCHUCDANH = await selectChucdanh_TENCHUCDANH(
      dataGiangVien.TENCHUCDANH
    );
    //console.log("KiemTra_TENCHUCDANH >>>>>", KiemTra_TENCHUCDANH[0].MACHUCDANH);
    if (!KiemTra_TENCHUCDANH) {
      return {
        EM: "Chức danh này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let KiemTra_TENBOMON = await selectBomon_TENBOMON(dataGiangVien.TENBOMON);
    //console.log("KiemTra_TENBOMON >>>>>", KiemTra_TENBOMON[0].MABOMON);
    if (!KiemTra_TENBOMON) {
      return {
        EM: "Bộ môn này không tồn tại",
        EC: 0,
        DT: [],
      };
    }

    //Mã SQL chưa được làm xong <---------------------------

    let MAGV = KiemTra_TENDANGNHAP[0].MAGV; // MAGV lấy từ bảng taikhoan
    let MACHUCVU = KiemTra_TENCHUCVU[0].MACHUCVU;
    let MACHUCDANH = KiemTra_TENCHUCDANH[0].MACHUCDANH;

    let timGV_MAGV_theoTaikhoan = await timGiangVien_MAGV(MAGV);
    let MABOMON = KiemTra_TENBOMON[0].MABOMON; //MABOMON được nhập vào
    let MABOMON_cu = timGV_MAGV_theoTaikhoan[0].MABOMON; // MABOMON có sẵn trước khi update giảng viên
    //console.log("timGV_MAGV_theoTaikhoan >>>>>>>>>>>>>>", timGV_MAGV_theoTaikhoan[0].MABOMON);

    //Lấy ngày giờ hiện tại
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`; //Ngày giờ hiện tại
    console.log(formattedDate);

    // update bảng tài khoản
    let [resultsTAIKHOAN, fieldsTAIKHOAN] = await pool.execute(
      `UPDATE taikhoan SET PHANQUYEN = ?, TRANGTHAITAIKHOAN = ? WHERE TENDANGNHAP = ?`,
      [
        dataGiangVien.PHANQUYEN,
        dataGiangVien.TRANGTHAITAIKHOAN,
        dataGiangVien.TENDANGNHAP,
      ]
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
      [
        MABOMON,
        dataGiangVien.TENGV,
        dataGiangVien.TENDANGNHAP,
        dataGiangVien.DIENTHOAI,
        dataGiangVien.DIACHI,
        MAGV,
      ]
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
    // console.log("ChucVu_cua_GiangVien >>>>>", ChucVu_cua_GiangVien.length)

    //Trường hợp giảng viên không có chức vụ
    if (!ChucVu_cua_GiangVien[0]) {
      thongBaoUpdateCHUCVU_GIU_CHUC_VU = "Có sự thay đổi chức vụ";
      kiemTraSQL = true;

      //update bảng giảng viên
      let [resultsGIU_CHUC_VU, fieldsGIU_CHUC_VU] = await pool.execute(
        `INSERT INTO giu_chuc_vu (MAGV, MACHUCVU, SOQUYETDINH, TUNGAY) 
            VALUES (?, ?, ?, ?)`,
        [MAGV, MACHUCVU, 99, formattedDate]
      );
    }

    //Trường hợp giảng viên thay đổi chức vụ
    let TENCHUCVU_Cu = await timChucVu_MACHUCVU(
      ChucVu_cua_GiangVien[0].MACHUCVU
    ); // tên chức vụ cũ
    // console.log("TENCHUCVU_Cu >>>>>", TENCHUCVU_Cu[0].TENCHUCVU)
    if (
      ChucVu_cua_GiangVien.length > 0 &&
      TENCHUCVU_Cu[0].TENCHUCVU !== dataGiangVien.TENCHUCVU
    ) {
      thongBaoUpdateCHUCVU_GIU_CHUC_VU = "Có sự thay đổi chức vụ";
      kiemTraSQL = true;

      //update bảng giảng viên
      let [resultsGIU_CHUC_VU, fieldsGIU_CHUC_VU] = await pool.execute(
        `
            UPDATE giu_chuc_vu 
            SET MAGV = ?, MACHUCVU = ?, SOQUYETDINH = ?, TUNGAY = ? 
            WHERE giu_chuc_vu.MAGV = ? AND giu_chuc_vu.MACHUCVU = ?;
            `,
        [
          MAGV,
          MACHUCVU,
          99,
          formattedDate,

          ChucVu_cua_GiangVien[0].MAGV,
          ChucVu_cua_GiangVien[0].MACHUCVU,
        ]
      );
    }

    //Trường hợp giảng viên bị xóa chức vụ
    if (
      ChucVu_cua_GiangVien.length > 0 &&
      dataGiangVien.TENCHUCVU === "DELETE"
    ) {
      thongBaoUpdateCHUCVU_GIU_CHUC_VU = "Có sự thay đổi chức vụ";
      kiemTraSQL = true;

      //update bảng giảng viên
      let [resultsGIU_CHUC_VU, fieldsGIU_CHUC_VU] = await pool.execute(
        `
            DELETE FROM giu_chuc_vu 
            WHERE giu_chuc_vu.MAGV = ? AND giu_chuc_vu.MACHUCVU = ?
            `,
        [ChucVu_cua_GiangVien[0].MAGV, ChucVu_cua_GiangVien[0].MACHUCVU]
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
    // console.log("kiemTraCHUCDANH_CO_CHUC_DANH >>>>>>>", kiemTraCHUCDANH_CO_CHUC_DANH)

    //Trường hợp giảng viên không có chức danh
    if (!kiemTraCHUCDANH_CO_CHUC_DANH[0]) {
      thongBaoChucDanh = "Có sự thay đổi chức danh";
      kiemTraSQL = true;

      let [resultsCO_CHUC_DANH, fieldsCO_CHUC_DANH] = await pool.execute(
        `
                INSERT INTO co_chuc_danh (MACHUCDANH, MAGV, THOIGIANNHAN, TRANGTHAI) 
                VALUES (?, ?, ?, ?);
                `,
        [MACHUCDANH, MAGV, formattedDate, "Đang giữ chức danh"]
      );
    }

    //Trường hợp giảng viên thay đổi chức danh
    let TENCHUCDANH_Cu = await timChucDanh_MACHUCDANH(
      kiemTraCHUCDANH_CO_CHUC_DANH[0].MACHUCDANH
    );
    // console.log("TENCHUCDANH_Cu >>>>>>>>>", TENCHUCDANH_Cu[0].TENCHUCDANH)
    if (
      kiemTraCHUCDANH_CO_CHUC_DANH.length > 0 &&
      TENCHUCDANH_Cu[0].TENCHUCDANH != dataGiangVien.TENCHUCDANH
    ) {
      thongBaoChucDanh = "Có sự thay đổi chức danh";
      kiemTraSQL = true;

      let [resultsCO_CHUC_DANH, fieldsCO_CHUC_DANH] = await pool.execute(
        `
                UPDATE co_chuc_danh 
                SET MACHUCDANH = ?, MAGV = ?, THOIGIANNHAN = ?, TRANGTHAI = ? 
                WHERE co_chuc_danh.MACHUCDANH = ? AND co_chuc_danh.MAGV = ?
                `,
        [
          MACHUCDANH,
          MAGV,
          formattedDate,
          "Đang giữ chức danh",

          kiemTraCHUCDANH_CO_CHUC_DANH[0].MACHUCDANH,
          kiemTraCHUCDANH_CO_CHUC_DANH[0].MAGV,
        ]
      );
    }

    //Trường hợp giảng viên bị xóa chức danh
    if (
      kiemTraCHUCDANH_CO_CHUC_DANH.length > 0 &&
      dataGiangVien.TENCHUCDANH === "DELETE"
    ) {
      thongBaoChucDanh = "Có sự thay đổi chức danh";
      kiemTraSQL = true;

      let [resultsCO_CHUC_DANH, fieldsCO_CHUC_DANH] = await pool.execute(
        `
                DELETE FROM co_chuc_danh 
                WHERE co_chuc_danh.MACHUCDANH = ? AND co_chuc_danh.MAGV = ?
                `,
        [
          kiemTraCHUCDANH_CO_CHUC_DANH[0].MACHUCDANH,
          kiemTraCHUCDANH_CO_CHUC_DANH[0].MAGV,
        ]
      );
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

    if (dataGiangVien.isOpenGetAllApiGV) {
      let [results0, fields] = await pool.execute(
        `SELECT k.TENKHOA, bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, cd.TENCHUCDANH, cv.TENCHUCVU, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN
        FROM taikhoan AS tk
        LEFT JOIN giangvien AS gv ON tk.MAGV = gv.MAGV
        LEFT JOIN bomon AS bm ON bm.MABOMON = gv.MABOMON
        LEFT JOIN khoa AS k ON k.MAKHOA = bm.MAKHOA
        LEFT JOIN giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
        LEFT JOIN chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
        LEFT JOIN co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
        LEFT JOIN chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
       `
      );

      return {
        EM: `Trạng thái sửa: ${kiemTraUpdateTAIKHOANG}, ${kiemTraUpdateGIANGVIEN}, ${thongBaoUpdateCHUCVU_GIU_CHUC_VU} > ${kiemTraUpdateChucVu_cua_GiangVien}, ${thongBaoChucDanh} > ${kiemTraUpdateChucDanh}, ${thongBaoBoMon}`,
        EC: 1,
        DT: results0,
      };
    } else {
      let [results0, fields] = await pool.execute(
        `SELECT k.TENKHOA, bm.MABOMON, bm.TENBOMON, tk.TENDANGNHAP, gv.TENGV, gv.EMAIL, tk.MAGV, cd.TENCHUCDANH, cv.TENCHUCVU, gv.DIENTHOAI, gv.DIACHI, tk.PHANQUYEN, tk.TRANGTHAITAIKHOAN
        FROM taikhoan AS tk
        LEFT JOIN giangvien AS gv ON tk.MAGV = gv.MAGV
        LEFT JOIN bomon AS bm ON bm.MABOMON = gv.MABOMON
        LEFT JOIN khoa AS k ON k.MAKHOA = bm.MAKHOA
        LEFT JOIN giu_chuc_vu AS gcv ON gv.MAGV = gcv.MAGV
        LEFT JOIN chucvu AS cv ON gcv.MACHUCVU = cv.MACHUCVU
        LEFT JOIN co_chuc_danh AS ccd ON ccd.MAGV = gv.MAGV
        LEFT JOIN chucdanh AS cd ON ccd.MACHUCDANH = cd.MACHUCDANH
        WHERE bm.MABOMON = ?`,

        [MABOMON]
      );
      return {
        EM: `Trạng thái sửa: ${kiemTraUpdateTAIKHOANG}, ${kiemTraUpdateGIANGVIEN}, ${thongBaoUpdateCHUCVU_GIU_CHUC_VU} > ${kiemTraUpdateChucVu_cua_GiangVien}, ${thongBaoChucDanh} > ${kiemTraUpdateChucDanh}, ${thongBaoBoMon}`,
        EC: 1,
        DT: results0,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi services updateTrangThaiTaiKhoanGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  update_ChucVu_ChucDanh_GiangVien,
};
