const pool = require("../../config/database");

const timMonHoc_MAMONHOC = async (MAMONHOC) => {
    let [results1, fields1] = await pool.execute(
        `select * from monhoc where MAMONHOC = ?`,
        [MAMONHOC]
    );

    return results1;
}

const timMonHoc_TENMONHOC = async (TENMONHOC) => {
    let [results1, fields1] = await pool.execute(
        `select * from monhoc where TENMONHOC = ?`,
        [TENMONHOC]
    );

    return results1;
}

const selectMonHoc = async () => {
    try {
        let [results1, fields1] = await pool.execute(`select * from monhoc`);
        return {
            EM: " xem thông tin môn học thành công",
            EC: 1,
            DT: results1,
        };
    } catch (error) {
        return {
            EM: "lỗi services selectMonHoc",
            EC: -1,
            DT: [],
        };
    }
};

const createMonHoc = async (dataMonHoc) => {
    //dataMonHoc gồm TENMONHOC, SOTINCHILYTHUYET, SOTINCHITHUCHANH
    try {
        let kemtraMAMONHOC = await timMonHoc_TENMONHOC(dataMonHoc.TENMONHOC);

        if (kemtraMAMONHOC.length > 0) {
            return {
                EM: "Môn học này đã tồn tại",
                EC: 0,
                DT: [],
            };
        }

        const [results, fields] = await pool.execute(
            `INSERT INTO monhoc (TENMONHOC, SOTINCHILYTHUYET, SOTINCHITHUCHANH) VALUES (?, ?, ?)`,
            [
                dataMonHoc.TENMONHOC,
                dataMonHoc.SOTINCHILYTHUYET,
                dataMonHoc.SOTINCHITHUCHANH
            ]
        );
        return {
            EM: "Thêm môn học mới thành công",
            EC: 1,
            DT: results,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Lỗi services createMonHoc",
            EC: -1,
            DT: [],
        };
    }
};


const updateMonHoc = async (MAMONHOC, dataMonHoc) => {

    //dataMonHoc gồm MAMONHOC, TENMONHOC, SOTINCHILYTHUYET, SOTINCHITHUCHANH
    try {
        //console.log(">>>>>>>>>>>>>>>> ", MAMONHOC)
        let kemtraMAMONHOC = await timMonHoc_MAMONHOC(MAMONHOC)

        if (!kemtraMAMONHOC.length > 0) {
            return {
                EM: "Môn học này không tồn tại",
                EC: 0,
                DT: [],
            };
        }

        const [results, fields] = await pool.execute(
            `UPDATE monhoc SET TENMONHOC = ?, SOTINCHILYTHUYET = ?, SOTINCHITHUCHANH = ? WHERE MAMONHOC = ?`,
            [
                dataMonHoc.TENMONHOC,
                dataMonHoc.SOTINCHILYTHUYET,
                dataMonHoc.SOTINCHITHUCHANH,
                MAMONHOC
            ]
        );
        return {
            EM: "Sửa môn học thành công",
            EC: 1,
            DT: [],
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "lỗi services updateMonHoc",
            EC: -1,
            DT: [],
        };
    }

};

const deleteMonHoc = async (MAMONHOC) => {

    //dataMonHoc gồm MAMONHOC, TENMONHOC, SOTINCHILYTHUYET, SOTINCHITHUCHANH
    try {
        //console.log(">>>>>>>>>>>>>>>>", MAMONHOC)
        let kemtraMAMONHOC = await timMonHoc_MAMONHOC(MAMONHOC)

        if (!kemtraMAMONHOC.length > 0) {
            return {
                EM: "Môn học này không tồn tại",
                EC: 0,
                DT: [],
            };
        }

        const [results, fields] = await pool.execute(
            `DELETE FROM monhoc WHERE MAMONHOC = ?`,
            [MAMONHOC]
        );
        return {
            EM: "Xóa môn học thành công",
            EC: 1,
            DT: [],
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "lỗi services deleteMonHoc",
            EC: -1,
            DT: [],
        };
    }

};

module.exports = {
    selectMonHoc,
    createMonHoc,
    updateMonHoc,
    deleteMonHoc
};