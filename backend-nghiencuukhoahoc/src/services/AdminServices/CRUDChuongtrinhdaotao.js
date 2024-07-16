const pool = require("../../config/database");
const {
  timTaiKhoan_TENDANGNHAP,
  timGiangVien_MAGV,
  selectBomon_TENBOMON,
  selectChucdanh_TENCHUCDANH,
  timChucVu_TENCHUCVU,
  timChucVu_MAGV,
  timCoChucDanh_MAGV,

  dataFronEnd,
  timchuongtrinh_TENCHUONGTRINH,
  timmonhoc_TENMONHOC,
} = require("./helpers");

const selectChuongtrinhdaotao = async () => {
  try {
    let [results1, fields1] = await pool.execute(
      `select ctdt.*,mh.* from chuongtrinhdaotao as ctdt, thuoc as t, monhoc as mh where ctdt.MACHUONGTRINH = t.MACHUONGTRINH and t.MAMONHOC = mh.MAMONHOC`
    );
    return {
      EM: " xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectChucVu",
      EC: -1,
      DT: [],
    };
  }
};

const selectChuongtrinhdaotao_TENCHUONGTRINH = async (TENCHUONGTRINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM chuongtrinhdaotao WHERE TENCHUONGTRINH = ?`,
      [TENCHUONGTRINH]
    );

    if (results1.length > 0) {
      return {
        EM: "Xem thông tin chương trình thành công",
        EC: 1,
        DT: results1[0], // Chỉ lấy dòng đầu tiên của kết quả
      };
    } else {
      return {
        EM: "Không tìm thấy chương trình này",
        EC: 0,
        DT: {},
      };
    }
  } catch (error) {
    return {
      EM: "Lỗi services selectChucdanh_TENCHUCDANH",
      EC: -1,
      DT: {},
    };
  }
};

const createChuongtrinhdaotao = async (MABOMON, TENCHUONGTRINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chuongtrinhdaotao where TENCHUONGTRINH = ?`,
      [TENCHUONGTRINH]
    );
    if (results1.length > 0) {
      return {
        EM: "Chương trình này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results, fields] = await pool.execute(
      `INSERT INTO chuongtrinhdaotao (MABOMON,TENCHUONGTRINH) VALUES (?,?)`,
      [MABOMON, TENCHUONGTRINH]
    );
    return {
      EM: "thêm Chương trình mới thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    return {
      EM: "lỗi services createChucVu",
      EC: -1,
      DT: [],
    };
  }
};

const updateChuongtrinhdaotao = async (
  MACHUONGTRINH,
  MABOMON,
  TENCHUONGTRINH
) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chuongtrinhdaotao where MACHUONGTRINH = ?`,
      [MACHUONGTRINH]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `UPDATE chuongtrinhdaotao
              SET TENCHUONGTRINH = ?,MABOMON = ? where MACHUONGTRINH = ?;`,
        [TENCHUONGTRINH, MABOMON, MACHUONGTRINH]
      );
      return {
        EM: "sửa chương trình thành công",
        EC: 1,
        DT: results,
      };
    }
    return {
      EM: "chương trình này không tồn tại",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "lỗi services updateGiangVien",
      EC: -1,
      DT: [],
    };
  }
};

const xoaChuongtrinh = async (MACHUONGTRINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `select * from chuongtrinhdaotao where MACHUONGTRINH = ?`,
      [MACHUONGTRINH]
    );
    if (results1.length > 0) {
      let [results, fields] = await pool.execute(
        `DELETE FROM chuongtrinhdaotao WHERE MACHUONGTRINH = ?`,
        [MACHUONGTRINH]
      );
      return {
        EM: "xóa chương trình thành công",
        EC: 1,
        DT: results,
      };
    }
    return {
      EM: " chương trình này không tồn tại",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    return {
      EM: "lỗi services createChucVu",
      EC: -1,
      DT: [],
    };
  }
};

const createChuongtrinhdaotaoExcel = async (
  dataChuongtrinhdaotaoExcelArray
) => {
  // dataCHUONGTRINHDAOTAOExcelArray  gồm MACHUONGTRINH, MABOMON, TENCHUONGTRINH,MAMONHOC, TENMONHOC, SOTINCHILYTHUYET và SOTINCHITHUCHANH, SOTHUTUHOCKI

  // try {
  let results = [];

  // Kiểm tra thông tin trong file excel
  for (var i = 0; i < dataChuongtrinhdaotaoExcelArray.length; i++) {
    if (
      !dataChuongtrinhdaotaoExcelArray[i].TENCHUONGTRINH ||
      !dataChuongtrinhdaotaoExcelArray[i].TENBOMON ||
      !dataChuongtrinhdaotaoExcelArray[i].TENMONHOC
    ) {
      return {
        EM: `Bị trống thông tin tại dòng số ${i}: ${JSON.stringify(
          dataTaiKhoanExcelArray[i]
        )}`,
        EC: 0,
        DT: [],
      }; // Tiếp tục thực hiện các lệnh khác
    }
    let kiemtra_tenchuongtrinh = await timchuongtrinh_TENCHUONGTRINH(
      dataChuongtrinhdaotaoExcelArray[i].TENCHUONGTRINH
    );
    if (kiemtra_tenchuongtrinh.length < 0) {
      return {
        EM: `chương trình đào tạo không tồn tại`,
        EC: 0,
        DT: [],
      }; // Tiếp tục thực hiện các lệnh khác
    }
    let kiemtra_tenbomon = selectBomon_TENBOMON(
      dataChuongtrinhdaotaoExcelArray[i].TENBOMON
    );
    if (kiemtra_tenbomon.length < 0) {
      return {
        EM: `bộ môn không tồn tại`,
        EC: 0,
        DT: [],
      }; // Tiếp tục thực hiện các lệnh khác
    }

    let kiemtra_tenmonhoc = timmonhoc_TENMONHOC(
      dataChuongtrinhdaotaoExcelArray[i].TENMONHOC
    );
    if (kiemtra_tenmonhoc.length > 0) {
      return {
        EM: `ten mon hoc da ton tai`,
        EC: 0,
        DT: [],
      }; // Tiếp tục thực hiện các lệnh khác
    }
  }

  // Bắt đầu tạo tài khoản
  for (var i = 0; i < dataChuongtrinhdaotaoExcelArray.length; i++) {
    let kiemtra_tenchuongtrinh = await timchuongtrinh_TENCHUONGTRINH(
      dataChuongtrinhdaotaoExcelArray[i].TENCHUONGTRINH
    );
    console.log("check 2", kiemtra_tenchuongtrinh);
    await pool.execute(
      `INSERT INTO monhoc (TENMONHOC,SOTINCHILYTHUYET,SOTINCHITHUCHANH) VALUES (?, ?,?)`,
      [
        dataChuongtrinhdaotaoExcelArray[i].TENMONHOC,
        dataChuongtrinhdaotaoExcelArray[i].SOTINCHILYTHUYET,
        dataChuongtrinhdaotaoExcelArray[i].SOTINCHITHUCHANH,
      ]
    );
    let kiemtra_tenmonhoc = await timmonhoc_TENMONHOC(
      dataChuongtrinhdaotaoExcelArray[i].TENMONHOC
    );
    console.log("check 1", kiemtra_tenmonhoc);
    await pool.execute(
      `INSERT INTO thuoc (MACHUONGTRINH,MAMONHOC,SOTHUTUHOCKI) VALUES (?, ?,?)`,
      [
        kiemtra_tenchuongtrinh.MACHUONGTRINH,
        kiemtra_tenmonhoc.MAMONHOC,
        dataChuongtrinhdaotaoExcelArray[i].SOTHUTUHOCKI,
      ]
    );
    results.push({
      EM: `Tạo tài khoản ${dataChuongtrinhdaotaoExcelArray[i].TENDANGNHAP} thành công`,
      EC: 0,
      DT: [],
    });
  }

  return {
    EM: "Tất cả tài khoản đã được tạo",
    EC: 1,
    DT: results,
  };
  // } catch (error) {
  //   console.log("Lỗi services createTaiKhoanExcel", error);
  //   return {
  //     EM: "Lỗi services createTaiKhoanExcel",
  //     EC: 1,
  //     DT: [],
  //   };
  // }
};

module.exports = {
  selectChuongtrinhdaotao,
  selectChuongtrinhdaotao_TENCHUONGTRINH,
  createChuongtrinhdaotao,
  updateChuongtrinhdaotao,
  xoaChuongtrinh,
  createChuongtrinhdaotaoExcel,
};
