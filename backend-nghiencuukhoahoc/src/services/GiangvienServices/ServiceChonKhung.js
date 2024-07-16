const pool = require("../../config/database");

const timChucDanh_TENCHUCDANH = async (TENCHUCDANH) => {
    try {
        const [results1, fields] = await pool.execute(
            "SELECT * FROM chucdanh WHERE TENCHUCDANH = ?",
            [TENCHUCDANH]
        );
        // console.log("Check timChucVu_MACHUCVU:   ", results1)
        return results1[0];
    } catch (error) {
        console.log("timChucDanh_TENCHUCDANH errr >>>", error);
        return [];
    }
};

const timKhungGioChuan_TENCHUCDANH = async (TENCHUCDANH) => {
    try {
        let chucdanh = await timChucDanh_TENCHUCDANH(TENCHUCDANH);
        console.log("TENCHUCDANH:  ", TENCHUCDANH);
        console.log("chucdanh:  ", chucdanh);
        console.log("chucdanh.MACHUCDANH:  ", chucdanh.MACHUCDANH);
        if (!chucdanh) {
            return {
                EM: "Không có chức danh này",
                EC: 0,
                DT: [],
            };
        }
        const [results1, fields] = await pool.execute(
            "SELECT * FROM khunggiochuan WHERE khunggiochuan.MACHUCDANH = ?",
            [chucdanh.MACHUCDANH]
        );
        return {
            EM: 'Xem thông tin khung giờ chuẩn theo tên chức danh thành công',
            EC: 1,
            DT: results1,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "lỗi services timKhungGioChuan_TENCHUCDANH",
            EC: -1,
            DT: [],
        };
    }
};



module.exports = {
    timChucDanh_TENCHUCDANH,
    timKhungGioChuan_TENCHUCDANH,

};