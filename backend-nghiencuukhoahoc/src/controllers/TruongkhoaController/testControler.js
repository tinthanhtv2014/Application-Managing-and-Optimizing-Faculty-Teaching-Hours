const {
    Sevicel_LoaiDanhMuc_Excel,
    Sevicel_DanhMuc_Excel,
    Sevicel_TyLe_Excel,
    Sevicel_CoTyLe_Excel
} = require("../../services/TruongkhoaServices/test/test");

const LoaiDanhMucExcelController = async (req, res) => {
    try {
        let data = req.body
        // console.log("data: ", data)
        let results = await Sevicel_LoaiDanhMuc_Excel(data)

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

const DanhMucExcelController = async (req, res) => {
    try {
        let dataDanhMuc = req.body
        // console.log("dataDanhMuc: ", dataDanhMuc)
        let results = await Sevicel_DanhMuc_Excel(dataDanhMuc)
        // let results = {
        //     EM: "Thêm danh mục quy đổi mới thành công",
        //     EC: 1,
        //     DT: 'ok',
        // }
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

const TyLeExcelController = async (req, res) => {
    try {
        let dataTyLe = req.body
        // console.log("dataTyLe: ", dataTyLe)
        let results = await Sevicel_TyLe_Excel(dataTyLe)
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

const CoTyLeExcelController = async (req, res) => {
    try {
        let dataCoTyLe = req.body
        // console.log("dataCoTyLe: ", dataCoTyLe)
        let results = await Sevicel_CoTyLe_Excel(dataCoTyLe)
        // let results = {
        //     EM: "Thêm danh mục quy đổi mới thành công",
        //     EC: 1,
        //     DT: 'ok',
        // }
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
    LoaiDanhMucExcelController,
    DanhMucExcelController,
    TyLeExcelController,
    CoTyLeExcelController
};