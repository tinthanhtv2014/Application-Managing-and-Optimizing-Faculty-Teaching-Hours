const pool = require("../../config/database");

const { timnamhoc_TENNAMHOC } = require("../../services/AdminServices/helpers");

const get_thongtin_danhmuc = async (TENDANGNHAP, TENNAMHOC) => {
  try {
    let MANAMHOC = await timnamhoc_TENNAMHOC(TENNAMHOC);
    const [results_MAGV, fields__MAGV] = await pool.execute(
      "SELECT MAGV FROM taikhoan WHERE TENDANGNHAP =? ",
      [TENDANGNHAP]
    );

    const MAGV = results_MAGV[0].MAGV;
    console.log("check results_MAGV=>", MAGV);
    if (MANAMHOC === 0) {
      return {
        EM: "Không có năm học này",
        EC: 0,
        DT: [],
      };
    }
    console.log("Check MANAMHOC:   ", MANAMHOC);
    const [results1, fields] = await pool.execute(
      "select gv.MAGV,gv.TENGV,nh.*,kgc.GIONGHIENCUUKHOAHOC_CHUAN from giangvien as gv, namhoc as nh,chon_khung as ck,khunggiochuan as kgc where gv.MAGV = ck.MAGV and nh.MANAMHOC = ck.MANAMHOC and kgc.MAKHUNG = ck.MAKHUNG and gv.MAGV = ? and nh.MANAMHOC = ?",
      [MAGV, MANAMHOC]
    );

    return {
      EM: "lấy thông tin thành công",
      EC: 1,
      DT: results1[0],
    };
  } catch (error) {
    console.log("timChucDanh_TENCHUCDANH errr >>>", error);
    return [];
  }
};

module.exports = {
  get_thongtin_danhmuc,
};
