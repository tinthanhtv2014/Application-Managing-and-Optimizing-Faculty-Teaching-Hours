import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  Button,
  Modal,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { calculateAuthorHours } from "./test1.js";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "./RegisterDanhMucGioChuan.scss";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import CookiesAxios from "../CookiesAxios";
import ModalDanhMuc from "./modals/ModalselectDanhMuc.js";
import Cookies from "js-cookie";
import XemLichSuChonDanhMuc from "./XemLichSuChonDanhMuc.js";
const DangKyDanhMucGioChuan = ({
  IsOpenCheckKhoa,
  OpenChucNangtheokhungthoigian,
  MaGV,
  startTimeGate,
  endTimeGate,
}) => {
  const [IsOpenSelectOption, setIsOpenSelectOption] = useState(
    "Xem Lịch Sử Đăng Ký Danh Mục"
  );
  const [TenDeTaiNghienCuu, setTenDeTaiNghienCuu] = useState("");
  const navigate = useNavigate();
  const [isGiangVienNgoaiTruong, setIsGiangVienNgoaiTruong] = useState(false);
  const [selectedDanhMuc, setSelectedDanhMuc] = useState(null);
  const suggestionsRef = useRef(null); // Tạo ref cho danh sách gợi ý

  const [tacGiaList, setTacGiaList] = useState([
    {
      ten: "",
      loai: "",
      khoa: "",
      boMon: "",
      maSoGV: "",
      tenGV: "",
      emailGV: "",
      searchTerm: "", // Thêm trường searchTerm
      laVienChuc: true,
      duocMien: false,
      soGio: "",
      soPhanTram: "",
    },
  ]);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null); // Từ khóa tìm kiếm

  const [LoaiTacGia, setLoaiTacGia] = useState([]);
  const [data_Khoa, setData_Khoa] = useState([]);
  const [data_BoMon, setData_BoMon] = useState([]);
  const [selectNamHoc, setSelectNamHoc] = useState([]);
  const [SoGioNghienCuuChuan, setSoGioNghienCuuChuan] = useState(null);
  const [SoGioDanhMucDaChon, setSoGioDanhMucDaChon] = useState(null);
  const [MaLoaiDanhMuc, setMaLoaiDanhMuc] = useState(null);
  const [ListNamHoc, setListNamHoc] = useState(null);
  const [isDisableNamHoc, setIsDisableNamHoc] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataDang_ky_thuc_hien_quy_doiGV, setDataDang_ky_thuc_hien_quy_doiGV] =
    useState([]);
  useEffect(() => {
    const fectData = async () => {
      try {
        const [response_NAMHOC, response_LoaiTacGia, response_Khoa] =
          await Promise.all([
            CookiesAxios.get(
              `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/namhoc/xem`
            ),
            CookiesAxios.get(
              `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/danhmuc/loaitacgia`
            ),
            CookiesAxios.get(
              `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/khoa/xem`
            ),
          ]);

        setData_Khoa(response_Khoa.data.DT);
        setLoaiTacGia(response_LoaiTacGia.data.DT);
        setListNamHoc(response_NAMHOC.data.DT);
        setSelectNamHoc(response_NAMHOC.data.DT[0].TENNAMHOC);
      } catch (error) {
        console.log("error UseEffect call api Data ", error);
      }
    };

    fectData(); // Gọi hàm fectData ở đây
  }, []);

  useEffect(() => {
    const token = Cookies.get("accessToken");

    const decoded = jwtDecode(token);
    // console.log("check decoded", decoded.taikhoan);

    if (selectNamHoc && token) {
      const fectDataThongTinGioNghienCuu = async () => {
        try {
          const response_Data = await CookiesAxios.post(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/xem/canhan/thongtinkhung`,
            { TENDANGNHAP: decoded.taikhoan, TENNAMHOC: selectNamHoc.TENNAMHOC }
          );
          if (response_Data.data.EC === 1) {
            setSoGioNghienCuuChuan(
              response_Data.data.DT.GIONGHIENCUUKHOAHOC_CHUAN
            );
          } else {
            console.error("Lỗi từ server:", response_Data.data.EM);
          }
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      };
      fectDataThongTinGioNghienCuu();
    }
  }, [selectNamHoc]);

  useEffect(() => {
    if (IsOpenSelectOption === "Đăng Ký Danh Mục") {
      setIsDisableNamHoc(true);
    } else if (IsOpenSelectOption === "Xem Lịch Sử Đăng Ký Danh Mục") {
      setIsDisableNamHoc(false);
      if (selectNamHoc) {
        const DataThongTinDangKyGiangVien = async () => {
          try {
            const response_Data = await CookiesAxios.post(
              `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/dangky/danhmuc/thongtin`,
              { MAGV: MaGV, TENNAMHOC: selectNamHoc }
            );
            console.log("check", response_Data.data.DT);
            if (response_Data.data.EC === 1) {
              setDataDang_ky_thuc_hien_quy_doiGV(response_Data.data.DT);
            } else {
              console.error("Lỗi từ server:", response_Data.data.EM);
            }
          } catch (error) {
            console.error("Lỗi khi gọi API:", error);
          }
        };
        DataThongTinDangKyGiangVien();
      }
    }
  }, [IsOpenSelectOption, selectNamHoc]);

  useEffect(() => {
    tacGiaList.forEach((tacGia, index) => {
      if (tacGia.khoa) {
        fetchBoMonData(tacGia.khoa, index);
      }
    });
  }, [tacGiaList]);
  const fetchBoMonData = useCallback(async (khoa, index) => {
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/only/xem`,
        { MAKHOA: khoa }
      );
      setData_BoMon((prevData) => ({
        ...prevData,
        [index]: response.data.DT,
      }));
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  }, []);
  // ===========================================
  const handleLoaiTacGiaChange = (index, value) => {
    const newTacGiaList = [...tacGiaList];
    newTacGiaList[index].loai = value;
    setTacGiaList(newTacGiaList);
  };
  const handleAddTacGia = () => {
    setTacGiaList([
      ...tacGiaList,
      {
        ten: "",
        loai: "",
        khoa: "",
        boMon: "",
        maSoGV: "",
        tenGV: "",
        emailGV: "",
        searchTerm: "",
        laVienChuc: true,
        duocMien: false,
        soGio: "",
        soPhanTram: "",
      },
    ]);
  };
  const handleCheckboxChange = (index, field, value) => {
    const newList = [...tacGiaList];
    newList[index][field] = value;
    setTacGiaList(newList);
  };
  const handleSelectGiangVien = (index, giangVien) => {
    const newTacGiaList = [...tacGiaList];
    newTacGiaList[index] = {
      ...newTacGiaList[index],
      maSoGV: giangVien.MAGV,
      tenGV: giangVien.TENGV,
      emailGV: giangVien.TENDANGNHAP,
      boMon: giangVien.TENBOMON,
      khoa: giangVien.TENKHOA,
    };
    console.log("check ", newTacGiaList[index]);
    setTacGiaList(newTacGiaList);
  };
  const handleTacGiaChange = (index, field, value) => {
    const newTacGiaList = [...tacGiaList];
    newTacGiaList[index][field] = value;
    setTacGiaList(newTacGiaList);
  };
  const [currentEmail, setCurrentEmail] = useState("");
  const handleTacGiaChangeEmail = (index, field, value) => {
    setCurrentEmail(value);

    const newTacGiaList = [...tacGiaList];
    newTacGiaList[index][field] = value;
    setTacGiaList(newTacGiaList);
  };
  const handleRemoveTacGia = (index) => {
    const updatedTacGiaList = tacGiaList.filter((_, i) => i !== index);
    setTacGiaList(updatedTacGiaList);
  };

  const handleTongTacGia = async () => {
    console.log("check datalist", tacGiaList);
    const tongGio = SoGioDanhMucDaChon;

    // Tính toán giờ cho các tác giả
    const authorHours = await calculateAuthorHours(tongGio, tacGiaList);

    // Cập nhật tacGiaList với giờ phù hợp
    const updatedTacGiaList = tacGiaList.map((tacGia) => {
      let soGio = 0;

      if (tacGia.loai === "Tác giả thứ nhất") {
        soGio = authorHours.gioTacGiaThuNhat;
      } else if (tacGia.loai === "Tác giả chịu trách nhiệm") {
        soGio = authorHours.gioTacGiaChiuTrachNhiem;
      } else {
        soGio = authorHours.gioTacGiaThongThuong;
      }

      return { ...tacGia, soGio };
    });

    setTacGiaList(updatedTacGiaList);

    console.log(authorHours);
    console.log("Updated TacGiaList", updatedTacGiaList); // Kiểm tra danh sách giảng viên đã cập nhật
  };

  const handleback = () => {
    navigate("/admin/dang-ky-khung-gio-chuan");
  };
  const handleButtonClick = (index, isNgoaiTruong) => {
    console.log("check isNgoaiTruong", isNgoaiTruong);
    setTacGiaList((prevList) =>
      prevList.map(
        (tacGia, i) =>
          i === index
            ? { ...tacGia, laVienChuc: !isNgoaiTruong } // Thay đổi laVienChuc của giảng viên tại index
            : tacGia // Giữ nguyên các giảng viên khác
      )
    );
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectDanhMuc = (danhmuc) => {
    setSelectedDanhMuc(danhmuc); // Cập nhật state khi nhận được dữ liệu từ Modal
    setSoGioDanhMucDaChon(danhmuc.GIO_CHUAN);
  };

  // -------------SEARCH EMAIL---------------------------------
  useEffect(() => {
    const fetchEmailSuggestions = async () => {
      if (searchTerm) {
        if (searchTerm.trim() === "") {
          setEmailSuggestions([]); // Nếu từ khóa rỗng, xóa gợi ý
          return;
        }

        try {
          const response = await CookiesAxios.post(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/truongkhoa/timkiem/email`,
            {
              TENGV: searchTerm,
            }
          );
          console.log("check search", response.data);
          if (response.data.EC === 1) {
            setEmailSuggestions(response.data.DT); // Giả sử DT chứa danh sách gợi ý
          }
        } catch (error) {
          console.error("Error fetching email suggestions:", error);
        }
      }
    };

    // Gọi hàm fetchEmailSuggestions với delay
    const delayDebounceFn = setTimeout(() => {
      fetchEmailSuggestions();
    }, 0); // Đợi 300ms trước khi gọi API

    return () => clearTimeout(delayDebounceFn); // Dọn dẹp để tránh gọi API khi nhập quá nhanh
  }, [searchTerm]); // Chạy lại khi searchTerm thay đổi
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setEmailSuggestions([]); // Ẩn gợi ý khi click bên ngoài
    }
  };
  const handleTinhSoGio = async () => {
    if (!selectedDanhMuc) {
      toast.error("Bạn cần chọn danh mục đăng ký");
    }
    if (tacGiaList.length == 0) {
      toast.error("Bạn cần điền thông tin tác giả");
    }
    console.log("tong so tac gia", tacGiaList.length);
    console.log("MaLoaiDanhMuc", MaLoaiDanhMuc);
    console.log("tacGiaList", tacGiaList);
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/dangky/danhmuc`,
        {
          LISTGIANGVIEN: tacGiaList,
          TONGSOTACGIA: tacGiaList.length,
          MALOAIDANHMUC: MaLoaiDanhMuc,
          MADANHMUC: selectedDanhMuc.MA_DANH_MUC,
        }
      );
      console.log(response.data);
      if (response.data.EC === 1) {
      }
    } catch (error) {
      console.error("Error fetching email suggestions:", error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Row>
            <Col
              md={2}
              className="d-flex justify-content-left align-items-center"
            >
              <Button variant="contained" onClick={handleback}>
                Trở Về
              </Button>
            </Col>
            {/* <Col md={4}></Col> */}
            <Col md={5} className="row-with-border-danhmuc-gate ml-4">
              {IsOpenCheckKhoa ? (
                <>
                  {" "}
                  <p className="text-open-gate ">
                    Thời gian mở cổng từ đăng ký &nbsp;
                    <span className="text-info">{startTimeGate}</span>
                    &nbsp;đến&nbsp;
                    <span className="text-info">{endTimeGate}</span>
                  </p>
                </>
              ) : (
                <>
                  {" "}
                  <p className="text-open-gate ">
                    Hiện tại khoa của bạn chưa mở cổng đăng ký
                  </p>
                </>
              )}
            </Col>
          </Row>{" "}
          <Row className="mt-4">
            <Col md={4}>
              <Col md={12}>
                {" "}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Chức Năng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={IsOpenSelectOption}
                    label="Chức Năng"
                    onChange={(e) => setIsOpenSelectOption(e.target.value)}
                  >
                    {Object.entries(OpenChucNangtheokhungthoigian).map(
                      ([key, value]) => (
                        <MenuItem key={key} value={value}>
                          {value}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Col>
            </Col>
            <Col md={3} xs={12} className=" responsive-namhoc">
              <Box sx={{ maxWidth: { md: 220, xs: "100%" } }}>
                <FormControl fullWidth className="profile-email-input">
                  <InputLabel id="select-label-trang-thai">Năm học</InputLabel>
                  <Select
                    labelId="select-label-trang-thai"
                    id="trang-thai-select"
                    name="TENCHUCDANH"
                    label="Chức danh"
                    value={selectNamHoc}
                    defaultValue={selectNamHoc}
                    disabled={isDisableNamHoc}
                    onChange={(e) => setSelectNamHoc(e.target.value)}
                    variant="outlined"
                  >
                    {ListNamHoc && ListNamHoc.length > 0 ? (
                      ListNamHoc.map((namhoc, index) => (
                        <MenuItem key={index} value={namhoc.TENNAMHOC}>
                          {namhoc.TENNAMHOC}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>
                        Không có năm học nào
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
            </Col>
            <Col md={4} className="mt-2 ml-4">
              {" "}
              <Typography>
                {SoGioNghienCuuChuan ? (
                  <p className="text-open-gate">
                    {" "}
                    Số Giờ Nghiên Cứu Khoa Học Chuẩn Của Bạn Là{" "}
                    <span className="text-info ">{SoGioNghienCuuChuan}</span>
                  </p>
                ) : (
                  <p className="text-open-gate text-center">
                    Bạn chưa chọn khung cho năm nay
                  </p>
                )}
              </Typography>
            </Col>
          </Row>
          {IsOpenSelectOption === "Đăng Ký Danh Mục" ? (
            <>
              {" "}
              {/* START----------------Tên Đề Tài--------------------------- */}
              <Row>
                <Col md={7} className="row-with-border-danhmuc">
                  <Col md={4}>
                    <Typography className="text-open-gate detai-b responsive-tendetai">
                      Nhập Tên Đề Tài
                    </Typography>
                  </Col>
                  <Col md={7}>
                    <TextField
                      label="Tên Đề Tài" // Thêm label ở đây
                      variant="outlined"
                      value={TenDeTaiNghienCuu}
                      onChange={(e) => setTenDeTaiNghienCuu(e.target.value)}
                      sx={{ width: "calc(100% + 0px)" }} // Tăng chiều rộng thêm 50px
                    />
                  </Col>
                </Col>

                <Col md={4} className="row-with-border-danhmuc d-flex detai-a">
                  {/* <p className="text-tendetai "></p> */}
                  <Typography className="text-open-gate detai-b">
                    {TenDeTaiNghienCuu
                      ? TenDeTaiNghienCuu
                      : "Bạn Chưa Nhập Tên Đề Tài Của Mình"}
                  </Typography>
                </Col>
              </Row>
              {/* END----------------Tên Đề Tài--------------------------- */}
              {/* START----------------LOẠI DANH MỤC--------------------------- */}
              <Row>
                <Col md={7} className="row-with-border-danhmuc ">
                  <Col md={4}>
                    {" "}
                    <Button variant="contained" onClick={handleOpen}>
                      Chọn Danh Mục
                    </Button>
                  </Col>
                  <Col md={7}>
                    {" "}
                    <p className="text-open-gate ml-4">
                      {selectedDanhMuc
                        ? selectedDanhMuc.NOI_DUNG_DANH_MUC
                        : `Mở modal để có thể chọn danh mục mà bạn mong muốn. Chọn
                      loại danh mục để hiển thị thêm các danh mục quy đổi giờ
                      chuẩn từ sản phẩm công nghệ, phù hợp với từng loại danh
                      mục`}
                    </p>
                  </Col>

                  <div>
                    {" "}
                    <ModalDanhMuc
                      open={open}
                      onClose={handleClose}
                      handleSelectDanhMuc={handleSelectDanhMuc}
                      setMaLoaiDanhMuc={setMaLoaiDanhMuc}
                      setLoaiTacGia={setLoaiTacGia}
                    />
                  </div>
                </Col>
                <Col md={4} className="row-with-border-danhmuc ">
                  <div className="d-flex justify-content-between w-100 mb-2">
                    <Typography className="text-open-gate">
                      Số Giờ Chuẩn
                    </Typography>
                  </div>
                  <div className="d-flex justify-content-between w-100">
                    <Typography className="text-open-gate text-info">
                      {selectedDanhMuc
                        ? selectedDanhMuc.GIO_CHUAN
                        : "Chưa chọn danh mục"}
                    </Typography>
                  </div>
                </Col>
              </Row>
              {/* END----------------LOẠI DANH MỤC--------------------------- */}
              {/* START---------------Danh Sách Tác Giả--------------------------- */}
              <Row>
                <Col>
                  {tacGiaList.map((tacGia, index) => (
                    <Col
                      key={index}
                      className="mt-2 d-flex flex-column flex-md-row "
                      md={12}
                      xs={12}
                      sm={12}
                    >
                      <Col
                        xs={12}
                        md={7}
                        sm={12}
                        className="row-with-border-danhmuc-nodisplay-flex custom-col d-flex position-re "
                      >
                        <Row>
                          <Col
                            sm={12}
                            md={6}
                            xs={12}
                            className="mt-4 responsive-thongtingiangvien-khoa "
                          >
                            {!tacGia.laVienChuc ? (
                              <>
                                <FormControl fullWidth margin="normal">
                                  <InputLabel id={`khoa-label-${index}`}>
                                    Khoa
                                  </InputLabel>
                                  <Select
                                    labelId={`khoa-label-${index}`}
                                    value={tacGia.khoa}
                                    label="Khoa"
                                    onChange={(e) =>
                                      handleTacGiaChange(
                                        index,
                                        "khoa",
                                        e.target.value
                                      )
                                    }
                                  >
                                    {data_Khoa.map((loai) => (
                                      <MenuItem
                                        key={loai.MAKHOA}
                                        value={loai.MAKHOA}
                                      >
                                        {loai.TENKHOA}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                  <InputLabel id={`boMon-label-${index}`}>
                                    Bộ Môn
                                  </InputLabel>
                                  <Select
                                    labelId={`boMon-label-${index}`}
                                    value={tacGia.boMon}
                                    label="Bộ Môn"
                                    onChange={(e) =>
                                      handleTacGiaChange(
                                        index,
                                        "boMon",
                                        e.target.value
                                      )
                                    }
                                  >
                                    {(data_BoMon[index] || []).map((loai) => (
                                      <MenuItem
                                        key={loai.MABOMON}
                                        value={loai.TENBOMON}
                                      >
                                        {loai.TENBOMON}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <TextField
                                  label="Tên Giảng Viên"
                                  value={tacGia.tenGV}
                                  onChange={(e) =>
                                    handleTacGiaChange(
                                      index,
                                      "tenGV",
                                      e.target.value
                                    )
                                  }
                                  fullWidth
                                  margin="normal"
                                />
                                <TextField
                                  label="Email Giảng Viên"
                                  value={tacGia.emailGV}
                                  onChange={(e) =>
                                    handleTacGiaChange(
                                      index,
                                      "emailGV",
                                      e.target.value
                                    )
                                  }
                                  fullWidth
                                  margin="normal"
                                />
                              </>
                            ) : (
                              <>
                                {" "}
                                <TextField
                                  sx={{
                                    width: {
                                      xs: "230px", // Kích thước cho điện thoại
                                      md: "300px", // Kích thước cho màn hình lớn hơn
                                    },
                                  }}
                                  label="Tên Giảng Viên"
                                  className="responsive-thongtingiangvien-searchtengv "
                                  value={tacGia.tenGV}
                                  onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleTacGiaChangeEmail(
                                      index,
                                      "tenGV",
                                      e.target.value
                                    );
                                  }}
                                  fullWidth
                                  margin="normal"
                                />
                                {currentEmail &&
                                  currentEmail === tacGia.tenGV &&
                                  emailSuggestions.length > 0 && (
                                    <div
                                      className="suggestions-list"
                                      ref={suggestionsRef}
                                    >
                                      {emailSuggestions.map((suggestion) => (
                                        <div
                                          key={suggestion.id}
                                          onClick={() => {
                                            handleSelectGiangVien(
                                              index,
                                              suggestion
                                            );
                                            setCurrentEmail(suggestion.tengv);
                                            setEmailSuggestions([]);
                                          }}
                                        >
                                          {suggestion.TENGV} ({suggestion.MAGV})
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                <div>
                                  {" "}
                                  {tacGia.loai === "Tác giả thứ nhất" && (
                                    <FormControlLabel
                                      className="responsive-thongtingiangvien-formcheckbox"
                                      sx={{
                                        width: {
                                          xs: "235px", // Kích thước cho điện thoại
                                          md: "250px", // Kích thước cho màn hình lớn hơn
                                        },
                                        fontSize: {
                                          xs: "10px", // Kích thước chữ cho điện thoại
                                          md: "14px", // Kích thước chữ cho màn hình lớn hơn
                                        },
                                      }}
                                      control={
                                        <Checkbox
                                          checked={tacGia.duocMien}
                                          onChange={(e) =>
                                            handleCheckboxChange(
                                              index,
                                              "duocMien",
                                              e.target.checked
                                            )
                                          }
                                        />
                                      }
                                      label="Là tác giả thứ nhất nhưng được miễn giờ chuẩn"
                                    />
                                  )}{" "}
                                </div>
                              </>
                            )}
                          </Col>
                          <Col
                            xs={12}
                            md={4}
                            sm={12}
                            className="responsive-thongtingiangvien-loaitacgia"
                          >
                            <FormControl
                              fullWidth
                              sx={{
                                width: {
                                  xs: "230px", // Kích thước cho điện thoại
                                  md: "250px", // Kích thước cho màn hình lớn hơn
                                },
                              }}
                              margin="normal"
                              className="responsive-loaitacgia"
                            >
                              <InputLabel id={`loai-tac-gia-label-${index}`}>
                                Loại Tác Giả {index + 1}
                              </InputLabel>
                              <Select
                                labelId={`loai-tac-gia-label-${index}`}
                                value={tacGia.loai}
                                label="Loại Tác Giả"
                                onChange={(e) =>
                                  handleLoaiTacGiaChange(index, e.target.value)
                                }
                              >
                                {LoaiTacGia.map((loai) => (
                                  <MenuItem
                                    key={loai.MA_LOAI_TAC_GIA}
                                    value={loai.TEN_LOAI_TAC_GIA}
                                  >
                                    {loai.TEN_LOAI_TAC_GIA}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Col>
                          <div className="responsive-isVienChuc position-ab-button d-flex flex-column flex-md-row">
                            <Button
                              variant={tacGia.laVienChuc ? "text" : "outlined"}
                              onClick={() => handleButtonClick(index, true)}
                              sx={{
                                color: tacGia.laVienChuc
                                  ? "#9e9e9e"
                                  : "#1976d2",
                              }}
                            >
                              Giảng viên ngoài trường
                            </Button>
                            <Button
                              variant={!tacGia.laVienChuc ? "text" : "outlined"}
                              onClick={() => handleButtonClick(index, false)}
                              sx={{
                                color: !tacGia.laVienChuc
                                  ? "#9e9e9e"
                                  : "#1976d2",
                              }}
                            >
                              Giảng viên trong trường
                            </Button>
                          </div>{" "}
                          <i
                            className="fa-solid fa-xmark position-ab"
                            aria-label="delete"
                            onClick={() => handleRemoveTacGia(index)}
                            size="small"
                          ></i>
                        </Row>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        className="row-with-border-danhmuc-nodisplay-flex pml-2 "
                      >
                        <div key={index} className="tacGia-info mb-3">
                          <Row className="mt-2">
                            <Col md={4}>
                              <Typography className="text-open-gate">
                                Tác Giả Thuộc:
                              </Typography>
                            </Col>
                            <Col md={7}>
                              <Typography className="text-open-gate resposive-text-thongtintacgia">
                                {tacGia.loai}
                              </Typography>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md={4}>
                              <Typography className="text-open-gate">
                                Bộ Môn:
                              </Typography>
                            </Col>
                            <Col md={7}>
                              <Typography className="text-open-gate resposive-text-thongtintacgia">
                                {tacGia.boMon}
                              </Typography>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md={4}>
                              <Typography className="text-open-gate">
                                MSGV:
                              </Typography>
                            </Col>
                            <Col md={7}>
                              <Typography className="text-open-gate resposive-text-thongtintacgia">
                                {tacGia.maSoGV}
                              </Typography>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md={4}>
                              <Typography className="text-open-gate ">
                                Tên Giảng Viên:
                              </Typography>
                            </Col>
                            <Col md={7}>
                              <Typography className="text-open-gate resposive-text-thongtintacgia">
                                {tacGia.tenGV}
                              </Typography>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md={4}>
                              <Typography className="text-open-gate">
                                Email Tác Giả:
                              </Typography>
                            </Col>
                            <Col md={7}>
                              <Typography className="text-open-gate resposive-text-thongtintacgia">
                                {tacGia.emailGV}
                              </Typography>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md={4}>
                              <Typography className="text-open-gate">
                                Số % nhận được
                              </Typography>
                            </Col>
                            <Col md={7}>
                              <Typography className="text-open-gate text-info resposive-text-thongtintacgia">
                                {tacGia.soPhanTram}
                              </Typography>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col md={4}>
                              <Typography className="text-open-gate">
                                Số giờ nhận được
                              </Typography>
                            </Col>
                            <Col md={7}>
                              <Typography className="text-open-gate text-info resposive-text-thongtintacgia">
                                {tacGia.soGio}
                              </Typography>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Col>
                  ))}
                  <Row>
                    <Col md={7} className="d-flex justify-content-end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleTongTacGia}
                      >
                        Tính số giờ
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{ marginLeft: "10px", paddingLeft: "10px" }}
                        onClick={handleAddTacGia}
                      >
                        <i
                          className="fa-solid fa-plus"
                          style={{ marginRight: "5px" }}
                        />{" "}
                        Thêm Tác Giả
                      </Button>
                    </Col>
                    <Col
                      md={4}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className="responsive-hoantatdangky"
                        onClick={handleTinhSoGio}
                      >
                        Hoàn tất đăng ký
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* END----------------Danh Sách Tác Giả--------------------------- */}
            </>
          ) : (
            <>
              {" "}
              <Row>
                {" "}
                <XemLichSuChonDanhMuc
                  dataDang_ky_thuc_hien_quy_doiGV={
                    dataDang_ky_thuc_hien_quy_doiGV
                  }
                />
              </Row>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default DangKyDanhMucGioChuan;
