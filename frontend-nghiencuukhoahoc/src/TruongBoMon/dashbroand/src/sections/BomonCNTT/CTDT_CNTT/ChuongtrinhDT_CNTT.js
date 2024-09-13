import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import CookiesAxios from "../../CookiesAxios";
import Cookies from "js-cookie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./chuongtrinh.scss";
const ChuongtrinhDT_CNTT = () => {
  const [tenChuongTrinh, setTenChuongTrinh] = useState([]);
  const [selectedChuongTrinh, setSelectedChuongTrinh] = useState("");
  const [selectedHocki, setSelectedHocki] = useState("");
  const [tenHocki, setTenHocki] = useState([]);
  const [monHocData, setMonHocData] = useState([]); // State lưu trữ dữ liệu môn học
  const auth = Cookies.get("accessToken");
  const navigate = useNavigate();

  const fetchChuongTrinh = async (taikhoan) => {
    try {
      const tenbomonResponse = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
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
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      const chuongtrinhData = chuongtrinhResponse.data.DT.map(
        (item) => item.TENCHUONGTRINH
      );

      setTenChuongTrinh(chuongtrinhData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const fetchHocki = async (selectedChuongTrinh) => {
    try {
      const chuongtrinh_chitiet_Response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/chuongtrinh/xem`,
        {
          TENCHUONGTRINH: selectedChuongTrinh,
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      let hockiData = chuongtrinh_chitiet_Response.data.DT.map(
        (item) => item.SOTHUTUHOCKI
      );

      hockiData = [...new Set(hockiData)];

      setTenHocki(hockiData);

      // Lưu trữ dữ liệu môn học từ API trả về
      const monHocData = chuongtrinh_chitiet_Response.data.DT;
      console.log("check", monHocData);
      setMonHocData(monHocData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu học kỳ:", error);
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
          fetchChuongTrinh(decodedToken.taikhoan);
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

  const handleChuongTrinhChange = (event) => {
    const selected = event.target.value;
    setSelectedChuongTrinh(selected);
    setSelectedHocki("");
    setMonHocData([]);
    fetchHocki(selected);
  };

  const handleHockiChange = (event) => {
    setSelectedHocki(event.target.value);
  };

  const filteredMonHoc = monHocData.filter(
    (monHoc) => monHoc.SOTHUTUHOCKI === selectedHocki
  );

  const totalLyThuyet = filteredMonHoc.reduce(
    (acc, mon) => acc + mon.SOTINCHILYTHUYET,
    0
  );
  const totalThucHanh = filteredMonHoc.reduce(
    (acc, mon) => acc + mon.SOTINCHITHUCHANH,
    0
  );
  const total_tong = filteredMonHoc.reduce(
    (acc, mon) => acc + mon.SOTINCHITHUCHANH + mon.SOTINCHITHUCHANH,
    0
  );

  return (
    <div className="containerchuongtrinhdaotao-truongbomon">
      <h1>DANH SÁCH CHƯƠNG TRÌNH ĐÀO TẠO </h1>
      <div className="formControlContainer">
        <FormControl
          variant="standard"
          className="formControl1"
          sx={{ m: 1, minWidth: 120 }}
        >
          <InputLabel id="chuongtrinh-select-label" className="inputLabel">
            Tên Chương Trình
          </InputLabel>
          <Select
            labelId="chuongtrinh-select-label"
            id="chuongtrinh-select"
            value={selectedChuongTrinh}
            onChange={handleChuongTrinhChange}
            label="Tên Chương Trình"
            inputProps={{ "aria-label": "Without label" }}
          >
            {tenChuongTrinh.length === 0 ? (
              <>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              </>
            ) : (
              tenChuongTrinh.map((chuongtrinh, index) => (
                <MenuItem key={index} value={chuongtrinh}>
                  {chuongtrinh}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        {selectedChuongTrinh && (
          <FormControl
            variant="standard"
            className="formControl2"
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel id="hocki-select-label" className="inputLabel">
              Tên Học Kỳ
            </InputLabel>
            <Select
              labelId="hocki-select-label"
              id="hocki-select"
              value={selectedHocki}
              onChange={handleHockiChange}
              label="Tên Học Kỳ"
              disabled={!selectedChuongTrinh}
              inputProps={{ "aria-label": "Without label" }}
            >
              {tenHocki.length === 0 ? (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              ) : (
                tenHocki.map((hocki, index) => (
                  <MenuItem key={index} value={hocki}>
                    {`Học Kì ${hocki}`}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        )}
      </div>
      {selectedHocki ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={5}
                    className="tableHeaderCell1"
                  >
                    Mô tả chi tiết
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="center" className="tableHeaderCell">
                    Tên Môn Học
                  </TableCell>
                  <TableCell align="center" className="tableHeaderCell">
                    Số Tín Chỉ Lý Thuyết
                  </TableCell>
                  <TableCell align="center" className="tableHeaderCell">
                    Số Tín Chỉ Thực Hành
                  </TableCell>
                  <TableCell align="center" className="tableHeaderCell">
                    Tổng Số Tín Chỉ
                  </TableCell>
                  <TableCell align="center" className="tableHeaderCell">
                    Ghi Chú
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    colSpan={2}
                    className="tableHeaderCell"
                  >
                    Học Phần Bắt Buộc
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monHocData
                  .filter(
                    (monHoc) =>
                      monHoc.SOTHUTUHOCKI === selectedHocki &&
                      monHoc.GHICHU === "bb"
                  )
                  .map((monHoc, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" className="tableBodyCell">
                        {monHoc.TENMONHOC}
                      </TableCell>
                      <TableCell align="center" className="tableBodyCell">
                        {monHoc.SOTINCHILYTHUYET}
                      </TableCell>
                      <TableCell align="center" className="tableBodyCell">
                        {monHoc.SOTINCHITHUCHANH}
                      </TableCell>
                      <TableCell align="center" className="tableBodyCell">
                        {monHoc.SOTINCHILYTHUYET + monHoc.SOTINCHITHUCHANH}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="tableBodyCell-ghichubb"
                      >
                        {monHoc.GHICHU === "bb" ? "Bắt buộc" : null}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  className="tableHeaderCell"
                >
                  Học Phần Tự Chọn
                </TableCell>
              </TableRow>
              <TableBody>
                {monHocData
                  .filter(
                    (monHoc) =>
                      monHoc.SOTHUTUHOCKI === selectedHocki &&
                      monHoc.GHICHU === "tc"
                  )
                  .map((monHoc, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" className="tableBodyCell">
                        {monHoc.TENMONHOC}
                      </TableCell>

                      <TableCell align="center" className="tableBodyCell">
                        {monHoc.SOTINCHILYTHUYET}
                      </TableCell>
                      <TableCell align="center" className="tableBodyCell">
                        {monHoc.SOTINCHITHUCHANH}
                      </TableCell>
                      <TableCell align="center" className="tableBodyCell">
                        {monHoc.SOTINCHILYTHUYET + monHoc.SOTINCHITHUCHANH}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="tableBodyCell-ghichutc"
                      >
                        {monHoc.GHICHU === "tc" ? "Tự Chọn" : null}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableRow>
                <TableCell colSpan={2} align="center" className="tablefootCell">
                  Tổng số tín chỉ
                </TableCell>
                <TableCell align="center" className="tablefootCell">
                  {totalLyThuyet}
                </TableCell>
                <TableCell align="center" className="tablefootCell">
                  {totalThucHanh}
                </TableCell>
                <TableCell align="center" className="tablefootCell">
                  {total_tong}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </div>
  );
};

export default ChuongtrinhDT_CNTT;
