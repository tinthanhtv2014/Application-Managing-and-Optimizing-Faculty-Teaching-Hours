export const calculateAuthorHours = (
  tongGio,
  vaiTro,
  laVienChucTacGiaThuNhat,
  duocMienTrachNhiemTacGiaThuNhat
) => {
  let gioTacGiaThuNhat = 0;
  let gioTacGiaChiuTrachNhiem = 0;
  let gioTacGiaThongThuong = 0;

  if (laVienChucTacGiaThuNhat) {
    // Trường hợp b: Tác giả thứ nhất là viên chức của trường
    gioTacGiaThuNhat = tongGio * 0.5; // Tác giả thứ nhất nhận 50% tổng giờ
    const gioConLai = tongGio * 0.5; // Giờ còn lại để phân phối cho các tác giả khác
    const soTacGiaKhac = vaiTro.length - 1; // Số lượng tác giả khác

    if (soTacGiaKhac > 0) {
      gioTacGiaChiuTrachNhiem = gioConLai / soTacGiaKhac; // Phân bổ giờ cho các tác giả khác
      gioTacGiaThongThuong = gioTacGiaChiuTrachNhiem; // Tác giả thông thường nhận giờ như tác giả chịu trách nhiệm
    }
  } else {
    // Trường hợp c: Tác giả thứ nhất không phải là viên chức của trường
    if (vaiTro.includes("tacGiaChiuTrachNhiem")) {
      const soTacGiaChiuTrachNhiem = vaiTro.filter(
        (role) => role === "tacGiaChiuTrachNhiem"
      ).length; // Đếm số tác giả chịu trách nhiệm

      if (soTacGiaChiuTrachNhiem === 2) {
        // Nếu có hai tác giả chịu trách nhiệm
        gioTacGiaChiuTrachNhiem = (tongGio * 0.5) / 2; // Chia đôi giờ cho hai tác giả
      } else if (soTacGiaChiuTrachNhiem === 1) {
        // Nếu có một tác giả chịu trách nhiệm
        gioTacGiaChiuTrachNhiem = tongGio * 0.3; // Tác giả chịu trách nhiệm nhận 30% tổng giờ
      }

      const soTacGiaKhac = vaiTro.length - 1 - soTacGiaChiuTrachNhiem; // Tính số tác giả khác

      if (soTacGiaKhac > 0) {
        gioTacGiaThongThuong =
          (tongGio * 0.5 - gioTacGiaChiuTrachNhiem) / soTacGiaKhac; // Phân bổ giờ cho tác giả thông thường
      }
    } else {
      // Nếu không có tác giả chịu trách nhiệm
      const soTacGiaKhac = vaiTro.length - 1; // Tính số tác giả khác

      if (soTacGiaKhac > 0) {
        gioTacGiaThongThuong = (tongGio * 0.5) / soTacGiaKhac; // Chia đều giờ cho các tác giả khác
      }
    }
  }

  if (duocMienTrachNhiemTacGiaThuNhat) {
    // Trường hợp d: Tác giả thứ nhất là viên chức của trường nhưng không phải thực hiện chuẩn
    const soTacGiaKhac = vaiTro.length - 1; // Tính số tác giả khác

    if (soTacGiaKhac > 0) {
      gioTacGiaThongThuong = (tongGio * 0.5) / soTacGiaKhac; // Chia đều giờ cho các tác giả khác
    }
  }

  return {
    gioTacGiaThuNhat,
    gioTacGiaChiuTrachNhiem,
    gioTacGiaThongThuong,
  };
};
