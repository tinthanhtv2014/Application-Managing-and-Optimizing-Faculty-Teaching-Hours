import React, { useState } from "react";
import { Button } from "@mui/material";
import QuyDinhModal from "./modals/QuyDinhModal";
import TyLeQuyDoiGioChuanModal from "./modals/TyLeQuyDoiGioChuanModal";
import LoaiDanhMucModal from "./modals/LoaiDanhMucModal";
import DanhMucQuyDoiKHCNModal from "./modals/DanhMucQuyDoiKHCNModal";
import LoaiTacGiaModal from "./modals/LoaiTacGiaModal";
import { Col, Container, Row } from "react-bootstrap";
import CoQuyDinh from "./modals/CoQuyDinh";
import ModalMoCongDangKy from "./modalMoCongDangKy/ModalMoCongDangKy";
import HinhThucDanhGia from "./modals/HinhThucDanhGia";
import ChucDanhGiangVien from "./modals/ChucDanhGV";
import ModalChucVu from "./modals/ChucVuGV";
const DanhMucGioChuan = () => {
  const [open, setOpen] = useState({
    quyDinh: false,
    tyLeQuyDoiGioChuan: false,
    loaiDanhMuc: false,
    danhMucQuyDoiKHCN: false,
    loaiTacGia: false,
    coQuyDinh: false,
    moCongDangKyDanhMuc: false,
    hinhThucDanhGia: false,
    chucDanhGiangVien: false,
    chucVuGiangVien: false,
  });

  const handleClickOpen = (modal) => {
    setOpen({ ...open, [modal]: true });
  };

  const handleClose = (modal) => {
    setOpen({ ...open, [modal]: false });
  };

  return (
    <>
      <Container>
        <Row>
          <h4> Quản lý </h4>
          <p></p>
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("quyDinh")}
            >
              Quy định
            </Button>
          </Col>
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("tyLeQuyDoiGioChuan")}
            >
              Tỷ lệ quy đổi giờ chuẩn
            </Button>
          </Col>
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("loaiDanhMuc")}
            >
              Loại danh mục
            </Button>
          </Col>
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("danhMucQuyDoiKHCN")}
            >
              Danh mục quy đổi khoa học công nghệ
            </Button>
          </Col>
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("loaiTacGia")}
            >
              Loại tác giả
            </Button>
          </Col>{" "}
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("coQuyDinh")}
            >
              Có Quy Định
            </Button>
          </Col>{" "}
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("moCongDangKyDanhMuc")}
            >
              Mở Cổng Đăng Ký Nghiên Cứu Khoa Học
            </Button>
          </Col>
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("hinhThucDanhGia")}
            >
              Hình Thức Đánh Giá
            </Button>
          </Col>{" "}
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("chucDanhGiangVien")}
            >
              Chức Danh Giảng Viên
            </Button>
          </Col>{" "}
          <Col md={4} sm={6} xs={12} className="mb-3">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleClickOpen("chucVuGiangVien")}
            >
              Chức Vụ Giảng Viên
            </Button>
          </Col>
        </Row>

        <QuyDinhModal
          open={open.quyDinh}
          handleClose={() => handleClose("quyDinh")}
        />
        <TyLeQuyDoiGioChuanModal
          open={open.tyLeQuyDoiGioChuan}
          handleClose={() => handleClose("tyLeQuyDoiGioChuan")}
        />
        <LoaiDanhMucModal
          open={open.loaiDanhMuc}
          handleClose={() => handleClose("loaiDanhMuc")}
        />
        <DanhMucQuyDoiKHCNModal
          open={open.danhMucQuyDoiKHCN}
          handleClose={() => handleClose("danhMucQuyDoiKHCN")}
        />
        <LoaiTacGiaModal
          open={open.loaiTacGia}
          handleClose={() => handleClose("loaiTacGia")}
        />
        <CoQuyDinh
          open={open.coQuyDinh}
          handleClose={() => handleClose("coQuyDinh")}
        />
        <ModalMoCongDangKy
          open={open.moCongDangKyDanhMuc}
          handleClose={() => handleClose("moCongDangKyDanhMuc")}
        />
        <HinhThucDanhGia
          open={open.hinhThucDanhGia}
          handleClose={() => handleClose("hinhThucDanhGia")}
        />
        <ChucDanhGiangVien
          open={open.chucDanhGiangVien}
          handleClose={() => handleClose("chucDanhGiangVien")}
        />
        <ModalChucVu
          open={open.chucVuGiangVien}
          handleClose={() => handleClose("chucVuGiangVien")}
        />
      </Container>
    </>
  );
};

export default DanhMucGioChuan;
