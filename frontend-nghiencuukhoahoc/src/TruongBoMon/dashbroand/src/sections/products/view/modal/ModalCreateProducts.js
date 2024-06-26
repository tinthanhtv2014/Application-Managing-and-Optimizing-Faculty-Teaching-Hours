import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Input } from "@nextui-org/react";

import axios from "axios";
import "../modal/ModalCreateProducts.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ModalCreateProducts = ({
  callback,
  modalIsOpen,
  openModal,
  closeModal,
  afterOpenModal,
}) => {
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
  const [IsModalOpenBuyBook, setIsModalOpenBuyBook] = useState(false);

  const tokenSetStorage = Cookies.get("accessToken");
  const axiosWithCredentials = axios.create({
    withCredentials: true, // Bật sử dụng cookie trong yêu cầu
    headers: {
      Authorization: `Bearer ${tokenSetStorage}`, // Thay yourToken bằng token của bạn
    },
  });
  function openModal() {
    setIsModalOpenBuyBook(true);
  }

  function closeModal() {
    setIsModalOpenBuyBook(false);
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const [TenSach, setTenSach] = useState();
  const [TenTacGia, setTacGia] = useState();
  const [GiaBanSach, setGiaBanSach] = useState();
  const [GiaNhapSach, setGiaNhapSach] = useState();
  const [SoLuongSach, setSoLuongSach] = useState();
  const [ThongtinSach, setThongTinSach] = useState();
  const [inputErrors, setInputErrors] = useState({});
  const handleSubmitProducts = async (event) => {
    event.preventDefault();
    //--- Kiểm tra các trường bắt buộc và thông báo lỗi nếu có
    const errors = {};
    if (!selectedImage) errors.selectedImage = true;
    if (!TenSach) errors.TenSach = true;
    if (!TenTacGia) errors.TenTacGia = true;
    if (!GiaBanSach || isNaN(GiaBanSach)) errors.GiaBanSach = true;
    if (!GiaNhapSach || isNaN(GiaNhapSach)) errors.GiaNhapSach = true;
    if (!SoLuongSach || isNaN(SoLuongSach)) errors.SoLuongSach = true;
    if (!ThongtinSach) errors.ThongtinSach = true;

    setInputErrors(errors);
    //---end check điều kiện
    // Nếu có lỗi, thông báo cho người dùng và ngăn gửi form
    if (Object.keys(errors).length > 0) {
      toast.error("Vui lòng nhập đầy đủ và chính xác các thông tin.");
      return;
    }
    if (SoLuongSach > 200) {
      toast.error("Số lượng giày quá lớn rồi :<");
      return;
    }
    if (GiaBanSach > 10000000) {
      toast.error("Số tiền quá lớn rồi :<");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("tensach", TenSach);
    formData.append("tacgia", TenTacGia);
    formData.append("gia", GiaBanSach);

    formData.append("GiaNhapSach", GiaNhapSach);
    formData.append("soluong", SoLuongSach);
    formData.append("mota", ThongtinSach);

    try {
      const response = await axiosWithCredentials.post(
        "http://localhost:3003/admin/v1/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      toast.success("Thêm sản phẩm thành công");

      // ----Reset form and errors
      setSelectedImage(null);
      setTacGia("");
      setTenSach("");
      setGiaBanSach("");
      setGiaNhapSach("");
      setSoLuongSach("");
      setThongTinSach("");
      setInputErrors({});
      //---------------------

      callback();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Oh Noo đã xảy ra lỗi O.o");
    }
  };
  const [DisableInput, setDisableInput] = useState(false);

  const handleFocus = (field) => {
    setInputErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };
  console.log(TenSach);
  return (
    <div>
      <button onClick={openModal} className=" btn-dark btn">
        Thêm Sản Phẩm
      </button>
      <Modal
        isOpen={IsModalOpenBuyBook}
        onAfterOpen={afterOpenModal}
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
                className={`form-control ${
                  inputErrors.TenSach ? "border-danger" : ""
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
                className={`form-control ${
                  inputErrors.TenTacGia ? "border-danger" : ""
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
                className={`form-control ${
                  inputErrors.GiaNhapSach ? "border-danger" : ""
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
                className={`form-control ${
                  inputErrors.GiaBanSach ? "border-danger" : ""
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
                className={`form-control ${
                  inputErrors.SoLuongSach ? "border-danger" : ""
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
                className={`form-control ${
                  inputErrors.ThongtinSach ? "border-danger" : ""
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
                className="modalRegister-dangky btn btn-success"
                onClick={handleSubmitProducts}
              >
                Thêm sách
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCreateProducts;
