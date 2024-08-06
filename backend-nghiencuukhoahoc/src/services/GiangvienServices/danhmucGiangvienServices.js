const pool = require("../../config/database");

const { timnamhoc_TENNAMHOC } = require("../../services/AdminServices/helpers");

const get_thongtin_danhmuc = async (MAGV, TENNAMHOC) => {
  try {
    let MANAMHOC = await timnamhoc_TENNAMHOC(TENNAMHOC);
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
      DT: results1,
      results_loai_tac_gia,
    };
  } catch (error) {
    console.log("timChucDanh_TENCHUCDANH errr >>>", error);
    return [];
  }
};

module.exports = {
  get_thongtin_danhmuc,
};
