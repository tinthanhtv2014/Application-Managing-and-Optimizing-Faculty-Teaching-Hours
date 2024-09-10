const pool = require("../../config/database");
const moment = require("moment");
const createchitietphancong_excel = async (datachitietphancong) => {
  try {
    let results = [];
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    for (var i = 0; i < datachitietphancong.length; i++) {
      let [results_magv, fields_magv] = await pool.execute(
        `select * from giangvien where TENGV = ?`,
        [datachitietphancong[i].TENGV]
      );

      console.log("check results_magv", results_magv);

      let [results_hknk, fields_hknk] = await pool.execute(
        `select * from hockynienkhoa where TENHKNK = ?`,
        [datachitietphancong[i].TENHKNK]
      );

      let [results_bangphancong, fields1] = await pool.execute(
        `select * from bangphancong where MAHKNK = ? and MAGV = ?`,
        [results_hknk[0].MAHKNK, results_magv[0].MAGV]
      );

      let [results_TENMONHOC, fields_TENMONHOC] = await pool.execute(
        `select * from monhoc where TENMONHOC = ?`,
        [datachitietphancong[i].TENMONHOC]
      );

      console.log("check mamonhoc", results_TENMONHOC);
      if (results_bangphancong.length === 0) {
        await pool.execute(
          `insert into bangphancong (MAHKNK,MAGV,THOIGIANLAP) values (?,?,?)`,
          [results_hknk[0].MAHKNK, results_magv[0].MAGV, currentTime]
        );
      }

      let [results_bangphancong_data, fields_data] = await pool.execute(
        `select * from bangphancong where MAHKNK = ? and MAGV = ?`,
        [results_hknk[0].MAHKNK, results_magv[0].MAGV]
      );

      await pool.execute(
        `INSERT INTO chitietphancong (MAMONHOC,MAPHANCONG,MALOP) VALUES (?, ?,?)`,
        [
          results_TENMONHOC[0].MAMONHOC,
          results_bangphancong_data[0].MAPHANCONG,
          datachitietphancong[i].MALOP,
        ]
      );

      results.push({
        EM: `Tạo phân công thành công`,
        EC: 0,
        DT: [],
      });
    }

    return {
      EM: "Tất cả chi tiết đã được tạo",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.log("Lỗi services createchitietphancong_excel", error);
    return {
      EM: "Lỗi services createTaiKhoanExcel",
      EC: -1,
      DT: [],
    };
  }
};

const Dangky_chitietphancong = async (datachitietphancong) => {
  try {
    // const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    // for (var i = 0; i < datachitietphancong.length; i++) {
    //   let [results_magv, fields_magv] = await pool.execute(
    //     `select * from giangvien where TENGV = ?`,
    //     [datachitietphancong[i].TENGV]
    //   );
    //   console.log("check results_magv", results_magv);
    //   let [results_hknk, fields_hknk] = await pool.execute(
    //     `select * from hockynienkhoa where TENHKNK = ?`,
    //     [datachitietphancong[i].TENHKNK]
    //   );
    //   let [results_bangphancong, fields1] = await pool.execute(
    //     `select * from bangphancong where MAHKNK = ? and MAGV = ?`,
    //     [results_hknk[0].MAHKNK, results_magv[0].MAGV]
    //   );
    //   let [results_TENMONHOC, fields_TENMONHOC] = await pool.execute(
    //     `select * from monhoc where TENMONHOC = ?`,
    //     [datachitietphancong[i].TENMONHOC]
    //   );
    //   console.log("check mamonhoc", results_TENMONHOC);
    //   if (results_bangphancong.length === 0) {
    //     await pool.execute(
    //       `insert into bangphancong (MAHKNK,MAGV,THOIGIANLAP) values (?,?,?)`,
    //       [results_hknk[0].MAHKNK, results_magv[0].MAGV, currentTime]
    //     );
    //   }
    //   let [results_bangphancong_data, fields_data] = await pool.execute(
    //     `select * from bangphancong where MAHKNK = ? and MAGV = ?`,
    //     [results_hknk[0].MAHKNK, results_magv[0].MAGV]
    //   );
    //   await pool.execute(
    //     `INSERT INTO chitietphancong (MAMONHOC,MAPHANCONG,MALOP) VALUES (?, ?,?)`,
    //     [
    //       results_TENMONHOC[0].MAMONHOC,
    //       results_bangphancong_data[0].MAPHANCONG,
    //       datachitietphancong[i].MALOP,
    //     ]
    //   );
    //   results.push({
    //     EM: `Tạo phân công thành công`,
    //     EC: 0,
    //     DT: [],
    //   });
    // }
    // return {
    //   EM: "Tất cả chi tiết đã được tạo",
    //   EC: 1,
    //   DT: results,
    // };
  } catch (error) {
    console.log("Lỗi services createchitietphancong_excel", error);
    return {
      EM: "Lỗi services createTaiKhoanExcel",
      EC: -1,
      DT: [],
    };
  }
};

const xem_chitietphancong_lop = async () => {
  try {
    let [results_chitietphancong_data, fields_data] = await pool.execute(
      `select chitietphancong.*,bangphancong.*,monhoc.*,giangvien.*,chon_khung.*,khunggiochuan.* from chitietphancong,bangphancong,monhoc,giangvien,chon_khung,khunggiochuan where giangvien.MAGV = chon_khung.MAGV and chon_khung.MAKHUNG = khunggiochuan.MAKHUNG and  giangvien.MAGV = bangphancong.MAGV and chitietphancong.MAPHANCONG = bangphancong.MAPHANCONG and monhoc.MAMONHOC = chitietphancong.MAMONHOC`
    );

    const danhSachPhanCongGiangVien = [];

    results_chitietphancong_data.forEach((dong) => {
      // Kiểm tra xem giảng viên đã tồn tại trong mảng danhSachPhanCongGiangVien chưa
      let giangVien = danhSachPhanCongGiangVien.find(
        (gv) => gv.tenGV === dong.TENGV
      );

      if (!giangVien) {
        giangVien = {
          tenGV: dong.TENGV,
          gioChuanTheoQD: 90, // Bạn có thể thay giá trị này nếu muốn linh động
          monPhanCong: [],
        };
        danhSachPhanCongGiangVien.push(giangVien);
      }

      // Tìm hoặc tạo môn học cho giảng viên
      let monHoc = giangVien.monPhanCong.find((m) => m.mon === dong.TENMONHOC);

      if (!monHoc) {
        monHoc = {
          mon: dong.TENMONHOC,
          maLop: [],
          tongGio: 90, // Bạn có thể điều chỉnh tổng số giờ theo dữ liệu thực tế
        };
        giangVien.monPhanCong.push(monHoc);
      }

      // Thêm mã lớp vào danh sách lớp của môn học
      if (!monHoc.maLop.includes(dong.MALOP)) {
        monHoc.maLop.push(dong.MALOP);
      }
    });
    return {
      EM: "Tất cả chi tiết đã được tạo",
      EC: 1,
      DT: danhSachPhanCongGiangVien,
    };
  } catch (error) {
    console.log("Lỗi services createchitietphancong_excel", error);
    return {
      EM: "Lỗi services createTaiKhoanExcel",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  createchitietphancong_excel,
  Dangky_chitietphancong,
  xem_chitietphancong_lop,
};
