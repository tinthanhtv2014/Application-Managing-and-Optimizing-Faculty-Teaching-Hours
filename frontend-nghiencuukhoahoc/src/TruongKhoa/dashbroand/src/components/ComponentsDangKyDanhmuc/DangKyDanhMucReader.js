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
    tacGiaThuNhat: "",
    tacGiaChiuTrachNhiem: "",
    tacGia: ""
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

  const handleAddAuthor = (type) => {
    if (type === "tacGiaThuNhat" && formData.tacGiaThuNhat.length < 2) {
      setFormData({
        ...formData,
        tacGiaThuNhat: [...formData.tacGiaThuNhat, inputFields.tacGiaThuNhat],
      });
    } else if (type === "tacGiaChiuTrachNhiem" && formData.tacGiaChiuTrachNhiem.length < 2) {
      setFormData({
        ...formData,
        tacGiaChiuTrachNhiem: [...formData.tacGiaChiuTrachNhiem, inputFields.tacGiaChiuTrachNhiem],
      });
    } else if (type === "tacGia") {
      setFormData({
        ...formData,
        tacGia: [...formData.tacGia, inputFields.tacGia],
      });
    }
    setInputFields({ ...inputFields, [type]: "" });
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

          {/* Tác giả thứ nhất */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Tác Giả Thứ Nhất (Tối đa 2 người)</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                label="Tên Tác Giả Thứ Nhất"
                variant="outlined"
                fullWidth
                name="tacGiaThuNhat"
                value={inputFields.tacGiaThuNhat}
                onChange={handleInputFieldChange}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={() => handleAddAuthor("tacGiaThuNhat")}
                disabled={formData.tacGiaThuNhat.length >= 2 || !inputFields.tacGiaThuNhat}
              >
                Thêm
              </Button>
            </Box>
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

          {/* Tác giả chịu trách nhiệm */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Tác Giả Chịu Trách Nhiệm (Tối đa 2 người)</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                label="Tên Tác Giả Chịu Trách Nhiệm"
                variant="outlined"
                fullWidth
                name="tacGiaChiuTrachNhiem"
                value={inputFields.tacGiaChiuTrachNhiem}
                onChange={handleInputFieldChange}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={() => handleAddAuthor("tacGiaChiuTrachNhiem")}
                disabled={formData.tacGiaChiuTrachNhiem.length >= 2 || !inputFields.tacGiaChiuTrachNhiem}
              >
                Thêm
              </Button>
            </Box>
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

          {/* Tác giả */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Tác Giả (Không giới hạn số lượng)</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField
                label="Tên Tác Giả"
                variant="outlined"
                fullWidth
                name="tacGia"
                value={inputFields.tacGia}
                onChange={handleInputFieldChange}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
                onClick={() => handleAddAuthor("tacGia")}
                disabled={!inputFields.tacGia}
              >
                Thêm
              </Button>
            </Box>
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