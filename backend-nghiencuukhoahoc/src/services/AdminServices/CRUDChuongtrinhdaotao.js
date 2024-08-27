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
    let query = `
    SELECT *
    FROM chuongtrinhdaotao 
   
  `;

    let [results1, fields1] = await pool.execute(query);
    (results1);
    return {
      EM: "Xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectChucVu",
      EC: -1,
      DT: [],
    };
  }
};
const selectTongSoHocKi = async (TENCHUONGTRINH) => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT ctdt.*, mh.*, t.SOTHUTUHOCKI FROM chuongtrinhdaotao as ctdt, thuoc as t, monhoc as mh WHERE ctdt.MACHUONGTRINH = t.MACHUONGTRINH and t.MAMONHOC = mh.MAMONHOC and ctdt.TENCHUONGTRINH = ?`,
      [TENCHUONGTRINH]
    );

    // Lấy danh sách các số thứ tự học kỳ
    let hocKyList = results_ctdt_bomon.map((item) => item.SOTHUTUHOCKI);

    // Loại bỏ các giá trị trùng lặp
    hocKyList = [...new Set(hocKyList)];

    // Sắp xếp danh sách học kỳ theo thứ tự tăng dần
    hocKyList.sort((a, b) => a - b);

    // Tạo mảng các đối tượng học kỳ với tên và giá trị
    let hocKyObjList = hocKyList.map((soHocKy) => ({
      label: `Học kì ${soHocKy}`,
      value: soHocKy,
    }));

    return {
      EM: "Xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: hocKyObjList,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectOnlyChuongtrinhdaotao",
      EC: -1,
      DT: [],
    };
  }
};

const selectOnlyChuongtrinhdaotao = async (TENCHUONGTRINH) => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT ctdt.*,mh.*,t.SOTHUTUHOCKI FROM chuongtrinhdaotao as ctdt,thuoc as t, monhoc as mh WHERE ctdt.MACHUONGTRINH = t.MACHUONGTRINH and t.MAMONHOC = mh.MAMONHOC and ctdt.TENCHUONGTRINH = ?`,
      [TENCHUONGTRINH]
    );
    return {
      EM: "Xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectOnlyChuongtrinhdaotao",
      EC: -1,
      DT: [],
    };
  }
};

const selectOnlyChuongtrinhdaotao_withHOCKI = async (
  TENCHUONGTRINH,
  SOTHUTUHOCKI
) => {
  try {
    let [results_ctdt_bomon, fields1] = await pool.execute(
      `SELECT ctdt.*,mh.*,t.SOTHUTUHOCKI FROM chuongtrinhdaotao as ctdt,thuoc as t, monhoc as mh WHERE ctdt.MACHUONGTRINH = t.MACHUONGTRINH and t.MAMONHOC = mh.MAMONHOC and ctdt.TENCHUONGTRINH = ? and t.SOTHUTUHOCKI = ?`,
      [TENCHUONGTRINH, SOTHUTUHOCKI]
    );
    return {
      EM: "Xem thông tin chương trình đào tạo thành công",
      EC: 1,
      DT: results_ctdt_bomon,
    };
  } catch (error) {
    return {
      EM: "Lỗi services selectOnlyChuongtrinhdaotao",
      EC: -1,
      DT: [],
    };
  }
};

const timkiemChuongtrinhdaotao_TENCHUONGTRINH = async (TENCHUONGTRINH) => {
  try {
    let [results1, fields1] = await pool.execute(
      `SELECT * FROM chuongtrinhdaotao WHERE TENCHUONGTRINH = ?`,
      [TENCHUONGTRINH]
    );
    ("check resut: ", results1[0]);
    return results1[0];
  } catch (error) {
    return {
      EM: "Lỗi services timkiemChuongtrinhdaotao_TENCHUONGTRINH",
      EC: -1,
      DT: {},
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

const xoaChuongtrinh = async (TENCHUONGTRINH) => {
  // try {
  const kiemtra_tenchuongtrinh = await timkiemChuongtrinhdaotao_TENCHUONGTRINH(
    TENCHUONGTRINH
  );
  ("check tenchuong trinh: ", kiemtra_tenchuongtrinh);
  if (kiemtra_tenchuongtrinh) {
    let [results_detete_table_thuocCTDT, fields_detete_table_thuocCTDT] =
      await pool.execute(`DELETE FROM thuoc WHERE MACHUONGTRINH = ?`, [
        kiemtra_tenchuongtrinh.MACHUONGTRINH,
      ]);

    let [results_detete_table_CTDT, fields_detete_table_CTDT] =
      await pool.execute(
        `DELETE FROM chuongtrinhdaotao WHERE MACHUONGTRINH = ?`,
        [kiemtra_tenchuongtrinh.MACHUONGTRINH]
      );
    return {
      EM: "xóa chương trình thành công",
      EC: 1,
      DT: [],
    };
  }
  return {
    EM: " chương trình này không tồn tại",
    EC: 0,
    DT: [],
  };
  // } catch (error) {
  //   return {
  //     EM: "lỗi services xoaChuongtrinh",
  //     EC: -1,
  //     DT: [],
  //   };
  // }
};

const createChuongtrinhdaotaoExcel = async (
  dataChuongtrinhdaotaoExcelArray
) => {
  // dataCHUONGTRINHDAOTAOExcelArray  gồm MACHUONGTRINH, MABOMON, TENCHUONGTRINH,MAMONHOC, TENMONHOC, SOTINCHILYTHUYET và SOTINCHITHUCHANH, SOTHUTUHOCKI

  // try {
  let results = [];
  ("check results =>", dataChuongtrinhdaotaoExcelArray);
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
    let kiemtra_tenbomon = await selectBomon_TENBOMON(
      dataChuongtrinhdaotaoExcelArray[i].TENBOMON
    );
    ("check ten bo mon ", kiemtra_tenbomon.length);
    if (kiemtra_tenbomon.length < 0) {
      return {
        EM: `bộ môn không tồn tại`,
        EC: 0,
        DT: [],
      }; // Tiếp tục thực hiện các lệnh khác
    }
    let kiemtra_tenchuongtrinh = await timchuongtrinh_TENCHUONGTRINH(
      dataChuongtrinhdaotaoExcelArray[i].TENCHUONGTRINH
    );
    ("check ten bo mon =>>>> ", kiemtra_tenbomon[0].MABOMON);
    if (!kiemtra_tenchuongtrinh) {
      // Tạo thêm chương trình đào tạo nếu không tồn tại
      await pool.execute(
        `INSERT INTO chuongtrinhdaotao (TENCHUONGTRINH, MABOMON) VALUES (?, ?)`,
        [
          dataChuongtrinhdaotaoExcelArray[i].TENCHUONGTRINH,
          kiemtra_tenbomon[0].MABOMON,
        ]
      );
      kiemtra_tenchuongtrinh = await timchuongtrinh_TENCHUONGTRINH(
        dataChuongtrinhdaotaoExcelArray[i].TENCHUONGTRINH
      );
    }
    if (kiemtra_tenchuongtrinh.length === 0) {
      return {
        EM: `Không thể tạo chương trình đào tạo`,
        EC: 0,
        DT: [],
      };
    }
  }

  // Bắt đầu tạo tài khoản
  for (var i = 0; i < dataChuongtrinhdaotaoExcelArray.length; i++) {
    let kiemtra_tenchuongtrinh = await timchuongtrinh_TENCHUONGTRINH(
      dataChuongtrinhdaotaoExcelArray[i].TENCHUONGTRINH
    );

    let kiemtra_tenmonhoc = await timmonhoc_TENMONHOC(
      dataChuongtrinhdaotaoExcelArray[i].TENMONHOC
    );

    console.log("check kiemtratenmonhoc", kiemtra_tenmonhoc);

    if (kiemtra_tenmonhoc === undefined) {
      await pool.execute(
        `INSERT INTO monhoc (TENMONHOC,SOTINCHILYTHUYET,SOTINCHITHUCHANH) VALUES (?, ?,?)`,
        [
          dataChuongtrinhdaotaoExcelArray[i].TENMONHOC,
          dataChuongtrinhdaotaoExcelArray[i].SOTINCHILYTHUYET,
          dataChuongtrinhdaotaoExcelArray[i].SOTINCHITHUCHANH,
        ]
      );
    }

    let select_tenmonhoc = await timmonhoc_TENMONHOC(
      dataChuongtrinhdaotaoExcelArray[i].TENMONHOC
    );
    const [kiemtra_bangthuoc, fields_kiemtrathhuoc] = await pool.execute(
      `select * from thuoc where MACHUONGTRINH = ? and MAMONHOC = ?`,
      [kiemtra_tenchuongtrinh.MACHUONGTRINH, select_tenmonhoc.MAMONHOC]
    );
    console.log("check kiemtra_bangthuoc", kiemtra_bangthuoc);
    if (kiemtra_bangthuoc[0] === undefined) {
      await pool.execute(
        `INSERT INTO thuoc (MACHUONGTRINH,MAMONHOC,SOTHUTUHOCKI) VALUES (?, ?,?)`,
        [
          kiemtra_tenchuongtrinh.MACHUONGTRINH,
          select_tenmonhoc.MAMONHOC,
          dataChuongtrinhdaotaoExcelArray[i].SOTHUTUHOCKI,
        ]
      );
    }

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
  selectOnlyChuongtrinhdaotao,
  selectChuongtrinhdaotao,
  selectOnlyChuongtrinhdaotao_withHOCKI,
  selectTongSoHocKi,
};
