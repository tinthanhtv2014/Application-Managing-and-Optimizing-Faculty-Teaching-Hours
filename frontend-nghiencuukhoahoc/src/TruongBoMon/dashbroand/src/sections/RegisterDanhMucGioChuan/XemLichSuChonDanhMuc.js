import React, { useState, useEffect } from "react";
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
import CookiesAxios from "../CookiesAxios";

const XemLichSuChonDanhMuc = ({ dataDang_ky_thuc_hien_quy_doiGV }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [dataListTacGia, setDataListTacGia] = useState([]);
  const [SoTacGia, setSoTaGia] = useState(null);

  const handleRowClick = async (index, TEN_DE_TAI) => {
    setExpandedRow(expandedRow === index ? null : index);
    if (TEN_DE_TAI) {
      try {
        const response = await CookiesAxios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/v1/quyengiangvien/giangvien/dangky/danhmuc/thongtindanhsach`,
          {
            TEN_NGHIEN_CUU: TEN_DE_TAI,
          }
        );
        console.log("handleRowClick", response.data);
        if (response.data.EC === 1) {
          setDataListTacGia(response.data.DT);
          setSoTaGia(response.data.DT.length);
        } else {
          setDataListTacGia("");
          setSoTaGia("");
        }
      } catch (error) {
        console.error("Error fetching email suggestions:", error);
      }
    } else {
      setDataListTacGia("");
      setSoTaGia("");
    }
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
          {dataDang_ky_thuc_hien_quy_doiGV.map((item, index) => (
            <React.Fragment key={index}>
              <TableRow
                onClick={() => handleRowClick(index, item.TEN_DE_TAI)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{item.TENGV || "N/A"}</TableCell>
                <TableCell>{item.TEN_LOAI_TAC_GIA || "N/A"}</TableCell>
                <TableCell>{item.TEN_DE_TAI || "N/A"}</TableCell>
                <TableCell>{item.SOGIOQUYDOI || "N/A"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={4}
                >
                  <Collapse
                    in={expandedRow === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Table size="small" aria-label="details">
                      <TableBody>
                        <TableRow>
                          <TableCell>Số tác giả thực hiện</TableCell>
                          <TableCell>{SoTacGia || "N/A"}</TableCell>
                        </TableRow>
                        {dataListTacGia && dataListTacGia.length > 0 ? (
                          dataListTacGia.map((tacGia, index) => (
                            <TableRow key={index}>
                              <TableCell
                                className={
                                  tacGia.TENGV === item.TENGV ? "text-info" : ""
                                }
                              >
                                {tacGia.TENGV || "N/A"}
                              </TableCell>
                              <TableCell
                                className={
                                  tacGia.TENGV === item.TENGV ? "text-info" : ""
                                }
                              >
                                {tacGia.TEN_LOAI_TAC_GIA || "N/A"}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              Không có dữ liệu
                            </TableCell>
                          </TableRow>
                        )}
                        {/* Additional details */}
                        <TableRow>
                          <TableCell>Thời gian đăng ký</TableCell>
                          <TableCell>
                            {item.THOI_GIAN_DANG_KY || "N/A"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Nội dung danh mục</TableCell>
                          <TableCell>
                            {item.NOI_DUNG_DANH_MUC || "N/A"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ISBN</TableCell>
                          <TableCell>{item.ISBN || "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>WOS/Scopus</TableCell>
                          <TableCell>{item.WOS_SCOUPUS || "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Hạng WOS/Scopus</TableCell>
                          <TableCell>
                            {item.HANG_WOS_SCOUPUS || "N/A"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Lợi nhuận</TableCell>
                          <TableCell>{item.LOI_NHUAN || "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Đơn vị tính</TableCell>
                          <TableCell>{item.DON_VI_TINH || "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Giải thưởng</TableCell>
                          <TableCell>{item.GIAI_THUONG || "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Xếp hạng Quartiles</TableCell>
                          <TableCell>
                            {item.XEP_HANG_QUARTILES || "N/A"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Năm thực hiện</TableCell>
                          <TableCell>{item.NAM_THUC_HIEN || "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Trạng thái danh mục</TableCell>
                          <TableCell>
                            {item.TRANG_THAI_DANH_MUC || "N/A"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Ghi chú danh mục</TableCell>
                          <TableCell>
                            {item.GHI_CHU_DANH_MUC || "N/A"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default XemLichSuChonDanhMuc;
