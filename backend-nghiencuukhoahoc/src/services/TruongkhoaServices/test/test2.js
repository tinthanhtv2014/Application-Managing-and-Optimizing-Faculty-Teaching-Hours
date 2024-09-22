const pool = require("../../../config/database");

//đồng bộ năm học và học kỳ
const Sevicel_DongBoNamHoc_HocKy = async () => {
    try {
        // Lấy tất cả năm học từ bảng namhoc
        let [namhocRows] = await pool.execute(
            `SELECT * FROM namhoc`
        );

        // Lặp qua từng năm học và đồng bộ học kỳ
        for (let namhoc of namhocRows) {
            let [existingHocKy] = await pool.execute(
                `SELECT * FROM hockynienkhoa WHERE TEN_NAM_HOC = ?`, [namhoc.TENNAMHOC]
            );

            // Nếu chưa có học kỳ cho năm học này, tạo mới học kỳ 1 và học kỳ 2
            if (existingHocKy.length === 0) {
                await pool.execute(
                    `INSERT INTO hockynienkhoa (TENHKNK, TEN_NAM_HOC, NGAYBATDAUNIENKHOA) VALUES 
                    (?, ?, ?), (?, ?, ?)`,
                    [
                        'Học Kì 1', namhoc.TENNAMHOC, '2020-09-01',
                        'Học Kì 2', namhoc.TENNAMHOC, '2021-02-01'
                    ]
                );
            }
        }

        return { EC: 0, EM: "Đồng bộ thành công" };
    } catch (error) {
        console.error("Lỗi services đồng bộ: ", error);
        return {
            EM: "Lỗi services đồng bộ",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    Sevicel_DongBoNamHoc_HocKy
};