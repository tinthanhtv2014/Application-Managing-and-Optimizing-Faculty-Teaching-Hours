const axios = require('axios');

const Sevicel_CheckStatus_Python = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/hello');
        const data = response.data;
        console.log("Trả lời từ người AE Python: ", data);
        return {
            EM: "Success",
            EC: 0,
            DT: data,
        };
    } catch (error) {
        if (error.response) {
            // Server đã phản hồi với một mã lỗi
            console.error("Lỗi từ server Python:", error.response.data);
            console.error(">>> Lỗi từ server Python <<<");
        } else if (error.request) {
            // Yêu cầu đã được gửi nhưng không nhận được phản hồi
            console.error("Không nhận được phản hồi từ server Python:", error.request);
            console.error(">>> Không nhận được phản hồi từ server Python <<<");
        } else {
            // Có lỗi khác xảy ra khi thiết lập yêu cầu
            console.error("Lỗi khi thiết lập yêu cầu:", error.message);
            console.error(">>> Lỗi khi thiết lập yêu cầu server Python <<<");
        }
        return {
            EM: "Lỗi services Sevicel_CheckStatus_Python",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    Sevicel_CheckStatus_Python
};
