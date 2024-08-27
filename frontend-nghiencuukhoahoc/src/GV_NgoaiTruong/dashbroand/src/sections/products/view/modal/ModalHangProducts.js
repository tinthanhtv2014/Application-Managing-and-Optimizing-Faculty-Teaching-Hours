import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Input } from "@nextui-org/react";
import eventBus from "./EventBus";
import axios from "axios";
import "../modal/ModalCreateProducts.css";
import "./ModalHangProducts.css";
import { toast } from "react-toastify";
const ModalHangProducts = ({
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
  const [GetdataHangGiay, setGetdataHangGiay] = useState();

  function openModal() {
    setmodalIsOpenHangGiay(true);
  }

  function closeModal() {
    setmodalIsOpenHangGiay(false);
  }

  const [DataHangBackend, setDataHangBackend] = useState([]);

  console.log("=>Hang", DataHangBackend);
  const fetchData = async () => {
    try {
      const DataHang = await axios.get("http://localhost:3003/api/v1/hang");
      setDataHangBackend(DataHang.data.DT);

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

  const XacNhanTaoHangGiay = async () => {
    if (GetdataHangGiay === "") {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/hang/create",
        {
          hang: GetdataHangGiay,
        }
      );
      if (response.data.EC === 1) {
        toast.success("Thêm hãng sản phẩm thành công ^^!");
      } else {
        toast.error(`${response.data.EM} ` + "o.O!");
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (Mahang) => {
    try {
      const response = await axios.delete(
        "http://localhost:3003/api/v1/hang/info/delete",
        {
          params: { mahang: Mahang },
        }
      );
      console.log(response);
      if (response.data.EC === 1) {
        toast.success("Đã xóa hãng sản phẩm thành công ^^!");
        fetchData();
      } else {
        toast.error("Xóa hãng sản phẩm thất bại roài O.o !!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Xóa hãng sản phẩm thất bại roài O.o !!");
    }
  };
  return (
    <div>
      <button onClick={openModal} className="btn-dark btn">
        Thêm Hãng Giày
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
                <h2> Thêm hãng giày</h2>
              </label>
              <input
                type="email"
                class="form-control mb-2"
                id="exampleFormControlInput1"
                placeholder="MWC"
                onChange={(event) => setGetdataHangGiay(event.target.value)}
              />
              <button className="btn btn-success" onClick={XacNhanTaoHangGiay}>
                Thêm hãng giày
              </button>
            </div>
            <h5>Danh sách hãng giày</h5>
            <table className="hang-table">
              <thead>
                <tr>
                  <th>Tên Hàng</th>
                  <th>Chức Năng</th>
                </tr>
              </thead>
              <tbody>
                {DataHangBackend.map((hang) => (
                  <tr key={hang.MAHANG}>
                    <td>{hang.TENHANG}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(hang.MAHANG)}
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

export default ModalHangProducts;
