import axios from "axios";
import Cookies from "js-cookie";
// Tạo một instance của axios với cấu hình ban đầu
const CookiesAxios = axios.create({
  withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
});

// Thêm interceptor để tự động thêm header Authorization vào tất cả các yêu cầu
CookiesAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // Hoặc lấy token từ một nguồn lưu trữ khác
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default CookiesAxios;
