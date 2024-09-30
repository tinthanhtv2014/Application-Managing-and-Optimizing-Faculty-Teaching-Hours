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
            MH.MAMONHOC
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

const Lay_data_GV = async (data_auto_phan_cong) => {
    try {
        let [data_GV] = await pool.execute(
            `SELECT GV.MAGV
            FROM bomon BM
            JOIN giangvien GV ON GV.MABOMON = BM.MABOMON
            WHERE BM.MABOMON = ?;`,
            [data_auto_phan_cong.data[0].MABOMON]
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
        // console.log("datat_training: ", data_training);
        console.log("data_auto_phan_cong: ", data_auto_phan_cong);

        // Khởi tạo mảng data_phan_cong
        let data_phan_cong = [];

        // Lọc lấy MALOP và MAMONHOC từ data_auto_phan_cong
        for (let i = 0; i < data_auto_phan_cong.data.length; i++) {
            data_phan_cong.push({
                MAMONHOC: data_auto_phan_cong.data[i].MAMONHOC
            });
        }

        // console.log("data_phan_cong: ", data_phan_cong);
        // console.log("data_gv: ", data_gv);

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
            for (let i = 0; i < response.data.DT.length; i++) {
                // Gán MAGV vào data_phan_cong
                data_auto_phan_cong.data[i].MAGV = response.data.DT[i].MAGV;
            }
            for (let i = 0; i < data_auto_phan_cong.data.length; i++) {
                // Lấy tên GV
                let [data_TENGV] = await pool.execute(
                    `SELECT * FROM giangvien GV WHERE GV.MAGV = ?`,
                    [data_auto_phan_cong.data[i].MAGV]
                );

                // Data các môn GV đã dạy trong học kỳ dự đoán
                let [data_TinChi] = await pool.execute(
                    `SELECT 
                              SUM(MH.SOTINCHILYTHUYET) AS TongSoTinChiLyThuyet,
                              SUM(MH.SOTINCHITHUCHANH) AS TongSoTinChiThucHanh
                          FROM giangvien GV
                          JOIN bangphancong BPC ON BPC.MAGV = GV.MAGV
                          JOIN hockynienkhoa HKNK ON HKNK.MAHKNK = BPC.MAHKNK
                          JOIN chitietphancong CTPC ON CTPC.MAPHANCONG = BPC.MAPHANCONG
                          JOIN monhoc MH ON MH.MAMONHOC = CTPC.MAMONHOC
                          WHERE GV.MAGV = ? AND HKNK.MAHKNK = ?;`,
                    [data_auto_phan_cong.data[i].MAGV, data_auto_phan_cong.HOCKINIENKHOA.MAHKNK]
                );

                // Data môn học được dự đoán chưa lưu vào CSDL
                let [data_MonHoc_duoc_du_doan] = await pool.execute(
                    `SELECT 
                              SUM(MH.SOTINCHILYTHUYET) AS TongSoTinChiLyThuyet,
                              SUM(MH.SOTINCHITHUCHANH) AS TongSoTinChiThucHanh
                          FROM monhoc MH
                          WHERE MH.MAMONHOC = ?;`,
                    [data_auto_phan_cong.data[i].MAMONHOC]
                );

                // Tính toán số giờ GV đã dạy trong học kỳ này
                if (
                    data_TinChi.length > 0 &&
                    data_TinChi[0].TongSoTinChiLyThuyet !== null &&
                    data_TinChi[0].TongSoTinChiThucHanh !== null
                ) {
                    data_auto_phan_cong.data[i].TONG_SO_GIO =
                        15 * data_TinChi[0].TongSoTinChiLyThuyet +
                        (30 * data_TinChi[0].TongSoTinChiThucHanh) * 2;
                } else {
                    data_auto_phan_cong.data[i].TONG_SO_GIO = 0;
                }

                // Tính toán số giờ cho môn học được phân công
                if (
                    data_MonHoc_duoc_du_doan.length > 0 &&
                    data_MonHoc_duoc_du_doan[0].TongSoTinChiLyThuyet !== null &&
                    data_MonHoc_duoc_du_doan[0].TongSoTinChiThucHanh !== null
                ) {
                    let TONG_SO_GIO_MonHocDuocPhanCong =
                        15 * data_MonHoc_duoc_du_doan[0].TongSoTinChiLyThuyet +
                        30 * data_MonHoc_duoc_du_doan[0].TongSoTinChiThucHanh;
                    data_auto_phan_cong.data[i].TONG_SO_GIO += TONG_SO_GIO_MonHocDuocPhanCong;
                }

                // Gán tên giảng viên
                if (data_TENGV.length > 0) {
                    data_auto_phan_cong.data[i].TENGV = data_TENGV[0].TENGV;
                } else {
                    data_auto_phan_cong.data[i].TENGV = "Không tìm thấy tên GV";
                }

                // Log kết quả cuối cùng
                console.log(`data_auto_phan_cong thứ ${i}:
                          MAGV: ${data_auto_phan_cong.data[i].MAGV}
                          Tên: ${data_auto_phan_cong.data[i].TENGV}
                          Tổng giờ: ${data_auto_phan_cong.data[i].TONG_SO_GIO}
                      `);
                // console.log(`data_auto_phan_cong cuối:`, data_auto_phan_cong.data[i]);
            }
            console.log(`data_auto_phan_cong python:`, data_auto_phan_cong);
            return {
                EM: response.data.EM,
                EC: response.data.EC,
                DT: data_auto_phan_cong,
            };
        } else {
            console.error("Lỗi từ Python:", response.data.EM);
            return {
                EM: response.data.EM,
                EC: response.data.EC,
                DT: data_auto_phan_cong,
            };
        }

    } catch (error) {
        console.error("Lỗi services Sevicel_Training_RandomForest_Python: ", error);
        return {
            EM: "Lỗi services Sevicel_Training_RandomForest_Python",
            EC: -1,
            DT: data_auto_phan_cong,
        };
    }
};

module.exports = {
    Sevicel_DongBoNamHoc_HocKy,
    Sevicel_Training_RandomForest_Python
};