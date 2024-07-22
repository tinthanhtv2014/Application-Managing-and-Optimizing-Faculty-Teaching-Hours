import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactPaginate from "react-paginate";
const GiangvienCNTTList = (props) => {
  const [dataGIANGVIEN, setDataGIANGVIEN] = useState(null);
  const [currentPage, setCurrentPage] = useState(3);
  const [totalPages, setTotalPages] = useState(9);
  const [currentLimit, setCurrentLimit] = useState(8);
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const [temperary, setTemperary] = useState("");
  const fetctDataGIANGVIEN = async () => {
    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem?page=${currentPage}&limit=${currentLimit}`
    );
    setDataGIANGVIEN(response.data.DT);

    const { totalRows, totalPages } = response.data.DT;

    setTotalPages(totalPages); // Cập nhật totalPages từ dữ liệu trả về
    setDataGIANGVIEN(totalRows);
    console.log("check reposnseseseádsadadadsa: ", dataGIANGVIEN);
  };

  useEffect(() => {
    fetctDataGIANGVIEN();
  }, [currentPage]);

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
    await fetctDataGIANGVIEN(+event.selected + 1);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Tên khoa</TableCell>
              <TableCell align="left">Tên bộ môn</TableCell>
              <TableCell align="left">Mã số giảng viên</TableCell>
              <TableCell align="left">Tên giảng viên</TableCell>
              <TableCell align="left">Tên đăng nhập</TableCell>
              <TableCell align="left">Tên Chức danh</TableCell>
              <TableCell align="left">Tên chức vụ</TableCell>
              <TableCell align="left">Địa chỉ</TableCell>
              <TableCell align="left">Điện thoại</TableCell>
              <TableCell align="left">Email</TableCell>

              <TableCell align="left">Quyền hạn</TableCell>
              <TableCell align="left">Trạng thái hoạt động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataGIANGVIEN &&
              dataGIANGVIEN.length > 0 &&
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
                  <TableCell align="left">
                    {giangvien.TENCHUCDANH
                      ? giangvien.TENCHUCDANH
                      : "temperary"}
                  </TableCell>
                  <TableCell align="left">
                    {giangvien.TENCHUCVU ? giangvien.TENCHUCVU : "temperary"}
                  </TableCell>
                  <TableCell align="left">
                    {giangvien.DIACHI ? giangvien.DIACHI : "temperary"}
                  </TableCell>
                  <TableCell align="left">
                    {giangvien.DIENTHOAI ? giangvien.DIENTHOAI : "temperary"}
                  </TableCell>
                  <TableCell align="left">
                    {giangvien.EMAIL ? giangvien.EMAIL : "temperary"}
                  </TableCell>
                  <TableCell align="left">{giangvien.PHANQUYEN}</TableCell>
                  <TableCell align="left">
                    {giangvien.TRANGTHAITAIKHOAN}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 0 && (
        <div className="product-footer">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </>
  );
};

export default GiangvienCNTTList;
