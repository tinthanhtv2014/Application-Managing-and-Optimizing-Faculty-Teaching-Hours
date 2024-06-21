import React from "react";
import "../component/NavBar.scss";
const Carousel = () => {
  return (
    <div className="container-NavBar">
      <div className="container-NavBar-logo">
        <img
          className="NavBar-image"
          src={require("../public/image/logoweka.png")}
        />
      </div>
      <div className="container-NavBar-Sachdientu">
        <p>Sách điện tử</p>
      </div>
      <div className="container-NavBar-Sachnoi">
        <p>Sách nói</p>
      </div>
      <div className="container-NavBar-Sachhieunoi">
        <p>Sách hiệu nổi</p>
      </div>
      <div className="container-NavBar-Sachtomtat">
        <p>Sách tóm tắt</p>
      </div>
      <div className="container-NavBar-Podcast">
        <p>Podcast</p>
      </div>
      <div className="container-NavBar-xemthem">
        <p>Xem thêm</p>

        {/* ---------------------------------------- */}
      </div>
      <div className="container-NavBar-Search">
        <div className="Search">
          <input></input>
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="container-NavBar-Goicuoc">
        <p>Xem thêm</p>
      </div>
      <div className="container-NavBar-Dangky">
        <p>Xem thêm</p>
      </div>
      <div className="container-NavBar-DangNhap">
        <p>Xem thêm</p>
      </div>
    </div>
  );
};

export default Carousel;
