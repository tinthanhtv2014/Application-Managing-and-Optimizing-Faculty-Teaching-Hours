const {
  updateThongTinGiangVien,
} = require("../../services/GiangvienServices/updateThongTinGiangVien");

const updateThongTinGiangVienController = async (req, res) => {
  try {
    const TENDANGNHAP = req.params.TENDANGNHAP;
    const TENCHUCDANH = req.body.TENCHUCDANH;
    if (!TENDANGNHAP || !TENCHUCDANH) {
      return res.status(400).json({
        EM: "!TENDANGNHAP || !TENCHUCDANH bị rỗng",
        EC: 400,
        DT: null,
      });
    }
    // Khởi tạo dataGiangVien với các trường cần thiết, mặc định là ''
    let dataGiangVien = {
      TENGV: "",
      DIENTHOAI: "",
      DIACHI: "",
      TENCHUCVU: "",
      EMAIL: "",
    };

    // Cập nhật giá trị từ req.body vào dataGiangVien
    Object.keys(dataGiangVien).forEach((field) => {
      if (req.body[field]) {
        dataGiangVien[field] = req.body[field];
      }
    });

    // console.log("TENDANGNHAP: ", TENDANGNHAP);
    // console.log("dataGiangVien: ", dataGiangVien);

    let results = await updateThongTinGiangVien(
      TENDANGNHAP,
      dataGiangVien,
      TENCHUCDANH
    );

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Đã xảy ra lỗi máy chủ",
      EC: 500,
      DT: null,
    });
  }
};

module.exports = {
  updateThongTinGiangVienController,
};
