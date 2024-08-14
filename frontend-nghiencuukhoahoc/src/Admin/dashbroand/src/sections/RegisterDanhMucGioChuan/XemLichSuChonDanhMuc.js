import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from "@mui/material";

const XemLichSuChonDanhMuc = ({ dataDang_ky_thuc_hien_quy_doiGV }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <TableContainer component={Paper} className="mt-4">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên giảng viên</TableCell>
            <TableCell>Loại tác giả</TableCell>
            <TableCell>Tên nghiên cứu</TableCell>
            <TableCell>Số giờ quy đổi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            onClick={() => handleRowClick(0)}
            style={{ cursor: "pointer" }}
          >
            <TableCell>
              {dataDang_ky_thuc_hien_quy_doiGV?.TENGV || "N/A"}
            </TableCell>
            <TableCell>
              {dataDang_ky_thuc_hien_quy_doiGV?.TEN_LOAI_TAC_GIA || "N/A"}
            </TableCell>
            <TableCell>
              {dataDang_ky_thuc_hien_quy_doiGV?.TEN_NGHIEN_CUU || "N/A"}
            </TableCell>
            <TableCell>
              {dataDang_ky_thuc_hien_quy_doiGV?.SOGIOQUYDOI || "N/A"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
              <Collapse in={expandedRow === 0} timeout="auto" unmountOnExit>
                <Table size="small" aria-label="details">
                  <TableBody>
                    <TableRow>
                      <TableCell>Thời gian đăng ký</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.THOI_GIAN_DANG_KY ||
                          "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nội dung danh mục</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.NOI_DUNG_DANH_MUC ||
                          "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ISBN</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.ISBN || "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>WOS/Scopus</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.WOS_SCOUPUS || "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Hạng WOS/Scopus</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.HANG_WOS_SCOUPUS ||
                          "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Lợi nhuận</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.LOI_NHUAN || "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Đơn vị tính</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.DON_VI_TINH || "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Giải thưởng</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.GIAI_THUONG || "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Xếp hạng Quartiles</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.XEP_HANG_QUARTILES ||
                          "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Năm thực hiện</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.NAM_THUC_HIEN ||
                          "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Trạng thái danh mục</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.TRANG_THAI_DANH_MUC ||
                          "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ghi chú danh mục</TableCell>
                      <TableCell>
                        {dataDang_ky_thuc_hien_quy_doiGV?.GHI_CHU_DANH_MUC ||
                          "N/A"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default XemLichSuChonDanhMuc;
