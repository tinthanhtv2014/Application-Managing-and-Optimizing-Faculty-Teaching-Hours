import React, { useEffect, useState } from 'react';
import { Grid, Button, Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CookiesAxios from '../../CookiesAxios';

const ChuongTrinhDaoTaoButtonList = ({ DataListCTDT, setSelectCTDT, setdatListCTDT }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataBoMon, setDataBoMon] = useState(null);
    const [selectBoMon, setSelectBoMon] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getDataBoMon();
    }, []);


    useEffect(() => {
        if (selectBoMon) {
            dataChuongTrinhDaoTao();
        }
    }, [selectBoMon]);
    const getDataBoMon = async () => {
        try {

            const response_BoMon = await CookiesAxios.get(
                `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/bomon/xem`,
            );

            if (response_BoMon.data.EC === 1) {

                setDataBoMon(response_BoMon.data.DT);
                setLoading(false);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }
    const dataChuongTrinhDaoTao = async () => {
        if (selectBoMon) {
            console.log('check selectBoMon', selectBoMon)
            try {

                const response_ChuongTinhDaoTao = await CookiesAxios.post(
                    `${process.env.REACT_APP_URL_SERVER}/api/v1/truongbomon/chuongtrinh/xem/bomon`, {
                    TENBOMON: selectBoMon
                }
                );


                console.log('check ', response_ChuongTinhDaoTao.data)
                if (response_ChuongTinhDaoTao.data.EC === 1) {

                    setdatListCTDT(response_ChuongTinhDaoTao.data.DT)
                    setLoading(false);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
    }
    const handleClick = (index, value) => {
        setSelectedIndex(index);
        setSelectCTDT(value)
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    if (loading) {
        return "...."
    }
    // Filter DataListCTDT based on the searchTerm
    const filteredData = DataListCTDT.filter((item) =>
        item.TENCHUONGTRINH.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            {/* <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography >Vui Lòng Chọn Chương Trình Đào Tạo </Typography>
            </Box> */}

            <FormControl fullWidth className='mt-4'>
                <InputLabel id="demo-simple-select-label">
                    Bộ Môn
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectBoMon}
                    label="Chức Năng"
                    onChange={(e) => setSelectBoMon(e.target.value)}
                >
                    {dataBoMon.length > 0 ? (
                        dataBoMon.map((bomon, index) => (
                            <MenuItem key={index} value={bomon.TENBOMON}>
                                {bomon.TENBOMON}
                            </MenuItem>

                        )
                        )
                    )

                        : (<MenuItem >
                            <em>Không có dữ liệu</em>
                        </MenuItem>)

                    }
                    <MenuItem >

                    </MenuItem>

                </Select>
            </FormControl>
            <Box sx={{ padding: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Tìm kiếm chương trình đào tạo..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ marginBottom: 2 }}
                />
            </Box>


            <Box sx={{ padding: 2, maxHeight: 300, overflowY: 'auto' }}>

                <Grid container spacing={2}>
                    {filteredData.map((item, index) => (
                        <Grid item xs={12} md={12} key={index}>
                            <Button

                                fullWidth
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    minHeight: 44,
                                    borderRadius: 0.75,
                                    typography: 'body2',
                                    fontWeight: 'fontWeightMedium',
                                    color: selectedIndex === index ? 'blue' : 'text.secondary',
                                    bgcolor: selectedIndex === index
                                        ? (theme) => alpha(theme.palette.primary.main, 0.23)
                                        : 'inherit',
                                    '&:hover': {
                                        bgcolor: (theme) =>
                                            selectedIndex === index
                                                ? alpha(theme.palette.primary.main, 0.23)
                                                : 'grey.300',
                                    },
                                }}
                                onClick={() => handleClick(index, item.TENCHUONGTRINH)}
                            >
                                {item.TENCHUONGTRINH}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default ChuongTrinhDaoTaoButtonList;
