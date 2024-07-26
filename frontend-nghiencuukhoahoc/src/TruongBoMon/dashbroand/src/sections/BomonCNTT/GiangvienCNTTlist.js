import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ReactPaginate from "react-paginate";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./GiangvienCNTT.scss";

const GiangvienCNTTList = (props) => {
  const [dataGIANGVIEN, setDataGIANGVIEN] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(9);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [showLoader, setShowLoader] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const CookiesAxios = axios.create({
    withCredentials: true,
  });
  const auth = Cookies.get("accessToken");
  const navigate = useNavigate();

  const fetchDataGIANGVIEN = async (page = currentPage, taikhoan) => {
    setShowLoader(true);
    try {
      const tenbomon = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`
      );
      console.log("check ten bomon:", tenbomon.data.DT.TENBOMON);
      const DataTenbomon = tenbomon.data.DT.TENBOMON;
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem?page=${page}&limit=${currentLimit}&TENBOMON=${DataTenbomon}`
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
    fetchDataGIANGVIEN();
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  if (showLoader && initialLoad) {
    return <div className="loader"></div>;
  }

  const columns = [
    { field: "TENKHOA", headerName: "Tên khoa", width: 150 },
    { field: "TENBOMON", headerName: "Tên bộ môn", width: 150 },
    { field: "MAGV", headerName: "Mã số giảng viên", width: 150 },
    { field: "TENGV", headerName: "Tên giảng viên", width: 150 },
    { field: "TENDANGNHAP", headerName: "Tên đăng nhập", width: 150 },
    { field: "TENCHUCDANH", headerName: "Tên chức danh", width: 150 },
    { field: "TENCHUCVU", headerName: "Tên chức vụ", width: 150 },
    { field: "DIACHI", headerName: "Địa chỉ", width: 150 },
    { field: "DIENTHOAI", headerName: "Điện thoại", width: 150 },
    { field: "EMAIL", headerName: "Email", width: 150 },
    { field: "PHANQUYEN", headerName: "Quyền hạn", width: 150 },
    {
      field: "TRANGTHAITAIKHOAN",
      headerName: "Trạng thái hoạt động",
      width: 150,
      renderCell: (params) => (
        <span
          className={
            params.value === "Đang hoạt động"
              ? "active-status"
              : "inactive-status"
          }
        >
          {params.value}
        </span>
      ),
    },
  ];
  const rowHeight = 52; // Chiều cao của mỗi hàng trong px
  const dataGridHeight = dataGIANGVIEN.length * rowHeight;
  return (
    <>
      <h1 className="header">DANH SÁCH GIẢNG VIÊN THUỘC BỘ MÔN</h1>
      <div
        style={{
          height: dataGridHeight > 653 ? dataGridHeight : 653,
          width: "100%",
        }}
      >
        <DataGrid
          rows={dataGIANGVIEN}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          checkboxSelection
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
