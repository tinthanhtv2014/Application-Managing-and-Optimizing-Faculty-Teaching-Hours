const pool = require("../../../config/database");
const axios = require('axios');

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

const Sevicel_Training_RandomForest_Python = async () => {
    try {
        // Gọi API tới server Python (đúng route /api/hello)
        const response = await axios.get('http://localhost:5000/api/hello'); // Đúng đường dẫn tới API Python

        // Lấy dữ liệu từ response
        const data = response.data;
        console.log("Trả lời từ người AE Python: ", data);

        return {
            EM: "Success",
            EC: 0,
            DT: data, // Trả về dữ liệu từ API Python
        };
    } catch (error) {
        console.error("Lỗi services Sevicel_RandomForest_Python: ", error);
        return {
            EM: "Lỗi services Sevicel_RandomForest_Python",
            EC: -1,
            DT: [],
        };
    }
};


module.exports = {
    Sevicel_DongBoNamHoc_HocKy,
    Sevicel_Training_RandomForest_Python
};