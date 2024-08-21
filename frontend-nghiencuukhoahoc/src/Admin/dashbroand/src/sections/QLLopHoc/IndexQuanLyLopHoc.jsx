import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';
import CookiesAxios from '../CookiesAxios';
const IndexQuanLyLopHoc = () => {
    const [lopData, setLopData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CookiesAxios.get(`${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/lop/xem`); // Adjust the API URL as needed
                console.log('check data ', response.data.DT)
                if (response.data.EC === 1) {
                    setLopData(response.data.DT);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <Skeleton variant="rectangular" width="100%" height={400} />
            </Box>
        );
    }

    return (
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
    );
};

export default IndexQuanLyLopHoc;
