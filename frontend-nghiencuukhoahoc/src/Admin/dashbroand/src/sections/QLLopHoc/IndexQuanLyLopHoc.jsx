import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    FormControl,
    InputLabel, MenuItem,
    Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton
} from '@mui/material';
import { Col, Container, Row } from "react-bootstrap";
import CookiesAxios from '../CookiesAxios';
import TaoLopHoc from './component/TaoLopHoc';
import ChuongTrinhDaoTaoButtonList from './component/ChuongTrinhDaoTaoButtonList ';
import "./IndexQuanLyLopHoc.scss"
import ListCTDT from './component/listCTDT';
const IndexQuanLyLopHoc = () => {
    const [lopData, setLopData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [IsOpenSelectOption, setIsOpenSelectOption] = useState("Xem Danh Sách Các Lớp");
    const [IsOpenThemLop, setIsOpenThemLop] = useState("Excel");
    const [DataListCTDT, setdatListCTDT] = useState([]);
    const [fullListCTDT, setFullListCTDT] = useState([]);
    const [selectCTDT, setSelectCTDT] = useState(null);


    useEffect(() => {

        fetchData();

    }, []);
    useEffect(() => {
        if (selectCTDT) {
            getFullChuongTrinhDaoTao()
        }
    }, [selectCTDT])
    const getFullChuongTrinhDaoTao = async () => {
        if (selectCTDT) {
            try {
                const response = await CookiesAxios.post(
                    `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/chuongtrinh/only/xem`,
                    {
                        TENCHUONGTRINH: selectCTDT,
                    }
                );
                console.log("Dữ liệu học kì", response.data);
                setFullListCTDT(response.data.DT);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
            }
        }
    };
    const fetchData = async () => {
        try {
            const response = await CookiesAxios.get(`${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/lop/xem`); // Adjust the API URL as needed
            const response_ChuongTinhDaoTao = await CookiesAxios.get(
                `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/chuongtrinh/xem`
            );



            if (response.data.EC === 1) {
                setLopData(response.data.DT);
                setdatListCTDT(response_ChuongTinhDaoTao.data.DT);
                setLoading(false);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <Skeleton variant="rectangular" width="100%" height={400} />
            </Box>
        );
    }

    return (
        <>
            <Container>
                <Row>
                    <Row>
                        <Col md={4}>
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
                                    <MenuItem value="Xem Danh Sách Các Lớp">
                                        Xem Danh Sách Các Lớp
                                    </MenuItem>
                                    <MenuItem value="Thêm Lớp Học Mới">
                                        Thêm Lớp Học Mới
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        <Col md={1}></Col>
                        {IsOpenSelectOption === "Thêm Lớp Học Mới" ? (<>
                            <Col md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Chức Năng
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={IsOpenThemLop}
                                        label="Chức Năng"
                                        onChange={(e) => setIsOpenThemLop(e.target.value)}
                                    >
                                        <MenuItem value="Thủ Công">
                                            Thủ Công
                                        </MenuItem>
                                        <MenuItem value="Excel">
                                            Excel
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Col></>) :


                            (<></>)
                        }

                    </Row>
                    {IsOpenSelectOption === "Xem Danh Sách Các Lớp" ? (
                        <>
                            <Row className='mt-2'>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Mã Lớp</TableCell>
                                                <TableCell>Mã Chương Trình</TableCell>
                                                <TableCell>Tên Lớp</TableCell>
                                                <TableCell>Năm Tuyển Sinh</TableCell>
                                                <TableCell>Sĩ Số</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {lopData.map((row) => (
                                                <TableRow key={row.MALOP}>
                                                    <TableCell>{row.MALOP}</TableCell>
                                                    <TableCell>{row.MACHUONGTRINH}</TableCell>
                                                    <TableCell>{row.TENLOP}</TableCell>
                                                    <TableCell>{row.NAMTUYENSINH}</TableCell>
                                                    <TableCell>{row.SISO}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Row>
                        </>
                    )
                        :
                        (
                            <>
                                <Row>

                                    <Col md={4}>
                                        <ChuongTrinhDaoTaoButtonList DataListCTDT={DataListCTDT}
                                            setdatListCTDT={setdatListCTDT}
                                            setSelectCTDT={setSelectCTDT} />
                                    </Col>

                                    <Col md={1}>
                                        <div className="vertical-divider"></div>
                                    </Col>

                                    <Col md={4}>
                                        <div>
                                            <TaoLopHoc
                                                IsOpenThemLop={IsOpenThemLop}
                                                selectCTDT={selectCTDT}
                                                setLopData={setLopData} />
                                        </div>


                                    </Col>

                                </Row>

                                <Row> <Col md={12}> <div className="vertical-divider-ngang mt-2 mb-2" ></div></Col></Row>
                                <Row >
                                    <ListCTDT
                                        fullListCTDT={fullListCTDT}
                                        lopData={lopData}

                                    />



                                </Row>

                            </>
                        )}

                </Row>
            </Container >
        </>

    );
};

export default IndexQuanLyLopHoc;
