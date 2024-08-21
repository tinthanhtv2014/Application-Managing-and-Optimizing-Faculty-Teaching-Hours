import React, { useState } from 'react';
import { Grid, Button, Box, TextField, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';


const ChuongTrinhDaoTaoButtonList = ({ DataListCTDT, setSelectCTDT }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = (index, value) => {
        setSelectedIndex(index);
        setSelectCTDT(value)
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter DataListCTDT based on the searchTerm
    const filteredData = DataListCTDT.filter((item) =>
        item.TENCHUONGTRINH.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography >Vui Lòng Chọn Chương Trình Đào Tạo </Typography>
            </Box>
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
