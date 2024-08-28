const pool = require("../../config/database");
const {
  timchuongtrinh_TENCHUONGTRINH,
  timlop_MALOP,
  selectBomon_TENBOMON,
} = require("./helpers");
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
  try {
    let results = [];
    // console.log("check results =>", dataChuongtrinhdaotaoExcelArray);
    // Kiểm tra thông tin trong file excel
    for (var i = 0; i < dataLopExcelArray.length; i++) {
      console.log("check results =>", dataLopExcelArray);
      if (!dataLopExcelArray[i].TENCHUONGTRINH || !dataLopExcelArray[i].MALOP) {
        return {
          EM: `Bị trống thông tin tại dòng số ${i}: ${JSON.stringify(
            dataLopExcelArray[i]
          )}`,
          EC: 0,
          DT: [],
        }; // Tiếp tục thực hiện các lệnh khác
      }

      // console.log("check ten bo mon ", kiemtra_tenbomon.length);

      let kiemtra_malop = await timlop_MALOP(dataLopExcelArray[i].MALOP);
      if (!kiemtra_malop > 0) {
        return {
          EM: `mã lớp này đã tồn tại trong hệ thống`,
          EC: 0,
          DT: [],
        }; // Tiếp tục thực hiện các lệnh khác
      }

      let kiemtra_tenchuongtrinh = await timchuongtrinh_TENCHUONGTRINH(
        dataLopExcelArray[i].TENCHUONGTRINH
      );
      console.log("check kiemtra_tenchuongtrinh =>", kiemtra_tenchuongtrinh);
      let kiemtra_tenbomon = await selectBomon_TENBOMON(
        dataLopExcelArray[i].TENBOMON
      );

      if (!kiemtra_tenchuongtrinh) {
        await pool.execute(
          `INSERT INTO chuongtrinhdaotao 
        (MABOMON,TENCHUONGTRINH,SO_QUYET_DINH,TRINH_DO,TONG_SO_TIN_CHI,MO_TA_HOC_KY) 
        VALUES (?,?,?,?,?,?)`,
          [
            kiemtra_tenbomon[0].MABOMON,
            dataLopExcelArray[i].TENCHUONGTRINH,
            dataLopExcelArray[i].SO_QUYET_DINH,
            dataLopExcelArray[i].TRINH_DO,
            dataLopExcelArray[i].TONG_SO_TIN_CHI,
            dataLopExcelArray[i].MO_TA_HOC_KY,
          ]
        );
        kiemtra_tenchuongtrinh = await timchuongtrinh_TENCHUONGTRINH(
          dataLopExcelArray[i].TENCHUONGTRINH
        );
      }
      console.log("check results =>", kiemtra_tenchuongtrinh);
      if (kiemtra_tenchuongtrinh.length === 0) {
        return {
          EM: `Không thể tạo chương trình đào tạo`,
          EC: 0,
          DT: [],
        };
      }
    }

    // Bắt đầu tạo tài khoản
    for (var i = 0; i < dataLopExcelArray.length; i++) {
      let kiemtra_tenchuongtrinh = await timchuongtrinh_TENCHUONGTRINH(
        dataLopExcelArray[i].TENCHUONGTRINH
      );

      await pool.execute(
        `INSERT INTO lop (MALOP,MACHUONGTRINH,TENLOP,NAMTUYENSINH,SISO) VALUES (?, ?,?,?,?)`,
        [
          dataLopExcelArray[i].MALOP,
          kiemtra_tenchuongtrinh.MACHUONGTRINH,
          dataLopExcelArray[i].TENLOP,
          dataLopExcelArray[i].NAMTUYENSINH,
          dataLopExcelArray[i].SISO,
        ]
      );

      results.push({
        EM: `Tạo lớp hàng loạt thành công`,
        EC: 0,
        DT: [],
      });
    }

    let [results1, fields1] = await pool.execute(
      `select bomon.TENBOMON,ctdt.*,lop.* from lop,chuongtrinhdaotao as ctdt,bomon where bomon.MABOMON = ctdt.MABOMON and ctdt.MACHUONGTRINH = lop.MACHUONGTRINH`
    );

    console.log("check lớp =))): ", results1);

    return {
      EM: "Tất cả lớp đã được tạo",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    console.log("Lỗi services createLopExcel", error);
    return {
      EM: "Lỗi services createLopExcel",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  selectLop,
  CreateLop,
  updateLop,
  deleteLop,
  createLopExcel,
};
