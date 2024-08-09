import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DangKyDanhMuc = () => {
  const [formData, setFormData] = useState({
    tenDanhMuc: "",
    loaiDanhMuc: "",
    tacGiaThuNhat: [],
    tacGiaChiuTrachNhiem: [],
    tacGia: []
  });

  const [inputFields, setInputFields] = useState({
    tacGiaName: "",
    tacGiaType: "thuNhat"
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputFieldChange = (e) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAuthor = () => {
    const { tacGiaName, tacGiaType } = inputFields;
    if (!tacGiaName) return;

    if (tacGiaType === "thuNhat" && formData.tacGiaThuNhat.length < 2) {
      setFormData({
        ...formData,
        tacGiaThuNhat: [...formData.tacGiaThuNhat, tacGiaName],
      });
    } else if (tacGiaType === "chiuTrachNhiem" && formData.tacGiaChiuTrachNhiem.length < 2) {
      setFormData({
        ...formData,
        tacGiaChiuTrachNhiem: [...formData.tacGiaChiuTrachNhiem, tacGiaName],
      });
    } else if (tacGiaType === "tacGia") {
      setFormData({
        ...formData,
        tacGia: [...formData.tacGia, tacGiaName],
      });
    }
    setInputFields({ tacGiaName: "", tacGiaType: "thuNhat" });
  };

  const handleRemoveAuthor = (type, index) => {
    const newAuthors = [...formData[type]];
    newAuthors.splice(index, 1);
    setFormData({ ...formData, [type]: newAuthors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({
      tenDanhMuc: "",
      loaiDanhMuc: "",
      tacGiaThuNhat: [],
      tacGiaChiuTrachNhiem: [],
      tacGia: []
    });
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Đăng Ký Danh Mục
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Tên Danh Mục"
              variant="outlined"
              fullWidth
              name="tenDanhMuc"
              value={formData.tenDanhMuc}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Loại Danh Mục</InputLabel>
              <Select
                label="Loại Danh Mục"
                name="loaiDanhMuc"
                value={formData.loaiDanhMuc}
                onChange={handleChange}
              >
                <MenuItem value="loai1">Loại Danh Mục 1</MenuItem>
                <MenuItem value="loai2">Loại Danh Mục 2</MenuItem>
                <MenuItem value="loai3">Loại Danh Mục 3</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Nhập tên tác giả và chọn loại */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Thêm Tác Giả</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                label="Tên Tác Giả"
                variant="outlined"
                fullWidth
                name="tacGiaName"
                value={inputFields.tacGiaName}
                onChange={handleInputFieldChange}
              />
              <FormControl variant="outlined" sx={{ ml: 2, minWidth: 150 }}>
                <InputLabel>Loại Tác Giả</InputLabel>
                <Select
                  label="Loại Tác Giả"
                  name="tacGiaType"
                  value={inputFields.tacGiaType}
                  onChange={handleInputFieldChange}
                >
                  <MenuItem value="thuNhat">Tác Giả Thứ Nhất</MenuItem>
                  <MenuItem value="chiuTrachNhiem">Tác Giả Chịu Trách Nhiệm</MenuItem>
                  <MenuItem value="tacGia">Tác Giả</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={handleAddAuthor}
                disabled={!inputFields.tacGiaName}
              >
                Thêm
              </Button>
            </Box>

            {/* Danh sách tác giả */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Tác Giả Thứ Nhất (Tối đa 2 người)</Typography>
              <List>
                {formData.tacGiaThuNhat.map((author, index) => (
                  <ListItem key={index} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAuthor("tacGiaThuNhat", index)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    {author}
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Tác Giả Chịu Trách Nhiệm (Tối đa 2 người)</Typography>
              <List>
                {formData.tacGiaChiuTrachNhiem.map((author, index) => (
                  <ListItem key={index} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAuthor("tacGiaChiuTrachNhiem", index)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    {author}
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Tác Giả (Không giới hạn số lượng)</Typography>
              <List>
                {formData.tacGia.map((author, index) => (
                  <ListItem key={index} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAuthor("tacGia", index)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    {author}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Button variant="contained" color="primary" type="submit">
            Gửi
          </Button>
        </form>
      </Box>

      {submittedData.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Danh Mục</TableCell>
                <TableCell>Loại Danh Mục</TableCell>
                <TableCell>Tác Giả Thứ Nhất</TableCell>
                <TableCell>Tác Giả Chịu Trách Nhiệm</TableCell>
                <TableCell>Tác Giả</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.tenDanhMuc}</TableCell>
                  <TableCell>{data.loaiDanhMuc}</TableCell>
                  <TableCell>{data.tacGiaThuNhat.join(", ")}</TableCell>
                  <TableCell>{data.tacGiaChiuTrachNhiem.join(", ")}</TableCell>
                  <TableCell>{data.tacGia.join(", ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default DangKyDanhMuc;