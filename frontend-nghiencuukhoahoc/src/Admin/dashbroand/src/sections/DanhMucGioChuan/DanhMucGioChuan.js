import React, { useState } from "react";
import { Button } from "@mui/material";
import QuyDinhModal from "./modals/QuyDinhModal";
import TyLeQuyDoiGioChuanModal from "./modals/TyLeQuyDoiGioChuanModal";
import LoaiDanhMucModal from "./modals/LoaiDanhMucModal";
import DanhMucQuyDoiKHCNModal from "./modals/DanhMucQuyDoiKHCNModal";
import LoaiTacGiaModal from "./modals/LoaiTacGiaModal";
import { Col, Container, Row } from "react-bootstrap";
const DanhMucGioChuan = () => {
  const [open, setOpen] = useState({
    quyDinh: false,
    tyLeQuyDoiGioChuan: false,
    loaiDanhMuc: false,
    danhMucQuyDoiKHCN: false,
    loaiTacGia: false,
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
          <h4> Quản lý danh mục</h4>
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
      </Container>
    </>
  );
};

export default DanhMucGioChuan;
