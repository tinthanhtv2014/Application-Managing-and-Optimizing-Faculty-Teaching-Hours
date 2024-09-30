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

const Lay_data_training = async () => {
    try {
        let [datat_training] = await pool.execute(
            `SELECT 
            GV.MAGV, 
            MH.MAMONHOC, 
            L.MALOP
            FROM bangphancong BPC
            JOIN hockynienkhoa HKNK ON HKNK.MAHKNK = BPC.MAHKNK
            JOIN giangvien GV ON GV.MAGV = BPC.MAGV
            JOIN chitietphancong CTPC ON CTPC.MAPHANCONG = BPC.MAPHANCONG
            JOIN monhoc MH ON MH.MAMONHOC = CTPC.MAMONHOC
            JOIN lop L ON L.MALOP = CTPC.MALOP
            JOIN bomon BM ON BM.MABOMON = GV.MABOMON
            JOIN khoa K ON K.MAKHOA = BM.MAKHOA
            GROUP BY 
            GV.MAGV, GV.TENGV, 
            HKNK.MAHKNK, HKNK.TENHKNK, HKNK.TEN_NAM_HOC, 
            CTPC.TONG_SO_GIO, 
            MH.MAMONHOC, MH.TENMONHOC,
            L.MALOP;`,
        );

        return datat_training;
    } catch (error) {
        console.error("Lỗi services Lay_datat_training: ", error);
        return {
            EM: "Lỗi services Lay_datat_training",
            EC: -1,
            DT: [],
        };
    }
};

const Lay_data_GV = async (dataAutoPhanCong) => {
    try {
        let [data_GV] = await pool.execute(
            `SELECT GV.MAGV
            FROM bomon BM
            JOIN giangvien GV ON GV.MABOMON = BM.MABOMON
            WHERE BM.MABOMON = ?;`,
            [dataAutoPhanCong.data[0].MABOMON]
        );

        return data_GV;
    } catch (error) {
        console.error("Lỗi Lay_datat_GV: ", error);
        return {
            EM: "Lỗi Lay_datat_GV",
            EC: -1,
            DT: [],
        };
    }
};

/**
 * Hàm gọi API Random Forest để dự đoán MAGV
 * @param {Array} data_training - Dữ liệu huấn luyện
 * @param {Array} data_auto_phan_cong - Dữ liệu cần dự đoán
 * @param {Array} data_gv - Danh sách các MAGV hợp lệ
 * @returns {Object} Kết quả dự đoán
 */
const Sevicel_Training_RandomForest_Python = async (data_auto_phan_cong) => {
    try {
        let data_training = await Lay_data_training();
        let data_gv = await Lay_data_GV(data_auto_phan_cong);
        console.log("datat_training: ", data_training);

        // Khởi tạo mảng data_phan_cong
        let data_phan_cong = [];

        // Lọc lấy MALOP và MAMONHOC từ data_auto_phan_cong
        for (let i = 0; i < data_auto_phan_cong.data.length; i++) {
            data_phan_cong.push({
                MALOP: data_auto_phan_cong.data[i].MALOP,
                MAMONHOC: data_auto_phan_cong.data[i].MAMONHOC
            });
        }

        console.log("data_phan_cong: ", data_phan_cong);
        console.log("data_gv: ", data_gv);

        console.log("Gọi API Random Forest của Python...");

        const response = await axios.post('http://localhost:5000/api/randomforest', {
            data_training: data_training,
            data_auto_phan_cong: data_phan_cong,
            data_gv: data_gv
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("response từ Python:", response);
        if (response.data.EC === 0) {
            console.log("Dự đoán thành công từ Python:", response.data.DT);
            return {
                EM: response.data.EM,
                EC: response.data.EC,
                DT: response.data.DT,
            };
        } else {
            console.error("Lỗi từ Python:", response.data.EM);
            return {
                EM: response.data.EM,
                EC: response.data.EC,
                DT: [],
            };
        }

    } catch (error) {
        console.error("Lỗi services Sevicel_Training_RandomForest_Python: ", error);
        return {
            EM: "Lỗi services Sevicel_Training_RandomForest_Python",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    Sevicel_DongBoNamHoc_HocKy,
    Sevicel_Training_RandomForest_Python
};