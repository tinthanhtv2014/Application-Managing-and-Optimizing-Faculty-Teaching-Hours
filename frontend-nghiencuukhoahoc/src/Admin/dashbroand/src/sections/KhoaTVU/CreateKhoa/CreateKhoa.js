// CreateKhoa.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreateKhoaForm from "./components/CreateKhoaForm.js";
import KhoaList from "./components/KhoaList.js";
import CreateBoMonForm from "./components/CreateBoMonForm.js";
import BoMonList from "./components/BoMonList.js";
import GiangVienList from "./components/GiangVienList.js";
import CreateGiangVienForm from "./components/CreateGiangVienForm.js";
import "./CreateKhoa.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ComponentExcelGV from "./components/ComponentExcel.js";
const CreateKhoa = () => {
  //----------------------KHAI BÁO BIẾN INPUT DATA----------------------------
  const [tenKhoa, setTenKhoa] = useState("");
  const [TenBoMon, setTenBoMon] = useState("");
  const [MaKhoa, setMaKhoa] = useState();
  const [MaBoMon, setMaBoMon] = useState();
  const [MaGV, setMaGV] = useState();
  const [TenGV, setTenGV] = useState();
  //----------------------KHAI BÁO BIẾN INPUT DATA--------------------------
  const CookiesAxios = axios.create({
    withCredentials: true, // Đảm bảo gửi cookie với mỗi yêu cầu
  });
  const auth = Cookies.get("accessToken");
  const navigate = useNavigate();
  //----------------------------ISOPEN--------------------------------------
  const [activeRow, setActiveRow] = useState(null); //biến đổi màu table KHOA
  const [disabledBM, setDisableBM] = useState(true);
  const [isOpenEditButton, setIsOpenEditButton] = useState(false);
  const [isOpenEditButtonBM, setIsOpenEditButtonBM] = useState(false);
  const [activeRowBM, setActiveRowBM] = useState(null);
  const [isOpenEditButtonGV, setIsOpenEditButtonGV] = useState(false);
  const [activeRowGV, setActiveRowGV] = useState(null);
  const [disabledGV, setDisableGV] = useState(true);

  // --------------------------ISOPEN---------------------------------------
  const [ValueExcel, setValueExcel] = useState("Excel");
  //------------------KHAI BÁO BIẾN LƯU DATA TỪ BACKEND--------------------
  const [dataListKhoa, setdataListKhoa] = useState();
  const [dataListBoMon, setdataListBoMon] = useState(null);
  const [dataListGiangVien, setdataListGiangVien] = useState(null);
  //------------------KHAI BÁO BIẾN LƯU DATA TỪ BACKEND--------------------

  const fetchData = async () => {
    const response = await CookiesAxios.get(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xem`
    );
    console.log(response.data.DT);
    setdataListKhoa(response.data.DT);
  };

  const getBoMonByMaKhoa = async (MaKhoa) => {
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/only/xem`,
        {
          MAKHOA: MaKhoa,
        }
      );
      console.log("Dữ liệu bộ môn theo mã khoa:", response.data.DT);
      setdataListBoMon(response.data.DT);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/tao`,
        {
          tenkhoa: tenKhoa,
        }
      );
      console.log(response.data);
      setTenKhoa("");
      fetchData();
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đến backend:", error);
    }
  };

  const handleChose = (id) => {
    console.log("check id create khoa =>", id);
    console.log(id);
    setActiveRow(id);
    setDisableBM(false);
    setMaKhoa(id);
    getBoMonByMaKhoa(id);
  };

  const handleDelete = async (MaKhoa) => {
    if (MaKhoa) {
      try {
        const response = await CookiesAxios.delete(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xoa`,
          {
            params: {
              makhoa: MaKhoa,
            },
          }
        );
        console.log(response.data);
        setActiveRow(null);
        setDisableBM(true);
        fetchData();
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu đến backend:", error);
      }
    }
  };

  const handleChoseEditKhoa = (khoa) => {
    setTenKhoa(khoa.TENKHOA);
    setMaKhoa(khoa.MAKHOA);
    setIsOpenEditButton(true);
  };

  const handleIsOpenEditButton = () => {
    setIsOpenEditButton(false);
    setTenKhoa("");
    setMaKhoa(null);
  };

  const handleSumitEditKhoa = async (event) => {
    event.preventDefault();
    try {
      const response = await CookiesAxios.put(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/sua/${MaKhoa}`,
        {
          tenkhoa: tenKhoa,
        }
      );
      console.log(response.data);
      setTenKhoa("");
      setMaKhoa(null);
      fetchData();
      setIsOpenEditButton(false);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đến backend:", error);
    }
  };

  // BỘ MÔN
  const handleSumitAddBoMon = async (event) => {
    event.preventDefault();
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/tao`,
        {
          TENBOMON: TenBoMon,
          MAKHOA: MaKhoa,
        }
      );
      console.log(response.data);
      setTenBoMon("");
      getBoMonByMaKhoa(MaKhoa);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đến backend:", error);
    }
  };

  const handleChoseRowBM = (bomon) => {
    getAllGiangVienbyBM();
    setDisableGV(false);
    setMaBoMon(bomon.MABOMON);
    setActiveRowBM(bomon.MABOMON);
    setTenBoMon(bomon.TENBOMON);
  };

  const handleDeleteBoMon = async (MaBoMon) => {
    if (MaBoMon) {
      try {
        const response = await CookiesAxios.delete(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/xoa`,
          {
            params: {
              mabomon: MaBoMon,
            },
          }
        );
        console.log(response.data);
        getBoMonByMaKhoa(MaKhoa);
        setActiveRowBM(null);
        setTenBoMon("");
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu đến backend:", error);
      }
    }
  };

  const handleChoseEditBM = (bomon) => {
    setTenBoMon(bomon.TENBOMON);
    setMaBoMon(bomon.MABOMON);
    setIsOpenEditButtonBM(true);
  };

  const handleIsOpenEditButtonBM = () => {
    setIsOpenEditButtonBM(false);
    setTenBoMon("");
    setMaBoMon(null);
  };

  const handleSumitEditBM = async (event) => {
    event.preventDefault();
    try {
      const response = await CookiesAxios.put(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/sua/${MaBoMon}`,
        {
          tenbomon: TenBoMon,
          makhoa: MaKhoa,
        }
      );
      console.log(response.data);
      setTenBoMon("");
      setMaBoMon(null);
      getBoMonByMaKhoa(MaKhoa);
      setIsOpenEditButtonBM(false);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đến backend:", error);
    }
  };
  // GiangVien
  const getAllGiangVienbyBM = async () => {
    console.log("check ma bo mon", MaBoMon);
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xem/${MaBoMon}`
      );
      console.log("Dữ liệu bộ môn theo mã khoa:", response.data.DT);
      setdataListGiangVien(response.data.DT);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };
  const handleSumitAddGV = async (event) => {
    event.preventDefault();
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/tao`,
        {
          TENBOMON: TenBoMon,
          MAKHOA: MaKhoa,
        }
      );
      console.log(response.data);
      setTenBoMon("");
      getBoMonByMaKhoa(MaKhoa);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đến backend:", error);
    }
  };

  const handleChoseRowGV = (bomon) => {
    setActiveRowBM(bomon.MABOMON);
    setTenBoMon(bomon.TENBOMON);
  };

  const handleDeleteGiangVien = async (MaBoMon) => {
    if (MaBoMon) {
      try {
        const response = await CookiesAxios.delete(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/xoa`,
          {
            params: {
              mabomon: MaBoMon,
            },
          }
        );
        console.log(response.data);
        getBoMonByMaKhoa(MaKhoa);
        setActiveRowBM(null);
        setTenBoMon("");
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu đến backend:", error);
      }
    }
  };

  const handleChoseEditGiangVien = (bomon) => {
    setTenBoMon(bomon.TENBOMON);
    setMaBoMon(bomon.MABOMON);
    setIsOpenEditButtonBM(true);
  };

  const handleIsOpenEditButtonGV = () => {
    setIsOpenEditButtonGV(false);
    setTenBoMon("");
    setMaBoMon(null);
  };

  const handleSumitEditGV = async (event) => {
    event.preventDefault();
    try {
      const response = await CookiesAxios.put(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/sua/${MaBoMon}`,
        {
          tenbomon: TenBoMon,
          makhoa: MaKhoa,
        }
      );
      console.log(response.data);
      setTenBoMon("");
      setMaBoMon(null);
      getBoMonByMaKhoa(MaKhoa);
      setIsOpenEditButtonBM(false);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đến backend:", error);
    }
  };
  // -----------------------IS OPEN EXCEL-----------------------------------

  const handleChangeExcel = (event) => {
    setValueExcel(event.target.value);
  };
  return (
    <Container>
      <Row>
        <Col md={6}>
          <CreateKhoaForm
            tenKhoa={tenKhoa}
            setTenKhoa={setTenKhoa}
            handleSubmit={handleSubmit}
            isOpenEditButton={isOpenEditButton}
            handleSumitEditKhoa={handleSumitEditKhoa}
            handleIsOpenEditButton={handleIsOpenEditButton}
          />
        </Col>
        <Col md={6}>
          <KhoaList
            dataListKhoa={dataListKhoa}
            activeRow={activeRow}
            handleChose={handleChose}
            handleDelete={handleDelete}
            handleChoseEditKhoa={handleChoseEditKhoa}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <CreateBoMonForm
            TenBoMon={TenBoMon}
            setTenBoMon={setTenBoMon}
            disabledBM={disabledBM}
            handleSumitAddBoMon={handleSumitAddBoMon}
            isOpenEditButtonBM={isOpenEditButtonBM}
            handleSumitEditBM={handleSumitEditBM}
            handleIsOpenEditButtonBM={handleIsOpenEditButtonBM}
          />
        </Col>
        <Col md={6}>
          <BoMonList
            dataListBoMon={dataListBoMon}
            activeRowBM={activeRowBM}
            handleChoseRowBM={handleChoseRowBM}
            handleDeleteBoMon={handleDeleteBoMon}
            handleChoseEditBM={handleChoseEditBM}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        {" "}
        <Col md={6}>
          {" "}
          <h5 className="active">Thêm Tài Khoản Giảng Viên</h5>
          <p className="opacity-7">
            Bạn có thể thêm giảng viên bằng chức năng excel hoặc thủ công.
          </p>
          <Box sx={{ maxWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Thêm</InputLabel>
              <Select
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
        </Col>{" "}
        <Col md={6}>
          <GiangVienList
            dataListGiangVien={dataListGiangVien}
            activeRowGV={activeRowGV}
            handleChoseRowGV={handleChoseRowGV}
            handleDeleteGiangVien={handleDeleteGiangVien}
            handleChoseEditGiangVien={handleChoseEditGiangVien}
          />
        </Col>
      </Row>{" "}
      <Row>
        {ValueExcel &&
          (ValueExcel == "Excel" ? (
            <>
              <Col md={6}>
                {" "}
                <ComponentExcelGV />
              </Col>
            </>
          ) : (
            <Col md={6}>
              <CreateGiangVienForm
                TenGV={TenGV}
                setMaGV={setMaGV}
                setTenGV={setTenGV}
                disabledGV={disabledGV}
                handleSumitAddGV={handleSumitAddGV}
                isOpenEditButtonGV={isOpenEditButtonGV}
                handleSumitEditGV={handleSumitEditGV}
                handleIsOpenEditButtonGV={handleIsOpenEditButtonGV}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default CreateKhoa;