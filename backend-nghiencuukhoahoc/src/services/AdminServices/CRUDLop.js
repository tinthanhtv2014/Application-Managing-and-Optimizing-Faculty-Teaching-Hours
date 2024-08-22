const pool = require("../../config/database");
const { timchuongtrinh_TENCHUONGTRINH, timlop_MALOP } = require("./helpers");
const selectLop = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from lop`);
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

const CreateLop = async (datalop, TENCHUONGTRINH) => {
  try {
    console.log("check ", datalop);
    const MACHUONGTRINH = await timchuongtrinh_TENCHUONGTRINH(TENCHUONGTRINH);
    console.log("check machuongtrinh", MACHUONGTRINH);
    const timlop = await timlop_MALOP(datalop.MALOP);
    if (timlop.length > 0) {
      return {
        EM: " lớp này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }

    let [results1, fields1] = await pool.execute(
      `insert into lop values (?,?,?,?,?)`,
      [
        datalop.MALOP,
        MACHUONGTRINH.MACHUONGTRINH,
        datalop.TENLOP,
        datalop.NAMTUYENSINH,
        datalop.SISO,
      ]
    );
    const data = await selectLop();
    return {
      EM: " tạo lớp thành công",
      EC: 1,
      DT: data.DT,
    };
  } catch (error) {
    return {
      EM: "lỗi services CreateLop",
      EC: -1,
      DT: [],
    };
  }
};

const updateLop = async (MALOP, datalop) => {
  try {
    const MACHUONGTRINH = await timchuongtrinh_TENCHUONGTRINH(
      datalop.TENCHUONGTRINH
    );
    console.log("check machuongtrinh", MACHUONGTRINH);
    const timlop = await timlop_MALOP(MALOP);
    if (timlop.length > 0) {
      let [results1, fields1] = await pool.execute(
        `   UPDATE lop
            SET MACHUONGTRINH = ? , TENLOP = ?, NAMTUYENSINH = ?, SISO = ?
            WHERE MALOP = ?`,
        [
          MACHUONGTRINH.MACHUONGTRINH,
          datalop.TENLOP,
          datalop.NAMTUYENSINH,
          datalop.SISO,
          MALOP,
        ]
      );

      let [results_ketqua, fields_ketqua] = await pool.execute(
        `select * from lop where MALOP = ?`,
        [MALOP]
      );

      return {
        EM: " thay đổi thông tin lớp thành công",
        EC: 1,
        DT: results_ketqua,
      };
    } else {
      let [results1, fields1] = await pool.execute(
        `insert into lop values (?,?,?,?,?)`,
        [
          MALOP,
          MACHUONGTRINH.MACHUONGTRINH,
          datalop.TENLOP,
          datalop.NAMTUYENSINH,
          datalop.SISO,
        ]
      );

      let [results_ketqua, fields_ketqua] = await pool.execute(
        `select * from lop where MALOP = ?`,
        [MALOP]
      );
      return {
        EM: " tạo lớp thành công",
        EC: 1,
        DT: results_ketqua,
      };
    }
  } catch (error) {
    return {
      EM: "lỗi services updateLop",
      EC: -1,
      DT: [],
    };
  }
};

const deleteLop = async (MALOP) => {
  try {
    let [results1, fields1] = await pool.execute(
      `DELETE FROM lop WHERE MALOP = ?;`,
      [MALOP]
    );
    return {
      EM: " xóa lớp thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services deleteLop",
      EC: -1,
      DT: [],
    };
  }
};

const createLopExcel = async (dataLopExcelArray) => {
  // dataCHUONGTRINHDAOTAOExcelArray  gồm MACHUONGTRINH, MABOMON, TENCHUONGTRINH,MAMONHOC, TENMONHOC, SOTINCHILYTHUYET và SOTINCHITHUCHANH, SOTHUTUHOCKI

  // try {
  let results = [];
  // console.log("check results =>", dataChuongtrinhdaotaoExcelArray);
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
    // console.log("check ten bo mon ", kiemtra_tenbomon.length);
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
    // console.log("check ten bo mon =>>>> ", kiemtra_tenbomon[0].MABOMON);
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
  selectLop,
  CreateLop,
  updateLop,
  deleteLop,
  createLopExcel,
};
