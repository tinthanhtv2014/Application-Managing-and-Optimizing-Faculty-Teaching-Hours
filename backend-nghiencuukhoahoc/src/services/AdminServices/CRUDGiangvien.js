const pool = require("../../config/database");

const timGiangVien = async (maGV) => {
    let [results1, fields1] = await pool.execute(
        `select * from giangvien where MAGV = ?`,
        [maGV]
    );

    return results1
}

const selectGiangVien = async () => {
    try {
        let [results1, fields1] = await pool.execute(`select * from giangvien`);
        return {
            EM: " xem thông tin giảng viên thành công",
            EC: 0,
            DT: results1,
        };
    } catch (error) {
        return {
            EM: "lỗi services selectGiangVien",
            EC: 1,
            DT: [],
        };
    }
};

const createGiangVien = async (dataGiangVien) => {
    try {
        //dataGiangVien phải bao gồm MAGV, MABOMON, TENDANGNHAP, TENGV, EMAIL, DIENTHOAI, DIACHI

        if (timGiangVien(dataGiangVien.maGV)) {
            return {
                EM: "Giảng viên này đã tồn tại",
                EC: 0,
                DT: [],
            };
        }

        let [results, fields] = await pool.execute(
            `INSERT INTO giangvien VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [dataGiangVien.MAGV, dataGiangVien.MABOMON, dataGiangVien.TENDANGNHAP, dataGiangVien.TENGV, dataGiangVien.EMAIL, dataGiangVien.DIENTHOAI, dataGiangVien.DIACHI]
        );
        return {
            EM: "thêm giảng viên mới thành công",
            EC: 0,
            DT: results,
        };

    } catch (error) {
        console.log(error)
        return {
            EM: "lỗi services createGiangVien",
            EC: 1,
            DT: [],
        };
    }
};

const updateGiangVien = async (dataGiangVien) => {
    try {

        if (!timGiangVien(dataGiangVien.maGV)) {
            return {
                EM: "Giảng viên này không tồn tại",
                EC: 0,
                DT: [],
            };
        }

        let [results, fields] = await pool.execute(
            `UPDATE giangvien
            SET MABOMON = ?, TENDANGNHAP = ?, TENGV = ?, EMAIL = ?, DIENTHOAI = ?, DIACHI = ?, 
            WHERE MAGV = ?;`,
            [
                dataGiangVien.MABOMON, dataGiangVien.TENDANGNHAP,
                dataGiangVien.TENGV, dataGiangVien.EMAIL,
                dataGiangVien.DIENTHOAI, dataGiangVien.DIACHI,
                dataGiangVien.MAGV
            ]
        );
        return {
            EM: "sửa giảng viên thành công",
            EC: 0,
            DT: results,
        };

    } catch (error) {
        console.log(error)
        return {
            EM: "lỗi services updateGiangVien",
            EC: 1,
            DT: [],
        };
    }
}

const deleteGiangVien = async (dataGiangVien) => {
    try {
        if (!timGiangVien(dataGiangVien.maGV)) {
            return {
                EM: "Giảng viên này không tồn tại",
                EC: 0,
                DT: [],
            };
        }

        let [results, fields] = await pool.execute(
            `DELETE FROM giangvien
            WHERE MAGV = ?;`,
            [dataGiangVien.MAGV]
        );
        return {
            EM: "xóa giảng viên thành công",
            EC: 0,
            DT: results,
        };
    } catch (error) {
        console.log(error)
        return {
            EM: "lỗi services deleteGiangVien",
            EC: 1,
            DT: [],
        };
    }
}

module.exports = {
    selectGiangVien,
    createGiangVien,
    updateGiangVien,
    deleteGiangVien
};