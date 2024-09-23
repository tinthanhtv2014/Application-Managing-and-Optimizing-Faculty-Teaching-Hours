const pool = require("../../config/database");
const {} = require("./helpers");
const moment = require("moment");

const selectAll_hockinienkhoa = async () => {
  try {
    let [results1, fields1] = await pool.execute(`select * from hockynienkhoa`);
    return {
      EM: " xem thông tin học kì niên khóa thành công",
      EC: 1,
      DT: results1,
    };
  } catch (error) {
    return {
      EM: "lỗi services selectAll_hockinienkhoa",
      EC: -1,
      DT: [],
    };
  }
};

//đồng bộ năm học và học kỳ
const Sevicel_DongBoNamHoc_HocKy = async () => {
  try {
    // Lấy tất cả năm học từ bảng namhoc
    let [namhocRows] = await pool.execute(`SELECT * FROM namhoc`);

    // Lặp qua từng năm học và đồng bộ học kỳ
    for (let namhoc of namhocRows) {
      let [existingHocKy] = await pool.execute(
        `SELECT * FROM hockynienkhoa WHERE TEN_NAM_HOC = ?`,
        [namhoc.TENNAMHOC]
      );

      // Nếu chưa có học kỳ cho năm học này, tạo mới học kỳ 1 và học kỳ 2
      if (existingHocKy.length === 0) {
        await pool.execute(
          `INSERT INTO hockynienkhoa (TENHKNK, TEN_NAM_HOC, NGAYBATDAUNIENKHOA) VALUES 
                  (?, ?, ?), (?, ?, ?)`,
          [
            "Học Kì 1",
            namhoc.TENNAMHOC,
            "2020-09-01",
            "Học Kì 2",
            namhoc.TENNAMHOC,
            "2021-02-01",
          ]
        );
      }
    }

    return { EC: 1, EM: "Đồng bộ thành công" };
  } catch (error) {
    console.error("Lỗi services đồng bộ: ", error);
    return {
      EM: "Lỗi services đồng bộ",
      EC: -1,
      DT: [],
    };
  }
};

const create_hockinienkhoa_ver2 = async (dataHockinienkhoa) => {
  try {
    // Kiểm tra xem năm học đã tồn tại hay chưa
    let [results_namhoc] = await pool.execute(
      `SELECT * FROM namhoc WHERE TENNAMHOC = ?`,
      [dataHockinienkhoa.TEN_NAM_HOC]
    );

    // Nếu năm học chưa tồn tại, thêm vào bảng namhoc
    if (results_namhoc.length === 0) {
      await pool.execute(`INSERT INTO namhoc (TENNAMHOC) VALUES (?)`, [
        dataHockinienkhoa.TEN_NAM_HOC,
      ]);
    }

    // Kiểm tra xem học kỳ trong năm học đó đã có 2 học kỳ hay chưa
    let [existingHocKy] = await pool.execute(
      `SELECT * FROM hockynienkhoa WHERE TEN_NAM_HOC = ?`,
      [dataHockinienkhoa.TEN_NAM_HOC]
    );

    if (existingHocKy.length >= 2) {
      Sevicel_DongBoNamHoc_HocKy();
      const results_data = await selectAll_hockinienkhoa();
      return {
        EM: "Học kì niên khóa này đã tồn tại đủ 2 học kỳ.",
        EC: 0,
        DT: results_data,
      };
    }

    // Kiểm tra nếu học kỳ hiện tại đã tồn tại
    let hocKyTonTai = existingHocKy.some(
      (item) => item.TENHKNK === dataHockinienkhoa.TENHKNK
    );

    if (hocKyTonTai) {
      Sevicel_DongBoNamHoc_HocKy();
      const results_data = await selectAll_hockinienkhoa();
      return {
        EM: "Học kỳ này đã tồn tại.",
        EC: 0,
        DT: results_data,
      };
    }

    // Thêm học kỳ mới
    const ngayBatDauNienKhoa = moment(
      dataHockinienkhoa.NGAYBATDAUNIENKHOA
    ).format("YYYY-MM-DD");
    await pool.execute(
      `INSERT INTO hockynienkhoa (TENHKNK, TEN_NAM_HOC, NGAYBATDAUNIENKHOA) VALUES (?, ?, ?)`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.TEN_NAM_HOC,
        ngayBatDauNienKhoa,
      ]
    );

    // Lấy danh sách tất cả các học kỳ niên khóa để trả về
    Sevicel_DongBoNamHoc_HocKy();
    const results_data = await selectAll_hockinienkhoa();
    return {
      EM: "Tạo học kỳ niên khóa thành công.",
      EC: 1,
      DT: results_data.DT,
    };
  } catch (error) {
    console.log("error", error);
    return {
      EM: "Lỗi khi tạo học kỳ niên khóa.",
      EC: -1,
      DT: [],
    };
  }
};

const create_hockinienkhoa = async (dataHockinienkhoa) => {
  // console.log("datahockinienkhoa", dataHockinienkhoa.TENHKNK);
  try {
    let [results_kiemtra, fields_kiemtra] = await pool.execute(
      `select * from hockynienkhoa where TEN_NAM_HOC = ?`,
      [dataHockinienkhoa.TEN_NAM_HOC]
    );

    if (results_kiemtra.length >= 2) {
      return {
        EM: "Học kì niên khóa này đã tồn tại (đã đủ 2 học kỳ trong năm học này)",
        EC: 0,
        DT: [],
      };
    }
    // Kiểm tra xem học kỳ hiện tại đã tồn tại trong năm học chưa
    let hocKyTonTai = results_kiemtra.some(
      (item) => item.TENHKNK === dataHockinienkhoa.TENHKNK
    );

    if (hocKyTonTai) {
      return {
        EM: "Học kì niên khóa này đã tồn tại",
        EC: 0,
        DT: [],
      };
    }
    // Chuyển đổi định dạng NGAYBATDAUNIENKHOA
    const ngayBatDauNienKhoa = moment(
      dataHockinienkhoa.NGAYBATDAUNIENKHOA
    ).format("YYYY-MM-DD");

    let [results_hockinienkhoa, fields_hockinienkhoa] = await pool.execute(
      `insert into hockynienkhoa (TENHKNK,TEN_NAM_HOC,NGAYBATDAUNIENKHOA) values (?,?,?)`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.TEN_NAM_HOC,
        ngayBatDauNienKhoa, // Sử dụng giá trị đã chuyển đổi
      ]
    );

    let [results_namhoc_select, fields_namhoc_select] = await pool.execute(
      `select * from namhoc where TENNAMHOC = ?`,
      [dataHockinienkhoa.TEN_NAM_HOC]
    );

    if (results_namhoc_select.length === 0) {
      let [results_namhoc, fields_namhoc] = await pool.execute(
        `insert into namhoc (TENNAMHOC) values (?)`,
        [dataHockinienkhoa.TEN_NAM_HOC]
      );
    }

    const results_data = await selectAll_hockinienkhoa();
    return {
      EM: " tạo học kì niên khóa thành công",
      EC: 1,
      DT: results_data.DT,
    };
  } catch (error) {
    console.log("error", error);
    return {
      EM: "lỗi services create_hockinienkhoa",
      EC: -1,
      DT: [],
    };
  }
};

const update_hockinienkhoa = async (MAHKNK, dataHockinienkhoa) => {
  // try {
  let [results_kiemtra_hockinienkhoa, fields_kiemtra] = await pool.execute(
    `select * from hockynienkhoa where MAHKNK = ?`,
    [MAHKNK]
  );

  if (results_kiemtra_hockinienkhoa.length > 0) {
    let [results1, fields1] = await pool.execute(
      `   UPDATE hockynienkhoa
              SET  TENHKNK = ?, TEN_NAM_HOC = ?, NGAYBATDAUNIENKHOA = ?
              WHERE MAHKNK = ?`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.TEN_NAM_HOC,
        dataHockinienkhoa.NGAYBATDAUNIENKHOA,
        MAHKNK,
      ]
    );

    let [results_kiemtra_namhoc, fields_kiemtra] = await pool.execute(
      `select * from namhoc where TENNAMHOC = ?`,
      [results_kiemtra_hockinienkhoa[0].TEN_NAM_HOC]
    );

    let [results_namhoc, fields_namhoc] = await pool.execute(
      `   UPDATE namhoc SET  TENNAMHOC = ? WHERE MANAMHOC = ?`,
      [dataHockinienkhoa.TEN_NAM_HOC, results_kiemtra_namhoc[0].MANAMHOC]
    );

    let [results_ketqua, fields_ketqua] = await pool.execute(
      `select * from hockynienkhoa where MAHKNK = ?`,
      [MAHKNK]
    );

    return {
      EM: " thay đổi thông tin hoc kì niên khóa thành công",
      EC: 1,
      DT: results_ketqua,
    };
  } else {
    let [results_hockinienkhoa, fields_hockinienkhoa] = await pool.execute(
      `insert into hockynienkhoa (TENHKNK,TEN_NAM_HOC,NGAYBATDAUNIENKHOA) values (?,?,?)`,
      [
        dataHockinienkhoa.TENHKNK,
        dataHockinienkhoa.TEN_NAM_HOC,
        dataHockinienkhoa.NGAYBATDAUNIENKHOA,
      ]
    );

    let [results_namhoc, fields_namhoc] = await pool.execute(
      `insert into namhoc (TENNAMHOC) values (?)`,
      [dataHockinienkhoa.TEN_NAM_HOC]
    );

    let [results_ketqua, fields_ketqua] = await pool.execute(
      `select * from hockynienkhoa where MAHKNK = ?`,
      [MAHKNK]
    );
    return {
      EM: " tạo học kì niên khóa thành công",
      EC: 1,
      DT: results_ketqua,
    };
  }
  // } catch (error) {
  //   return {
  //     EM: "lỗi services update_hockinienkhoa",
  //     EC: -1,
  //     DT: [],
  //   };
  // }
};

const delete_hockinienkhoa = async (MAHKNK) => {
  try {
    let [results1, fields1] = await pool.execute(
      `DELETE FROM hockynienkhoa WHERE MAHKNK = ?;`,
      [MAHKNK]
    );
    const results_data = await selectAll_hockinienkhoa();
    return {
      EM: " xóa học kỳ niên khóa thành công",
      EC: 1,
      DT: results_data.DT,
    };
  } catch (error) {
    return {
      EM: "lỗi services delete_hockinienkhoa",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectAll_hockinienkhoa,
  create_hockinienkhoa,
  create_hockinienkhoa_ver2,
  update_hockinienkhoa,
  delete_hockinienkhoa,
};
