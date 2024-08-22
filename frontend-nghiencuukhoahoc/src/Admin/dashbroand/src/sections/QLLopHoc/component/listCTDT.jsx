import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
} from "@mui/material";

const ListCTDT = ({ fullListCTDT, lopData }) => {
    const [currentPageCTDT, setCurrentPageCTDT] = useState(0);
    const [currentPageLopData, setCurrentPageLopData] = useState(0); // Thêm state cho trang của lopData
    const [IsOpenSelectOption, setIsOpenSelectOption] = useState(true);

    const pageSize = 10;

    // Tính tổng số trang cho từng dữ liệu
    const totalCTDT = fullListCTDT ? fullListCTDT.length : 0;
    const totalPagesCTDT = Math.ceil(totalCTDT / pageSize);

    const totalLopData = lopData ? lopData.length : 0;
    const totalPagesLopData = Math.ceil(totalLopData / pageSize);

    // Xác định chỉ số bắt đầu và kết thúc của dữ liệu hiển thị
    const startIndexCTDT = currentPageCTDT * pageSize;
    const endIndexCTDT = Math.min(startIndexCTDT + pageSize, totalCTDT);
    const currentCTDT = fullListCTDT.slice(startIndexCTDT, endIndexCTDT);

    const startIndexLopData = currentPageLopData * pageSize;
    const endIndexLopData = Math.min(startIndexLopData + pageSize, totalLopData);
    const currentLopData = lopData.slice(startIndexLopData, endIndexLopData);

    const goToPageCTDT = (pageNumber) => {
        setCurrentPageCTDT(pageNumber);
    };

    const goToPageLopData = (pageNumber) => {
        setCurrentPageLopData(pageNumber);
    };

    const handleChangeOption = () => {
        setIsOpenSelectOption(!IsOpenSelectOption);
    };

    return (
        <>
            <Box className="pagination-buttons mt-4">
                <Button variant="contained" onClick={handleChangeOption}>

                    {IsOpenSelectOption ? "Hiện Chương Trình Học" : "Ẩn Chương Trình Học"}
                </Button>
            </Box>

            {IsOpenSelectOption ? (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mã Chương Trình</TableCell>
                                    <TableCell>Mã Lớp</TableCell>
                                    <TableCell>Tên Lớp</TableCell>
                                    <TableCell>Năm Tuyển Sinh</TableCell>
                                    <TableCell>Sĩ Số</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentLopData.map((row) => (
                                    <TableRow key={row.MALOP}>
                                        <TableCell>{row.MACHUONGTRINH}</TableCell>
                                        <TableCell>{row.MALOP}</TableCell>
                                        <TableCell>{row.TENLOP}</TableCell>
                                        <TableCell>{row.NAMTUYENSINH}</TableCell>
                                        <TableCell>{row.SISO}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box className="pagination-buttons mt-4" display="flex" justifyContent="center">
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={currentPageLopData === 0}
                            onClick={() => goToPageLopData(0)}
                        >
                            Đầu
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={currentPageLopData === 0}
                            onClick={() => setCurrentPageLopData(currentPageLopData - 1)}
                            sx={{ ml: 1 }}
                        >
                            Trước
                        </Button>
                        {[...Array(totalPagesLopData).keys()].map((i) => (
                            <Button
                                key={i}
                                type="button"
                                variant={currentPageLopData === i ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => goToPageLopData(i)}
                                sx={{ mx: 0.5 }}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={currentPageLopData === totalPagesLopData - 1}
                            onClick={() => setCurrentPageLopData(currentPageLopData + 1)}
                            sx={{ ml: 1 }}
                        >
                            Tiếp
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={currentPageLopData === totalPagesLopData - 1}
                            onClick={() => goToPageLopData(totalPagesLopData - 1)}
                            sx={{ ml: 1 }}
                        >
                            Cuối
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table className="custom-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Stt</TableCell>
                                    <TableCell>Mã Chương Trình</TableCell>
                                    <TableCell>Mã Bộ Môn</TableCell>
                                    <TableCell>Tên Chương Trình</TableCell>
                                    <TableCell>Mã Môn Học</TableCell>
                                    <TableCell>Tên Môn Học</TableCell>
                                    <TableCell>Số Tín Chỉ Lý Thuyết</TableCell>
                                    <TableCell>Số Tín Chỉ Thực Hành</TableCell>
                                    <TableCell>Số Thứ Tự Học Kỳ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentCTDT.length > 0 ? (
                                    currentCTDT.map((chuongTrinh, index) => (
                                        <TableRow key={startIndexCTDT + index} className="custom-table-row">
                                            <TableCell>{startIndexCTDT + index + 1}</TableCell>
                                            <TableCell>{chuongTrinh.MACHUONGTRINH}</TableCell>
                                            <TableCell>{chuongTrinh.MABOMON}</TableCell>
                                            <TableCell>{chuongTrinh.TENCHUONGTRINH}</TableCell>
                                            <TableCell>{chuongTrinh.MAMONHOC}</TableCell>
                                            <TableCell>{chuongTrinh.TENMONHOC}</TableCell>
                                            <TableCell>{chuongTrinh.SOTINCHILYTHUYET}</TableCell>
                                            <TableCell>{chuongTrinh.SOTINCHITHUCHANH}</TableCell>
                                            <TableCell>{chuongTrinh.SOTHUTUHOCKI}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan="9" className="opacity-7">
                                            Vui Lòng Chọn Chương Trình Bạn Muốn Xem
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box
                        className="pagination-buttons mt-4"
                        display="flex"
                        justifyContent="center"
                    >
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={currentPageCTDT === 0}
                            onClick={() => goToPageCTDT(0)}
                        >
                            Đầu
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={currentPageCTDT === 0}
                            onClick={() => setCurrentPageCTDT(currentPageCTDT - 1)}
                            sx={{ ml: 1 }}
                        >
                            Trước
                        </Button>
                        {[...Array(totalPagesCTDT).keys()].map((i) => (
                            <Button
                                key={i}
                                type="button"
                                variant={currentPageCTDT === i ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => goToPageCTDT(i)}
                                sx={{ mx: 0.5 }}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={currentPageCTDT === totalPagesCTDT - 1}
                            onClick={() => setCurrentPageCTDT(currentPageCTDT + 1)}
                            sx={{ ml: 1 }}
                        >
                            Tiếp
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            disabled={currentPageCTDT === totalPagesCTDT - 1}
                            onClick={() => goToPageCTDT(totalPagesCTDT - 1)}
                            sx={{ ml: 1 }}
                        >
                            Cuối
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
};

export default ListCTDT;
