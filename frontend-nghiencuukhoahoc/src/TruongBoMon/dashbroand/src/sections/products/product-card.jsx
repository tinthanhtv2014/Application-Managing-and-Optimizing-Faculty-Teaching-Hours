import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from "react-modal";
import { fCurrency } from '../../utils/format-number';
import axios from "axios";
import Label from '../../components/label';
import { ColorPreview } from '../../components/color-utils';
import "./product-card.css"
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
// ----------------------------------------------------------------------

export default function ShopProductCard({ product, callback }) {



  const tokenSetStorage = Cookies.get("accessToken");
  const axiosWithCredentials = axios.create({
    withCredentials: true, // Bật sử dụng cookie trong yêu cầu
    headers: {
      Authorization: `Bearer ${tokenSetStorage}`, // Thay yourToken bằng token của bạn
    },
  });
  const imageDefaulf = product.ten_hinh_anh
  const [selectedImage, setSelectedImage] = useState(imageDefaulf);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);


  };
  const ten_sach = product.ten_sach
  const gia_nhap = product.gia_nhap
  const gia = product.gia
  const ngay_tao = product.ngay_tao
  const tac_gia = product.tac_gia
  const so_luong = product.so_luong
  const mo_ta = product.mo_ta
  const [inputErrors, setInputErrors] = useState({});
  console.log('check products =>', product)
  const [TenSach, setTenSach] = useState(ten_sach);
  const [TenTacGia, setTacGia] = useState(tac_gia);
  const [GiaNhapSach, setGiaNhapSach] = useState(gia_nhap);
  const [GiaBanSach, setGiaBanSach] = useState(gia);
  const [SoLuongSach, setSoLuongSach] = useState(so_luong);
  const [ThongtinSach, setThongTinSach] = useState(mo_ta);
  const handleUpdateProducts = async () => {
    console.log('imge =>', selectedImage)
    const errors = {};
    if (!selectedImage) errors.selectedImage = true;
    if (!TenSach) errors.TenSach = true;
    if (!TenTacGia) errors.TenTacGia = true;
    if (!GiaBanSach || isNaN(GiaBanSach)) errors.GiaBanSach = true;
    if (!GiaNhapSach || isNaN(GiaNhapSach)) errors.GiaNhapSach = true;
    if (!SoLuongSach || isNaN(SoLuongSach)) errors.SoLuongSach = true;
    if (!ThongtinSach) errors.ThongtinSach = true;

    setInputErrors(errors);
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("tensach", TenSach);
    formData.append("tacgia", TenTacGia);
    formData.append("gia", GiaBanSach);

    formData.append("GiaNhapSach", GiaNhapSach);
    formData.append("soluong", SoLuongSach);
    formData.append("mota", ThongtinSach);
    console.log("Image:", selectedImage);
    console.log("Title (TenSach):", TenSach);
    console.log("Author (TenTacGia):", TenTacGia);
    console.log("Price (GiaBanSach):", GiaBanSach);
    console.log("Purchase Price (GiaNhapSach):", GiaNhapSach);
    console.log("Quantity (SoLuongSach):", SoLuongSach);
    console.log("Description (ThongtinSach):", ThongtinSach);
    if (SoLuongSach > 200) {
      toast.error("Số lượng giày quá lớn rồi :<");
      return;
    }
    if (GiaBanSach > 90000000) {
      toast.error("Số tiền quá lớn rồi :<");
      return;
    }
    try {
      const response = await axiosWithCredentials.put(
        `http://localhost:3003/admin/v1/product/edit/${product.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data)
      toast.success('Hình như update được á, check lại thử xem');
      callback()

      setInputErrors({});
    } catch (error) {
      toast.error('Ohh nooo O.o !!')
      console.error("Error uploading image:", error);
    }
  };
  const handleFocus = (field) => {
    setInputErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };
  const [DisableInput, setDisableInput] = useState(false);







  // Hàm định dạng số thành tiền tệ Việt Nam
  function formatCurrency(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // Sử dụng hàm formatCurrency để định dạng giá sản phẩm và giá sau giảm giá
  const GIA = formatCurrency(parseFloat(product.GIA).toFixed(0));
  const giamgia = formatCurrency((product.GIA - product.GIA * product.giamgia / 100).toFixed(0));

  const sale = product.giamgia;

  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setIsOpen(true);

  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleDeleteProducts = () => {
    // Đảm bảo rằng product.MASP chứa giá trị mã sản phẩm cần xóa

    // Thay thế :masanpham trong URL bằng giá trị thực tế của MASP
    const url = `http://localhost:3003/admin/v1/product/delete/${product.id}`;

    axiosWithCredentials.delete(url)
      .then(response => {
        console.log(response.data)
        toast.success("Xóa sản phẩm thành công!!")
        console.log("Product deleted successfully!");
        callback()
        // Thực hiện các hành động khác sau khi xóa sản phẩm thành công nếu cần
      })
      .catch(error => {
        console.error("Error deleting product:", error);
        toast.error("Xóa sản phẩm giày không thành công!!")
        // Xử lý lỗi nếu có
      });
  };

  const color = product.giamgia === null ? 'info' : 'error';

  const renderStatus = (
    <Label
      variant="filled"
      color={color}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.giamgia === null ? (
        <span>sale {product.giamgia}%</span>)
        :
        (
          <span>không giảm giá</span>
        )
      }
    </Label>
  );


  const renderImg = (

    <Box

      component="img"
      alt={product.ten_hinh_anh}
      src={`http://localhost:3003/image/${product.ten_hinh_anh}`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );



  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.gia}đ
      </Typography>
      &nbsp;  &nbsp;
      {product.gia} đ
    </Typography>
  );

  return (
    <>


      <Card onClick={openModal} className='container-cardProducts' >

        <Box sx={{ pt: '100%', position: 'relative' }}>
          {product.imageUrl && renderStatus}
          {renderStatus}
          {renderImg}

        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {product.ten_sach}
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <ColorPreview colors={product.MASP} /> */}

            {renderPrice}
          </Stack>
        </Stack>

      </Card>



      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="exit-modal">
          <i class="fa-regular fa-circle-xmark" onClick={closeModal}></i>
        </div>
        <div className="container-modalRegister">
          <div className="modalRegister">
            <h4>Thêm Sách</h4>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Tên Sách
              </label>
              <input
                type="text"
                className={`form-control ${inputErrors.TenSach ? "border-danger" : ""
                  }`}
                id="exampleFormControlInput1"
                placeholder="Dark X Tâm"
                disabled={DisableInput}
                value={TenSach}
                onChange={(event) => setTenSach(event.target.value)}
                onFocus={() => handleFocus("TenSach")}
              />
            </div>

            {/* -----------------------------END -------------------------------------- */}

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Tên tác giả
              </label>
              <input
                type="text"
                className={`form-control ${inputErrors.TenTacGia ? "border-danger" : ""
                  }`}
                id="exampleFormControlInput1"
                placeholder="Hồ Hoàng Phúc"
                disabled={DisableInput}
                value={TenTacGia}
                onChange={(event) => setTacGia(event.target.value)}
                onFocus={() => handleFocus("TenTacGia")}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Giá nhập sách về
              </label>
              <input
                onFocus={() => handleFocus("GiaNhapSach")}
                type="number"
                className={`form-control ${inputErrors.GiaNhapSach ? "border-danger" : ""
                  }`}
                id="exampleFormControlInput1"
                placeholder="259.000"
                value={GiaNhapSach}
                disabled={DisableInput}
                onChange={(event) => setGiaNhapSach(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Giá bán sách
              </label>
              <input
                onFocus={() => handleFocus("GiaBanSach")}
                type="number"
                className={`form-control ${inputErrors.GiaBanSach ? "border-danger" : ""
                  }`}
                id="exampleFormControlInput1"
                placeholder="259.000"
                value={GiaBanSach}
                disabled={DisableInput}
                onChange={(event) => setGiaBanSach(event.target.value)}
              />
            </div>

            {/* ------------------------------------END-------------------------------------- */}

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Số lượng sách
              </label>
              <input
                onFocus={() => handleFocus("SoLuongSach")}
                type="number"
                className={`form-control ${inputErrors.SoLuongSach ? "border-danger" : ""
                  }`}
                id="exampleFormControlInput1"
                placeholder="100"
                disabled={DisableInput}
                value={SoLuongSach}
                onChange={(event) => setSoLuongSach(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Thông tin giới thiệu về sách
              </label>
              <textarea
                onFocus={() => handleFocus("ThongtinSach")}
                disabled={DisableInput}
                className={`form-control ${inputErrors.ThongtinSach ? "border-danger" : ""
                  }`}
                id="exampleFormControlTextarea1"
                rows="3"
                value={ThongtinSach}
                onChange={(event) => setThongTinSach(event.target.value)}
              ></textarea>
            </div>
            <div className="modalRegister-sdt margin5px">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                name="profile_pic"
              />
            </div>
            <div className="modalRegister-sdt margin5px">
              <button
                className="modalRegister-dangky  btn btn-success"
                onClick={handleUpdateProducts}
              >
                Thêm sách
              </button>
              <button
                className="modalRegister-dangky ml-custom btn btn-danger"
                onClick={handleDeleteProducts}
              >
                Xóa Sách
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </>

  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
