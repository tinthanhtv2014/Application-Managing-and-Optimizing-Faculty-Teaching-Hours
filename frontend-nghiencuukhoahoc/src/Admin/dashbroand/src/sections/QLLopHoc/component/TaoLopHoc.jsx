import React, { useState } from 'react';
import { Grid, TextField, Box } from '@mui/material';
import moment from 'moment';

const TaoLopHoc = ({ selectCTDT }) => {
    const [lopData, setLopData] = useState({
        MALOP: '',
        TENLOP: '',
        NAMTUYENSINH: moment().year(), // Always use the current year
        SISO: '',
        TENCHUONGTRINH: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLopData({
            ...lopData,
            [name]: value
        });
    };

    return (
        <> <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={12}>

                </Grid>

                <Grid item xs={12} sm={6} md={12} className='mt-4'>
                    <TextField
                        fullWidth
                        label="Mã Lớp"
                        name="MALOP"
                        value={lopData.MALOP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <TextField
                        fullWidth
                        label="Tên Lớp"
                        name="TENLOP"
                        value={lopData.TENLOP}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <TextField
                        fullWidth
                        label="Sĩ Số"
                        name="SISO"
                        type='number'
                        value={lopData.SISO}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={12}>
                    <TextField
                        fullWidth
                        label="Năm Tuyển Sinh"
                        name="NAMTUYENSINH"
                        value={lopData.NAMTUYENSINH}
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
        </Box></>

    );
};

export default TaoLopHoc;
