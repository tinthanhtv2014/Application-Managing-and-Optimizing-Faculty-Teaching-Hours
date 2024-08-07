import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import CookiesAxios from "../../CookiesAxios";
import Cookies from "js-cookie";

const ChuongtrinhDT_CNTT = () => {
  const [tenChuongTrinh, setTenChuongTrinh] = useState([]);
  const [selectedChuongTrinh, setSelectedChuongTrinh] = useState("");

  const auth = Cookies.get("accessToken");
  const navigate = useNavigate();

  const fetchdata = async (taikhoan) => {
    try {
      const tenbomonResponse = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`,
        {
          headers: {
            Authorization: `Bearer ${auth}`, // Đảm bảo gửi token JWT trong header
          },
        }
      );

      const tenbomonData = tenbomonResponse.data.DT.TENBOMON;

      const chuongtrinhResponse = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/chuongtrinh/xem/bomon`,
        {
          TENBOMON: tenbomonData,
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`, // Đảm bảo gửi token JWT trong header
          },
        }
      );

      const chuongtrinhData = chuongtrinhResponse.data.DT.map(
        (item) => item.TENCHUONGTRINH
      );
      setTenChuongTrinh(chuongtrinhData);

      console.log("Tên chương trình đào tạo:", chuongtrinhData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    if (auth) {
      try {
        const decodedToken = jwtDecode(auth);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        if (expirationTime < currentTime) {
          Cookies.remove("accessToken");
          navigate("/login");
        } else {
          fetchdata(decodedToken.taikhoan);
        }
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        Cookies.remove("accessToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, auth]);

  const handleChange = (event) => {
    setSelectedChuongTrinh(event.target.value);
  };

  return (
    <div>
      <h1>DANH SÁCH CHƯƠNG TRÌNH ĐÀO TẠO BỘ MÔN CÔNG NGHỆ THÔNG TIN</h1>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="standard-select-label">Tên Chương Trình</InputLabel>
        <Select
          labelId="standard-select-label"
          id="standard-select"
          value={selectedChuongTrinh}
          onChange={handleChange}
          label="Tên Chương Trình"
        >
          {tenChuongTrinh.length === 0 ? (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          ) : (
            tenChuongTrinh.map((chuongtrinh, index) => (
              <MenuItem key={index} value={chuongtrinh}>
                {chuongtrinh}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default ChuongtrinhDT_CNTT;
