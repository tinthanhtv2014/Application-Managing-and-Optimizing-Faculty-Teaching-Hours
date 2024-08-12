export const calculateAuthorHours = (tongGio, tacGiaList) => {
  let gioTacGiaThuNhat = 0;
  let gioTacGiaChiuTrachNhiem = 0;
  let gioTacGiaThongThuong = 0;
  console.log("check lis = >", tacGiaList.length);
  if (tacGiaList.length === 1) {
    // Trường hợp chỉ có 1 tác giả

    gioTacGiaThongThuong = tongGio; // Nhận 100% tổng giờ
  } else {
    const vaiTro = tacGiaList.map((tacGia) => tacGia.loai); // Lấy vai trò từ danh sách tác giả
    const laVienChuc = tacGiaList.map((tacGia) => tacGia.laVienChuc); // Lấy thông tin viên chức từ danh sách tác giả
    const duocMien = tacGiaList.map((tacGia) => tacGia.duocMien); // Lấy thông tin miễn chuẩn từ danh sách tác giả

    const soTacGiaThuNhat = vaiTro.filter(
      (role) => role === "Tác giả thứ nhất"
    ).length; // Đếm số tác giả thứ nhất
    const soTacGiaChiuTrachNhiem = vaiTro.filter(
      (role) => role === "Tác giả chịu trách nhiệm"
    ).length; // Đếm số tác giả chịu trách nhiệm
    const soTacGiaKhac =
      vaiTro.length - soTacGiaThuNhat - soTacGiaChiuTrachNhiem; // Số tác giả khác

    const tacGiaThuNhat = tacGiaList.find(
      (tacGia) => tacGia.loai === "Tác giả thứ nhất"
    ); // Tìm tác giả thứ nhất

    if (tacGiaThuNhat) {
      if (tacGiaThuNhat.laVienChuc) {
        // Tác giả thứ nhất là viên chức của trường
        if (tacGiaThuNhat.duocMien) {
          // Tác giả thứ nhất được miễn chuẩn
          gioTacGiaThuNhat = 0;
          const gioConLai = tongGio * 0.5; // Giờ còn lại để phân phối

          if (soTacGiaChiuTrachNhiem > 0) {
            const soTacGiaConLai =
              soTacGiaKhac + (soTacGiaChiuTrachNhiem > 0 ? 1 : 0);
            // Chia đều giờ cho tác giả chịu trách nhiệm
            if (soTacGiaConLai > 0) {
              gioTacGiaChiuTrachNhiem = gioConLai / soTacGiaConLai;
              gioTacGiaThongThuong = gioConLai / soTacGiaConLai; // Phân bổ giờ cho các tác giả còn lại
            } else {
              gioTacGiaChiuTrachNhiem = gioConLai / soTacGiaConLai;
            }
          } else if (soTacGiaKhac > 0) {
            gioTacGiaThongThuong = gioConLai / soTacGiaKhac;
          }
        } else {
          // Tác giả thứ nhất không được miễn chuẩn
          gioTacGiaThuNhat = (tongGio * 0.5) / soTacGiaThuNhat; // Chia đều 50% cho các đồng tác giả thứ nhất
          const gioConLai = tongGio * 0.5; // Giờ còn lại để phân phối

          if (soTacGiaChiuTrachNhiem > 0) {
            const soTacGiaConLai =
              soTacGiaKhac + (soTacGiaChiuTrachNhiem > 0 ? 1 : 0);
            // Chia đều giờ cho tác giả chịu trách nhiệm
            if (soTacGiaConLai > 0) {
              gioTacGiaChiuTrachNhiem = gioConLai / soTacGiaConLai;
              gioTacGiaThongThuong = gioConLai / soTacGiaConLai; // Phân bổ giờ cho các tác giả còn lại
            } else {
              gioTacGiaChiuTrachNhiem = gioConLai / soTacGiaConLai;
            }
          } else if (soTacGiaKhac > 0) {
            gioTacGiaThongThuong = gioConLai / soTacGiaKhac;
          }
        }
      } else {
        // Tác giả thứ nhất không phải là viên chức của trường
        if (soTacGiaChiuTrachNhiem > 0) {
          if (soTacGiaChiuTrachNhiem === 2) {
            gioTacGiaChiuTrachNhiem = (tongGio * 0.5) / 2; // Chia đều 50% cho hai tác giả chịu trách nhiệm
          } else if (soTacGiaChiuTrachNhiem === 1) {
            gioTacGiaChiuTrachNhiem = tongGio * 0.3; // Tác giả chịu trách nhiệm nhận 30% tổng giờ
          }
        }

        const gioConLai = tongGio * 0.5; // Giờ còn lại để phân phối
        const soTacGiaConLai =
          soTacGiaKhac +
          (soTacGiaChiuTrachNhiem > 0 ? soTacGiaChiuTrachNhiem : 0); // Tổng số tác giả còn lại

        if (soTacGiaConLai > 0) {
          gioTacGiaThongThuong = gioConLai / soTacGiaConLai; // Phân bổ giờ cho các tác giả còn lại
        }
      }
    }
  }

  return {
    gioTacGiaThuNhat,
    gioTacGiaChiuTrachNhiem,
    gioTacGiaThongThuong,
  };
};
