import GiangVienProfile from "./component/componentGV";

const AccountGV = () => {
  const giangVien = {
    avatar: "link-to-avatar.jpg", // Thay thế bằng link tới ảnh đại diện của giảng viên
    ten: "Nguyen Van A",
    email: "nguyenvana@example.com",
    dienThoai: "0123456789",
    diaChi: "123 ABC Street, Ho Chi Minh City",
    boMon: "Khoa Công Nghệ Thông Tin",
    trangThaiTaiKhoan: "Đang hoạt động",
  };
  return (
    <>
      <GiangVienProfile giangVien={giangVien} />,
    </>
  );
};
export default AccountGV;
