import React from "react";
import "../component/componentGV.scss";

const GiangVienProfile = ({ giangVien }) => {
  return (
    <div className="giang-vien-profile">
      <div className="profile-header">
        <img
          src={giangVien.avatar}
          alt={`${giangVien.ten} avatar`}
          className="profile-avatar"
        />
        <h2 className="profile-name">{giangVien.ten}</h2>
      </div>
      <div className="profile-details">
        <p>
          <strong>Email:</strong> {giangVien.email}
        </p>
        <p>
          <strong>Điện thoại:</strong> {giangVien.dienThoai}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {giangVien.diaChi}
        </p>
        <p>
          <strong>Bộ môn:</strong> {giangVien.boMon}
        </p>
        <p>
          <strong>Trạng thái tài khoản:</strong> {giangVien.trangThaiTaiKhoan}
        </p>
      </div>
    </div>
  );
};

export default GiangVienProfile;
