export const calculateAuthorHours = (tongGio, tacGiaList) => {
  let gioTacGiaThuNhat = 0;
  let gioTacGiaChiuTrachNhiem = 0;
  let gioTacGiaThongThuong = 0;

  const vaiTro = tacGiaList.map((tacGia) => tacGia.loai); // Lấy vai trò từ danh sách tác giả
  const soTacGiaThuNhat = vaiTro.filter(
    (role) => role === "Tác giả thứ nhất"
  ).length; // Đếm số tác giả thứ nhất
  const soTacGiaChiuTrachNhiem = vaiTro.filter(
    (role) => role === "Tác giả chịu trách nhiệm"
  ).length; // Đếm số tác giả chịu trách nhiệm
  const soTacGiaKhac = vaiTro.length - soTacGiaThuNhat - soTacGiaChiuTrachNhiem; // Số tác giả khác

  // a. Giới hạn số tác giả thứ nhất và tác giả chịu trách nhiệm
  //   if (soTacGiaThuNhat > 2) {
  //     throw new Error("Chỉ xem xét tối đa 02 đồng tác giả thứ nhất.");
  //   }

  //   if (soTacGiaChiuTrachNhiem > 2) {
  //     throw new Error("Chỉ xem xét tối đa 02 đồng tác giả chịu trách nhiệm.");
  //   }

  // b. Tác giả thứ nhất là viên chức Trường ĐHTV
  if (soTacGiaThuNhat > 0) {
    gioTacGiaThuNhat = (tongGio * 0.5) / soTacGiaThuNhat; // Chia đều 50% cho các đồng tác giả thứ nhất
  }

  const gioConLai = tongGio * 0.5; // Giờ còn lại để phân phối

  if (soTacGiaChiuTrachNhiem > 0) {
    if (soTacGiaChiuTrachNhiem === 2) {
      gioTacGiaChiuTrachNhiem = gioConLai / 2; // Chia đều 50% cho hai tác giả chịu trách nhiệm
    } else if (soTacGiaChiuTrachNhiem === 1) {
      gioTacGiaChiuTrachNhiem = tongGio * 0.3; // Tác giả chịu trách nhiệm nhận 30% tổng giờ
    }
  }

  const soTacGiaConLai = soTacGiaKhac + (soTacGiaChiuTrachNhiem > 0 ? 1 : 0); // Tổng số tác giả còn lại

  if (soTacGiaConLai > 0) {
    gioTacGiaThongThuong = gioConLai / soTacGiaConLai; // Phân bổ giờ cho các tác giả còn lại
  }

  return {
    gioTacGiaThuNhat,
    gioTacGiaChiuTrachNhiem,
    gioTacGiaThongThuong,
  };
};
