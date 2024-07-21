import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const GiangvienCNTTList = (props) => {
  const [dataGIANGVIEN, setDataGIANGVIEN] = useState(null);
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const fetctDataGIANGVIEN = async () => {
    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem`
    );
    setDataGIANGVIEN(response.data.DT);

    console.log("check reposnseseseádsadadadsa: ", dataGIANGVIEN);
  };

  useEffect(() => {
    fetctDataGIANGVIEN();
  }, []);
  // useEffect(() => {
  //   fetctDataGIANGVIEN();
  // }, dataGIANGVIEN);
  useEffect(() => {
    console.log("Dữ liệu giảng viên đã được cập nhật:", dataGIANGVIEN);
  }, [dataGIANGVIEN]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Tên khoa</TableCell>
              <TableCell align="right">Tên bộ môn</TableCell>
              <TableCell align="right">Mã số giảng viên</TableCell>
              <TableCell align="right">Tên giảng viên</TableCell>
              <TableCell align="right">Tên đăng nhập</TableCell>
              <TableCell align="right">Tên Chức danh</TableCell>
              <TableCell align="right">Tên chức vụ</TableCell>
              <TableCell align="right">Địa chỉ</TableCell>
              <TableCell align="right">Điện thoại</TableCell>
              <TableCell align="right">Email</TableCell>

              <TableCell align="right">Quyền hạn</TableCell>
              <TableCell align="right">Trạng thái hoạt động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataGIANGVIEN &&
              dataGIANGVIEN.map((giangvien) => (
                <TableRow
                  key={giangvien.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {giangvien.TENKHOA}
                  </TableCell>

                  <TableCell align="left">{giangvien.TENBOMON}</TableCell>
                  <TableCell align="left">{giangvien.MAGV}</TableCell>
                  <TableCell align="left">{giangvien.TENGV}</TableCell>
                  <TableCell align="left">{giangvien.TENDANGNHAP}</TableCell>
                  <TableCell align="left">{giangvien.TENCHUCDANH}</TableCell>
                  <TableCell align="left">{giangvien.TENCHUCVU}</TableCell>
                  <TableCell align="left">{giangvien.DIACHI}</TableCell>
                  <TableCell align="left">{giangvien.DIENTHOAI}</TableCell>
                  <TableCell align="left">{giangvien.EMAIL}</TableCell>
                  <TableCell align="left">{giangvien.PHANQUYEN}</TableCell>
                  <TableCell align="left">
                    {giangvien.TRANGTHAITAIKHOAN}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GiangvienCNTTList;
