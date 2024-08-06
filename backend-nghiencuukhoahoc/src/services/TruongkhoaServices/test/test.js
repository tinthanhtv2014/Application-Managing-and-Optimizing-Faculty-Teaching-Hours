const pool = require("../../../config/database");

const test = async (page, limit, TENKHOA) => {
    try {
        return {
            EM: "ok",
            EC: 1,
            DT: null,
        };
    } catch (error) {
        console.error(error);
        return {
            EM: "Đã xảy ra lỗi khi test",
            EC: -1,
            DT: null,
        };
    }
};

module.exports = {
    test,
};
