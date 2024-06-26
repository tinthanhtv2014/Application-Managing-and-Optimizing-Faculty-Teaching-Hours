import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Input } from "@nextui-org/react";

import axios from "axios";
import "../modal/ModalCreateProducts.css";
import { toast } from "react-toastify";
import { number, string } from "prop-types";

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

  const [GetdataSizeGiay, setGetdataSizeGiay] = useState();

  function openModal() {
    setmodalIsOpenHangGiay(true);
  }

  function closeModal() {
    setmodalIsOpenHangGiay(false);
  }

  const [DataSizeBackend, setDataSizeBackend] = useState([]);

  console.log("=>size", DataSizeBackend);
  const fetchData = async () => {
    try {
      const DataSize = await axios.get("http://localhost:3003/api/v1/kichco");
      setDataSizeBackend(DataSize.data.DT);

      // console.log("=>Hang", DataHang.data.DT);
      // console.log("=>size", DataSize.data.DT);
      // console.log("=>loai", DataLoai.data.DT);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Kiểm tra nếu GetdataSizeGiay không phải là một chuỗi hoặc là một chuỗi rỗng

  const XacNhanTaoSizeGiay = async () => {
    if (!/^\d+$/.test(GetdataSizeGiay)) {
      toast.error("Mày nhập khùng điên gì vậy +,@");
      return;
    }
    if (GetdataSizeGiay < 10 || GetdataSizeGiay > 70) {
      toast.error("Size giày thật là oải chưởng -,-");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/kichco/create",
        {
          giatri: GetdataSizeGiay,
        }
      );
      console.log(response);
      if (response.data.EC === 0) {
        toast.error(`${response.data.EM} ` + "O.o!");
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (Size) => {
    console.log("CheckSize =>", Size);
    try {
      const response = await axios.delete(
        `http://localhost:3003/api/v1/kichco/info/delete`,
        {
          params: { magiatri: Size },
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
      <button onClick={openModal} className=" btn-dark btn">
        Thêm Size Giày
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
                <h4> Thêm size giày</h4>
              </label>
              <input
                type="email"
                class="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="45"
                onChange={(event) => setGetdataSizeGiay(event.target.value)}
              />
              <button className="btn btn-success" onClick={XacNhanTaoSizeGiay}>
                Thêm size giày
              </button>
            </div>

            <table className="hang-table">
              <thead>
                <tr>
                  <th>Tên Hàng</th>
                  <th>Chức Năng</th>
                </tr>
              </thead>
              <tbody>
                {DataSizeBackend.map((size) => (
                  <tr key={size.MAGIATRI}>
                    <td>{size.GIATRI}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(size.MAGIATRI)}
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
