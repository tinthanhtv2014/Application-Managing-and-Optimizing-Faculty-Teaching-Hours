// CreateKhoa.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CookiesAxios from "../../CookiesAxios.js";

import BoMonList from "./component/HocKiList.js";
import GiangVienList from "./component/GiangVienList.js";
import CreateGiangVienForm from "./component/CreateGiangVienForm.js";
import "../CreateKhoa/CreateKhoa.scss";

import { toast } from "react-toastify";
import {
  ButtonBase,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  Box,
  FormControl,
  Button,
} from "@mui/material";
import UpdateGiangVienModal from "./modal/updateGiangVienModal.js";
import ComponentExcelCTDT from "./component/ComponentExcel.js";
import HocKiList from "./component/HocKiList.js";
import ComponentSelectCTDT from "./component/selectDataCTDT.js";
const ComponenCreateGiangVien = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState({});
  //----------------------KHAI BÁO BIẾN INPUT DATA----------------------------
  const [tenCTDT, settTenCTDT] = useState("");
  const [selectHocKi, setSelectHocKi] = useState(null);
  const [MaCTDT, setMaCTDT] = useState();
  const [dataHocKi, setDataHocKi] = useState();

  const [MaBoMon, setMaBoMon] = useState();
  const [MaGV, setMaGV] = useState();
  const [TenGV, setTenGV] = useState();

  //----------------------KHAI BÁO BIẾN INPUT DATA--------------------------

  const auth = Cookies.get("accessToken");
  const navigate = useNavigate();
  //----------------------------ISOPEN--------------------------------------
  const [activeRow, setActiveRow] = useState(null); //biến đổi màu table KHOA

  const [activeRowGV, setActiveRowGV] = useState(null);
  const [disabledGV, setDisableGV] = useState(true);
  const [isOpenGetAllApiGV, setisOpenGetAllApiGV] = useState(true);
  const [TenChuongTrinhDaoTao, setTenChuongTrinhDaoTao] = useState("");

  // --------------------------ISOPEN---------------------------------------
  const [ValueExcel, setValueExcel] = useState("Excel");
  //------------------KHAI BÁO BIẾN LƯU DATA TỪ BACKEND--------------------
  const [dataListKhoa, setdataListKhoa] = useState();
  const [dataListCTDT, setdatListCTDT] = useState(null);
  const [dataListBoMon, setdataListBoMon] = useState(null);
  const [dataMonHoc, setDataMonHoc] = useState(null);
  //------------------KHAI BÁO BIẾN LƯU DATA TỪ BACKEND--------------------

  const fetchData = async () => {
    const token = Cookies.get("accessToken");

    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xem`
    );
    const response_ChuongTinhDaoTao = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/chuongtrinh/xem`
    );

    setdatListCTDT(response_ChuongTinhDaoTao.data.DT);
    setdataListKhoa(response.data.DT);
  };

  const getHocKibyCTDT = async (TenChuongTrinhDaoTao) => {
    setTenChuongTrinhDaoTao(TenChuongTrinhDaoTao);
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/chuongtrinh/sohocki/xem`,
        {
          TENCHUONGTRINH: TenChuongTrinhDaoTao,
        }
      );
      console.log("Dữ liệu học kì", response.data);
      setDataHocKi(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (auth) {
      const decodedToken = jwtDecode(auth);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      if (expirationTime < currentTime) {
        Cookies.remove("accessToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // KHOA

  const handleChose = (TENCHUONGTRINH) => {
    setActiveRow(TENCHUONGTRINH);

    setMaCTDT(TENCHUONGTRINH);
    getHocKibyCTDT(TENCHUONGTRINH);
  };

  const handleChoseSelectCTDT = (ctdt) => {
    settTenCTDT(ctdt.TENCHUONGTRINH);
    setMaCTDT(ctdt.MACHUONGTRINH);
    // setIsOpenEditButton(true);
  };

  // BỘ MÔN

  const handleChoseHocKi = async (hocki) => {
    console.log("hoc ki =>", hocki);
    console.log("TenChuongTrinhDaoTao", TenChuongTrinhDaoTao);
    setSelectHocKi(hocki);

    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/chuongtrinh/only/hocki/xem`,
        { TENCHUONGTRINH: TenChuongTrinhDaoTao, SOTHUTUHOCKI: hocki }
      );
      console.log("Danh sách tài khoản:", response.data);
      setDataMonHoc(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };

  const handleGetAllGiangVien = () => {
    setisOpenGetAllApiGV(!isOpenGetAllApiGV);
  };
  // const handleIsOpenEditButtonGV = () => {
  //   setIsOpenEditButtonGV(false);
  //   setTenBoMon("");
  //   setMaBoMon(null);
  // };

  // -----------------------IS OPEN EXCEL-----------------------------------
  const [searchEmail, setSearchEmail] = useState("");
  const [searchStatus, setSearchStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearch = (e) => {
    setSearchEmail(e.target.value);
  };
  const handleChangeExcel = (event) => {
    setValueExcel(event.target.value);
  };
  const handleStatusChange = (e) => {
    setTenChuongTrinhDaoTao(e.target.value);
  };

  const [dataListChucVuGiangVien, setdataListChucVuGiangVien] = useState();
  const [dataListChucDanhGiangVien, setdataListChucDanhGiangVien] = useState();

  const handleShowUpdateModal = async (lecturer) => {
    setSelectedLecturer(lecturer);
    setShowUpdateModal(true);

    try {
      const [chucVuResponse, chucDanhResponse] = await Promise.all([
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xemchucvu`
        ),
        CookiesAxios.get(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/xemchucdanh`
        ),
      ]);

      setdataListChucVuGiangVien(chucVuResponse.data.DT);
      setdataListChucDanhGiangVien(chucDanhResponse.data.DT);
    } catch (error) {
      console.error("Error updating lecturer information:", error);
      toast.error("Lỗi lấy dữ liệu ở phía server");
    }
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // console.log("check API ALL +> ", isOpenGetAllApiGV);
  return (
    <Container>
      {" "}
      <h4>Quản lý thông tin giảng viên </h4>
      <Row className="mt-4">
        <Col md={2}>
          <ComponentSelectCTDT
            dataListCTDT={dataListCTDT}
            activeRow={activeRow}
            handleChose={handleChose}
            handleChoseSelectCTDT={handleChoseSelectCTDT}
          />
        </Col>{" "}
        <Col md={2}>
          <HocKiList
            dataHocKi={dataHocKi}
            selectHocKi={selectHocKi}
            handleChoseHocKi={handleChoseHocKi}
          />
        </Col>{" "}
        <Col md={2}></Col>
        <Col md={4}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control height-selectGV"
              placeholder="Nhập email đăng nhập"
              value={searchEmail}
              onChange={handleSearch}
            />
          </div>
        </Col>
        <Col md={2}>
          {" "}
          <button
            variant="contained"
            type="button"
            className={`height-selectGV ${
              isOpenGetAllApiGV === true ? "btn btn-dark" : "btn btn-primary"
            }`}
            placeholder="Nhập email đăng nhập"
            value={isOpenGetAllApiGV}
            onClick={handleGetAllGiangVien}
            title={
              isOpenGetAllApiGV === true
                ? "Xem Tất Cả Giảng Viên Ở Bộ Môn"
                : "Xem Tất Cả Giảng Viên"
            }
          >
            {isOpenGetAllApiGV === true ? "Chỉ Xem Bộ Môn" : "Xem Tất Cả "}
          </button>{" "}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {" "}
          <h5 className="active mt-4">Thêm Tài Khoản Giảng Viên</h5>
          <p className="opacity-7">
            Bạn có thể thêm giảng viên bằng chức năng excel hoặc thủ công.
          </p>
          <Box sx={{ maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Thêm</InputLabel>
              <Select
                className="height-selectGV"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ValueExcel}
                label={ValueExcel}
                onChange={handleChangeExcel}
              >
                <MenuItem value="Excel">Excel</MenuItem>
                <MenuItem value="Thủ Công">Thủ Công</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Col>
        <Col md={6}></Col>
      </Row>
      <Row className="">
        {" "}
        {ValueExcel &&
          (ValueExcel == "Excel" ? (
            <>
              <Col md={6}>
                {" "}
                <ComponentExcelCTDT />
              </Col>
            </>
          ) : (
            <Col md={6}>
              {/* <CreateGiangVienForm
                QuyenGiangVien={QuyenGiangVien}
                TrangThaiGV={TrangThaiGV}
                setTrangThaiGV={setTrangThaiGV}
                setQuyenGiangVien={setQuyenGiangVien}
                setTenDangNhapGV={setTenDangNhapGV}
                TenGV={TenGV}
                setMaGV={setMaGV}
                setTenGV={setTenGV}
                disabledGV={disabledGV}
                handleSumitAddGV={handleSumitAddGV}
                isOpenEditButtonGV={isOpenEditButtonGV}
                handleSumitEditGV={handleSumitEditGV}
                handleIsOpenEditButtonGV={handleIsOpenEditButtonGV}
              /> */}
            </Col>
          ))}
        <Col md={6}></Col>
      </Row>{" "}
      <Row>
        <Col md={12}>
          <GiangVienList
            searchStatus={searchStatus}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchEmail={searchEmail}
            isOpenGetAllApiGV={isOpenGetAllApiGV}
            handleGetAllGiangVien={handleGetAllGiangVien}
            dataMonHoc={dataMonHoc}
            activeRowGV={activeRowGV}
            handleShowUpdateModal={handleShowUpdateModal}
          />
        </Col>{" "}
        <Row>
          <Col>
            <UpdateGiangVienModal
              dataListChucDanhGiangVien={dataListChucDanhGiangVien}
              dataListChucVuGiangVien={dataListChucVuGiangVien}
              show={showUpdateModal}
              handleClose={handleCloseUpdateModal}
              lecturerData={selectedLecturer}
              isOpenGetAllApiGV={isOpenGetAllApiGV}
            />
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default ComponenCreateGiangVien;
