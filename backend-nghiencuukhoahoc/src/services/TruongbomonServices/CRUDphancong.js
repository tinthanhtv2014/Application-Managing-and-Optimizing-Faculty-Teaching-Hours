const pool = require("../../config/database");
const moment = require("moment");

const { timnamhoc_TENNAMHOC } = require("../AdminServices/helpers");
const select_giangvien_chuachonkhung = async () => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT gv.*
      FROM giangvien gv
      LEFT JOIN chon_khung ck ON gv.MAGV = ck.MAGV
      WHERE ck.MAGV IS NULL
      AND EXISTS (
      SELECT 1 
      FROM taikhoan tk 
      WHERE tk.MAGV = gv.MAGV
      AND tk.TENDANGNHAP IS NOT NULL
);`
    );
    return {
      EM: "Xem thông tin giảng viên chưa chọn khung chuẩn thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services select_giangvien_chuachonkhung",
      EC: -1,
      DT: [],
    };
  }
};
const selectLop_BoMon = async (TENBOMON) => {
  try {
    let [results1, fields1] = await pool.execute(
      ` SELECT lop.* 
      FROM lop
      INNER JOIN chuongtrinhdaotao ON lop.MACHUONGTRINH = chuongtrinhdaotao.MACHUONGTRINH
      INNER JOIN bomon ON chuongtrinhdaotao.MABOMON = bomon.MABOMON
      WHERE bomon.TENBOMON = ?`,
      [TENBOMON]
    );

    return {
      EM: " Xem thông tin lớp thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    console.log("error", error);
    return {
      EM: "lỗi services selectMonHoc",
      EC: -1,
      DT: [],
    };
  }
};
const select_giangvien_dachonkhung = async () => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT gv.*
      FROM giangvien gv
      JOIN chon_khung ck ON gv.MAGV = ck.MAGV
      JOIN taikhoan tk ON gv.MAGV = tk.MAGV
      WHERE tk.TENDANGNHAP IS NOT NULL;`
    );
    return {
      EM: "Xem thông tin giảng viên đã chọn khung chuẩn thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    console.log("error =>", error);
    return {
      EM: "Lỗi services select_giangvien_dachonkhung",
      EC: -1,
      DT: [],
    };
  }
};

const select_giangvien_dachonkhung_chitiet = async (TENNAMHOC) => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT gv.*,nh.TENNAMHOC,kgc.*
      FROM giangvien gv
      JOIN chon_khung ck ON gv.MAGV = ck.MAGV
      JOIN khunggiochuan kgc ON kgc.MAKHUNG = ck.MAKHUNG
      JOIN namhoc nh ON nh.MANAMHOC = ck.MANAMHOC
      JOIN taikhoan tk ON gv.MAGV = tk.MAGV
      WHERE tk.TENDANGNHAP IS NOT NULL 
       and nh.TENNAMHOC = ?; `,
      [TENNAMHOC]
    );

    console.log(results_ctdt_bomon);

    let danhSachGiangVienDaChonKhung = [];

    results_ctdt_bomon.forEach((dong) => {
      let MaGV = danhSachGiangVienDaChonKhung.find(
        (gv) => gv.MAGV === dong.MAGV
      );

      if (!MaGV) {
        MaGV = {
          MAGV: dong.MAGV,
          ThongtinGiangvien: [],
        };
        danhSachGiangVienDaChonKhung.push(MaGV);
      }

      let giangvien = MaGV.ThongtinGiangvien.find(
        (m) => m.TENGV === dong.TENGV
      );

      if (!giangvien) {
        giangvien = {
          MABOMON: dong.MABOMON,
          TENNAMHOC: dong.TENNAMHOC,
          TENGIANGVIEN: dong.TENGV,
          EMAIL: dong.EMAIL,
          GIOCHUAN: [],
        };
        MaGV.ThongtinGiangvien.push(giangvien);
      }
      if (!giangvien.GIOCHUAN.includes(dong.TENKHHUNGCHUAN)) {
        giangvien.GIOCHUAN.push({
          GIOGIANGDAY_HANHCHINH: dong.GIOGIANGDAY_HANHCHINH,
          GIOGIANGDAY_CHUAN: dong.GIOGIANGDAY_CHUAN,
          GIONGHIENCUUKHOAHOC_HANHCHINH: dong.GIONGHIENCUUKHOAHOC_HANHCHINH,
          GIONGHIENCUUKHOAHOC_CHUAN: dong.GIONGHIENCUUKHOAHOC_CHUAN,
          GIOPHUCVUCONGDONG_HANHCHINH: dong.GIOPHUCVUCONGDONG_HANHCHINH,
          GIOPHUCVUCONGDONG_CHUAN: dong.GIOPHUCVUCONGDONG_CHUAN,
        });
      }
    });

    return {
      EM: "Xem thông tin giảng viên đã chọn khung chuẩn thành công",
      EC: 1,
      DT: danhSachGiangVienDaChonKhung,
    };
  } catch (error) {
    console.log("error =>", error);
    return {
      EM: "Lỗi services select_giangvien_dachonkhung_chitiet",
      EC: -1,
      DT: [],
    };
  }
};

function tinhSoThuTuHocKi(n, SOHOCKI) {
  // Chuyển đổi các tham số thành kiểu số (nếu chúng là chuỗi)
  const nNumber = Number(n);
  const soHocKiNumber = Number(SOHOCKI);

  // Tính toán
  return 2 * (nNumber - 1) + soHocKiNumber;
}

const select_lophoc_monhoc = async (MALOP, SOHOCKI) => {
  try {
    const sothutu = SOHOCKI.split(" ");
    const number = sothutu[sothutu.length - 1];

    let [results_malop, fields_malop] = await pool.execute(
      `SELECT NAMTUYENSINH from lop where MALOP = ?`,
      [MALOP]
    );

    const currentYear = moment().year();

    let n = currentYear - results_malop[0].NAMTUYENSINH;

    let SOTHUTUHOCKI = tinhSoThuTuHocKi(n, number);

    let [results_ctdt_bomon, fields1] = await pool.execute(
      `select * from lop,
      monhoc,
      chuongtrinhdaotao as ctdt,
      thuoc 
      where lop.MACHUONGTRINH = ctdt.MACHUONGTRINH 
      and ctdt.MACHUONGTRINH = thuoc.MACHUONGTRINH 
      and thuoc.MAMONHOC = monhoc.MAMONHOC
      and thuoc.SOTHUTUHOCKI = ?
      and lop.MALOP = ?`,
      [SOTHUTUHOCKI, MALOP]
    );

    return {
      EM: "Xem thông tin môn học theo lớp thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    console.log("check", error);
    return {
      EM: "Lỗi services select_lophoc_monhoc",
      EC: -1,
      DT: [],
    };
  }
};

//bảng phân công

const create_listgiangvien_phancong = async (MAGV) => {
  try {
    const currentTime = moment().format("YYYY-MM-DD");

    let [results_ctdt_bomon, fields1] = await pool.execute(
      `insert into bangphancong (MAGV,THOIGIANLAP) values (?,?)`,
      [MAGV, currentTime]
    );
    return {
      EM: "phân công cho giảng viên thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services create_listgiangvien_phancong",
      EC: -1,
      DT: [],
    };
  }
};

const xem_listgiangvien_phancong = async (page, limit) => {
  if (page && limit) {
    let offset = (page - 1) * limit;
    let [results0, fields] = await pool.execute(
      `select giangvien.*,bangphancong.* from giangvien, bangphancong where giangvien.MAGV = bangphancong.MAGV order by giangvien.MAGV LIMIT ? OFFSET ?;`,
      [limit, offset]
    );

    const totalCountResult = await pool.execute(
      `SELECT COUNT(*) AS total
      from giangvien, bangphancong where giangvien.MAGV = bangphancong.MAGV`
    );

    const totalCount = totalCountResult[0][0].total;
    let totalPages = Math.ceil(totalCount / limit);
    let data = {
      totalRows: results0,
      totalPages: totalPages,
      users: fields,
    };
    return {
      EM: "Xem thông tin giảng viên phân công thành công",
      EC: 1,
      DT: data,
    };
  } else {
    let [results0, fields] = await pool.execute(
      `select giangvien.*,bangphancong.* from giangvien, bangphancong where giangvien.MAGV = bangphancong.MAGV order by giangvien.MAGV`,
      [TENBOMON]
    );

    return {
      EM: "Xem thông tin giảng viên phân công thành công",
      EC: 1,
      DT: results0,
    };
  }
};

module.exports = {
  select_giangvien_chuachonkhung,
  select_giangvien_dachonkhung,
  select_lophoc_monhoc,
  select_giangvien_dachonkhung_chitiet,

  //bảng phân công
  create_listgiangvien_phancong,
  xem_listgiangvien_phancong,
  selectLop_BoMon,
};
