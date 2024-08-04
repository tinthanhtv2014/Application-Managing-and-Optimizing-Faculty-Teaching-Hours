// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import axios from "axios";

// const TyLeQuyDoiGioChuanModal = ({ open, handleClose }) => {
//   const [quyDinhs, setQuyDinhs] = useState([]);
//   const [tyLeQuyDoi, setTyLeQuyDoi] = useState([]);
//   const [selectedQuyDinh, setSelectedQuyDinh] = useState("");
//   const [tenQuyDoi, setTenQuyDoi] = useState("");
//   const [tyLe, setTyLe] = useState("");
//   const [trangThaiQuyDoi, setTrangThaiQuyDoi] = useState("");
//   const [ghiChuQuyDoi, setGhiChuQuyDoi] = useState("");

//   useEffect(() => {
//     if (open) {
//       fetchQuyDinhs();
//       fetchTyLeQuyDoi();
//     }
//   }, [open]);

//   const fetchQuyDinhs = async () => {
//     try {
//       const response = await axios.get("/api/quy_dinh");
//       setQuyDinhs(response.data);
//     } catch (error) {
//       console.error("Error fetching quy dinhs:", error);
//     }
//   };

//   const fetchTyLeQuyDoi = async () => {
//     try {
//       const response = await axios.get("/api/ty_le_quy_doi");
//       setTyLeQuyDoi(response.data);
//     } catch (error) {
//       console.error("Error fetching ty le quy doi:", error);
//     }
//   };

//   const handleAddTyLeQuyDoi = async () => {
//     const newTyLeQuyDoi = {
//       MA_QUY_DINH: selectedQuyDinh,
//       TEN_QUY_DOI: tenQuyDoi,
//       TY_LE: tyLe,
//       TRANG_THAI_QUY_DOI: trangThaiQuyDoi,
//       GHI_CHU_QUY_DOI: ghiChuQuyDoi,
//     };

//     try {
//       await axios.post("/api/ty_le_quy_doi", newTyLeQuyDoi);
//       fetchTyLeQuyDoi(); // Fetch updated list
//       handleClose();
//     } catch (error) {
//       console.error("Error adding ty le quy doi:", error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
//       <DialogTitle>Tỷ lệ quy đổi giờ chuẩn</DialogTitle>
//       <DialogContent>
//         <DialogContentText>Nội dung Tỷ lệ quy đổi giờ chuẩn.</DialogContentText>
//         <Grid container spacing={3}>
//           {/* Form để thêm dữ liệu */}
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Chọn Quy Định</InputLabel>
//               <Select
//                 value={selectedQuyDinh}
//                 onChange={(e) => setSelectedQuyDinh(e.target.value)}
//               >
//                 {quyDinhs.map((qd) => (
//                   <MenuItem key={qd.MA_QUY_DINH} value={qd.MA_QUY_DINH}>
//                     {qd.TEN_QUY_DINH}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <TextField
//               label="Tên Quy Đổi"
//               fullWidth
//               margin="normal"
//               value={tenQuyDoi}
//               onChange={(e) => setTenQuyDoi(e.target.value)}
//             />
//             <TextField
//               label="Tỷ Lệ"
//               fullWidth
//               margin="normal"
//               value={tyLe}
//               onChange={(e) => setTyLe(e.target.value)}
//             />
//             <TextField
//               label="Trạng Thái Quy Đổi"
//               fullWidth
//               margin="normal"
//               value={trangThaiQuyDoi}
//               onChange={(e) => setTrangThaiQuyDoi(e.target.value)}
//             />
//             <TextField
//               label="Ghi Chú Quy Đổi"
//               fullWidth
//               margin="normal"
//               value={ghiChuQuyDoi}
//               onChange={(e) => setGhiChuQuyDoi(e.target.value)}
//             />
//           </Grid>

//           {/* Danh sách các tỷ lệ quy đổi */}
//           <Grid item xs={12} md={6}>
//             <List>
//               {tyLeQuyDoi.map((item) => (
//                 <ListItem key={item.MA_QUY_DOI}>
//                   <ListItemText
//                     primary={`Tên Quy Đổi: ${item.TEN_QUY_DOI}`}
//                     secondary={`Tỷ Lệ: ${item.TY_LE} - Trạng Thái: ${item.TRANG_THAI_QUY_DOI}`}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Đóng</Button>
//         <Button onClick={handleAddTyLeQuyDoi}>Thêm</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default TyLeQuyDoiGioChuanModal;

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TyLeQuyDoiGioChuanModal = ({ open, handleClose }) => {
  const [quyDinhs, setQuyDinhs] = useState([]);
  const [tyLeQuyDoi, setTyLeQuyDoi] = useState([]);
  const [selectedQuyDinh, setSelectedQuyDinh] = useState("");
  const [tenQuyDoi, setTenQuyDoi] = useState("");
  const [tyLe, setTyLe] = useState("");
  const [trangThaiQuyDoi, setTrangThaiQuyDoi] = useState("");
  const [ghiChuQuyDoi, setGhiChuQuyDoi] = useState("");

  useEffect(() => {
    if (open) {
      fetchQuyDinhs();
      fetchTyLeQuyDoi();
    }
  }, [open]);

  // Giả lập dữ liệu quy định
  const fetchQuyDinhs = async () => {
    const sampleQuyDinhs = [
      { MA_QUY_DINH: 1, TEN_QUY_DINH: "Quy định 1" },
      { MA_QUY_DINH: 2, TEN_QUY_DINH: "Quy định 2" },
    ];
    setQuyDinhs(sampleQuyDinhs);
  };

  // Giả lập dữ liệu tỷ lệ quy đổi
  const fetchTyLeQuyDoi = async () => {
    const sampleTyLeQuyDoi = [
      {
        MA_QUY_DOI: 1,
        MA_QUY_DINH: 1,
        TEN_QUY_DOI: "Tỷ lệ 1",
        TY_LE: "10%",
        TRANG_THAI_QUY_DOI: "Hoạt động",
        GHI_CHU_QUY_DOI: "Ghi chú 1",
      },
      {
        MA_QUY_DOI: 2,
        MA_QUY_DINH: 2,
        TEN_QUY_DOI: "Tỷ lệ 2",
        TY_LE: "20%",
        TRANG_THAI_QUY_DOI: "Không hoạt động",
        GHI_CHU_QUY_DOI: "Ghi chú 2",
      },
    ];
    setTyLeQuyDoi(sampleTyLeQuyDoi);
  };

  const handleAddTyLeQuyDoi = async () => {
    const newTyLeQuyDoi = {
      MA_QUY_DINH: selectedQuyDinh,
      TEN_QUY_DOI: tenQuyDoi,
      TY_LE: tyLe,
      TRANG_THAI_QUY_DOI: trangThaiQuyDoi,
      GHI_CHU_QUY_DOI: ghiChuQuyDoi,
    };

    // Thêm dữ liệu mới vào danh sách hiện có
    setTyLeQuyDoi((prev) => [...prev, newTyLeQuyDoi]);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Tỷ lệ quy đổi giờ chuẩn</DialogTitle>
      <DialogContent>
        <DialogContentText>Nội dung Tỷ lệ quy đổi giờ chuẩn.</DialogContentText>
        <Grid container spacing={3}>
          {/* Form để thêm dữ liệu */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Chọn Quy Định</InputLabel>
              <Select
                value={selectedQuyDinh}
                onChange={(e) => setSelectedQuyDinh(e.target.value)}
              >
                {quyDinhs.map((qd) => (
                  <MenuItem key={qd.MA_QUY_DINH} value={qd.MA_QUY_DINH}>
                    {qd.TEN_QUY_DINH}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Tên Quy Đổi"
              fullWidth
              margin="normal"
              value={tenQuyDoi}
              onChange={(e) => setTenQuyDoi(e.target.value)}
            />
            <TextField
              label="Tỷ Lệ"
              fullWidth
              margin="normal"
              value={tyLe}
              onChange={(e) => setTyLe(e.target.value)}
            />
            <TextField
              label="Trạng Thái Quy Đổi"
              fullWidth
              margin="normal"
              value={trangThaiQuyDoi}
              onChange={(e) => setTrangThaiQuyDoi(e.target.value)}
            />
            <TextField
              label="Ghi Chú Quy Đổi"
              fullWidth
              margin="normal"
              value={ghiChuQuyDoi}
              onChange={(e) => setGhiChuQuyDoi(e.target.value)}
            />
          </Grid>

          {/* Danh sách các tỷ lệ quy đổi */}
          <Grid item xs={12} md={6}>
            <List>
              {tyLeQuyDoi.map((item) => (
                <ListItem key={item.MA_QUY_DOI}>
                  <ListItemText
                    primary={`Tên Quy Đổi: ${item.TEN_QUY_DOI}`}
                    secondary={`Tỷ Lệ: ${item.TY_LE} - Trạng Thái: ${item.TRANG_THAI_QUY_DOI} - Ghi Chú: ${item.GHI_CHU_QUY_DOI}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Đóng</Button>
        <Button onClick={handleAddTyLeQuyDoi}>Thêm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TyLeQuyDoiGioChuanModal;
