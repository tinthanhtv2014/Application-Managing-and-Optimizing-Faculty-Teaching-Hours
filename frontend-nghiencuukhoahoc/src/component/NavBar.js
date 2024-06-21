import React, { useEffect, useState } from "react";
import "../component/NavBar.scss";
import ModalLogin from "../modal/ModalLogin";
import ModalRegister from "../modal/ModalRegister";

const NavBar = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [a,setA]= useState(5);
  // function Click(){
  //   setA(a==2);

  // }
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="container-NavBar">
      <div className="container-NavBar-logo">
        <img
          className="NavBar-image"
          src={require("../public/image/logoweka.png")}
        />
      </div>
      <div className="container-NavBar-Middle">
        <div className="container-NavBar-Sachdientu ">
          <p>Sách điện tử</p>
        </div>
        <div className="container-NavBar-Sachnoi margin20px-left ">
          <p>Sách nói</p>
        </div>
        <div className="container-NavBar-Sachhieunoi margin20px-left">
          <p>Sách hiệu nổi</p>
        </div>
        <div className="container-NavBar-Sachtomtat margin20px-left">
          <p>Sách tóm tắt</p>
        </div>
        <div className="container-NavBar-Podcast margin20px-left">
          <p>Podcast</p>
        </div>
        <div className="container-NavBar-xemthem margin20px-left">
          <p>Xem thêm</p>
        </div>
      </div>
      {/* ---------------------------------------- */}

      <div className="container-NavBar-Search">
        <div className="Search">
          <input className="input-search"></input>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="container-NavBar-Goicuoc">
        <p>Gói cước</p>
      </div>
      <div className="container-NavBar-Dangky">
        <ModalRegister
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
      <div className="container-NavBar-DangNhap">
        <ModalLogin
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default NavBar;
