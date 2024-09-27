import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function EditPhanCongModal({ open, handleClose, selectedMonHoc, handleSave }) {
  const [formData, setFormData] = useState(selectedMonHoc);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    handleSave(formData); // Gửi dữ liệu cập nhật về component cha
    handleClose(); // Đóng modal sau khi lưu
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Phân Công</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="MALOP"
          label="Mã Lớp"
          value={formData?.CHITIET_LOP[0]?.MALOP || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="TENLOP"
          label="Tên Lớp"
          value={formData?.CHITIET_LOP[0]?.TENLOP || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="TENMONHOC"
          label="Tên Môn Học"
          value={formData?.TENMONHOC || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="THOI_LUONG_MON_HOC"
          label="Thời Lượng Môn Học"
          value={formData?.THOI_LUONG_MON_HOC || ""}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="SISO"
          label="Sĩ Số"
          value={formData?.CHITIET_LOP[0]?.SISO || ""}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPhanCongModal;
