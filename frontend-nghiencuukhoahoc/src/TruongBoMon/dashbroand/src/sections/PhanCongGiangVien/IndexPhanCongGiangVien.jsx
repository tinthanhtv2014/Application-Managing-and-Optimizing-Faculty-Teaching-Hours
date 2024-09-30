import { useEffect, useState } from "react";
import CookiesAxios from "../CookiesAxios";
import {
  Box,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Switch,
  Stack,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import GVTableDaChonKhung from "./component/GVTableDaChonKhung";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import LopMonHocTable from "./component/LopMonHocTable";
import ListPhanCong from "./component/XemPhanCong";

const IndexPhanCongGiangVien = () => {
  const [data_ListGVChuaChonKhung, setData_ListGVChuaChonKhung] = useState([]);
  const [data_ListGVDaChonKhung, setData_ListGVDaChonKhung] = useState([]);
  const [data_NamHoc, setData_NamHoc] = useState([]);
  const [ListNamHoc, setListNamHoc] = useState(null);
  const [selectNamHoc, setSelectNamHoc] = useState([]);
  const [data_hocKiNienKhoa, setData_hocKiNienKhoa] = useState([]);
  const [select_HocKiNienKhoa, setSelect_HocKiNienKhoa] = useState([]);
  const [data_Lop, setData_Lop] = useState([]);
  const [select_Lop, setSelect_Lop] = useState(null);
  const [data_MonHoc, setData_MonHoc] = useState([]);
  const [TenBoMon, setTenBoMon] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  // ---------------------------------------------------------------
  const [isDisableNamHoc, setIsDisableNamHoc] = useState(false);
  const [isOpenXemPhanCong, setIsOpenXemPhanCong] = useState(
    "Thực Hiện Phân Công"
  );
  const [SelectKhoaNamHoc, setSelectKhoaNamHoc] = useState("");

  const [isOpenButton, setIsOpenButton] = useState(false);
  const [isOpenSwap, setIsOpenSwap] = useState(true);
  useEffect(() => {
    const auth = Cookies.get("accessToken");
    const decodeAuth = jwtDecode(auth);
    if (decodeAuth) {
      fetchDataGV(decodeAuth.taikhoan);
    }

    fetchListGiangVien();
  }, []);
  useEffect(() => {
    if (TenBoMon) {
      fetchDataLop_byBoMon();
    }
  }, [TenBoMon]);

  useEffect(() => {
    // console.log("check useEffect");
    fetchDataMonHoc_byLop();
  }, [select_Lop, select_HocKiNienKhoa]);
  // useEffect để tự động set lớp mới nhất khi khóa được chọn
  useEffect(() => {
    if (SelectKhoaNamHoc) {
      const lopTheoKhoa = filterLopByKhoa(SelectKhoaNamHoc);
      if (lopTheoKhoa.length > 0) {
        // Sắp xếp danh sách lớp theo thứ tự cũ nhất
        const lopCuNhat = lopTheoKhoa.sort((a, b) => {
          return a.MALOP.localeCompare(b.MALOP); // Sắp xếp lớp theo mã lớp từ cũ nhất
        })[0]; // Lấy lớp cũ nhất
        setSelect_Lop(lopCuNhat.MALOP); // Set giá trị lớp cũ nhất
      }
    }
  }, [SelectKhoaNamHoc]);

  const fetchDataGV = async (taikhoan) => {
    try {
      const response = await CookiesAxios.get(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${taikhoan}`
      );

      // console.log("Danh sách tài khoản:", response.data.DT);

      if (response.data.EC === 1) {
        setTenBoMon(response.data.DT.TENBOMON);

        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
    }
  };
  const fetchListGiangVien = async () => {
    try {
      // Gọi tất cả các API cùng lúc bằng Promise.all
      const [response, response_hocKiNienKhoa, response_NamHoc] =
        await Promise.all([
          CookiesAxios.get(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/dachonkhung`
          ),
          CookiesAxios.get(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/hockinienkhoa/xem`
          ),
          CookiesAxios.get(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/namhoc/xem`
          ),
        ]);

      // console.log("Response from phancong/dachonkhung:", response.data);
      // console.log(
      //   "Response from hockinienkhoa/xem:",
      //   response_hocKiNienKhoa.data
      // );
      // console.log("Response from namhoc/xem:", response_NamHoc.data);
      if (response_hocKiNienKhoa.data.EC == 1) {
        setData_hocKiNienKhoa(response_hocKiNienKhoa.data.DT);
        setSelect_HocKiNienKhoa(response_hocKiNienKhoa.data.DT[0]);
      }
      if (response_NamHoc.data.EC == 1) {
        setListNamHoc(response_NamHoc.data.DT);
        setSelectNamHoc(response_NamHoc.data.DT[0].TENNAMHOC);
      }
      if (response.data.EC === 1) {
        setData_ListGVDaChonKhung(response.data.DT);
        // Thiết lập giá trị mặc định cho Học Kì và Năm Học
      }
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };

  const fetchDataLop_byBoMon = async () => {
    try {
      const response_Lop = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/lop/bomon/xem`,
        { TENBOMON: TenBoMon }
      );

      if (response_Lop.data.EC === 1) {
        console.log(response_Lop.data.DT);
        setData_Lop(response_Lop.data.DT);
        setSelect_Lop(response_Lop.data.DT[0].MALOP);
      }
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };
  const fetchDataMonHoc_byLop = async () => {
    try {
      const response_MonHoc = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/xem/phancong/lophoc/hocki`,
        { MALOP: select_Lop, HOCKINIENKHOA: select_HocKiNienKhoa }
      );
      console.log("check fetchDataMonHoc_byLop", response_MonHoc.data);
      if (response_MonHoc.data.EC === 1) {
        setData_MonHoc(response_MonHoc.data.DT);
        setIsOpenButton(true);
      }
      // console.log("data_MonHoc >>>>>>>: ", data_MonHoc);
      // console.log("response_MonHoc.data.DT: ", response_MonHoc.data.DT);
    } catch (error) {
      console.error("Error fetching BoMon data:", error);
    }
  };

  const handleChange = (event) => {
    setIsOpenSwap(event.target.checked);
  };
  if (Loading) {
    return "Đang tải dữ liệu...";
  }

  // Hàm xử lý sự kiện để gửi data_MonHoc vào API
  const handleAutoAssign = async () => {
    if (dataLoading) {
      toast.error("Đang phân công, vui lòng chờ");
      return;
    }
    setDataLoading(true);
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongkhoa/test/phancong`,
        { data: data_MonHoc, HOCKINIENKHOA: select_HocKiNienKhoa } // Gửi data_MonHoc vào API
      );

      if (response.data.EC === 1) {
        console.log("Phân công tự động thành công:", response.data);
        setData_MonHoc(response.data.DT.data);
      } else {
        console.error("Phân công tự động thất bại:", response.data);
        toast.error("Đã xảy ra lỗi, vui lòng liên hệ chúng tôi");
      }
    } catch (error) {
      console.error("Lỗi khi phân công tự động:", error);
      toast.error("Đã xảy ra lỗi, vui lòng liên hệ chúng tôi");
    } finally {
      setDataLoading(false);
    }
  };

  const handleXacNhanPhanCong = async () => {
    try {
      const response = await CookiesAxios.post(
        `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/giangvien/phancong/tudong/giangvien`,
        { data: data_MonHoc, HOCKINIENKHOA: select_HocKiNienKhoa } // Gửi data_MonHoc vào API
      );

      if (response.data.EC === 1) {
        console.log("Phân công tự động thành công:", response.data);
        toast.success("Phân công thành công");
        // setData_MonHoc(response.data.DT.data);
      } else {
        console.error("Phân công tự động thất bại:", response.data.EM);
      }
    } catch (error) {
      console.error("Lỗi khi phân công tự động:", error);
    }
  };
  const handleUpdateGiangVien = (updatedTeacher, index) => {
    // Cập nhật dữ liệu giảng viên trong data_MonHoc
    setData_MonHoc((prevData) =>
      prevData.map((item, i) => {
        if (i === index) {
          // Kiểm tra chỉ số của hàng
          return {
            ...item,
            TENGV: updatedTeacher.TENGV,
            MAGV: updatedTeacher.MAGV,
          }; // Cập nhật thông tin giảng viên
        }
        return item; // Giữ nguyên các hàng khác
      })
    );
  };

  const getKhoaFromMALOP = (malop) => {
    const khoa = malop.match(/\d{2}/); // Lấy 2 chữ số đầu tiên
    return khoa ? khoa[0] : null;
  };

  // Hàm xử lý khi thay đổi khóa
  const handleKhoaChange = (event) => {
    setSelectKhoaNamHoc(event.target.value); // Cập nhật khóa được chọn
  };

  // Lọc danh sách lớp theo khóa
  const filterLopByKhoa = (khoa) => {
    return data_Lop.filter((lop) => lop.MALOP.includes(khoa));
  };

  // Lấy danh sách khóa học duy nhất từ data_Lop
  const khoaHocList = Array.from(
    new Set(data_Lop.map((lop) => getKhoaFromMALOP(lop.MALOP)))
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box sx={{ maxWidth: { md: 250, xs: "100%" } }}>
            <FormControl fullWidth className="profile-email-input">
              <InputLabel id="select-label-hoc-ki-nien-khoa">
                Học Kì Niên Khóa
              </InputLabel>
              <Select
                labelId="select-label-hoc-ki-nien-khoa"
                id="hoc-ki-nien-khoa-select"
                name="HOCKINIENKHOA"
                label="Học Kì Niên Khóa"
                value={isOpenXemPhanCong}
                defaultValue={isOpenXemPhanCong}
                onChange={(e) => setIsOpenXemPhanCong(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="Xem Phân Công">Xem Phân Công</MenuItem>{" "}
                <MenuItem value="Thực Hiện Phân Công">
                  Thực Hiện Phân Công
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>{" "}
        {/* Danh Sách Lớp */}
        <Grid item xs={12} md={2}>
          <Box sx={{ maxWidth: { md: 320, xs: "100%" } }}>
            <FormControl fullWidth className="profile-email-input">
              <InputLabel id="select-label-lop" shrink={!!SelectKhoaNamHoc}>
                Danh Sách Khóa
              </InputLabel>
              <Select
                labelId="select-label-lop"
                id="lop-select"
                name="DANHSACHKHOA"
                label="Danh Sách Khóa"
                value={SelectKhoaNamHoc}
                onChange={handleKhoaChange}
                variant="outlined"
              >
                {khoaHocList && khoaHocList.length > 0 ? (
                  khoaHocList.map((khoa, index) => (
                    <MenuItem key={index} value={khoa}>
                      Khóa {khoa}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Không có dữ liệu khóa...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box sx={{ maxWidth: { md: 320, xs: "100%" } }}>
            <FormControl fullWidth className="profile-email-input">
              <InputLabel id="select-label-lop" shrink={!!select_Lop}>
                Danh Sách Lớp
              </InputLabel>
              <Select
                labelId="select-label-lop"
                id="lop-select"
                name="DANHSACHLOP"
                label="Danh Sách Lớp"
                value={select_Lop}
                onChange={(e) => setSelect_Lop(e.target.value)}
                variant="outlined"
              >
                {filterLopByKhoa(SelectKhoaNamHoc) &&
                  filterLopByKhoa(SelectKhoaNamHoc).length > 0 ? (
                  filterLopByKhoa(SelectKhoaNamHoc).map((lop, index) => (
                    <MenuItem key={index} value={lop.MALOP}>
                      {lop.MALOP}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Không có dữ liệu lớp...
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {/* Học Kì Niên Khóa */}
        <Grid item xs={12} md={3}>
          <Box sx={{ maxWidth: { md: 250, xs: "100%" } }}>
            <FormControl fullWidth className="profile-email-input">
              <InputLabel id="select-label-hoc-ki-nien-khoa">
                Học Kì Niên Khóa
              </InputLabel>
              <Select
                labelId="select-label-hoc-ki-nien-khoa"
                id="hoc-ki-nien-khoa-select"
                name="HOCKINIENKHOA"
                label="Học Kì Niên Khóa"
                value={select_HocKiNienKhoa}
                defaultValue={select_HocKiNienKhoa}
                onChange={(e) => setSelect_HocKiNienKhoa(e.target.value)}
                variant="outlined"
              >
                {data_hocKiNienKhoa && data_hocKiNienKhoa.length > 0 ? (
                  data_hocKiNienKhoa.map((nienkhoa, index) => (
                    <MenuItem key={index} value={nienkhoa}>
                      {nienkhoa.TEN_NAM_HOC} {nienkhoa.TENHKNK}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Không có Học Kì Niên Khóa
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {/* {isOpenXemPhanCong === "Thực Hiện Phân Công" ? (
          <>
            {" "}
            <Grid item xs={12} md={2}>
              <FormControlLabel
                sx={{ mt: 2 }}
                control={
                  <Switch
                    checked={isOpenSwap} // Kiểm soát Switch dựa vào isOpenSwap
                    onChange={handleChange} // Gọi hàm khi Switch thay đổi
                    inputProps={{ "aria-label": "controlled" }}
                    color="secondary"
                  />
                }
                label="Sử dụng gợi ý"
              />
            </Grid>
          </>
        ) : (
          <></>
        )} */}
      </Grid>

      {/* -----------TABLE SHOW GIANGVIEN----------- */}
      {isOpenXemPhanCong === "Thực Hiện Phân Công" ? (
        <>
          {" "}
          <Grid container spacing={2}>
            {" "}
            <Grid item xs={12} md={12}>
              {" "}
              <Box sx={{ mt: 3 }}>
                <LopMonHocTable
                  data={data_MonHoc}
                  handleUpdateGiangVien={handleUpdateGiangVien}
                  select_HocKiNienKhoa={select_HocKiNienKhoa}
                />
              </Box>
            </Grid>
            {isOpenSwap ? (
              <>
                {" "}
                <Grid item xs={12} md={3}>
                  {" "}
                  {/* <Box sx={{ mt: 3 }}>Gợi Ý</Box> */}
                </Grid>{" "}
              </>
            ) : (
              <>
                {" "}
                {/* <Grid item xs={12} md={3}>
                  {" "}
                  <Box sx={{ mt: 3 }}>
                    <GVTableDaChonKhung
                      data={data_ListGVDaChonKhung}
                      selectNamHoc={selectNamHoc}
                      select_HocKiNienKhoa={select_HocKiNienKhoa}
                    />
                  </Box>
                </Grid>{" "} */}
              </>
            )}
          </Grid>
          {isOpenButton ? (
            <>
              {" "}
              <Grid container spacing={2} mt={2}>
                {" "}
                <Grid item md={10}>
                  <Button
                    variant="contained"
                    onClick={handleAutoAssign}
                    sx={{
                      width: "250px", // Đặt width cố định để nút không thay đổi kích thước
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {dataLoading ? (
                      <Stack
                        sx={{ color: "inherit" }} // CircularProgress sẽ có màu trắng
                        spacing={2}
                        direction="row"
                      >
                        <CircularProgress color="inherit" size={20} />
                      </Stack>
                    ) : (
                      <>Tự Động Phân Công Tất Cả</>
                    )}
                  </Button>
                </Grid>
                <Grid item md={2}>
                  {" "}
                  <Button variant="contained" onClick={handleXacNhanPhanCong}>
                    Xác Nhận
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <> </>
          )}{" "}
        </>
      ) : (
        <>
          <h1>
            <ListPhanCong select_HocKiNienKhoa={select_HocKiNienKhoa} />
          </h1>
        </>
      )}
    </>
  );
};

export default IndexPhanCongGiangVien;
