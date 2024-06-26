import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Input } from "@nextui-org/react";
import "./ModalHangProducts.css";
import axios from "axios";
import "../modal/ModalCreateProducts.css";
import { toast } from "react-toastify";

const ModalCreateProducts = ({
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

  const placements = ["inside", "outside", "outside-left"];

  const [modalIsOpenHangGiay, setmodalIsOpenHangGiay] = useState(false);
  const [GetdataLoaiGiay, setGetdataLoaiGiay] = useState();
  function openModal() {
    setmodalIsOpenHangGiay(true);
  }

  function closeModal() {
    setmodalIsOpenHangGiay(false);
  }

  const [DataLoaiBackend, setDataLoaiBackend] = useState([]);

  // console.log("=>loai", DataLoaiBackend);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const DataLoai = await axios.get("http://localhost:3003/api/v1/loai");
      setDataLoaiBackend(DataLoai.data.DT);

      // console.log("=>loai", DataLoai.data.DT);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [HanggiayShoe, setHanggiayShoe] = useState();

  const XacNhanTaoLoaiGiay = async () => {
    if (GetdataLoaiGiay == "") {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/loai/create",
        {
          name: GetdataLoaiGiay,
        }
      );
      // console.log(response);
      if (response.data.EC === 1) {
        toast.success("Đã thêm sản phẩm thành công ^.^!");
        fetchData();
      } else {
        toast.error("Thêm sản phẩm thất bại roài O.o !!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (MaLoai) => {
    // console.log("Checkloai =>", MaLoai);
    try {
      const response = await axios.delete(
        `http://localhost:3003/api/v1/loai/info/delete`,
        {
          params: { maloai: MaLoai },
        }
      );
      console.log(response);
      if (response.data.EC === 1) {
        toast.success("Đã xóa sản phẩm thành công");
        fetchData();
      } else {
        toast.error("Xóa sản phẩm thất bại roài O.o !!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Xóa sản phẩm thất bại roài O.o !!");
    }
  };

  return (
    <div>
      <button onClick={openModal} className="btn-dark btn">
        Thêm Loại Giày
      </button>
      <Modal
        isOpen={modalIsOpenHangGiay}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="exit-modal">
          <i class="fa-regular fa-circle-xmark" onClick={closeModal}></i>
        </div>
        <div className="container-modalRegister">
          <div className="modalRegister">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                <h4> Thêm loại giày</h4>
              </label>
              <input
                type="email"
                class="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="Nam"
                onChange={(event) => setGetdataLoaiGiay(event.target.value)}
              />
              <button className="btn btn-success" onClick={XacNhanTaoLoaiGiay}>
                Thêm loại giày
              </button>
            </div>

            {/* ----------------------------------------------------- */}
            <table className="hang-table">
              <thead>
                <tr>
                  <th>Tên Hàng</th>
                  <th>Chức Năng</th>
                </tr>
              </thead>
              <tbody>
                {DataLoaiBackend.map((loai) => (
                  <tr key={loai.MALOAI}>
                    <td>{loai.name}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(loai.MALOAI)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCreateProducts;
