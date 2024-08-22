import React, { useState } from 'react';
import { Grid, TextField, Box, Button } from '@mui/material';
import moment from 'moment';
import CookiesAxios from '../../CookiesAxios';
import { toast } from 'react-toastify';
const TaoLopHoc = ({ selectCTDT, setLopData }) => {
    const [Lop, setLop] = useState({
        MALOP: '',
        TENLOP: '',
        NAMTUYENSINH: moment().year(), // Always use the current year
        SISO: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLop({
            ...Lop,
            [name]: value
        });
    };
    const handleThemLop = async () => {
        if (selectCTDT && Lop.MALOP && Lop.SISO && Lop.NAMTUYENSINH && Lop.TENLOP) {
            try {
                const response = await CookiesAxios.post(`${process.env.REACT_APP_URL_SERVER}/api/v1/admin/monhoc/lop/tao`, {
                    Lop, TENCHUONGTRINH: selectCTDT,
                }); // Adjust the API URL as needed

                console.log('check ', response.data)
                if (response.data.EC === 1) {
                    setLopData(response.data.DT)
                    toast.success('Tạo Thêm Lớp Học Thành Công !!')
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Đã Xảy Ra Lỗi !!')
            }
        } else {
            toast.error('Vui Lòng Nhập Đủ Thông Tin')
        }

    }
    return (
        <> <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>


                <Grid item xs={12} sm={6} md={12} >
                    <TextField
                        fullWidth
                        label="Mã Lớp"
                        name="MALOP"
                        value={Lop.MALOP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <TextField
                        fullWidth
                        label="Tên Lớp"
                        name="TENLOP"
                        value={Lop.TENLOP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <TextField
                        fullWidth
                        label="Sĩ Số"
                        name="SISO"
                        type='number'
                        value={Lop.SISO}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <TextField
                        fullWidth
                        label="Năm Tuyển Sinh"
                        name="NAMTUYENSINH"
                        value={Lop.NAMTUYENSINH}
                        onChange={handleChange}
                        disabled // Disabled because it always shows the current year
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <TextField
                        fullWidth
                        label={selectCTDT ? "" : "Tên Chương Trình"}
                        name="TENCHUONGTRINH"
                        value={selectCTDT}
                        onChange={handleChange}
                        disabled // Disabled because it always shows the current year
                    />
                </Grid>
            </Grid>
        </Box>

            <Button variant='contained' onClick={handleThemLop}>Thêm Lớp</Button>
        </>

    );
};

export default TaoLopHoc;
