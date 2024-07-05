const pool = require("../../config/database");

const timTaiKhoan_TENDANGNHAP = async (TENDANGNHAP) => {
    try {
        const [results, fields] = await pool.execute(
            "SELECT * FROM taikhoan WHERE TENDANGNHAP = ?",
            [TENDANGNHAP]
        );
        return results;
    } catch (error) {
        console.log("timTaiKhoan_TENDANGNHAP errr >>>", error);
        return false;
    }
};

const timGiangVien = async (maGV) => {
    try {
        const [results, fields] = await pool.execute(
            "SELECT * FROM giangvien WHERE MAGV = ?",
            [maGV]
        );
        return results;
    } catch (error) {
        console.log("timGiangVien errr >>>", error);
        return [];
    }
};

const selectBomon_TENBOMON = async (TENBOMON) => {
    try {
        const [results, fields] = await pool.execute(
            "SELECT * FROM bomon WHERE TENBOMON = ?",
            [TENBOMON]
        );
        return results;
    } catch (error) {
        console.log("selectBomon_TENBOMON errr >>>", error);
        return [];
    }
};

const selectChucdanh_TENCHUCDANH = async (TENCHUCDANH) => {
    try {
        const [results, fields] = await pool.execute(
            "SELECT * FROM chucdanh WHERE TENCHUCDANH = ?",
            [TENCHUCDANH]
        );
        return results;
    } catch (error) {
        console.log("selectChucdanh_TENCHUCDANH errr >>>", error);
        return [];
    }
};

const timChucVu_TENCHUCVU = async (TENCHUCVU) => {
    try {
        const [results, fields] = await pool.execute(
            "SELECT * FROM chucvu WHERE TENCHUCVU = ?",
            [TENCHUCVU]
        );
        return results;
    } catch (error) {
        console.log("timChucVu_TENCHUCVU errr >>>", error);
        return [];
    }
};

// Tìm xem giảng viên đang giữ chức vụ nào
const timChucVu_MAGV = async (MAGV) => {
    try {
        const [results, fields] = await pool.execute(
            "SELECT * FROM giu_chuc_vu WHERE MAGV = ?",
            [MAGV]
        );
        return results;
    } catch (error) {
        console.log("timChucVu_TENCHUCVU errr >>>", error);
        return [];
    }
};

// Tìm xem giảng viên đang giữ chức vụ nào
const timCoChucDanh_MAGV = async (MAGV) => {
    try {
        const [results, fields] = await pool.execute(
            "SELECT * FROM co_chuc_danh WHERE MAGV = ?",
            [MAGV]
        );
        return results;
    } catch (error) {
        console.log("timChucVu_TENCHUCVU errr >>>", error);
        return [];
    }
};

module.exports = {
    timTaiKhoan_TENDANGNHAP,
    timGiangVien,
    selectBomon_TENBOMON,
    selectChucdanh_TENCHUCDANH,
    timChucVu_TENCHUCVU,
    timChucVu_MAGV,
    timCoChucDanh_MAGV,
};
