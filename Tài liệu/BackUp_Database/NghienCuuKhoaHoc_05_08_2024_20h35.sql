-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 05, 2024 lúc 03:35 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nghiencuukhoahoc`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bangphancong`
--

CREATE TABLE `bangphancong` (
  `MAPHANCONG` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `THOIGIANLAP` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bao_cao_ket_thuc_mon`
--

CREATE TABLE `bao_cao_ket_thuc_mon` (
  `MADANHGIAKETTHUC` int(11) NOT NULL,
  `MACHITIETPHANCONG` int(11) NOT NULL,
  `LANDANHGIA` int(11) DEFAULT NULL,
  `NGAYDANHGIA` date DEFAULT NULL,
  `NGAYBAOCAOKETTHUC` date DEFAULT NULL,
  `TRANG_THAI_DANG_KY` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bomon`
--

CREATE TABLE `bomon` (
  `MABOMON` int(11) NOT NULL,
  `MAKHOA` int(11) NOT NULL,
  `TENBOMON` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bomon`
--

INSERT INTO `bomon` (`MABOMON`, `MAKHOA`, `TENBOMON`) VALUES
(2, 1, 'Bộ Môn Công Nghệ Phần Mềm'),
(16, 11, 'Bộ môn Công nghệ thông tin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietphancong`
--

CREATE TABLE `chitietphancong` (
  `MACHITIETPHANCONG` int(11) NOT NULL,
  `MAMONHOC` int(11) NOT NULL,
  `MAPHANCONG` int(11) NOT NULL,
  `MALOP` varchar(255) NOT NULL,
  `MAHKNK` int(11) NOT NULL,
  `THOIGIANBATDAUPHANCONG` date DEFAULT NULL,
  `THOIGIANKETTHUCPHANCONG` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chon_khung`
--

CREATE TABLE `chon_khung` (
  `MAGV` varchar(255) NOT NULL,
  `MANAMHOC` int(11) NOT NULL,
  `MAKHUNG` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chucdanh`
--

CREATE TABLE `chucdanh` (
  `MACHUCDANH` int(11) NOT NULL,
  `TENCHUCDANH` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chucdanh`
--

INSERT INTO `chucdanh` (`MACHUCDANH`, `TENCHUCDANH`) VALUES
(1, 'Giảng viên cao cấp (Hạng I)'),
(2, 'Giảng viên chính (Hạng II)'),
(3, 'Giảng viên (Hạng III)'),
(4, 'Trợ Giảng'),
(5, 'Giảng viên Tập sự');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chucvu`
--

CREATE TABLE `chucvu` (
  `MACHUCVU` int(11) NOT NULL,
  `TENCHUCVU` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chucvu`
--

INSERT INTO `chucvu` (`MACHUCVU`, `TENCHUCVU`) VALUES
(1, 'Phó Trưởng Khoa'),
(2, 'Trưởng Bộ Môn'),
(3, 'Phó Trưởng Bộ Môn'),
(4, 'Giảng Viên Chính'),
(5, 'Giảng Viên'),
(6, 'Trưởng Khoa'),
(7, 'Bộ môn Công nghệ thông tin'),
(8, 'Phó Trưởng bộ môn CNTT'),
(9, 'Trưởng bộ môn CNTT');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuongtrinhdaotao`
--

CREATE TABLE `chuongtrinhdaotao` (
  `MACHUONGTRINH` int(11) NOT NULL,
  `MABOMON` int(11) NOT NULL,
  `TENCHUONGTRINH` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `co_chuc_danh`
--

CREATE TABLE `co_chuc_danh` (
  `MACHUCDANH` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `THOIGIANNHAN` date DEFAULT NULL,
  `TRANGTHAI` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `co_chuc_danh`
--

INSERT INTO `co_chuc_danh` (`MACHUCDANH`, `MAGV`, `THOIGIANNHAN`, `TRANGTHAI`) VALUES
(1, '00245', '2024-07-08', 'Đang giữ chức danh'),
(1, '00254', '2024-07-09', 'Đang giữ chức danh'),
(1, '99999', '2024-07-09', 'Đang giữ chức danh'),
(2, '00249', '2024-07-09', 'Đang giữ chức danh'),
(2, '00250', '2024-07-08', 'Đang giữ chức danh'),
(3, '12705', '2024-07-08', 'Đang giữ chức danh'),
(5, '00248', '2024-07-08', 'Đang giữ chức danh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `co_quy_dinh`
--

CREATE TABLE `co_quy_dinh` (
  `MA_QUY_DOI` int(11) NOT NULL,
  `MA_LOAI_DANH_MUC` int(11) NOT NULL,
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `SO_TAC_GIA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dang_ky_thuc_hien_quy_doi`
--

CREATE TABLE `dang_ky_thuc_hien_quy_doi` (
  `MA_DANH_MUC` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `MANAMHOC` int(11) NOT NULL,
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `SOGIOQUYDOI` int(11) DEFAULT NULL,
  `TEN_NGHIEN_CUU` text DEFAULT NULL,
  `THOI_GIAN_DANG_KY` date DEFAULT NULL,
  `TRANG_THAI_DANG_KY` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmucquydoispkhcn`
--

CREATE TABLE `danhmucquydoispkhcn` (
  `MA_DANH_MUC` int(11) NOT NULL,
  `MA_LOAI_DANH_MUC` int(11) NOT NULL,
  `GIO_CHUAN` int(11) DEFAULT NULL,
  `NOI_DUNG_DANH_MUC` text DEFAULT NULL,
  `ISBN` varchar(50) DEFAULT NULL,
  `WOS_SCOUPUS` varchar(50) DEFAULT NULL,
  `HANG_WOS_SCOUPUS` varchar(10) DEFAULT NULL,
  `LOI_NHUAN` varchar(100) DEFAULT NULL,
  `DON_VI_TINH` varchar(50) DEFAULT NULL,
  `GIAI_THUONG` varchar(50) DEFAULT NULL,
  `XEP_HANG_QUARTILES` varchar(50) DEFAULT NULL,
  `NAM_THUC_HIEN` text DEFAULT NULL,
  `TRANG_THAI_DANH_MUC` varchar(100) DEFAULT NULL,
  `GHI_CHU_DANH_MUC` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giangvien`
--

CREATE TABLE `giangvien` (
  `MAGV` varchar(255) NOT NULL,
  `MABOMON` int(11) NOT NULL,
  `TENGV` varchar(100) DEFAULT NULL,
  `EMAIL` text DEFAULT NULL,
  `DIENTHOAI` varchar(50) DEFAULT NULL,
  `DIACHI` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `giangvien`
--

INSERT INTO `giangvien` (`MAGV`, `MABOMON`, `TENGV`, `EMAIL`, `DIENTHOAI`, `DIACHI`) VALUES
('00241', 16, 'Nguyễn Hoàng Duy Thiện', NULL, NULL, NULL),
('00242', 16, 'Dương Ngọc Vân Khanh', NULL, NULL, NULL),
('00243', 16, 'Huỳnh Văn Thanh', NULL, NULL, NULL),
('00244', 16, 'Nguyễn Nhứt Lam', NULL, NULL, NULL),
('00245', 16, 'ưeqweqweq', 'annb@tvu.edu.vn', '0369258147', 'Mỹ'),
('00246', 16, 'Nguyễn Ngọc Đan Thanh', NULL, NULL, NULL),
('00248', 16, 'Hồ Hoàng Phúc Fix', 'duongminh@tvu.edu.vn', '0258741369', 'Đáy biển Đen'),
('00249', 16, 'Hà Thị Thúy Vi', 'Hattvi201084@tvu.edu.vn', '0123654987', 'Trà Vinh'),
('00250', 16, '', 'vothanhc@tvu.edu.vn', '', ''),
('00251', 16, 'Trịnh Quốc Việt', NULL, NULL, NULL),
('00252', 16, 'Trầm Hoàng Nam', NULL, NULL, NULL),
('00253', 16, 'Đoàn Phước Miền', NULL, NULL, NULL),
('00254', 16, 'Ngô Thanh Huy', 'huyngocntt@tvu.edu.vn', '', ''),
('00255', 16, 'Phạm Thị Trúc Mai', NULL, NULL, NULL),
('00257', 16, 'Nguyễn Mộng Hiền', 'hientvu@tvu.edu.vn', '0123456987', 'TV'),
('01027', 16, 'Nguyễn Khánh Duy ', NULL, NULL, NULL),
('01548', 16, 'Thạch Kọng SaOane', NULL, NULL, NULL),
('03539', 16, 'Lê Minh Tự', NULL, NULL, NULL),
('03546', 16, 'Phan Thị Phương Nam', NULL, NULL, NULL),
('03562', 16, 'Nguyễn Khắc Quốc', NULL, NULL, NULL),
('11012', 2, NULL, NULL, NULL, NULL),
('12700', 16, 'Khấu Văn Nhựt', NULL, NULL, NULL),
('12701', 16, 'Trần Văn Nam', NULL, NULL, NULL),
('12702', 16, 'Nguyễn Thừa Phát Tài', NULL, NULL, NULL),
('12705', 16, '', '', '', ''),
('14204', 16, 'Nguyễn Bá Nhiệm', NULL, NULL, NULL),
('99997', 16, 'Bảo Trưởng Khoa', 'baoquocone@gmail.com', '0325698741', 'Sao Hỏa'),
('99999', 16, 'Nguyễn Lâm Quốc Bảo', 'baoquoczero@gmail.com', '0987654321', 'Sao Hỏa');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giu_chuc_vu`
--

CREATE TABLE `giu_chuc_vu` (
  `MAGV` varchar(255) NOT NULL,
  `MACHUCVU` int(11) NOT NULL,
  `SOQUYETDINH` varchar(255) DEFAULT NULL,
  `TUNGAY` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `giu_chuc_vu`
--

INSERT INTO `giu_chuc_vu` (`MAGV`, `MACHUCVU`, `SOQUYETDINH`, `TUNGAY`) VALUES
('00244', 9, NULL, NULL),
('00245', 2, '99', '2024-07-08'),
('00248', 8, '99', '2024-07-08'),
('00249', 1, '99', '2024-07-09'),
('00254', 1, '99', '2024-07-09'),
('00257', 1, '99', '2024-07-08'),
('01548', 8, NULL, NULL),
('12705', 8, NULL, NULL),
('14204', 8, NULL, NULL),
('99999', 6, '99', '2024-07-09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinhthucdanhgia`
--

CREATE TABLE `hinhthucdanhgia` (
  `MADANHGIAKETTHUC` int(11) NOT NULL,
  `TENDANHGIA` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hockynienkhoa`
--

CREATE TABLE `hockynienkhoa` (
  `MAHKNK` int(11) NOT NULL,
  `TENHKNK` text DEFAULT NULL,
  `NGAYBATDAUNIENKHOA` date DEFAULT NULL,
  `NGAYKETTHUCNIENKHOA` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khoa`
--

CREATE TABLE `khoa` (
  `MAKHOA` int(11) NOT NULL,
  `TENKHOA` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khoa`
--

INSERT INTO `khoa` (`MAKHOA`, `TENKHOA`) VALUES
(1, 'Khoa Công Nghệ Thông Tin'),
(11, 'Khoa Kỹ Thuật Công Nghệ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khunggiochuan`
--

CREATE TABLE `khunggiochuan` (
  `MAKHUNG` int(11) NOT NULL,
  `MACHUCDANH` int(11) NOT NULL,
  `TENKHUNGCHUAN` text DEFAULT NULL,
  `GIOGIANGDAY_HANHCHINH` int(11) DEFAULT NULL,
  `GIOGIANGDAY_CHUAN` int(11) DEFAULT NULL,
  `GIONGHIENCUUKHOAHOC_HANHCHINH` int(11) DEFAULT NULL,
  `GIONGHIENCUUKHOAHOC_CHUAN` int(11) DEFAULT NULL,
  `GIOPHUCVUCONGDONG_HANHCHINH` int(11) DEFAULT NULL,
  `GIOPHUCVUCONGDONG_CHUAN` int(11) DEFAULT NULL,
  `GHICHU` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khunggiochuan`
--

INSERT INTO `khunggiochuan` (`MAKHUNG`, `MACHUCDANH`, `TENKHUNGCHUAN`, `GIOGIANGDAY_HANHCHINH`, `GIOGIANGDAY_CHUAN`, `GIONGHIENCUUKHOAHOC_HANHCHINH`, `GIONGHIENCUUKHOAHOC_CHUAN`, `GIOPHUCVUCONGDONG_HANHCHINH`, `GIOPHUCVUCONGDONG_CHUAN`, `GHICHU`) VALUES
(10, 1, 'Khung 1', 630, 210, 855, 285, 275, 91, NULL),
(11, 1, 'Khung 2', 810, 270, 720, 240, 230, 76, NULL),
(12, 1, 'Khung 3', 990, 330, 585, 195, 185, 61, NULL),
(13, 2, 'Khung 1', 630, 210, 765, 255, 365, 121, NULL),
(14, 2, 'Khung 2', 810, 270, 630, 210, 320, 106, NULL),
(15, 2, 'Khung 3', 990, 330, 495, 165, 275, 91, NULL),
(16, 3, 'Khung 1', 630, 210, 675, 225, 455, 151, NULL),
(17, 3, 'Khung 2', 810, 270, 540, 180, 410, 136, NULL),
(18, 3, 'Khung 3', 990, 330, 405, 135, 365, 121, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai_danh_muc`
--

CREATE TABLE `loai_danh_muc` (
  `MA_LOAI_DANH_MUC` int(11) NOT NULL,
  `TEN_LOAI_DANH_MUC` text DEFAULT NULL,
  `TRANG_THAI_DANH_MUC` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai_tac_gia`
--

CREATE TABLE `loai_tac_gia` (
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `TEN_LOAI_TAC_GIA` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lop`
--

CREATE TABLE `lop` (
  `MALOP` varchar(255) NOT NULL,
  `MACHUONGTRINH` int(11) NOT NULL,
  `TENLOP` text DEFAULT NULL,
  `NAMTUYENSINH` int(11) DEFAULT NULL,
  `SISO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `monhoc`
--

CREATE TABLE `monhoc` (
  `MAMONHOC` int(11) NOT NULL,
  `TENMONHOC` text DEFAULT NULL,
  `SOTINCHILYTHUYET` int(11) DEFAULT NULL,
  `SOTINCHITHUCHANH` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `namhoc`
--

CREATE TABLE `namhoc` (
  `MANAMHOC` int(11) NOT NULL,
  `TENNAMHOC` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `namhoc`
--

INSERT INTO `namhoc` (`MANAMHOC`, `TENNAMHOC`) VALUES
(5, 'Năm học 2020-2021'),
(6, 'Năm học 2021-2022'),
(7, 'Năm học 2022-2023'),
(8, 'Năm học 2023-2024');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quy_dinh`
--

CREATE TABLE `quy_dinh` (
  `MA_QUY_DINH` int(11) NOT NULL,
  `TEN_QUY_DINH` text DEFAULT NULL,
  `TRANG_THAI_QUY_DINH` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `TENDANGNHAP` varchar(255) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `MATKHAU` text DEFAULT NULL,
  `PHANQUYEN` text DEFAULT NULL,
  `TRANGTHAITAIKHOAN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`TENDANGNHAP`, `MAGV`, `MATKHAU`, `PHANQUYEN`, `TRANGTHAITAIKHOAN`) VALUES
('annb@tvu.edu.vn', '00245', NULL, 'Trưởng Khoa', 'Đang hoạt động'),
('baoquoczero@gmail.com', '99999', NULL, 'Admin', 'Đang hoạt động'),
('diemhanh_tvu@tvu.edu.vn', '12705', NULL, 'Giảng Viên', 'Đang hoạt động'),
('duongminh@tvu.edu.vn', '00248', NULL, 'Trưởng Bộ Môn', 'Đang hoạt động'),
('Hattvi201084@tvu.edu.vn', '00249', NULL, 'Trưởng Khoa', 'Đang hoạt động'),
('hientvu@tvu.edu.vn', '00257', NULL, 'Admin', 'Đang hoạt động'),
('huyngocntt@tvu.edu.vn', '00254', NULL, 'Admin', 'Đang hoạt động'),
('hvthanh@tvu.edu.vn', '00243', NULL, 'Giảng Viên', 'Đang hoạt động'),
('lamnn@tvu.edu.vn', '00244', NULL, 'Giảng Viên', 'Đang hoạt động'),
('lmtu@tvu.edu.vn', '03539', NULL, 'Giảng Viên', 'Đang hoạt động'),
('namtv@tvu.edu.vn', '12701', NULL, 'Giảng Viên', 'Đang hoạt động'),
('ngocdanthanhdt@tvu.edu.vn', '00246', NULL, 'Giảng Viên', 'Đang hoạt động'),
('nhiemnb@tvu.edu.vn', '14204', NULL, 'Giảng Viên', 'Đang hoạt động'),
('nhutkhau@tvu.edu.vn', '12700', NULL, 'Giảng Viên', 'Đang hoạt động'),
('nkduy@tvu.edu.vn', '01027', NULL, 'Giảng Viên', 'Đang hoạt động'),
('nkquoc@tvu.edu.vn', '03562', NULL, 'Giảng Viên', 'Đang hoạt động'),
('oane@tvu.edu.vn', '01548', NULL, 'Giảng Viên', 'Đang hoạt động'),
('phattai@tvu.edu.vn', '12702', NULL, 'Giảng Viên', 'Đang hoạt động'),
('phuocmien@tvu.edu.vn', '00253', NULL, 'Giảng Viên', 'Đang hoạt động'),
('ptpnam@tvu.edu.vn', '03546', NULL, 'Giảng Viên', 'Đang hoạt động'),
('pttmai@tvu.edu.vn', '00255', NULL, 'Giảng Viên', 'Đang hoạt động'),
('thiennhd@tvu.edu.vn', '00241', NULL, 'Giảng Viên', 'Đang hoạt động'),
('tqviettv@tvu.edu.vn', '00251', NULL, 'Giảng Viên', 'Đang hoạt động'),
('tramhoangnam@tvu.edu.vn', '00252', NULL, 'Giảng Viên', 'Đang hoạt động'),
('vankhanh@tvu.edu.vn', '00242', NULL, 'Giảng Viên', 'Đang hoạt động'),
('vothanhc@tvu.edu.vn', '00250', NULL, 'Giảng Viên', 'Đang hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thoigian_xacnhan`
--

CREATE TABLE `thoigian_xacnhan` (
  `MA_THOIGIAN_XACNHAN` int(11) NOT NULL,
  `THOIGIANBATDAU` datetime DEFAULT NULL,
  `THOIGIANKETTHUC` datetime DEFAULT NULL,
  `TEN_KHOA` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuoc`
--

CREATE TABLE `thuoc` (
  `MACHUONGTRINH` int(11) NOT NULL,
  `MAMONHOC` int(11) NOT NULL,
  `SOTHUTUHOCKI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ty_le_quy_doi_gio_chuan`
--

CREATE TABLE `ty_le_quy_doi_gio_chuan` (
  `MA_QUY_DOI` int(11) NOT NULL,
  `MA_QUY_DINH` int(11) NOT NULL,
  `TEN_QUY_DOI` text DEFAULT NULL,
  `TY_LE` float DEFAULT NULL,
  `TRANG_THAI_QUY_DOI` text DEFAULT NULL,
  `GHI_CHU_QUY_DOI` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bangphancong`
--
ALTER TABLE `bangphancong`
  ADD PRIMARY KEY (`MAPHANCONG`),
  ADD KEY `FK__UOC_PHAN_CONG` (`MAGV`);

--
-- Chỉ mục cho bảng `bao_cao_ket_thuc_mon`
--
ALTER TABLE `bao_cao_ket_thuc_mon`
  ADD PRIMARY KEY (`MADANHGIAKETTHUC`,`MACHITIETPHANCONG`),
  ADD KEY `FK_BAO_CAO_KET_THUC_MON2` (`MACHITIETPHANCONG`);

--
-- Chỉ mục cho bảng `bomon`
--
ALTER TABLE `bomon`
  ADD PRIMARY KEY (`MABOMON`),
  ADD KEY `FK_THUOC_KHOA` (`MAKHOA`);

--
-- Chỉ mục cho bảng `chitietphancong`
--
ALTER TABLE `chitietphancong`
  ADD PRIMARY KEY (`MACHITIETPHANCONG`),
  ADD KEY `FK_CO` (`MAPHANCONG`),
  ADD KEY `FK_PHAN_CONG_DAY` (`MALOP`),
  ADD KEY `FK_PHAN_CONG_HOC_KY_NIEN_KHOA` (`MAHKNK`),
  ADD KEY `FK_PHAN_CONG_MON_HOC` (`MAMONHOC`);

--
-- Chỉ mục cho bảng `chon_khung`
--
ALTER TABLE `chon_khung`
  ADD PRIMARY KEY (`MAGV`,`MANAMHOC`,`MAKHUNG`),
  ADD KEY `FK_CHON_KHUNG2` (`MANAMHOC`),
  ADD KEY `FK_CHON_KHUNG3` (`MAKHUNG`);

--
-- Chỉ mục cho bảng `chucdanh`
--
ALTER TABLE `chucdanh`
  ADD PRIMARY KEY (`MACHUCDANH`);

--
-- Chỉ mục cho bảng `chucvu`
--
ALTER TABLE `chucvu`
  ADD PRIMARY KEY (`MACHUCVU`);

--
-- Chỉ mục cho bảng `chuongtrinhdaotao`
--
ALTER TABLE `chuongtrinhdaotao`
  ADD PRIMARY KEY (`MACHUONGTRINH`),
  ADD KEY `FK_THUOC_CHUONG_TRINH__AO_TAO` (`MABOMON`);

--
-- Chỉ mục cho bảng `co_chuc_danh`
--
ALTER TABLE `co_chuc_danh`
  ADD PRIMARY KEY (`MACHUCDANH`,`MAGV`),
  ADD KEY `FK_CO_CHUC_DANH2` (`MAGV`);

--
-- Chỉ mục cho bảng `co_quy_dinh`
--
ALTER TABLE `co_quy_dinh`
  ADD PRIMARY KEY (`MA_QUY_DOI`,`MA_LOAI_DANH_MUC`,`MA_LOAI_TAC_GIA`),
  ADD KEY `FK_CO_QUY_DINH2` (`MA_LOAI_DANH_MUC`),
  ADD KEY `FK_CO_QUY_DINH3` (`MA_LOAI_TAC_GIA`);

--
-- Chỉ mục cho bảng `dang_ky_thuc_hien_quy_doi`
--
ALTER TABLE `dang_ky_thuc_hien_quy_doi`
  ADD PRIMARY KEY (`MA_DANH_MUC`,`MAGV`,`MANAMHOC`,`MA_LOAI_TAC_GIA`),
  ADD KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI2` (`MAGV`),
  ADD KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI3` (`MANAMHOC`),
  ADD KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI4` (`MA_LOAI_TAC_GIA`);

--
-- Chỉ mục cho bảng `danhmucquydoispkhcn`
--
ALTER TABLE `danhmucquydoispkhcn`
  ADD PRIMARY KEY (`MA_DANH_MUC`),
  ADD KEY `FK_THUOC_DANH_MUC` (`MA_LOAI_DANH_MUC`);

--
-- Chỉ mục cho bảng `giangvien`
--
ALTER TABLE `giangvien`
  ADD PRIMARY KEY (`MAGV`),
  ADD KEY `FK_THUOC_BO_MON` (`MABOMON`);

--
-- Chỉ mục cho bảng `giu_chuc_vu`
--
ALTER TABLE `giu_chuc_vu`
  ADD PRIMARY KEY (`MAGV`,`MACHUCVU`),
  ADD KEY `FK_GIU_CHUC_VU2` (`MACHUCVU`);

--
-- Chỉ mục cho bảng `hinhthucdanhgia`
--
ALTER TABLE `hinhthucdanhgia`
  ADD PRIMARY KEY (`MADANHGIAKETTHUC`);

--
-- Chỉ mục cho bảng `hockynienkhoa`
--
ALTER TABLE `hockynienkhoa`
  ADD PRIMARY KEY (`MAHKNK`);

--
-- Chỉ mục cho bảng `khoa`
--
ALTER TABLE `khoa`
  ADD PRIMARY KEY (`MAKHOA`);

--
-- Chỉ mục cho bảng `khunggiochuan`
--
ALTER TABLE `khunggiochuan`
  ADD PRIMARY KEY (`MAKHUNG`),
  ADD KEY `FK_CO_KHUNG_GIO_CHUAN` (`MACHUCDANH`);

--
-- Chỉ mục cho bảng `loai_danh_muc`
--
ALTER TABLE `loai_danh_muc`
  ADD PRIMARY KEY (`MA_LOAI_DANH_MUC`);

--
-- Chỉ mục cho bảng `loai_tac_gia`
--
ALTER TABLE `loai_tac_gia`
  ADD PRIMARY KEY (`MA_LOAI_TAC_GIA`);

--
-- Chỉ mục cho bảng `lop`
--
ALTER TABLE `lop`
  ADD PRIMARY KEY (`MALOP`),
  ADD KEY `FK_HOC` (`MACHUONGTRINH`);

--
-- Chỉ mục cho bảng `monhoc`
--
ALTER TABLE `monhoc`
  ADD PRIMARY KEY (`MAMONHOC`);

--
-- Chỉ mục cho bảng `namhoc`
--
ALTER TABLE `namhoc`
  ADD PRIMARY KEY (`MANAMHOC`);

--
-- Chỉ mục cho bảng `quy_dinh`
--
ALTER TABLE `quy_dinh`
  ADD PRIMARY KEY (`MA_QUY_DINH`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`TENDANGNHAP`),
  ADD KEY `FK_TAI_KHOAN_CUA_GIANG_VIEN` (`MAGV`);

--
-- Chỉ mục cho bảng `thoigian_xacnhan`
--
ALTER TABLE `thoigian_xacnhan`
  ADD PRIMARY KEY (`MA_THOIGIAN_XACNHAN`);

--
-- Chỉ mục cho bảng `thuoc`
--
ALTER TABLE `thuoc`
  ADD PRIMARY KEY (`MACHUONGTRINH`,`MAMONHOC`),
  ADD KEY `FK_THUOC2` (`MAMONHOC`);

--
-- Chỉ mục cho bảng `ty_le_quy_doi_gio_chuan`
--
ALTER TABLE `ty_le_quy_doi_gio_chuan`
  ADD PRIMARY KEY (`MA_QUY_DOI`),
  ADD KEY `FK_DUOC_QUY_DINH` (`MA_QUY_DINH`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bangphancong`
--
ALTER TABLE `bangphancong`
  MODIFY `MAPHANCONG` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `bomon`
--
ALTER TABLE `bomon`
  MODIFY `MABOMON` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `chucdanh`
--
ALTER TABLE `chucdanh`
  MODIFY `MACHUCDANH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `chucvu`
--
ALTER TABLE `chucvu`
  MODIFY `MACHUCVU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `chuongtrinhdaotao`
--
ALTER TABLE `chuongtrinhdaotao`
  MODIFY `MACHUONGTRINH` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `danhmucquydoispkhcn`
--
ALTER TABLE `danhmucquydoispkhcn`
  MODIFY `MA_DANH_MUC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `khoa`
--
ALTER TABLE `khoa`
  MODIFY `MAKHOA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `khunggiochuan`
--
ALTER TABLE `khunggiochuan`
  MODIFY `MAKHUNG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `loai_tac_gia`
--
ALTER TABLE `loai_tac_gia`
  MODIFY `MA_LOAI_TAC_GIA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `monhoc`
--
ALTER TABLE `monhoc`
  MODIFY `MAMONHOC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `namhoc`
--
ALTER TABLE `namhoc`
  MODIFY `MANAMHOC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `quy_dinh`
--
ALTER TABLE `quy_dinh`
  MODIFY `MA_QUY_DINH` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thoigian_xacnhan`
--
ALTER TABLE `thoigian_xacnhan`
  MODIFY `MA_THOIGIAN_XACNHAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bangphancong`
--
ALTER TABLE `bangphancong`
  ADD CONSTRAINT `FK__UOC_PHAN_CONG` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`);

--
-- Các ràng buộc cho bảng `bao_cao_ket_thuc_mon`
--
ALTER TABLE `bao_cao_ket_thuc_mon`
  ADD CONSTRAINT `FK_BAO_CAO_KET_THUC_MON` FOREIGN KEY (`MADANHGIAKETTHUC`) REFERENCES `hinhthucdanhgia` (`MADANHGIAKETTHUC`),
  ADD CONSTRAINT `FK_BAO_CAO_KET_THUC_MON2` FOREIGN KEY (`MACHITIETPHANCONG`) REFERENCES `chitietphancong` (`MACHITIETPHANCONG`);

--
-- Các ràng buộc cho bảng `bomon`
--
ALTER TABLE `bomon`
  ADD CONSTRAINT `FK_THUOC_KHOA` FOREIGN KEY (`MAKHOA`) REFERENCES `khoa` (`MAKHOA`);

--
-- Các ràng buộc cho bảng `chitietphancong`
--
ALTER TABLE `chitietphancong`
  ADD CONSTRAINT `FK_CO` FOREIGN KEY (`MAPHANCONG`) REFERENCES `bangphancong` (`MAPHANCONG`),
  ADD CONSTRAINT `FK_PHAN_CONG_DAY` FOREIGN KEY (`MALOP`) REFERENCES `lop` (`MALOP`),
  ADD CONSTRAINT `FK_PHAN_CONG_HOC_KY_NIEN_KHOA` FOREIGN KEY (`MAHKNK`) REFERENCES `hockynienkhoa` (`MAHKNK`),
  ADD CONSTRAINT `FK_PHAN_CONG_MON_HOC` FOREIGN KEY (`MAMONHOC`) REFERENCES `monhoc` (`MAMONHOC`);

--
-- Các ràng buộc cho bảng `chon_khung`
--
ALTER TABLE `chon_khung`
  ADD CONSTRAINT `FK_CHON_KHUNG` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`),
  ADD CONSTRAINT `FK_CHON_KHUNG2` FOREIGN KEY (`MANAMHOC`) REFERENCES `namhoc` (`MANAMHOC`),
  ADD CONSTRAINT `FK_CHON_KHUNG3` FOREIGN KEY (`MAKHUNG`) REFERENCES `khunggiochuan` (`MAKHUNG`);

--
-- Các ràng buộc cho bảng `chuongtrinhdaotao`
--
ALTER TABLE `chuongtrinhdaotao`
  ADD CONSTRAINT `FK_THUOC_CHUONG_TRINH__AO_TAO` FOREIGN KEY (`MABOMON`) REFERENCES `bomon` (`MABOMON`);

--
-- Các ràng buộc cho bảng `co_chuc_danh`
--
ALTER TABLE `co_chuc_danh`
  ADD CONSTRAINT `FK_CO_CHUC_DANH` FOREIGN KEY (`MACHUCDANH`) REFERENCES `chucdanh` (`MACHUCDANH`),
  ADD CONSTRAINT `FK_CO_CHUC_DANH2` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`);

--
-- Các ràng buộc cho bảng `co_quy_dinh`
--
ALTER TABLE `co_quy_dinh`
  ADD CONSTRAINT `FK_CO_QUY_DINH` FOREIGN KEY (`MA_QUY_DOI`) REFERENCES `ty_le_quy_doi_gio_chuan` (`MA_QUY_DOI`),
  ADD CONSTRAINT `FK_CO_QUY_DINH2` FOREIGN KEY (`MA_LOAI_DANH_MUC`) REFERENCES `loai_danh_muc` (`MA_LOAI_DANH_MUC`),
  ADD CONSTRAINT `FK_CO_QUY_DINH3` FOREIGN KEY (`MA_LOAI_TAC_GIA`) REFERENCES `loai_tac_gia` (`MA_LOAI_TAC_GIA`);

--
-- Các ràng buộc cho bảng `dang_ky_thuc_hien_quy_doi`
--
ALTER TABLE `dang_ky_thuc_hien_quy_doi`
  ADD CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI` FOREIGN KEY (`MA_DANH_MUC`) REFERENCES `danhmucquydoispkhcn` (`MA_DANH_MUC`),
  ADD CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI2` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`),
  ADD CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI3` FOREIGN KEY (`MANAMHOC`) REFERENCES `namhoc` (`MANAMHOC`),
  ADD CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI4` FOREIGN KEY (`MA_LOAI_TAC_GIA`) REFERENCES `loai_tac_gia` (`MA_LOAI_TAC_GIA`);

--
-- Các ràng buộc cho bảng `danhmucquydoispkhcn`
--
ALTER TABLE `danhmucquydoispkhcn`
  ADD CONSTRAINT `FK_THUOC_DANH_MUC` FOREIGN KEY (`MA_LOAI_DANH_MUC`) REFERENCES `loai_danh_muc` (`MA_LOAI_DANH_MUC`);

--
-- Các ràng buộc cho bảng `giangvien`
--
ALTER TABLE `giangvien`
  ADD CONSTRAINT `FK_THUOC_BO_MON` FOREIGN KEY (`MABOMON`) REFERENCES `bomon` (`MABOMON`);

--
-- Các ràng buộc cho bảng `giu_chuc_vu`
--
ALTER TABLE `giu_chuc_vu`
  ADD CONSTRAINT `FK_GIU_CHUC_VU` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`),
  ADD CONSTRAINT `FK_GIU_CHUC_VU2` FOREIGN KEY (`MACHUCVU`) REFERENCES `chucvu` (`MACHUCVU`);

--
-- Các ràng buộc cho bảng `khunggiochuan`
--
ALTER TABLE `khunggiochuan`
  ADD CONSTRAINT `FK_CO_KHUNG_GIO_CHUAN` FOREIGN KEY (`MACHUCDANH`) REFERENCES `chucdanh` (`MACHUCDANH`);

--
-- Các ràng buộc cho bảng `lop`
--
ALTER TABLE `lop`
  ADD CONSTRAINT `FK_HOC` FOREIGN KEY (`MACHUONGTRINH`) REFERENCES `chuongtrinhdaotao` (`MACHUONGTRINH`);

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `FK_TAI_KHOAN_CUA_GIANG_VIEN` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`);

--
-- Các ràng buộc cho bảng `thuoc`
--
ALTER TABLE `thuoc`
  ADD CONSTRAINT `FK_THUOC` FOREIGN KEY (`MACHUONGTRINH`) REFERENCES `chuongtrinhdaotao` (`MACHUONGTRINH`),
  ADD CONSTRAINT `FK_THUOC2` FOREIGN KEY (`MAMONHOC`) REFERENCES `monhoc` (`MAMONHOC`);

--
-- Các ràng buộc cho bảng `ty_le_quy_doi_gio_chuan`
--
ALTER TABLE `ty_le_quy_doi_gio_chuan`
  ADD CONSTRAINT `FK_DUOC_QUY_DINH` FOREIGN KEY (`MA_QUY_DINH`) REFERENCES `quy_dinh` (`MA_QUY_DINH`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
