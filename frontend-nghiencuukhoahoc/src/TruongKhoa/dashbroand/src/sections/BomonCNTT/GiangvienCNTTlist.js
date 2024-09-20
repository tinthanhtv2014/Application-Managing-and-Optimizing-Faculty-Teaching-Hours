import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ReactPaginate from "react-paginate";
import { jwtDecode } from "jwt-decode"; // Đảm bảo bạn nhập đúng tên từ thư viện jwt-decode
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./GiangvienCNTT.scss";
import { lime } from "@mui/material/colors";
import CookiesAxios from "../CookiesAxios";
const GiangvienCNTTList = (props) => {
  const [dataGIANGVIEN, setDataGIANGVIEN] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [showLoader, setShowLoader] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const auth = Cookies.get("accessToken");
  const navigate = useNavigate();

  const fetchDataGIANGVIEN = async (page = currentPage, taikhoan) => {
    setShowLoader(true);
    try {
      const khoa = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`
      );

      console.log("khoa.data.DT.TENKHOA: ", khoa.data.DT.TENKHOA);
      const TENKHOA = khoa.data.DT.TENKHOA; // Lấy tên khoa từ khoa
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongkhoa/xem?page=${page}&limit=${currentLimit}&TENKHOA=${TENKHOA}`
      );
      const { totalRows, totalPages } = response.data.DT;

      // Đảm bảo mỗi hàng có thuộc tính `id`
      const rowsWithId = totalRows.map((item, index) => ({
        ...item,
        id: item.id || index, // Nếu dữ liệu không có `id`, sử dụng `index` tạm thời
      }));

      setDataGIANGVIEN(rowsWithId);
      setTotalPages(totalPages);
      setShowLoader(false);
      if (initialLoad) {
        setInitialLoad(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowLoader(false);
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
          fetchDataGIANGVIEN(currentPage, decodedToken.taikhoan);
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        Cookies.remove("accessToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, auth]);

  useEffect(() => {
    if (auth) {
      try {
        const decodedToken = jwtDecode(auth);
        fetchDataGIANGVIEN(currentPage, decodedToken.taikhoan);
      } catch (error) {
        console.error("Token decoding error:", error);
      }
    }
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  if (showLoader && initialLoad) {
    return <div className="loader"></div>;
  }

  const columns = [
    { field: "TENBOMON", headerName: "Tên bộ môn", width: 150 },
    { field: "TENGV", headerName: "Tên giảng viên", width: 150 },
    { field: "TENDANGNHAP", headerName: "Tên đăng nhập", width: 150 },
    { field: "TENCHUCDANH", headerName: "Tên chức danh", width: 150 },
    { field: "TENCHUCVU", headerName: "Tên chức vụ", width: 150 },
    { field: "PHANQUYEN", headerName: "Quyền hạn", width: 150 },
  ];

  const rowHeight = 52; // Chiều cao của mỗi hàng trong px
  const dataGridHeight = dataGIANGVIEN.length * rowHeight;

  return (
    <>
      <h1 className="header">DANH SÁCH GIẢNG VIÊN KHOA KỸ THUẬT CÔNG NGHỆ</h1>
      <div style={{ height: dataGridHeight > 653 ? dataGridHeight : 653, width: "100%" }}>
        <DataGrid
          rows={dataGIANGVIEN}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          disableColumnMenu
        />
      </div>

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
