const {
    xem_giangvien_khoa,
} = require("../../services/TruongkhoaServices/ServiceTruongKhoa");

const GiangVien_thuoc_KhoaController = async (req, res) => {
    try {
        let page = req.query.page;
        let limit = req.query.limit;
        let TENKHOA = req.query.TENKHOA;
        // console.log("page: ", page)
        // console.log("limit: ", limit)
        // console.log("TENKHOA: ", TENKHOA)
        let results = await xem_giangvien_khoa(page, limit, TENKHOA);

        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            EM: results.EM,
            EC: results.EC,
            DT: results.DT,
        });
    }
};

module.exports = {
    GiangVien_thuoc_KhoaController,
};
