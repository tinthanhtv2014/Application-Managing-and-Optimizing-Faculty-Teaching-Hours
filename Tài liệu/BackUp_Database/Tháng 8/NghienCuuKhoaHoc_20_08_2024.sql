-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 20, 2024 lúc 02:59 PM
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
(16, 11, 'Bộ môn Công nghệ thông tin'),
(18, 12, 'Ngoài trường');

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

--
-- Đang đổ dữ liệu cho bảng `chon_khung`
--

INSERT INTO `chon_khung` (`MAGV`, `MANAMHOC`, `MAKHUNG`) VALUES
('99999', 8, 10);

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
(1, '0122', '2024-08-08', 'Đang giữ chức danh'),
(1, '0123', '2024-08-14', 'Đang giữ chức danh'),
(1, '99999', '2024-06-30', 'Đang giữ chức danh'),
(2, '00249', '2024-07-09', 'Đang giữ chức danh'),
(2, '00250', '2024-07-08', 'Đang giữ chức danh'),
(3, '12705', '2024-07-08', 'Đang giữ chức danh'),
(5, '00248', '2024-07-08', 'Đang giữ chức danh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `co_ty_le`
--

CREATE TABLE `co_ty_le` (
  `MA_QUY_DOI` int(11) NOT NULL,
  `MA_LOAI_DANH_MUC` int(11) NOT NULL,
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `DA_LOAI_TAC_GIA` varchar(50) DEFAULT NULL,
  `SO_TAC_GIA_THUOC_LOAI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `co_ty_le`
--

INSERT INTO `co_ty_le` (`MA_QUY_DOI`, `MA_LOAI_DANH_MUC`, `MA_LOAI_TAC_GIA`, `DA_LOAI_TAC_GIA`, `SO_TAC_GIA_THUOC_LOAI`) VALUES
(8, 2, 1, 'Không', 2),
(9, 2, 2, 'Có', 0),
(9, 2, 3, 'Có', 0),
(10, 2, 1, 'Không', 2),
(11, 2, 2, 'Không', 2),
(12, 2, 2, 'Không', 1),
(13, 2, 1, 'Có', 1),
(13, 2, 3, 'Có', 0),
(14, 2, 1, 'Không', 1),
(15, 2, 1, 'Có', 1),
(15, 2, 2, 'Có', 0),
(15, 2, 3, 'Có', 0);

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

--
-- Đang đổ dữ liệu cho bảng `dang_ky_thuc_hien_quy_doi`
--

INSERT INTO `dang_ky_thuc_hien_quy_doi` (`MA_DANH_MUC`, `MAGV`, `MANAMHOC`, `MA_LOAI_TAC_GIA`, `SOGIOQUYDOI`, `TEN_NGHIEN_CUU`, `THOI_GIAN_DANG_KY`, `TRANG_THAI_DANG_KY`) VALUES
(1, '00248', 8, 3, 49, 'Bảo Trưởng Khoa', '2024-08-20', 'Đã đăng ký'),
(1, '0123', 8, 2, 59, 'Báo Cáo lĩnh vực cao nguyên hải sản', '2024-08-15', 'Đã đăng ký'),
(1, '99997', 8, 2, 49, 'Bảo Trưởng Khoa', '2024-08-20', 'Đã đăng ký'),
(1, '99999', 8, 1, 98, 'Bảo Trưởng Khoa', '2024-08-20', 'Đã đăng ký'),
(1, 'GVNT22424', 8, 3, 98, 'Báo Cáo lĩnh vực cao nguyên hải sản', '2024-08-15', 'Đã đăng ký'),
(1, 'GVNT8909', 8, 1, 0, 'Báo Cáo lĩnh vực cao nguyên hải sản', '2024-08-15', 'Đã đăng ký');

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

--
-- Đang đổ dữ liệu cho bảng `danhmucquydoispkhcn`
--

INSERT INTO `danhmucquydoispkhcn` (`MA_DANH_MUC`, `MA_LOAI_DANH_MUC`, `GIO_CHUAN`, `NOI_DUNG_DANH_MUC`, `ISBN`, `WOS_SCOUPUS`, `HANG_WOS_SCOUPUS`, `LOI_NHUAN`, `DON_VI_TINH`, `GIAI_THUONG`, `XEP_HANG_QUARTILES`, `NAM_THUC_HIEN`, `TRANG_THAI_DANH_MUC`, `GHI_CHU_DANH_MUC`) VALUES
(1, 2, 195, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 1 Điều 11.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu có mã số ISBN'),
(2, 2, 98, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 1 Điều 11.', 'Không', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu không có mã số ISBN'),
(3, 2, 255, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 2 Điều 11.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu (proceedings) có mã số ISBN'),
(4, 2, 195, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 2 Điều 11.', 'Không', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu (proceedings) không có mã số ISBN'),
(5, 2, 98, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 3 Điều 11.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu/proceedings có mã số ISBN'),
(6, 2, 49, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 3 Điều 11.', 'Không', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu/proceedings không có mã số ISBN'),
(7, 2, 64, 'Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu hội nghị hội thảo chuyên ngành bên ngoài trường có phản biện, sử dụng ngôn ngữ tiếng Việt và các hội thảo hội nghị khác có chỉ số ISBN', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(8, 2, 234, 'Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu (proceedings) hội nghị hội thảo quốc tế xuất bản bằng ngôn ngữ tiếng Anh có phản biện, có chỉ số ISBN không thuộc danh mục WoS/Scopus.', 'Có', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(9, 2, 378, ' Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu (proceedings) hội nghị hội thảo quốc tế xuất bản bằng ngôn ngữ tiếng Anh, có chỉ số ISBN thuộc danh mục WoS/Scopus.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(10, 2, 0, 'Các báo cáo khoa học/ tham luận đăng toàn văn hoặc tóm tắt tại hội thảo/hội nghị đặc biệt khác phục vụ cho quan hệ đối ngoại, nâng cao hình ảnh và vị thế của Trường ĐHTV, thì các đơn vị được giao tổ chức/tham gia sự kiện phối hợp với Phòng KHCN để trình Hiệu trưởng xem xét, quyết định mức giờ chuẩn quy đổi cụ thể trước khi thực hiện.', 'Không rõ', 'Không rõ', 'Không rõ', 'Không rõ', 'Không rõ', 'Không rõ', 'Không rõ', '2024-2025', 'Đang áp dụng', 'Hiệu trưởng xem xét, quyết định mức giờ chuẩn quy đổi cụ thể trước khi thực hiện.'),
(11, 3, 195, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, không được tính điểm công trình của HĐGSNN.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Tạp chí khoa học Trường ĐHTV'),
(12, 3, 146, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, không được tính điểm công trình của HĐGSNN.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các tập chí khác'),
(13, 3, 235, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, được tính điểm công trình của HĐGSNN (tạp chí khoa học trong nước có uy tín).', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Tạp chí khoa học Trường ĐHTV'),
(14, 3, 195, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, được tính điểm công trình của HĐGSNN (tạp chí khoa học trong nước có uy tín).', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các tạp chí khác'),
(15, 3, 244, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước hoặc quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, không có trong danh mục WoS/Scopus', 'Có', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Tạp chí khoa học Trường ĐHTV'),
(16, 3, 195, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước hoặc quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, không có trong danh mục WoS/Scopus', 'Có', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các tạp chí khác'),
(17, 3, 420, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS/Scopus (tạp chí khoa học quốc tế uy tín), không được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không được xếp hạng'),
(18, 3, 855, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q1', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(19, 3, 642, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q2', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(20, 3, 535, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q3', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(21, 3, 428, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q4', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(22, 3, 1050, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q1', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(23, 3, 855, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q2', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(24, 3, 642, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q3', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(25, 3, 535, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q4', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(26, 3, 98, 'Các sản phẩm KH&CN công bố bởi viên chức (chỉ tính đối với tác giả thứ nhất hoặc tác giả chịu trách nhiệm trong trường hợp tác giả thứ nhất không phải viên chức của Trường ĐHTV, trường hợp đồng tác giả thứ nhất hoặc đồng tác giả chịu trách nhiệm thì chia đôi) được xuất bản bởi các tạp chí và nhà xuất bản quốc tế uy tín (nằm trong danh mục WoS/Scopus) mà tên đơn vị của Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations) thì được tính giờ nhiệm vụ NCKH là 98 giờ, đứng thứ nhất được tính 195 giờ.', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations)'),
(27, 3, 195, 'Các sản phẩm KH&CN công bố bởi viên chức (chỉ tính đối với tác giả thứ nhất hoặc tác giả chịu trách nhiệm trong trường hợp tác giả thứ nhất không phải viên chức của Trường ĐHTV, trường hợp đồng tác giả thứ nhất hoặc đồng tác giả chịu trách nhiệm thì chia đôi) được xuất bản bởi các tạp chí và nhà xuất bản quốc tế uy tín (nằm trong danh mục WoS/Scopus) mà tên đơn vị của Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations) thì được tính giờ nhiệm vụ NCKH là 98 giờ, đứng thứ nhất được tính 195 giờ.', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Trường ĐHTV đứng thứ nhất'),
(28, 3, 390, 'Bằng độc quyền Giải pháp hữu ích Việt Nam', 'Không', 'Không', 'Không', 'Không', 'Bằng', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các sản phẩm SHTT (đơn vị tính trên 01 bằng).'),
(29, 3, 488, 'Bằng độc quyền sáng chế (chuẩn patent Việt Nam)', 'Không', 'Không', 'Không', 'Không', 'Bằng', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các sản phẩm SHTT (đơn vị tính trên 01 bằng).'),
(30, 3, 585, 'Bằng độc quyền sáng chế chuẩn Patent của Mỹ/ của Châu Âu/ của Đông Bắc Á', 'Không', 'Không', 'Không', 'Không', 'Bằng', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các sản phẩm SHTT (đơn vị tính trên 01 bằng).'),
(31, 4, 295, 'Sách chuyên khảo', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(32, 4, 295, 'Giáo trình', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(33, 4, 295, 'Sách tham khảo', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(34, 4, 295, 'Sách hướng dẫn, tự điển chuyên ngành, sách bài tập, sách dịch', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(35, 4, 1500, 'Xuất bản sách phục vụ đào tạo do một nhà xuất bản có uy tín (top 10, thuộc danh mục WoS/Scopus) trên thế giới xuất bản', 'Có', 'Có', 'Top 10', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Top 10, thuộc danh mục WoS/Scopus'),
(36, 4, 342, 'Xuất bản sách phục vụ đào tạo do một nhà xuất bản có uy tín (top 1000, thuộc danh mục WoS/Scopus) trên thế giới xuất bản', 'Có', 'Có', 'Top 1000', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Top 1000, thuộc danh mục WoS/Scopus'),
(37, 4, 390, 'Xuất bản chương sách phục vụ đào tạo do một nhà xuất bản có uy tín (top 10, thuộc danh mục WoS/Scopus) trên thế giới xuất bản', 'Có', 'Có', 'Top 10', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Top 10, thuộc danh mục WoS/Scopus'),
(38, 4, 145, 'Xuất bản chương sách phục vụ đào tạo do một nhà xuất bản có uy tín (top 1000, thuộc danh mục WoS/Scopus) trên thế giới xuất bản', 'Có', 'Có', 'Top 1000', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Top 1000, thuộc danh mục WoS/Scopus'),
(39, 4, 115, 'Chương sách nằm trong bộ sách nâng cấp từ bài báo khoa học/báo cáo khoa học (tham luận toàn văn) đã công bố thuộc danh mục WoS/Scopus.', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(40, 5, 100, 'Viết thuyết minh nhiệm vụ KH&CN cấp quốc gia, cấp bộ và tương đương;', 'Không', 'Không', 'Không', 'Không', 'Thuyết minh', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(41, 5, 50, 'Viết thuyết minh nhiệm vụ KH&CN cấp tỉnh và tương đương;', 'Không', 'Không', 'Không', 'Không', 'Thuyết minh', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(42, 5, 40, 'Viết thuyết minh/đề xuất dự án quốc tế được Trường ĐHTV giao', 'Không', 'Không', 'Không', 'Không', 'Thuyết minh', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(43, 5, 98, 'Viết hồ sơ đăng ký sáng chế Việt Nam được Trường ĐHTV giao;', 'Không', 'Không', 'Không', 'Không', 'Hồ sơ', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(44, 5, 195, 'Viết hồ sơ đăng ký sáng chế quốc tế được Trường ĐHTV giao;', 'Không', 'Không', 'Không', 'Không', 'Hồ sơ', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(45, 5, 78, 'Viết hồ sơ đăng ký giải pháp hữu ích Việt Nam được Trường ĐHTV giao;', 'Không', 'Không', 'Không', 'Không', 'Hồ sơ', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(46, 5, 98, 'Thiết kế đồ hoạ sản phẩm SHTT được Trường ĐHTV sử dụng đăng ký;', 'Không', 'Không', 'Không', 'Không', 'Sản Phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(47, 5, 10, 'Phản biện bài báo khoa học trong nước;', 'Không', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(48, 5, 20, 'Phản biện bài báo khoa học quốc tế;', 'Không', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(49, 5, 8, 'Phản biện bài báo cáo (tham luận) hội thảo hội nghị khoa học trong nước;', 'Không', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(50, 5, 15, 'Phản biện bài báo cáo (tham luận) hội thảo hội nghị khoa học quốc tế;', 'Không', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(51, 5, 10, 'Bài báo khoa học đăng trên các tạp chí quốc tế nằm trong danh mục WoS/Scopus có trích dẫn bài báo khoa học đăng trên tạp chí khoa học Trường ĐHTV (tính cho tác giả thứ nhất, trường hợp tác giả thứ nhất không phải là viên chức Trường ĐHTV thì tính cho tác giả chịu trách nhiệm)', 'Không', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(52, 5, 46, 'Hướng dẫn người học thực hiện đề tài NCKH cấp Trường và tương đương được nghiệm thu đạt;', 'Không', 'Không', 'Không', 'Không', 'Đề tài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(53, 5, 98, 'Hướng dẫn người học thực hiện đề tài NCKH cấp Trường và tương đương được nghiệm thu đạt loại xuất sắc;', 'Không', 'Không', 'Không', 'Không', 'Đề tài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(54, 5, 195, 'Hướng dẫn người học có kết quả nghiên cứu được áp dụng, triển khai đem lại lợi nhuận tính theo mỗi 25 triệu đồng', 'Không', 'Không', 'Không', '25 triệu đồng', 'Sản Phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', '195/25 triệu đồng'),
(55, 5, 195, 'Hướng dẫn người học tham gia các giải thưởng KH&CN trong nước cấp tỉnh hoặc tương đương đạt huy chương vàng (giải nhất)', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Vàng (giải nhất)', 'Không', '2024-2025', 'Đang áp dụng', 'Vàng (giải nhất)'),
(56, 5, 137, 'Hướng dẫn người học tham gia các giải thưởng KH&CN trong nước cấp tỉnh hoặc tương đương đạt huy chương bạc (giải nhì)', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Bạc (giải nhì)', 'Không', '2024-2025', 'Đang áp dụng', 'Bạc (giải nhì)'),
(57, 5, 98, 'Hướng dẫn người học tham gia các giải thưởng KH&CN trong nước cấp tỉnh hoặc tương đương đạt huy chương đồng (giải ba);', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Đồng (giải ba);', 'Không', '2024-2025', 'Đang áp dụng', 'Đồng (giải ba);'),
(58, 5, 390, 'Hướng dẫn người học tham gia các 3 giải thưởng KH&CN trong nước cấp vùng trở lên đạt huy chương vàng (giải nhất)', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Vàng (giải nhất)', 'Không', '2024-2025', 'Đang áp dụng', 'Vàng (giải nhất)'),
(59, 5, 273, 'Hướng dẫn người học tham gia các 3 giải thưởng KH&CN trong nước cấp vùng trở lên đạt huy chương bạc (giải nhì)', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Bạc (giải nhì)', 'Không', '2024-2025', 'Đang áp dụng', 'Bạc (giải nhì)'),
(60, 5, 195, 'Hướng dẫn người học tham gia các 3 giải thưởng KH&CN trong nước cấp vùng trở lên đạt huy chương đồng (giải ba)', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Đồng (giải ba);', 'Không', '2024-2025', 'Đang áp dụng', 'Đồng (giải ba);'),
(61, 5, 49, 'Hướng dẫn người học tham gia các 3 giải thưởng KH&CN trong nước cấp vùng trở lên đạt giải khuyến khích và không đạt giải;', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Giải khuyến khích và không đạt giải;', 'Không', '2024-2025', 'Đang áp dụng', 'Giải khuyến khích và không đạt giải;'),
(62, 5, 273, 'Hướng dẫn người học tham gia các 2 cuộc thi về học thuật (Olympic Tin học, Toán học, Hóa học,...) trong nước cấp vùng trở lên đạt huy chương vàng (giải nhất)', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Vàng (giải nhất)', 'Không', '2024-2025', 'Đang áp dụng', 'Vàng (giải nhất)'),
(63, 5, 195, 'Hướng dẫn người học tham gia các 2 cuộc thi về học thuật (Olympic Tin học, Toán học, Hóa học,...) trong nước cấp vùng trở lên đạt huy chương bạc (giải nhì)', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Bạc (giải nhì)', 'Không', '2024-2025', 'Đang áp dụng', 'Bạc (giải nhì)'),
(64, 5, 137, 'Hướng dẫn người học tham gia các 2 cuộc thi về học thuật (Olympic Tin học, Toán học, Hóa học,...) trong nước cấp vùng trở lên đạt huy chương đồng (giải ba)', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Đồng (giải ba);', 'Không', '2024-2025', 'Đang áp dụng', 'Đồng (giải ba);'),
(65, 5, 49, 'Hướng dẫn người học tham gia các 2 cuộc thi về học thuật (Olympic Tin học, Toán học, Hóa học,...) trong nước cấp vùng trở lên đạt khuyến khích và không đạt giải;', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Giải khuyến khích và không đạt giải;', 'Không', '2024-2025', 'Đang áp dụng', 'Giải khuyến khích và không đạt giải;'),
(66, 5, 390, 'Hướng dẫn người học tham gia các giải thưởng khởi nghiệp từ cấp bộ hoặc tương đương trở lên.', 'Không', 'Không', 'Không', 'Không', 'Giải thưởng', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(67, 5, 195, 'Tham gia thực hiện Dự án nghiên cứu bên ngoài Trường với mức kinh phí dự án từ 100 triệu trở lên (do đơn vị bên ngoài Trường cấp kinh phí thực hiện và thông qua BGH kí Hợp đồng) và có số tiền trích nộp về Trường/giảng viên từ 25 triệu đồng trở lên;', 'Không', 'Không', 'Không', '25 triệu đồng', 'Dự án', 'Không', 'Không', '2024-2025', 'Đang áp dụng', '195 giờ/thành viên có trích nộp về Trường theo quy định.'),
(68, 5, 195, 'Tham gia thực hiện hoạt động sản xuất dịch vụ với lợi nhuận có trích nộp về Trường/giảng viên từ 25 triệu đồng trở lên;', 'Không', 'Không', 'Không', '25 triệu đồng', 'Hoạt động', 'Không', 'Không', '2024-2025', 'Đang áp dụng', '195 giờ/thành viên có trích nộp về Trường theo quy định.'),
(69, 5, 195, 'Biên soạn 01 bộ ngân hàng câu hỏi trắc nghiệm trên máy tính (tối thiểu 400 câu) không nhận thù lao biên soạn.', 'Không', 'Không', 'Không', 'Không', 'Bộ ngân hàng câu hỏi', 'Không', 'Không', '2024-2025', 'Đang áp dụng', '(tối thiểu 400 câu) không nhận thù lao biên soạn.'),
(70, 6, 195, 'Đề tài KH&CN cấp Trường ĐHTV, cấp huyện hoặc tương đương được nghiệm thu đạt;', 'Không', 'Không', 'Không', 'Không', 'Đề tài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(71, 6, 390, 'Đề tài KH&CN cấp Bộ, Tỉnh, Thành phố (TP) thuộc Trung ương được nghiệm thu đạt có kinh phí ≥ 500 triệu đồng;', 'Không', 'Không', 'Không', 'Không', 'Đề tài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Được nghiệm thu đạt có kinh phí ≥ 500 triệu đồng;'),
(72, 6, 244, 'Đề tài KH&CN cấp Bộ, Tỉnh, TP thuộc Trung ương được nghiệm thu đạt có kinh phí < 500 triệu đồng;', 'Không', 'Không', 'Không', 'Không', 'Đề tài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Được nghiệm thu đạt có kinh phí < 500 triệu đồng;'),
(73, 6, 488, 'Đề tài KH&CN cấp Quốc gia được nghiệm thu đạt;', 'Không', 'Không', 'Không', 'Không', 'Đề tài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(74, 6, 293, 'Dự án KH&CN đem lại lợi nhuận trên 100 triệu và dưới 300 triệu đồng;', 'Không', 'Không', 'Không', 'Không', 'Dự án', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Lợi nhuận trên 100 triệu và dưới 300 triệu đồng;'),
(75, 6, 390, 'Dự án KH&CN đem lại lợi nhuận từ trên 300 triệu đồng đến 500 triệu đồng;', 'Không', 'Không', 'Không', 'Không', 'Dự án', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Lợi nhuận từ trên 300 triệu đồng đến 500 triệu đồng;'),
(76, 6, 585, 'Dự án KH&CN đem lại lợi nhuận từ trên 500 triệu đồng;', 'Không', 'Không', 'Không', 'Không', 'Dự án', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Lợi nhuận từ trên 500 triệu đồng;'),
(77, 6, 0, 'Các trường hợp khác (đề tài/dự án hợp tác doanh nghiệp, hợp tác quốc tế, nghị định thư, ...) không nêu trong quy chế các đơn vị làm tờ trình trình Hiệu trưởng quyết định trước khi thực hiện.', 'Không', 'Không', 'Không', 'Không', 'Theo tờ trình được duyệt', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Làm tờ trình trình Hiệu trưởng quyết định trước khi thực hiện.'),
(78, 7, 250, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp tỉnh và tương đương) đạt huy chương vàng', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Vàng', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(79, 7, 200, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp tỉnh và tương đương) đạt huy chương bạc', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Bạc', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(80, 7, 150, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp tỉnh và tương đương) đạt huy chương đồng;', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Đồng', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(81, 7, 400, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc gia) đạt huy chương vàng', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Vàng', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(82, 7, 300, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc gia) đạt huy chương bạc', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Bạc', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(83, 7, 200, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc gia) đạt huy chương đồng;', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Đồng', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(84, 7, 600, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc tế) đạt huy chương vàng', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Vàng', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(85, 7, 500, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc tế) đạt huy chương bạc', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Bạc', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(86, 7, 400, 'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc tế) đạt huy chương đồng;', 'Không', 'Không', 'Không', 'Không', 'Huy chương', 'Đồng', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(87, 7, 195, 'Sáng tác một tác phẩm âm nhạc, múa, điện ảnh được công diễn từ cấp tỉnh trở lên và đạt giải;', 'Không', 'Không', 'Không', 'Không', 'Tác phẩm', 'Có', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(88, 7, 195, 'Dàn dựng/Biên đạo Đạo diễn một tác phẩm âm nhạc, múa, điện ảnh được công diễn từ cấp tỉnh trở lên và đạt giải;', 'Không', 'Không', 'Không', 'Không', 'Tác phẩm', 'Có', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(89, 7, 195, 'Sáng tác và Dàn dựng/Biên đạo Đạo diễn một tác phẩm âm nhạc, múa, điện ảnh được công diễn cấp tỉnh trở lên và đạt giải;', 'Không', 'Không', 'Không', 'Không', 'Tác phẩm', 'Có', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(90, 7, 195, 'Đạo diễn trọn một vở diễn cấp tỉnh trở lên có thời gian từ 30 phút trở lên;', 'Không', 'Không', 'Không', 'Không', 'Vở diễn', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(91, 7, 195, 'Biên đạo múa (một vở kịch múa từ ba màn trở lên hoặc một chương trình từ 5 tiết mục trở lên được dựng ở các Nhà hát cấp tỉnh trở lên);', 'Không', 'Không', 'Không', 'Không', 'Vở kịch múa', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Một vở kịch múa từ ba màn trở lên hoặc một chương trình từ 5 tiết mục trở lên được dựng ở các Nhà hát cấp tỉnh trở lên'),
(92, 7, 195, 'Dàn dựng, chỉ huy hoặc biểu diễn một chương trình hòa nhạc có độ dài trên 45 phút cấp tỉnh trở lên;', 'Không', 'Không', 'Không', 'Không', 'Không rõ', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Dàn dựng, chỉ huy hoặc biểu diễn một chương trình hòa nhạc có độ dài trên 45 phút cấp tỉnh trở lên;'),
(93, 7, 195, 'Sáng tác và dàn dựng một tác phẩm âm nhạc/tác phẩm múa/ tác phẩm kịch hoặc tuồng được công diễn từ cấp tỉnh trở lên có độ dài trên 30 phút;', 'Không', 'Không', 'Không', 'Không', 'Không rõ', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Từ cấp tỉnh trở lên có độ dài trên 30 phút;'),
(94, 7, 98, 'Các bài hát, bài thơ sáng tác mới và được cấp phép sử dụng;', 'Không', 'Không', 'Không', 'Không', 'Không rõ', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không');

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
('00241', 16, 'Nguyễn Hoàng Duy Thiện', 'duythien@tvu.edu.vn', '0912345678', '123 Đường ABC, Trà Vinh'),
('00242', 16, 'Dương Ngọc Vân Khanh', 'vankhanh@tvu.edu.vn', '0912345679', '456 Đường DEF, Trà Vinh'),
('00243', 16, 'Huỳnh Văn Thanh', 'vanthanh@tvu.edu.vn', '0912345680', '789 Đường GHI, Trà Vinh'),
('00244', 16, 'Nguyễn Nhứt Lam', 'nhutlam@tvu.edu.vn', '0912345681', '101 Đường JKL, Trà Vinh'),
('00245', 16, 'Ưeqweqweq', 'annb@tvu.edu.vn', '0369258147', 'Mỹ'),
('00246', 16, 'Nguyễn Ngọc Đan Thanh', 'danthanh@tvu.edu.vn', '0912345682', '102 Đường MNO, Trà Vinh'),
('00248', 16, 'Hồ Hoàng Phúc Fix', 'duongminh@tvu.edu.vn', '0258741369', 'Đáy biển Đen'),
('00249', 16, 'Hà Thị Thúy Vi', 'Hattvi201084@tvu.edu.vn', '0123654987', 'Trà Vinh'),
('00250', 16, 'Võ Thanh C', 'vothanhc@tvu.edu.vn', '0912345683', '103 Đường PQR, Trà Vinh'),
('00251', 16, 'Trịnh Quốc Việt', 'quocviet@tvu.edu.vn', '0912345684', '104 Đường STU, Trà Vinh'),
('00252', 16, 'Trầm Hoàng Nam', 'hoangnam@tvu.edu.vn', '0912345685', '105 Đường VWX, Trà Vinh'),
('00253', 16, 'Đoàn Phước Miền', 'phuocmien@tvu.edu.vn', '0912345686', '106 Đường YZ, Trà Vinh'),
('00254', 16, 'Ngô Thanh Huy', 'huyngocntt@tvu.edu.vn', '0912345687', '107 Đường ABC, Trà Vinh'),
('00255', 16, 'Phạm Thị Trúc Mai', 'trucmai@tvu.edu.vn', '0912345688', '108 Đường DEF, Trà Vinh'),
('00257', 16, 'Nguyễn Mộng Hiền', 'hientvu@tvu.edu.vn', '0123456987', 'TV'),
('01027', 16, 'Nguyễn Khánh Duy', 'khanhduy@tvu.edu.vn', '0912345689', '109 Đường GHI, Trà Vinh'),
('0122', 16, 'Nguyễn Tín Thành', 'tinthanhtv2014@gmail.com', '0325698741', 'Sao Hỏa'),
('0123', 16, 'Hồ Hoàng Phúc', 'hohoangphucjob@gmail.com', '0327434821', 'Sao Hỏa'),
('01548', 16, 'Thạch Kọng SaOane', 'saone@tvu.edu.vn', '0912345690', '110 Đường JKL, Trà Vinh'),
('03539', 16, 'Lê Minh Tự', 'minhtu@tvu.edu.vn', '0912345691', '111 Đường MNO, Trà Vinh'),
('03546', 16, 'Phan Thị Phương Nam', 'phuongnam@tvu.edu.vn', '0912345692', '112 Đường PQR, Trà Vinh'),
('03562', 16, 'Nguyễn Khắc Quốc', 'khacquoc@tvu.edu.vn', '0912345693', '113 Đường STU, Trà Vinh'),
('11012', 2, 'Nguyễn Văn A', 'vana@tvu.edu.vn', '0912345694', '114 Đường VWX, Trà Vinh'),
('12700', 16, 'Khấu Văn Nhựt', 'vannhut@tvu.edu.vn', '0912345695', '115 Đường YZ, Trà Vinh'),
('12701', 16, 'Trần Văn Nam', 'vannam@tvu.edu.vn', '0912345696', '116 Đường ABC, Trà Vinh'),
('12702', 16, 'Nguyễn Thừa Phát Tài', 'phattai@tvu.edu.vn', '0912345697', '117 Đường DEF, Trà Vinh'),
('12705', 16, 'Lê Văn B', 'vanb@tvu.edu.vn', '0912345698', '118 Đường GHI, Trà Vinh'),
('14204', 16, 'Nguyễn Bá Nhiệm', 'banhiem@tvu.edu.vn', '0912345699', '119 Đường JKL, Trà Vinh'),
('99997', 16, 'Bảo Trưởng Khoa', 'baoquocone@gmail.com', '0325698741', 'Sao Hỏa'),
('99999', 16, 'Nguyễn Lâm Quốc Bảo', 'baoquoczero@gmail.com', '0987654321', 'Sao Hỏa'),
('GVNT22424', 16, 'Nguyễn Ngọc Đan Thanh', 'ngocdanthanhdt@tvu.edu.vn', NULL, NULL),
('GVNT8909', 18, 'Hana', 'hana@gmail.com', NULL, NULL);

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
('0122', 1, '21', '2024-08-08'),
('01548', 8, NULL, NULL),
('12705', 8, NULL, NULL),
('14204', 8, NULL, NULL),
('99997', 6, '88', '2024-08-09'),
('99999', 6, '', '2024-08-13');

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
(11, 'Khoa Kỹ Thuật Công Nghệ'),
(12, 'Ngoài trường');

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

--
-- Đang đổ dữ liệu cho bảng `loai_danh_muc`
--

INSERT INTO `loai_danh_muc` (`MA_LOAI_DANH_MUC`, `TEN_LOAI_DANH_MUC`, `TRANG_THAI_DANH_MUC`) VALUES
(2, 'Điều 17. Quy đổi sản phẩm KH&CN là các báo cáo khoa học tại các hội thảo được tính giờ chuẩn NCKH', 'Đang áp dụng'),
(3, 'Điều 18. Quy đổi sản phẩm KH&CN là các sản phẩm SHTT, bài báo khoa học đăng trên các tạp chí khoa học được tính giờ chuẩn NCKH', 'Đang áp dụng'),
(4, 'Điều 19. Quy đổi sản phẩm KH&CN là sách phục vụ đào tạo được tính giờ chuẩn NCKH', 'Đang áp dụng'),
(5, 'Điều 20. Quy đổi hoạt động viết thuyết minh các đề tài, dự án, các hoạt động KH&CN khác được tính giờ chuẩn NCKH', 'Đang áp dụng'),
(6, 'Điều 21. Quy đổi các hoạt động thực hiện đề tài, dự án các cấp được tính giờ chuẩn NCKH', 'Đang áp dụng'),
(7, 'Điều 22. Quy đổi các hoạt động thể dục thể thao, sáng tác, biểu diễn nghệ thuật đặc thù được tính giờ chuẩn NCKH', 'Đang áp dụng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai_tac_gia`
--

CREATE TABLE `loai_tac_gia` (
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `TEN_LOAI_TAC_GIA` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loai_tac_gia`
--

INSERT INTO `loai_tac_gia` (`MA_LOAI_TAC_GIA`, `TEN_LOAI_TAC_GIA`) VALUES
(1, 'Tác giả thứ nhất'),
(2, 'Tác giả chịu trách nhiệm'),
(3, 'Tác giả còn lại'),
(4, 'Chủ đơn'),
(5, 'Đồng chủ đơn'),
(6, 'Chủ biên'),
(7, 'Đồng chủ biên'),
(8, 'Cá nhân');

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

--
-- Đang đổ dữ liệu cho bảng `quy_dinh`
--

INSERT INTO `quy_dinh` (`MA_QUY_DINH`, `TEN_QUY_DINH`, `TRANG_THAI_QUY_DINH`) VALUES
(1, 'Tỷ lệ quy đổi giữa các tác giả đối với bài tham luận (báo cáo khoa học) và bài báo khoa học', 'Đang áp dụng');

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
('baoquocone@gmail.com', '99997', NULL, 'Trưởng Khoa', 'Đang hoạt động'),
('baoquoczero@gmail.com', '99999', NULL, 'Admin', 'Đang hoạt động'),
('diemhanh_tvu@tvu.edu.vn', '12705', NULL, 'Giảng Viên', 'Đang hoạt động'),
('duongminh@tvu.edu.vn', '00248', NULL, 'Trưởng Bộ Môn', 'Đang hoạt động'),
('Hattvi201084@tvu.edu.vn', '00249', NULL, 'Trưởng Khoa', 'Đang hoạt động'),
('hientvu@tvu.edu.vn', '00257', NULL, 'Admin', 'Đang hoạt động'),
('hohoangphucjob@gmail.com', '0123', NULL, 'Admin', 'Đang hoạt động'),
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
('tinthanhtv2014@gmail.com', '0122', NULL, 'Admin', 'Đang hoạt động'),
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
  `TEN_KHOA` text DEFAULT NULL,
  `GHICHU` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thoigian_xacnhan`
--

INSERT INTO `thoigian_xacnhan` (`MA_THOIGIAN_XACNHAN`, `THOIGIANBATDAU`, `THOIGIANKETTHUC`, `TEN_KHOA`, `GHICHU`) VALUES
(9, '2024-08-06 20:29:00', '2030-12-01 20:29:00', 'Khoa Kỹ Thuật Công Nghệ', 'CHONKHUNG'),
(20, '2024-08-01 21:21:00', '2024-08-31 21:21:00', 'Khoa Công Nghệ Thông Tin', 'NGHIENCUU'),
(21, '2024-08-01 21:21:00', '2024-08-31 21:21:00', 'Khoa Kỹ Thuật Công Nghệ', 'NGHIENCUU'),
(22, '2024-08-06 20:29:00', '2030-12-01 20:29:00', 'Khoa Công Nghệ Thông Tin', 'CHONKHUNG');

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
  `VIEN_CHUC_TRUONG` varchar(50) DEFAULT NULL,
  `THUC_HIEN_CHUAN` varchar(50) DEFAULT NULL,
  `TRANG_THAI_QUY_DOI` text DEFAULT NULL,
  `GHI_CHU_QUY_DOI` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ty_le_quy_doi_gio_chuan`
--

INSERT INTO `ty_le_quy_doi_gio_chuan` (`MA_QUY_DOI`, `MA_QUY_DINH`, `TEN_QUY_DOI`, `TY_LE`, `VIEN_CHUC_TRUONG`, `THUC_HIEN_CHUAN`, `TRANG_THAI_QUY_DOI`, `GHI_CHU_QUY_DOI`) VALUES
(8, 1, '16.2.b.Tác giả thứ nhất (bài có nhiều tác giả) là viên chức Trường ĐHTV: 50% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18, trường hợp đồng tác giả thứ nhất thì chia đều 50% cho đồng tác giả thứ nhất; 50% còn lại được chia đều cho các đồng tác giả còn lại bao gồm tác giả chịu trách nhiệm (nếu có); tác giả độc lập hưởng 50% như tác giả thứ nhất;', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chia đều cho các Tác giả thứ nhất'),
(9, 1, '16.2.b.Tác giả thứ nhất (bài có nhiều tác giả) là viên chức Trường ĐHTV: 50% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18, trường hợp đồng tác giả thứ nhất thì chia đều 50% cho đồng tác giả thứ nhất; 50% còn lại được chia đều cho các đồng tác giả còn lại bao gồm tác giả chịu trách nhiệm (nếu có); tác giả độc lập hưởng 50% như tác giả thứ nhất;', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chia đều cho các đồng tác giả còn lại bao gồm tác giả chịu trách nhiệm (nếu có). Trừ tác giả thứ nhất'),
(10, 1, '16.2.c.Trường hợp tác giả thứ nhất không phải là viên chức của trường thì xét đến tác giả chịu trách nhiệm: nếu có hai tác giả chịu trách nhiệm thì chia đều 50% cho đồng tác giả này, nếu có một tác giả chịu trách nhiệm thì hưởng 30% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18; các đồng tác giả còn lại được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất);', 0, 'Không', 'Có', 'Đang áp dụng', 'Tác giả thứ nhất không thuộc trường'),
(11, 1, '16.2.c.Trường hợp tác giả thứ nhất không phải là viên chức của trường thì xét đến tác giả chịu trách nhiệm: nếu có hai tác giả chịu trách nhiệm thì chia đều 50% cho đồng tác giả này, nếu có một tác giả chịu trách nhiệm thì hưởng 30% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18; các đồng tác giả còn lại được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất);', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chia cho 2 tác giả chịu trách nhiệm, chia đều'),
(12, 1, '16.2.c.Trường hợp tác giả thứ nhất không phải là viên chức của trường thì xét đến tác giả chịu trách nhiệm: nếu có hai tác giả chịu trách nhiệm thì chia đều 50% cho đồng tác giả này, nếu có một tác giả chịu trách nhiệm thì hưởng 30% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18; các đồng tác giả còn lại được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất);', 0.3, 'Có', 'Có', 'Đang áp dụng', 'Chia cho 1  tác giả chịu trách nhiệm'),
(13, 1, '16.2.c.Trường hợp tác giả thứ nhất không phải là viên chức của trường thì xét đến tác giả chịu trách nhiệm: nếu có hai tác giả chịu trách nhiệm thì chia đều 50% cho đồng tác giả này, nếu có một tác giả chịu trách nhiệm thì hưởng 30% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18; các đồng tác giả còn lại được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất);', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Các đồng tác giả còn lại (trừ tác giả chịu trách nhiệm) được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất ngoài trường);'),
(14, 1, '16.2.dTrường hợp tác giả thứ nhất là viên chức của Trường ĐHTV nhưng không phải thực hiện chuẩn thì các tác giả còn lại hưởng 50% chia đều cho các đồng tác giả (kể cả tác giả chịu trách nhiệm). Tác giả thứ nhất được thưởng giờ dư theo quy định.', 0, 'Có', 'Không', 'Đang áp dụng', 'Tác giả thứ nhất không thực hiện chuẩn'),
(15, 1, '16.2.dTrường hợp tác giả thứ nhất là viên chức của Trường ĐHTV nhưng không phải thực hiện chuẩn thì các tác giả còn lại hưởng 50% chia đều cho các đồng tác giả (kể cả tác giả chịu trách nhiệm). Tác giả thứ nhất được thưởng giờ dư theo quy định.', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chia đều cho các đồng tác giả (kể cả tác giả chịu trách nhiệm). Trừ tác giả thứ nhất');

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
-- Chỉ mục cho bảng `co_ty_le`
--
ALTER TABLE `co_ty_le`
  ADD PRIMARY KEY (`MA_QUY_DOI`,`MA_LOAI_DANH_MUC`,`MA_LOAI_TAC_GIA`),
  ADD KEY `FK_CO_TY_LE2` (`MA_LOAI_DANH_MUC`),
  ADD KEY `FK_CO_TY_LE3` (`MA_LOAI_TAC_GIA`);

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
  MODIFY `MABOMON` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  MODIFY `MA_DANH_MUC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT cho bảng `khoa`
--
ALTER TABLE `khoa`
  MODIFY `MAKHOA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `khunggiochuan`
--
ALTER TABLE `khunggiochuan`
  MODIFY `MAKHUNG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `loai_danh_muc`
--
ALTER TABLE `loai_danh_muc`
  MODIFY `MA_LOAI_DANH_MUC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `loai_tac_gia`
--
ALTER TABLE `loai_tac_gia`
  MODIFY `MA_LOAI_TAC_GIA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `MA_QUY_DINH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `thoigian_xacnhan`
--
ALTER TABLE `thoigian_xacnhan`
  MODIFY `MA_THOIGIAN_XACNHAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `ty_le_quy_doi_gio_chuan`
--
ALTER TABLE `ty_le_quy_doi_gio_chuan`
  MODIFY `MA_QUY_DOI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
-- Các ràng buộc cho bảng `co_ty_le`
--
ALTER TABLE `co_ty_le`
  ADD CONSTRAINT `FK_CO_TY_LE` FOREIGN KEY (`MA_QUY_DOI`) REFERENCES `ty_le_quy_doi_gio_chuan` (`MA_QUY_DOI`),
  ADD CONSTRAINT `FK_CO_TY_LE2` FOREIGN KEY (`MA_LOAI_DANH_MUC`) REFERENCES `loai_danh_muc` (`MA_LOAI_DANH_MUC`),
  ADD CONSTRAINT `FK_CO_TY_LE3` FOREIGN KEY (`MA_LOAI_TAC_GIA`) REFERENCES `loai_tac_gia` (`MA_LOAI_TAC_GIA`);

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
