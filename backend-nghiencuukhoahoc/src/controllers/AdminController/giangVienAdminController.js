const {
    selectGiangVien,
} = require("../../services/AdminServices/CRUDGiangvien");

const getAllGiangVien = async (req, res) => {
    try {
        let results = await selectGiangVien();

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
    getAllGiangVien,
};