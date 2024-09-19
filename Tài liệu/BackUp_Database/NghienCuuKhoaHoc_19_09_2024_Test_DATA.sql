-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 19, 2024 lúc 06:40 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

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
  `MAHKNK` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `THOIGIANLAP` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bangphancong`
--

INSERT INTO `bangphancong` (`MAPHANCONG`, `MAHKNK`, `MAGV`, `THOIGIANLAP`) VALUES
(1, 1, '00250', '2024-09-05'),
(2, 2, '00250', '2024-09-05'),
(3, 1, '00248', '2024-09-05'),
(4, 2, '00248', '2024-09-05'),
(5, 1, '00257', '2024-09-05'),
(6, 2, '00257', '2024-09-05'),
(7, 1, '00000', '2024-09-05'),
(8, 2, '00000', '2024-09-05'),
(9, 1, '00254', '2024-09-05'),
(10, 2, '00254', '2024-09-05'),
(11, 1, '12705', '2024-09-05'),
(12, 2, '12705', '2024-09-05'),
(13, 1, '00242', '2024-09-05'),
(14, 2, '00242', '2024-09-05'),
(15, 1, '00244', '2024-09-05'),
(16, 2, '00244', '2024-09-05'),
(17, 1, '00255', '2024-09-05'),
(18, 2, '00255', '2024-09-05'),
(19, 1, '00253', '2024-09-05'),
(20, 2, '00253', '2024-09-05'),
(21, 1, '03546', '2024-09-05'),
(22, 2, '03546', '2024-09-05'),
(23, 1, '00252', '2024-09-05'),
(24, 2, '00252', '2024-09-05'),
(25, 1, '12701', '2024-09-05'),
(26, 1, '14204', '2024-09-05'),
(27, 2, '14204', '2024-09-05'),
(28, 1, '12700', '2024-09-05'),
(29, 1, '03562', '2024-09-05'),
(30, 1, '12702', '2024-09-05'),
(31, 1, '00243', '2024-09-05'),
(32, 2, '00243', '2024-09-05'),
(33, 2, '00246', '2024-09-05'),
(34, 1, '00241', '2024-09-05'),
(35, 2, '00241', '2024-09-05'),
(36, 1, '03539', '2024-09-05'),
(37, 2, '03539', '2024-09-05'),
(38, 1, '00249', '2024-09-05'),
(39, 2, '00249', '2024-09-05'),
(40, 1, '00251', '2024-09-05'),
(41, 2, '00251', '2024-09-05'),
(42, 1, '00245', '2024-09-05'),
(43, 2, '00245', '2024-09-05'),
(44, 1, '99999', '2024-09-18');

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
(18, 12, 'Ngoài trường'),
(19, 11, 'Bộ môn Cơ khí - Động lực'),
(20, 11, 'Bộ môn Điện - Điện tử');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietphancong`
--

CREATE TABLE `chitietphancong` (
  `MACHITIETPHANCONG` int(11) NOT NULL,
  `MAMONHOC` int(11) NOT NULL,
  `MAPHANCONG` int(11) NOT NULL,
  `MALOP` varchar(255) NOT NULL,
  `TONG_SO_GIO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietphancong`
--

INSERT INTO `chitietphancong` (`MACHITIETPHANCONG`, `MAMONHOC`, `MAPHANCONG`, `MALOP`, `TONG_SO_GIO`) VALUES
(101, 4, 44, 'DA21TTA', 80),
(102, 82, 44, 'DA22TTB', 70),
(103, 123, 44, 'DA21TTA', 60),
(104, 245, 8, 'DA21TTA', 50),
(105, 41, 1, 'DA21TTB', 90),
(106, 43, 1, 'DA21TTA', 90),
(107, 43, 1, 'DA21TTB', 90),
(108, 43, 1, 'DA21TTC', 90),
(109, 68, 2, 'DA20TTB', 60),
(110, 42, 3, 'DA21TTB', 90),
(111, 42, 3, 'DA21TTC', 90),
(112, 41, 3, 'DA21TTA', 90),
(113, 13, 4, 'DA23TTB', 45),
(114, 13, 4, 'DA23TTC', 45),
(115, 60, 5, 'DA20TTA', 60),
(116, 60, 5, 'DA20TTB', 90),
(117, 68, 6, 'DA20TTA', 60),
(118, 33, 6, 'DA22TTA', 45),
(119, 33, 6, 'DA22TTB', 45),
(120, 33, 6, 'DA22TTC', 45),
(121, 9, 7, 'DA23TTB', 150),
(122, 45, 8, 'DA21TTA', 90),
(123, 45, 8, 'DA21TTC', 90),
(124, 26, 9, 'DA22TTA', 90),
(125, 57, 9, 'DA20TTA', 60),
(126, 57, 9, 'DA20TTB', 90),
(127, 33, 10, 'DA22TTD', 45),
(128, 63, 11, 'DA20TTB', 90),
(129, 42, 11, 'DA21TTA', 90),
(130, 49, 12, 'DA21TTA', 90),
(131, 49, 12, 'DA21TTB', 90),
(132, 32, 12, 'DA22TTC', 60),
(133, 32, 12, 'DA22TTD', 60),
(134, 37, 13, 'DA21TTC', 90),
(135, 31, 14, 'DA22TTA', 90),
(136, 31, 14, 'DA22TTB', 90),
(137, 45, 14, 'DA21TTB', 90),
(138, 9, 15, 'DA23TTC', 150),
(139, 26, 15, 'DA22TTC', 90),
(140, 49, 16, 'DA21TTC', 90),
(141, 65, 16, 'DA20TTA', 60),
(142, 65, 16, 'DA20TTB', 90),
(143, 55, 17, 'DA20TTA', 60),
(144, 55, 17, 'DA20TTB', 90),
(145, 30, 18, 'DA22TTA', 90),
(146, 30, 18, 'DA22TTB', 90),
(147, 63, 19, 'DA20TTA', 60),
(148, 69, 20, 'DA20TTA', 90),
(149, 69, 20, 'DA20TTB', 90),
(150, 22, 21, 'DA22TTC', 90),
(151, 22, 21, 'DA22TTD', 90),
(152, 50, 22, 'DA21TTA', 90),
(153, 50, 22, 'DA21TTB', 90),
(154, 50, 22, 'DA21TTC', 90),
(155, 24, 23, 'DA22TTA', 90),
(156, 24, 23, 'DA22TTB', 90),
(157, 24, 23, 'DA22TTC', 90),
(158, 24, 23, 'DA22TTD', 90),
(159, 38, 23, 'DA21TTC', 90),
(160, 16, 24, 'DA23TTA', 45),
(161, 16, 24, 'DA23TTB', 45),
(162, 6, 25, 'DA23TTC', 75),
(163, 6, 25, 'DA23TTD', 75),
(164, 37, 26, 'DA21TTA', 90),
(165, 37, 26, 'DA21TTB', 90),
(166, 29, 27, 'DA22TTC', 90),
(167, 29, 27, 'DA22TTD', 90),
(168, 31, 27, 'DA22TTC', 90),
(169, 25, 28, 'DA22TTA', 90),
(170, 25, 28, 'DA22TTB', 90),
(171, 58, 28, 'DA20TTB', 90),
(172, 6, 29, 'DA23TTA', 75),
(173, 6, 29, 'DA23TTB', 75),
(174, 58, 29, 'DA20TTA', 60),
(175, 9, 30, 'DA23TTA', 150),
(176, 41, 30, 'DA21TTC', 90),
(177, 25, 31, 'DA22TTC', 90),
(178, 25, 31, 'DA22TTD', 90),
(179, 31, 32, 'DA22TTD', 90),
(180, 29, 32, 'DA22TTA', 90),
(181, 29, 32, 'DA22TTB', 90),
(182, 30, 33, 'DA22TTC', 90),
(183, 30, 33, 'DA22TTD', 90),
(184, 40, 34, 'DA21TTC', 90),
(185, 47, 35, 'DA21TTB', 90),
(186, 47, 35, 'DA21TTC', 90),
(187, 32, 35, 'DA22TTA', 60),
(188, 32, 35, 'DA22TTB', 60),
(189, 40, 36, 'DA21TTA', 90),
(190, 40, 36, 'DA21TTB', 90),
(191, 18, 37, 'DA23TTB', 150),
(192, 18, 37, 'DA23TTC', 150),
(193, 22, 38, 'DA22TTA', 90),
(194, 22, 38, 'DA22TTB', 90),
(195, 48, 39, 'DA21TTA', 90),
(196, 48, 39, 'DA21TTB', 90),
(197, 48, 39, 'DA21TTC', 90),
(198, 26, 40, 'DA22TTB', 90),
(199, 26, 40, 'DA22TTD', 90),
(200, 47, 41, 'DA21TTA', 90),
(201, 38, 42, 'DA21TTA', 90),
(202, 38, 42, 'DA21TTB', 90),
(203, 46, 43, 'DA21TTA', 90),
(204, 46, 43, 'DA21TTB', 90),
(205, 46, 43, 'DA21TTC', 90),
(206, 55, 7, 'DA23TTC', 60),
(207, 57, 7, 'DA24TTB', 11);

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
('00000', 9, 17),
('00251', 8, 12),
('99999', 8, 10),
('99999', 9, 10);

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
(9, 'Trưởng bộ môn CNTT'),
(11, 'aaađâsdasdasd');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuongtrinhdaotao`
--

CREATE TABLE `chuongtrinhdaotao` (
  `MACHUONGTRINH` int(11) NOT NULL,
  `MABOMON` int(11) NOT NULL,
  `TENCHUONGTRINH` text DEFAULT NULL,
  `SO_QUYET_DINH` text DEFAULT NULL,
  `TRINH_DO` varchar(255) DEFAULT NULL,
  `TONG_SO_TIN_CHI` int(11) DEFAULT NULL,
  `MO_TA_HOC_KY` text DEFAULT NULL,
  `GHI_CHUONG_TRINH` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chuongtrinhdaotao`
--

INSERT INTO `chuongtrinhdaotao` (`MACHUONGTRINH`, `MABOMON`, `TENCHUONGTRINH`, `SO_QUYET_DINH`, `TRINH_DO`, `TONG_SO_TIN_CHI`, `MO_TA_HOC_KY`, `GHI_CHUONG_TRINH`) VALUES
(1, 16, 'CÔNG NGHỆ THÔNG TIN', '3455/QĐ-ĐHTV, ngày 12 tháng 7 năm 2018', 'ĐẠI HỌC', 138, 'Chính quy', NULL),
(2, 19, 'Công nghệ ô tô', '        /QĐ – ĐHTV, ngày       tháng       năm 20', 'Đại học', 140, 'Chính quy', NULL),
(3, 19, 'Cơ khí chế tạo máy', '        /QĐ – ĐHTV, ngày       tháng       năm 20', 'Đại học', 140, 'Chính quy', NULL),
(4, 20, 'Điện công nghiệp', 'số: /QĐ – ĐHTV, ngày tháng năm 201', 'Đại học', 150, 'Chính quy', NULL);

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
(1, '99997', '2024-08-31', 'Đang giữ chức danh'),
(1, '99999', '2024-06-29', 'Đang giữ chức danh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `co_ty_le`
--

CREATE TABLE `co_ty_le` (
  `MA_QUY_DOI` int(11) NOT NULL,
  `MA_LOAI_DANH_MUC` int(11) NOT NULL,
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `SO_TAC_GIA_THUOC_LOAI` int(11) DEFAULT NULL,
  `NHOM_CHIA_GIO` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `co_ty_le`
--

INSERT INTO `co_ty_le` (`MA_QUY_DOI`, `MA_LOAI_DANH_MUC`, `MA_LOAI_TAC_GIA`, `SO_TAC_GIA_THUOC_LOAI`, `NHOM_CHIA_GIO`) VALUES
(1, 1, 1, 0, 'Không'),
(1, 3, 1, 2, 'Không'),
(2, 1, 2, 0, '1'),
(2, 1, 3, 0, '1'),
(2, 3, 2, 0, '1'),
(2, 3, 3, 0, '1'),
(3, 1, 1, 0, 'Không'),
(3, 3, 1, 2, 'Không'),
(4, 1, 2, 2, 'Không'),
(4, 3, 2, 2, 'Không'),
(5, 1, 2, 1, 'Không'),
(5, 3, 2, 1, 'Không'),
(6, 1, 1, 0, '1'),
(6, 1, 3, 0, '1'),
(6, 3, 1, 1, '1'),
(6, 3, 3, 0, '1'),
(7, 1, 1, 0, 'Không'),
(7, 3, 1, 1, 'Không'),
(8, 1, 1, 0, '1'),
(8, 1, 2, 0, '1'),
(8, 1, 3, 0, '1'),
(8, 3, 1, 1, '1'),
(8, 3, 2, 0, '1'),
(8, 3, 3, 0, '1'),
(9, 2, 8, 0, 'Không'),
(10, 2, 1, 0, 'Không'),
(11, 2, 1, 0, 'Không'),
(12, 2, 1, 0, 'Không'),
(13, 2, 2, 0, '1'),
(13, 2, 3, 0, '1'),
(14, 5, 8, 0, 'Không'),
(15, 5, 8, 0, 'Không'),
(16, 5, 8, 0, 'Không'),
(17, 6, 8, 0, 'Không'),
(17, 7, 8, 0, 'Không'),
(18, 6, 8, 0, 'Không'),
(18, 7, 8, 0, 'Không'),
(19, 6, 8, 0, 'Không'),
(19, 7, 8, 0, 'Không'),
(20, 4, 6, 0, 'Không'),
(21, 4, 6, 0, 'Không'),
(22, 4, 6, 0, 'Không'),
(23, 4, 7, 0, '1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `dang_ky_thuc_hien_quy_doi`
--

CREATE TABLE `dang_ky_thuc_hien_quy_doi` (
  `MA_DANH_MUC` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `MANAMHOC` int(11) NOT NULL,
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `TEN_DE_TAI` varchar(255) NOT NULL,
  `SOGIOQUYDOI` int(11) DEFAULT NULL,
  `TRANG_THAI_DANG_KY` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `dang_ky_thuc_hien_quy_doi`
--

INSERT INTO `dang_ky_thuc_hien_quy_doi` (`MA_DANH_MUC`, `MAGV`, `MANAMHOC`, `MA_LOAI_TAC_GIA`, `TEN_DE_TAI`, `SOGIOQUYDOI`, `TRANG_THAI_DANG_KY`) VALUES
(1, '00241', 9, 1, 'ádsadadad', 98, 'Đã đăng ký'),
(1, '00242', 9, 2, 'ádsadadad', 49, 'Đã đăng ký'),
(1, '99999', 9, 2, 'ádsadadad', 49, 'Đã đăng ký'),
(11, '00241', 9, 1, 'ádsadadad', 98, 'Đã đăng ký'),
(11, '99999', 9, 2, 'ádsadadad', 98, 'Đã đăng ký'),
(11, 'GVNT8909', 9, 2, 'ádsadadad', 0, 'Đã đăng ký');

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
(1, 1, 195, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 1 Điều 11.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu có mã số ISBN'),
(2, 1, 98, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 1 Điều 11.', 'Không', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu không có mã số ISBN'),
(3, 1, 255, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 2 Điều 11.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu (proceedings) có mã số ISBN'),
(4, 1, 195, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 2 Điều 11.', 'Không', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu (proceedings) không có mã số ISBN'),
(5, 1, 98, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 3 Điều 11.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu/proceedings có mã số ISBN'),
(6, 1, 49, 'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 3 Điều 11.', 'Không', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Kỷ yếu/proceedings không có mã số ISBN'),
(7, 1, 64, 'Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu hội nghị hội thảo chuyên ngành bên ngoài trường có phản biện, sử dụng ngôn ngữ tiếng Việt và các hội thảo hội nghị khác có chỉ số ISBN', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(8, 1, 234, 'Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu (proceedings) hội nghị hội thảo quốc tế xuất bản bằng ngôn ngữ tiếng Anh có phản biện, có chỉ số ISBN không thuộc danh mục WoS/Scopus.', 'Có', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(9, 1, 378, ' Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu (proceedings) hội nghị hội thảo quốc tế xuất bản bằng ngôn ngữ tiếng Anh, có chỉ số ISBN thuộc danh mục WoS/Scopus.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không'),
(10, 1, 0, 'Các báo cáo khoa học/ tham luận đăng toàn văn hoặc tóm tắt tại hội thảo/hội nghị đặc biệt khác phục vụ cho quan hệ đối ngoại, nâng cao hình ảnh và vị thế của Trường ĐHTV, thì các đơn vị được giao tổ chức/tham gia sự kiện phối hợp với Phòng KHCN để trình Hiệu trưởng xem xét, quyết định mức giờ chuẩn quy đổi cụ thể trước khi thực hiện.', 'Không rõ', 'Không rõ', 'Không rõ', 'Không rõ', 'Không rõ', 'Không rõ', 'Không rõ', '2024-2025', 'Đang áp dụng', 'Hiệu trưởng xem xét, quyết định mức giờ chuẩn quy đổi cụ thể trước khi thực hiện.'),
(11, 2, 195, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, không được tính điểm công trình của HĐGSNN.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Tạp chí khoa học Trường ĐHTV'),
(12, 2, 146, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, không được tính điểm công trình của HĐGSNN.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các tập chí khác'),
(13, 2, 235, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, được tính điểm công trình của HĐGSNN (tạp chí khoa học trong nước có uy tín).', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Tạp chí khoa học Trường ĐHTV'),
(14, 2, 195, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, được tính điểm công trình của HĐGSNN (tạp chí khoa học trong nước có uy tín).', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các tạp chí khác'),
(15, 2, 244, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước hoặc quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, không có trong danh mục WoS/Scopus', 'Có', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Tạp chí khoa học Trường ĐHTV'),
(16, 2, 195, 'Bài báo khoa học được công bố trên tạp chí khoa học trong nước hoặc quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, không có trong danh mục WoS/Scopus', 'Có', 'Không', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Các tạp chí khác'),
(17, 2, 420, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS/Scopus (tạp chí khoa học quốc tế uy tín), không được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Không được xếp hạng'),
(18, 2, 855, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q1', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(19, 2, 642, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q2', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(20, 2, 535, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q3', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(21, 2, 428, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q4', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(22, 2, 1050, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q1', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(23, 2, 855, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q2', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(24, 2, 642, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q3', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(25, 2, 535, 'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.', 'Có', 'Có', 'Không', 'Không', 'Bài', 'Không', 'Q4', '2024-2025', 'Đang áp dụng', 'Được xếp hạng'),
(26, 2, 98, 'Các sản phẩm KH&CN công bố bởi viên chức (chỉ tính đối với tác giả thứ nhất hoặc tác giả chịu trách nhiệm trong trường hợp tác giả thứ nhất không phải viên chức của Trường ĐHTV, trường hợp đồng tác giả thứ nhất hoặc đồng tác giả chịu trách nhiệm thì chia đôi) được xuất bản bởi các tạp chí và nhà xuất bản quốc tế uy tín (nằm trong danh mục WoS/Scopus) mà tên đơn vị của Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations) thì được tính giờ nhiệm vụ NCKH là 98 giờ, đứng thứ nhất được tính 195 giờ.', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations)'),
(27, 2, 195, 'Các sản phẩm KH&CN công bố bởi viên chức (chỉ tính đối với tác giả thứ nhất hoặc tác giả chịu trách nhiệm trong trường hợp tác giả thứ nhất không phải viên chức của Trường ĐHTV, trường hợp đồng tác giả thứ nhất hoặc đồng tác giả chịu trách nhiệm thì chia đôi) được xuất bản bởi các tạp chí và nhà xuất bản quốc tế uy tín (nằm trong danh mục WoS/Scopus) mà tên đơn vị của Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations) thì được tính giờ nhiệm vụ NCKH là 98 giờ, đứng thứ nhất được tính 195 giờ.', 'Có', 'Có', 'Không', 'Không', 'Sản phẩm', 'Không', 'Không', '2024-2025', 'Đang áp dụng', 'Trường ĐHTV đứng thứ nhất'),
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
('00000', 16, 'Võ Phước Hưng', NULL, NULL, NULL),
('00241', 16, 'Nguyễn Hoàng Duy Thiện', NULL, NULL, NULL),
('00242', 16, 'Dương Ngọc Vân Khanh', NULL, NULL, NULL),
('00243', 16, 'Huỳnh Văn Thanh', NULL, NULL, NULL),
('00244', 16, 'Nguyễn Nhứt Lam', NULL, NULL, NULL),
('00245', 16, 'Nguyễn Bảo Ân', NULL, NULL, NULL),
('00246', 16, 'Nguyễn Ngọc Đan Thanh', NULL, NULL, NULL),
('00248', 16, 'Phạm Minh Đương', NULL, NULL, NULL),
('00249', 16, 'Hà Thị Thúy Vi', NULL, NULL, NULL),
('00250', 16, 'Võ Thành C', NULL, NULL, NULL),
('00251', 16, 'Trịnh Quốc Việt', NULL, NULL, NULL),
('00252', 16, 'Trầm Hoàng Nam', NULL, NULL, NULL),
('00253', 16, 'Đoàn Phước Miền', NULL, NULL, NULL),
('00254', 16, 'Ngô Thanh Huy', NULL, NULL, NULL),
('00255', 16, 'Phạm Thị Trúc Mai', NULL, NULL, NULL),
('00257', 16, 'Nguyễn Mộng Hiền', NULL, NULL, NULL),
('01027', 16, 'Nguyễn Khánh Duy ', NULL, NULL, NULL),
('01548', 16, 'Thạch Kọng SaOane', NULL, NULL, NULL),
('03539', 16, 'Lê Minh Tự', NULL, NULL, NULL),
('03546', 16, 'Phan Thị Phương Nam', NULL, NULL, NULL),
('03562', 16, 'Nguyễn Khắc Quốc', NULL, NULL, NULL),
('12700', 16, 'Khấu Văn Nhựt', NULL, NULL, NULL),
('12701', 16, 'Trần Văn Nam', NULL, NULL, NULL),
('12702', 16, 'Nguyễn Thừa Phát Tài', NULL, NULL, NULL),
('12705', 16, 'Nguyễn Trần Diễm Hạnh', NULL, NULL, NULL),
('14204', 16, 'Nguyễn Bá Nhiệm', NULL, NULL, NULL),
('99997', 16, 'Bảo Trưởng Khoa', 'baoquocone@gmail.com', '0325698741', 'Sao Hỏa'),
('99999', 16, 'Nguyễn Lâm Quốc Bảo', 'baoquoczero@gmail.com', '0987654321', 'Sao thủy'),
('edasdasdad', 18, NULL, NULL, NULL, NULL),
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
('00241', 5, NULL, NULL),
('00242', 5, NULL, NULL),
('00243', 5, NULL, NULL),
('00244', 9, NULL, NULL),
('00245', 8, NULL, NULL),
('00246', 5, NULL, NULL),
('00248', 5, NULL, NULL),
('00249', 5, NULL, NULL),
('00250', 5, NULL, NULL),
('00251', 5, NULL, NULL),
('00252', 5, NULL, NULL),
('00253', 5, NULL, NULL),
('00254', 5, NULL, NULL),
('00255', 5, NULL, NULL),
('00257', 5, NULL, NULL),
('01027', 5, NULL, NULL),
('01548', 8, NULL, NULL),
('03539', 5, NULL, NULL),
('03546', 5, NULL, NULL),
('03562', 5, NULL, NULL),
('12700', 5, NULL, NULL),
('12701', 5, NULL, NULL),
('12702', 5, NULL, NULL),
('12705', 8, NULL, NULL),
('14204', 8, NULL, NULL),
('99997', 6, '88', '2024-08-08'),
('99999', 6, '', '2024-09-17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinhthucdanhgia`
--

CREATE TABLE `hinhthucdanhgia` (
  `MADANHGIAKETTHUC` int(11) NOT NULL,
  `TENDANHGIA` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hinhthucdanhgia`
--

INSERT INTO `hinhthucdanhgia` (`MADANHGIAKETTHUC`, `TENDANHGIA`) VALUES
(1, 'Trắc nghiệm'),
(2, 'Tự luận'),
(3, 'Thực hành');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hockynienkhoa`
--

CREATE TABLE `hockynienkhoa` (
  `MAHKNK` int(11) NOT NULL,
  `TENHKNK` text DEFAULT NULL,
  `TEN_NAM_HOC` varchar(255) DEFAULT NULL,
  `NGAYBATDAUNIENKHOA` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hockynienkhoa`
--

INSERT INTO `hockynienkhoa` (`MAHKNK`, `TENHKNK`, `TEN_NAM_HOC`, `NGAYBATDAUNIENKHOA`) VALUES
(1, 'Học Kì 1', 'Năm Học 2024', '2024-09-04'),
(2, 'Học Kì 2', 'Năm Học 2024', '2024-09-13');

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
(1, 'Điều 17. Quy đổi sản phẩm KH&CN là các báo cáo khoa học tại các hội thảo được tính giờ chuẩn NCKH', 'Đang áp dụng'),
(2, 'Điều 18. Quy đổi sản phẩm KH&CN là các sản phẩm SHTT', 'Đang áp dụng'),
(3, 'Điều 18. Quy đổi sản phẩm KH&CN là bài báo khoa học đăng trên các tạp chí khoa học được tính giờ chuẩn NCKH', 'Đang áp dụng'),
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
  `TEN_LOAI_TAC_GIA` text DEFAULT NULL,
  `DO_UU_TIEN` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loai_tac_gia`
--

INSERT INTO `loai_tac_gia` (`MA_LOAI_TAC_GIA`, `TEN_LOAI_TAC_GIA`, `DO_UU_TIEN`) VALUES
(1, 'Tác giả thứ nhất', 1),
(2, 'Tác giả chịu trách nhiệm', 2),
(3, 'Tác giả còn lại', 3),
(4, 'Chủ đơn', 1),
(5, 'Đồng chủ đơn', 2),
(6, 'Chủ biên', 1),
(7, 'Đồng chủ biên', 2),
(8, 'Cá nhân', 0);

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

--
-- Đang đổ dữ liệu cho bảng `lop`
--

INSERT INTO `lop` (`MALOP`, `MACHUONGTRINH`, `TENLOP`, `NAMTUYENSINH`, `SISO`) VALUES
('adasdasdasd', 2, 'ádadasdadad', 2024, 1231),
('DA111112312313', 1, 'CNTTádasda1231312', 2024, 23),
('DA20TTA', 1, 'Đại học Công nghệ thông tin A 2020', 2020, 30),
('DA20TTB', 1, 'Đại học Công nghệ thông tin B 2020', 2020, 44),
('DA21TTA', 1, 'Đại học Công nghệ thông tin A 2021', 2021, 44),
('DA21TTB', 1, 'Đại học Công nghệ thông tin B 2021', 2021, 46),
('DA21TTC', 1, 'Đại học Công nghệ thông tin C 2021', 2021, 46),
('DA22TTA', 1, 'Đại học Công nghệ thông tin A 2022', 2022, 50),
('DA22TTB', 1, 'Đại học Công nghệ thông tin B 2022', 2022, 47),
('DA22TTC', 1, 'Đại học Công nghệ thông tin C 2022', 2022, 47),
('DA22TTD', 1, 'Đại học Công nghệ thông tin D 2022', 2022, 53),
('DA23TTA', 1, 'Đại học Công nghệ thông tin A 2023', 2023, 48),
('DA23TTB', 1, 'Đại học Công nghệ thông tin B 2023', 2023, 53),
('DA23TTC', 1, 'Đại học Công nghệ thông tin C 2023', 2023, 50),
('DA23TTD', 1, 'Đại học Công nghệ thông tin D 2023', 2023, 48),
('DA24TTA', 1, 'Đại học Công nghệ thông tin A 2024', 2024, 45),
('DA24TTB', 1, 'Đại học Công nghệ thông tin B 2024', 2024, 39),
('DA24TTC', 1, 'Đại học Công nghệ thông tin C 2024', 2024, 42),
('DA24TTD', 1, 'Đại học Công nghệ thông tin D 2024', 2024, 43),
('Nhóm 1', 1, 'Nhóm 1', 2020, 30),
('Nhóm 10', 1, 'Nhóm 10', 2020, 30),
('Nhóm 11', 1, 'Nhóm 11', 2020, 30),
('Nhóm 12', 1, 'Nhóm 12', 2020, 30),
('Nhóm 13', 1, 'Nhóm 13', 2020, 30),
('Nhóm 14', 1, 'Nhóm 14', 2020, 30),
('Nhóm 15', 1, 'Nhóm 15', 2020, 30),
('Nhóm 16', 1, 'Nhóm 16', 2020, 30),
('Nhóm 17', 1, 'Nhóm 17', 2020, 30),
('Nhóm 18', 1, 'Nhóm 18', 2020, 30),
('Nhóm 19', 1, 'Nhóm 19', 2020, 30),
('Nhóm 2', 1, 'Nhóm 2 ', 2020, 30),
('Nhóm 20', 1, 'Nhóm 20', 2020, 30),
('Nhóm 21', 1, 'Nhóm 21', 2020, 30),
('Nhóm 22', 1, 'Nhóm 22', 2020, 30),
('Nhóm 23', 1, 'Nhóm 23', 2020, 30),
('Nhóm 24', 1, 'Nhóm 24', 2020, 30),
('Nhóm 25', 1, 'Nhóm 25', 2020, 30),
('Nhóm 26', 1, 'Nhóm 26', 2020, 30),
('Nhóm 27', 1, 'Nhóm 27', 2020, 30),
('Nhóm 28', 1, 'Nhóm 28', 2020, 30),
('Nhóm 29', 1, 'Nhóm 29', 2020, 30),
('Nhóm 3', 1, 'Nhóm 3', 2020, 30),
('Nhóm 30', 1, 'Nhóm 30', 2020, 30),
('Nhóm 31', 1, 'Nhóm 31', 2020, 30),
('Nhóm 32', 1, 'Nhóm 32', 2020, 30),
('Nhóm 4', 1, 'Nhóm 4', 2020, 30),
('Nhóm 5', 1, 'Nhóm 5', 2020, 30),
('Nhóm 6', 1, 'Nhóm 6', 2020, 30),
('Nhóm 7', 1, 'Nhóm 7', 2020, 30),
('Nhóm 8', 1, 'Nhóm 8', 2020, 30),
('Nhóm 9', 1, 'Nhóm 9', 2020, 30);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `monhoc`
--

CREATE TABLE `monhoc` (
  `MAMONHOC` int(11) NOT NULL,
  `TENMONHOC` text DEFAULT NULL,
  `SOTINCHILYTHUYET` int(11) DEFAULT NULL,
  `SOTINCHITHUCHANH` int(11) DEFAULT NULL,
  `GHICHU` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `monhoc`
--

INSERT INTO `monhoc` (`MAMONHOC`, `TENMONHOC`, `SOTINCHILYTHUYET`, `SOTINCHITHUCHANH`, `GHICHU`) VALUES
(1, 'Giáo dục quốc phòng - An ninh', 2, 6, 'bb'),
(2, 'Giáo dục thể chất 1*', 0, 1, 'bb'),
(3, 'Triết học Mác - Lênin', 3, 0, 'bb'),
(4, 'Anh văn không chuyên 1', 2, 1, 'bb'),
(5, 'Pháp luật đại cương', 1, 1, 'bb'),
(6, 'Nhập môn công nghệ thông tin', 1, 1, 'bb'),
(7, 'Vi tích phân A1', 2, 1, 'bb'),
(8, 'Đại số tuyến tính', 1, 1, 'bb'),
(9, 'Kỹ thuật lập trình', 2, 2, 'bb'),
(10, 'Giáo dục thể chất 2*', 0, 1, 'bb'),
(11, 'Kinh tế chính trị Mác - Lênin', 2, 0, 'bb'),
(12, 'Anh văn không chuyên 2', 2, 2, 'bb'),
(13, 'Phương pháp NC khoa học', 1, 1, 'bb'),
(14, 'Tiếng Việt thực hành', 1, 1, 'bb'),
(15, 'Logic học đại cương', 1, 1, 'bb'),
(16, 'Toán rời rạc', 1, 1, 'bb'),
(17, 'Đại số đại cương', 1, 1, 'bb'),
(18, 'Cấu trúc dữ liệu và giải thuật', 2, 2, 'bb'),
(19, 'Giáo dục thể chất 3*', 0, 1, 'bb'),
(20, 'Chủ nghĩa xã hội khoa học', 2, 0, 'bb'),
(21, 'Anh văn không chuyên 3', 2, 1, 'bb'),
(22, 'Cơ sở dữ liệu', 2, 1, 'bb'),
(23, 'Vi tích phân A2', 2, 0, 'bb'),
(24, 'Lý thuyết đồ thị', 2, 1, 'bb'),
(25, 'Kiến trúc máy tính', 2, 1, 'bb'),
(26, 'Lập trình hướng đối tượng', 2, 1, 'bb'),
(27, 'Lịch sử Đảng cộng sản', 2, 0, 'bb'),
(28, 'Anh văn không chuyên 4', 2, 1, 'bb'),
(29, 'Hệ điều hành', 2, 1, 'bb'),
(30, 'Thiết kế Web', 2, 1, 'bb'),
(31, 'Mạng máy tính', 2, 1, 'bb'),
(32, 'Tiếng Anh chuyên ngành CNTT', 2, 1, 'bb'),
(33, 'Lý thuyết xếp hàng', 1, 1, 'tc'),
(34, 'Quy hoạch tuyến tính', 1, 1, 'tc'),
(35, 'Vật lý đại cương', 1, 1, 'tc'),
(36, 'Tư tưởng Hồ Chí Minh', 2, 0, 'bb'),
(37, 'Điện toán đám mây', 2, 1, 'tc'),
(38, 'Thống kê và Phân tích dữ liệu', 2, 1, 'bb'),
(39, 'Đồ án CSN', 0, 3, 'bb'),
(40, 'Chuyên đề Linux', 2, 1, 'bb'),
(41, 'Phân tích thiết kế hệ thống thông tin', 2, 1, 'bb'),
(42, 'Lập trình ứng dụng trên Windows', 2, 1, 'tc'),
(43, 'Thương mại điện tử', 2, 1, 'tc'),
(44, 'Đồ họa ứng dụng', 2, 1, 'tc'),
(45, 'An toàn và bảo mật thông tin', 2, 1, 'bb'),
(46, 'Công nghệ phần mềm', 2, 1, 'bb'),
(47, 'Lập trình thiết bị di động', 2, 1, 'bb'),
(48, 'Khai khoáng dữ liệu', 2, 1, 'bb'),
(49, 'Cơ sở trí tuệ nhân tạo', 2, 1, 'bb'),
(50, 'Hệ quản trị cơ sở dữ liệu', 2, 1, 'bb'),
(51, 'Nguyên lý kế toán', 1, 1, 'tc'),
(52, 'Kĩ thuật xây dựng và ban hành văn bản', 1, 1, 'tc'),
(53, 'Tâm lí học đại cương', 1, 1, 'tc'),
(54, 'Quản trị doanh nghiệp', 1, 1, 'tc'),
(55, 'Phát triển ứng dụng Web với mã nguồn mở', 2, 1, 'bb'),
(56, 'Xây dựng phần mềm HĐT', 2, 1, 'bb'),
(57, 'Phát triển ứng dụng hướng dịch vụ', 2, 1, 'bb'),
(58, 'Quản trị dự án công nghệ thông tin', 2, 1, 'bb'),
(59, 'Đồ án chuyên ngành', 0, 3, 'bb'),
(60, 'Xử lý ảnh', 2, 1, 'bb'),
(61, 'Tương tác người máy', 2, 1, 'tc'),
(62, 'Hệ hỗ trợ ra quyết định', 2, 1, 'tc'),
(63, 'Chuyên đề ASP.net', 2, 1, 'tc'),
(64, 'Blockchaine', 2, 1, 'tc'),
(65, 'Máy học ứng dụng', 2, 1, 'bb'),
(66, 'Thực tập tốt nghiệp', 0, 3, 'bb'),
(67, 'Khóa luận tốt nghiệp', 0, 7, 'bb'),
(68, 'Hệ thống thông tin quản lý', 2, 1, 'bb'),
(69, 'Thị giác máy tính', 2, 2, 'bb'),
(70, 'Những nguyên lý cơ bản của Chủ nghĩa Mác - Lênin', 5, 0, 'bb'),
(71, 'Giáo dục thể chất 1', 0, 1, 'bb'),
(72, 'Giáo dục Quốc phòng- An ninh', 2, 6, 'bb'),
(73, 'Tin học đại cương', 1, 2, 'bb'),
(74, 'Nhập môn ngành công nghệ kỹ thuật cơ khí', 1, 1, 'bb'),
(75, 'Toán cao cấp A1', 2, 1, 'bb'),
(76, 'Vật lý đại cương A1', 2, 1, 'bb'),
(77, 'Giáo dục thể chất 2', 0, 1, 'bb'),
(78, 'Toán cao cấp A2', 1, 1, 'bb'),
(79, 'Vật lý đại cương A2', 2, 1, 'bb'),
(80, 'Hình họa - Vẽ kỹ thuật', 1, 1, 'bb'),
(81, 'Dung sai – kỹ thuật đo', 1, 1, 'bb'),
(82, 'An toàn lao động và môi trường công nghiệp', 2, 0, 'bb'),
(83, 'Tâm lý học đại cương', 1, 1, 'tc'),
(84, 'Maketing căn bản', 1, 1, 'tc'),
(85, 'Tiếng Việt thực hành ', 1, 1, 'tc'),
(86, 'Kinh tế học đại cương', 2, 0, 'tc'),
(87, 'Giáo dục thể chất 3', 0, 1, 'bb'),
(88, 'Đường lối cách mạng của Đảng Cộng sản Việt Nam', 3, 0, 'bb'),
(89, 'Phương pháp Nghiên cứu khoa học', 1, 1, 'bb'),
(90, 'Cơ lý thuyết', 2, 0, 'bb'),
(91, 'Thực hành nguội ', 0, 2, 'bb'),
(92, 'Vật liệu cơ khí', 2, 0, 'bb'),
(93, 'Văn hóa Việt Nam', 1, 1, 'tc'),
(94, 'Kỹ năng chăm sóc khách hàng', 1, 1, 'tc'),
(95, 'Kỹ năng giao tiếp', 1, 1, 'tc'),
(96, 'Tư duy hệ thống', 1, 1, 'tc'),
(97, 'Xác suất thống kê', 1, 1, 'bb'),
(98, 'Kỹ thuật nhiệt         ', 2, 0, 'bb'),
(99, 'Vẽ Kỹ thuật với CAD', 1, 1, 'bb'),
(100, 'Kỹ thuật điện – điện tử      ', 2, 1, 'bb'),
(101, 'Sức bền vật liệu', 1, 1, 'bb'),
(102, 'Nguyên lý - Chi tiết máy ', 3, 0, 'bb'),
(103, 'Đồ án nguyên lý- chi tiết máy', 0, 1, 'bb'),
(104, 'Cơ sở Công nghệ chế tạo máy', 2, 0, 'tc'),
(105, 'Cơ học lưu chất', 2, 0, 'tc'),
(106, 'Kỹ thuật số ', 1, 1, 'tc'),
(107, 'Tổ chức quản lý kinh tế kỹ thuật', 2, 0, 'tc'),
(108, 'Thực hành cơ khí cơ bản', 0, 2, 'tc'),
(109, 'Nguyên lý động cơ đốt trong', 2, 1, 'bb'),
(110, 'Lý thuyết ô tô', 3, 0, 'bb'),
(111, 'Thực hành hệ thống truyền động ô tô', 0, 3, 'bb'),
(112, 'Hệ thống điện động cơ', 2, 2, 'bb'),
(113, 'Kỹ thuật máy nâng vận chuyển', 2, 0, 'tc'),
(114, 'Cảm biến trên ô tô', 1, 1, 'tc'),
(115, 'Vi điều khiển', 1, 1, 'tc'),
(116, 'Kỹ thuật khí nén – Thủy lực', 1, 1, 'tc'),
(117, 'Dao động trong kỹ thuật', 2, 0, 'tc'),
(118, 'Kết cấu và tính toán động cơ đốt trong', 2, 1, 'bb'),
(119, 'Thực hành Động cơ đốt trong', 0, 4, 'bb'),
(120, 'Hệ thống điện thân xe ', 2, 2, 'bb'),
(121, 'Kết cấu tính toán ô tô', 2, 1, 'bb'),
(122, 'Anh văn chuyên ngành ô tô', 2, 0, 'tc'),
(123, 'Chẩn đoán và bảo trì động cơ', 1, 1, 'tc'),
(124, 'Thí nghiệm điện – điện tử ô tô', 0, 2, 'tc'),
(125, 'Ô tô điện', 1, 1, 'tc'),
(126, 'Ô tô và môi trường', 1, 1, 'tc'),
(127, 'Hệ thống điều hòa không khí trên ô tô', 0, 2, 'tc'),
(128, 'Thực hành hệ thống vận hành và điều khiển ô tô', 0, 3, 'bb'),
(129, 'Đồ án chuyên ngành ô tô', 0, 1, 'bb'),
(130, 'Hệ thống điều khiển động cơ', 2, 2, 'bb'),
(131, 'Thực tập xí nghiệp', 0, 2, 'bb'),
(132, 'Kỹ thuật mô tô xe máy', 0, 2, 'tc'),
(133, 'Kiểm định và Chẩn đoán kỹ thuật ô tô', 1, 1, 'tc'),
(134, 'Xe chuyên dùng', 0, 2, 'tc'),
(135, 'Ô tô Hybrid', 1, 1, 'tc'),
(136, 'Hệ thống định vị ô tô (GPS)', 1, 1, 'tc'),
(137, 'Ô tô sử dụng năng lượng mới', 1, 1, 'tc'),
(138, 'Đồ án tốt nghiệp ', 0, 7, 'bb'),
(139, 'Chuyên đề tính toán, thiết kế ô tô', 1, 1, 'bb'),
(140, 'Chuyên đề hệ thống điều khiển ô tô', 2, 1, 'bb'),
(141, 'Chuyên đề công nghệ mới trên ô tô', 1, 1, 'bb'),
(142, 'An toàn lao động và môi trường CN', 2, 0, 'bb'),
(143, 'Anh văn chuyên ngành cơ khí', 2, 0, 'tc'),
(144, 'Quản trị sản xuất và chất lượng', 2, 0, 'tc'),
(145, 'Thí nghiệm cơ học', 0, 1, 'bb'),
(146, 'Trang bị điện, Điện tử trong máy công nghiệp', 1, 1, 'bb'),
(147, 'Thực hành hàn', 0, 2, 'bb'),
(148, 'Thực hành tiện 1', 0, 3, 'bb'),
(149, 'Công nghệ nano', 2, 0, 'tc'),
(150, 'Tối ưu hóa trong kỹ thuật', 2, 0, 'tc'),
(151, 'Kỹ thuật độ tin cậy', 2, 0, 'tc'),
(152, 'Điều khiển tự động', 1, 1, 'tc'),
(153, 'Công nghệ chế tạo máy', 2, 0, 'bb'),
(154, 'Đồ án Công nghệ chế tạo máy', 0, 1, 'bb'),
(155, 'Công nghệ kim loại', 2, 0, 'bb'),
(156, 'Công nghệ khí nén – Thủy lực', 2, 1, 'bb'),
(157, 'Thực hành tiện 2', 0, 3, 'bb'),
(158, 'Thực hành phay', 0, 2, 'bb'),
(159, 'Bảo trì và bảo dưỡng công nghiệp', 1, 1, 'tc'),
(160, 'Công nghệ khuôn mẫu', 2, 0, 'tc'),
(161, 'Máy chế biến lương thực', 2, 0, 'tc'),
(162, 'Công nghệ và thiết bị sấy', 2, 0, 'tc'),
(163, 'Máy cắt kim loại', 2, 0, 'bb'),
(164, 'Tự động hóa quá trình sản xuất', 1, 1, 'bb'),
(165, 'Công nghệ CAD/CAM/CNC', 1, 1, 'bb'),
(166, 'Thực hành CNC', 0, 2, 'bb'),
(167, 'Robot công nghiệp', 1, 1, 'bb'),
(168, 'Thiết kế sản phẩm công nghiệp', 1, 1, 'tc'),
(169, 'Ma sát học', 2, 0, 'tc'),
(170, 'Thiết kế mô phỏng hệ thống máy', 1, 1, 'tc'),
(171, 'Năng lượng và quản lý năng lượng', 2, 0, 'tc'),
(172, 'Các phương pháp gia công đặc biệt', 2, 0, 'tc'),
(173, 'Hoặc học bổ sung kiến thức:', 4, 3, 'bb'),
(174, 'Chuyên đề tính toán, thiết kế trong cơ khí', 1, 1, 'bb'),
(175, 'Chuyên đề các phương pháp gia công mới', 2, 1, 'bb'),
(176, 'Chuyên đề công nghệ và vật liệu mới', 1, 1, 'bb'),
(177, 'Giáo dục thể chất 1 ', 0, 1, 'bb'),
(178, 'Những nguyên lý cơ bản của  Chủ nghĩa Mác - Lênin ', 5, 0, 'bb'),
(179, 'Anh văn không chuyên 1 ', 2, 2, 'bb'),
(180, 'Tin học đại cương ', 1, 2, 'bb'),
(181, 'Pháp luật đại cương ', 1, 1, 'bb'),
(182, 'Đại số tuyến tính ', 1, 1, 'bb'),
(183, 'Toán cao cấp A1 ', 2, 1, 'bb'),
(184, 'Vật lý đại cương A1 ', 2, 1, 'bb'),
(185, 'Giáo dục thể chất 2 ', 0, 1, 'bb'),
(186, 'Nhập môn ngành công nghệ  kỹ thuật Điện ', 1, 1, 'bb'),
(187, 'Anh văn không chuyên 2 ', 2, 1, 'bb'),
(188, 'Tư tưởng Hồ Chí Minh ', 2, 0, 'bb'),
(189, 'Toán cao cấp A2 ', 1, 1, 'bb'),
(190, 'Môi trường và con người ', 2, 0, 'bb'),
(191, 'Vật lý đại cương A2 ', 2, 1, 'bb'),
(192, 'Vẽ kỹ thuật điện với CAD ', 1, 2, 'bb'),
(193, 'Mạch điện 1 ', 3, 0, 'bb'),
(194, 'Giáo dục thể chất 3 ', 0, 1, 'bb'),
(195, 'Đường lối cách mạng của  Đảng Cộng sản Việt Nam ', 3, 0, 'bb'),
(196, 'Anh văn không chuyên 3 ', 2, 1, 'bb'),
(197, 'Thực hành Điện cơ bản ', 0, 2, 'bb'),
(198, 'Điện tử cơ bản ', 3, 0, 'bb'),
(199, 'Hàm biến phức và phép biến  đổi Laplace ', 2, 0, 'tc'),
(200, 'Kỹ thuật lập trình ', 1, 1, 'tc'),
(201, 'Khởi tạo doanh nghiệp ', 1, 1, 'tc'),
(202, 'Hoá học đại cương ', 3, 1, 'tc'),
(203, 'Xác suất thống kê ', 1, 1, 'tc'),
(204, 'Anh văn chuyên ngành ', 1, 1, 'bb'),
(205, 'Đo lường điện ', 2, 0, 'bb'),
(206, 'Vi mạch tương tự và số ', 3, 0, 'bb'),
(207, 'An toàn điện ', 2, 0, 'bb'),
(208, 'Mạch điện 2 (MĐ 2) ', 2, 0, 'bb'),
(209, 'Thiết bị điện trong truyền tải  và phân phối điện ', 2, 0, 'bb'),
(210, 'Vật liệu điện ', 2, 0, 'bb'),
(211, 'Máy điện 1 ', 3, 0, 'bb'),
(212, 'Thực hành điện tử cơ bản ', 0, 1, 'bb'),
(213, 'Máy điện 2 ', 2, 0, 'bb'),
(214, 'Kỹ thuật điều khiển tự động ', 2, 0, 'bb'),
(215, 'Đồ án máy điện ', 0, 1, 'bb'),
(216, 'Điện tử công suất ', 3, 0, 'bb'),
(217, 'Trang bị điện ', 2, 0, 'bb'),
(218, 'Mạng cung cấp điện ', 3, 0, 'bb'),
(219, 'Phương pháp nghiên cứu khoa  học ', 1, 1, 'bb'),
(220, 'Thực hành đo lường điện ', 0, 1, 'bb'),
(221, 'Thực hành vi mạch ', 0, 1, 'bb'),
(222, 'Vi điều khiển ', 2, 0, 'bb'),
(223, 'Thí nghiệm máy điện ', 0, 2, 'bb'),
(224, 'Ngắn mạch trong hệ thống  điện ', 3, 0, 'bb'),
(225, 'Đồ án điện tử công suất ', 0, 1, 'bb'),
(226, 'Thực hành Điện tử công suất ', 0, 2, 'bb'),
(227, 'Truyền động điện ', 2, 0, 'bb'),
(228, 'Thực hành trang bị điện – khí  nén ', 0, 3, 'bb'),
(229, 'Đồ án Mạng cung cấp điện ', 0, 1, 'bb'),
(230, 'Thực hành cảm biến ', 0, 2, 'bb'),
(231, 'Thực hành PLC ', 0, 3, 'bb'),
(232, 'Lập trình giao diện điều khiển  người – máy (HMI) ', 0, 2, 'bb'),
(233, 'Thực hành Vi điều khiển ', 0, 2, 'tc'),
(234, 'Truyền số liệu ', 2, 0, 'tc'),
(235, 'Thực hành máy điện ', 0, 2, 'tc'),
(236, 'Đo lường và điều khiển bằng  máy tính ', 2, 0, 'tc'),
(237, 'Tự động hoá quá trình sản  xuất ', 2, 0, 'tc'),
(238, 'Máy điện đặc biệt trong các  thiết bị tự động ', 2, 0, 'tc'),
(239, 'Năng lượng tái tạo ', 2, 0, 'tc'),
(240, 'Quản lý dự án công trình điện ', 2, 0, 'tc'),
(241, 'Thiết kế chiếu sáng ', 2, 0, 'bb'),
(242, 'Thực hành Điều khiển động  cơ bằng biến tần ', 0, 2, 'bb'),
(243, 'Thực tập tốt nghiệp ', 0, 3, 'bb'),
(244, 'Kỹ thuật thuỷ khí ', 2, 0, 'tc'),
(245, 'Bảo vệ rơ le trong hệ thống  điện ', 3, 0, 'tc'),
(246, 'Phần điện trong nhà máy điện  và trạm biến áp ', 3, 0, 'tc'),
(247, 'Robot công nghiệp ', 2, 0, 'tc'),
(248, 'Thiết kế máy biến áp ', 2, 0, 'tc'),
(249, 'CAD trong điện công nghiệp ', 0, 2, 'tc'),
(250, 'Kỹ thuật cao áp ', 2, 0, 'tc'),
(251, 'Thực hành Mạng cung cấp  điện ', 0, 2, 'tc'),
(252, 'Quản trị công nghiệp ', 2, 0, 'tc'),
(253, '- Mạng truyền thông và điều  khiển công nghiệp (CC ', 1, 2, 'bb'),
(254, '- Giải tích và điều khiển  máy điện ', 4, 0, 'bb');

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
(8, 'Năm học 2023-2024'),
(9, 'Năm Học 2024');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nghien_cuu_kh`
--

CREATE TABLE `nghien_cuu_kh` (
  `TEN_DE_TAI` varchar(255) NOT NULL,
  `THOI_GIAN_DANG_KY` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nghien_cuu_kh`
--

INSERT INTO `nghien_cuu_kh` (`TEN_DE_TAI`, `THOI_GIAN_DANG_KY`) VALUES
('ádsadadad', '2024-09-17');

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
('23132131', 'edasdasdad', NULL, 'Giảng Viên', 'Đang hoạt động'),
('annb@tvu.edu.vn', '00245', NULL, 'Giảng Viên', 'Đang hoạt động'),
('baoquocone@gmail.com', '99997', NULL, 'Trưởng Khoa', 'Đang hoạt động'),
('baoquoczero@gmail.com', '99999', NULL, 'Admin', 'Đang hoạt động'),
('diemhanh_tvu@tvu.edu.vn', '12705', NULL, 'Giảng Viên', 'Đang hoạt động'),
('duongminh@tvu.edu.vn', '00248', NULL, 'Giảng Viên', 'Đang hoạt động'),
('Hattvi201084@tvu.edu.vn', '00249', NULL, 'Giảng Viên', 'Đang hoạt động'),
('hientvu@tvu.edu.vn', '00257', NULL, 'Giảng Viên', 'Đang hoạt động'),
('huyngocntt@tvu.edu.vn', '00254', NULL, 'Giảng Viên', 'Đang hoạt động'),
('hvthanh@tvu.edu.vn', '00243', NULL, 'Giảng Viên', 'Đang hoạt động'),
('lamnn@tvu.edu.vn', '00244', NULL, 'Trưởng Bộ Môn', 'Đang hoạt động'),
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
  `TEN_KHOA` text DEFAULT NULL,
  `GHICHU` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thoigian_xacnhan`
--

INSERT INTO `thoigian_xacnhan` (`MA_THOIGIAN_XACNHAN`, `THOIGIANBATDAU`, `THOIGIANKETTHUC`, `TEN_KHOA`, `GHICHU`) VALUES
(9, '2024-08-06 20:29:00', '2030-12-01 20:29:00', 'Khoa Kỹ Thuật Công Nghệ', 'CHONKHUNG'),
(22, '2024-08-06 20:29:00', '2030-12-01 20:29:00', 'Khoa Công Nghệ Thông Tin', 'CHONKHUNG'),
(34, '2024-08-31 19:03:38', '2030-08-01 19:03:38', 'Khoa Công Nghệ Thông Tin', 'NGHIENCUU'),
(35, '2024-08-31 19:03:38', '2030-08-01 19:03:38', 'Khoa Kỹ Thuật Công Nghệ', 'NGHIENCUU'),
(36, '2024-08-31 19:03:38', '2030-08-01 19:03:38', 'Ngoài trường', 'NGHIENCUU');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thuoc`
--

CREATE TABLE `thuoc` (
  `MACHUONGTRINH` int(11) NOT NULL,
  `MAMONHOC` int(11) NOT NULL,
  `SOTHUTUHOCKI` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thuoc`
--

INSERT INTO `thuoc` (`MACHUONGTRINH`, `MAMONHOC`, `SOTHUTUHOCKI`) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(1, 4, 1),
(1, 5, 1),
(1, 6, 1),
(1, 7, 1),
(1, 8, 1),
(1, 9, 1),
(1, 10, 2),
(1, 11, 2),
(1, 12, 2),
(1, 13, 2),
(1, 14, 2),
(1, 15, 2),
(1, 16, 2),
(1, 17, 2),
(1, 18, 2),
(1, 19, 3),
(1, 20, 3),
(1, 21, 3),
(1, 22, 3),
(1, 23, 3),
(1, 24, 3),
(1, 25, 3),
(1, 26, 3),
(1, 27, 4),
(1, 28, 4),
(1, 29, 4),
(1, 30, 4),
(1, 31, 4),
(1, 32, 4),
(1, 33, 4),
(1, 34, 4),
(1, 35, 4),
(1, 36, 5),
(1, 37, 5),
(1, 38, 5),
(1, 39, 5),
(1, 40, 5),
(1, 41, 5),
(1, 42, 5),
(1, 43, 5),
(1, 44, 5),
(1, 45, 6),
(1, 46, 6),
(1, 47, 6),
(1, 48, 6),
(1, 49, 6),
(1, 50, 6),
(1, 51, 6),
(1, 52, 6),
(1, 53, 6),
(1, 54, 6),
(1, 55, 7),
(1, 56, 7),
(1, 57, 7),
(1, 58, 7),
(1, 59, 7),
(1, 60, 7),
(1, 61, 7),
(1, 62, 7),
(1, 63, 7),
(1, 64, 7),
(1, 65, 8),
(1, 66, 8),
(1, 67, 8),
(1, 68, 8),
(1, 69, 8),
(2, 4, 1),
(2, 5, 1),
(2, 8, 3),
(2, 9, 4),
(2, 12, 2),
(2, 15, 2),
(2, 21, 3),
(2, 36, 2),
(2, 54, 3),
(2, 66, 8),
(2, 70, 1),
(2, 71, 1),
(2, 72, 1),
(2, 73, 1),
(2, 74, 1),
(2, 75, 1),
(2, 76, 1),
(2, 77, 2),
(2, 78, 2),
(2, 79, 2),
(2, 80, 2),
(2, 81, 2),
(2, 82, 2),
(2, 83, 2),
(2, 84, 2),
(2, 85, 2),
(2, 86, 2),
(2, 87, 3),
(2, 88, 3),
(2, 89, 3),
(2, 90, 3),
(2, 91, 3),
(2, 92, 3),
(2, 93, 3),
(2, 94, 3),
(2, 95, 3),
(2, 96, 3),
(2, 97, 4),
(2, 98, 4),
(2, 99, 4),
(2, 100, 4),
(2, 101, 4),
(2, 102, 4),
(2, 103, 4),
(2, 104, 4),
(2, 105, 4),
(2, 106, 4),
(2, 107, 4),
(2, 108, 4),
(2, 109, 5),
(2, 110, 5),
(2, 111, 5),
(2, 112, 5),
(2, 113, 5),
(2, 114, 5),
(2, 115, 5),
(2, 116, 5),
(2, 117, 5),
(2, 118, 6),
(2, 119, 6),
(2, 120, 6),
(2, 121, 6),
(2, 122, 6),
(2, 123, 6),
(2, 124, 6),
(2, 125, 6),
(2, 126, 6),
(2, 127, 6),
(2, 128, 7),
(2, 129, 7),
(2, 130, 7),
(2, 131, 7),
(2, 132, 7),
(2, 133, 7),
(2, 134, 7),
(2, 135, 7),
(2, 136, 7),
(2, 137, 7),
(2, 138, 8),
(2, 139, 8),
(2, 140, 8),
(2, 141, 8),
(3, 1, 1),
(3, 4, 1),
(3, 5, 1),
(3, 8, 3),
(3, 9, 4),
(3, 12, 2),
(3, 15, 2),
(3, 21, 3),
(3, 36, 2),
(3, 54, 3),
(3, 66, 8),
(3, 70, 1),
(3, 71, 1),
(3, 73, 1),
(3, 74, 1),
(3, 75, 1),
(3, 76, 1),
(3, 77, 2),
(3, 78, 2),
(3, 79, 2),
(3, 80, 2),
(3, 81, 2),
(3, 83, 2),
(3, 84, 2),
(3, 85, 2),
(3, 86, 2),
(3, 87, 3),
(3, 88, 3),
(3, 89, 3),
(3, 90, 3),
(3, 91, 3),
(3, 92, 3),
(3, 93, 3),
(3, 94, 3),
(3, 95, 3),
(3, 96, 3),
(3, 97, 4),
(3, 98, 4),
(3, 99, 4),
(3, 100, 4),
(3, 101, 4),
(3, 102, 4),
(3, 103, 4),
(3, 104, 5),
(3, 105, 5),
(3, 106, 4),
(3, 107, 4),
(3, 113, 6),
(3, 117, 5),
(3, 131, 7),
(3, 138, 8),
(3, 142, 2),
(3, 143, 4),
(3, 144, 4),
(3, 145, 5),
(3, 146, 5),
(3, 147, 5),
(3, 148, 5),
(3, 149, 5),
(3, 150, 5),
(3, 151, 5),
(3, 152, 5),
(3, 153, 6),
(3, 154, 6),
(3, 155, 6),
(3, 156, 6),
(3, 157, 6),
(3, 158, 6),
(3, 159, 6),
(3, 160, 6),
(3, 161, 6),
(3, 162, 6),
(3, 163, 7),
(3, 164, 7),
(3, 165, 7),
(3, 166, 7),
(3, 167, 7),
(3, 168, 7),
(3, 169, 7),
(3, 170, 7),
(3, 171, 7),
(3, 172, 7),
(3, 173, 8),
(3, 174, 8),
(3, 175, 8),
(3, 176, 8),
(4, 1, 1),
(4, 138, 9),
(4, 177, 1),
(4, 178, 1),
(4, 179, 1),
(4, 180, 1),
(4, 181, 1),
(4, 182, 1),
(4, 183, 1),
(4, 184, 1),
(4, 185, 2),
(4, 186, 2),
(4, 187, 2),
(4, 188, 2),
(4, 189, 2),
(4, 190, 2),
(4, 191, 2),
(4, 192, 2),
(4, 193, 2),
(4, 194, 3),
(4, 195, 3),
(4, 196, 3),
(4, 197, 3),
(4, 198, 3),
(4, 199, 3),
(4, 200, 3),
(4, 201, 3),
(4, 202, 3),
(4, 203, 3),
(4, 204, 4),
(4, 205, 4),
(4, 206, 4),
(4, 207, 4),
(4, 208, 4),
(4, 209, 4),
(4, 210, 4),
(4, 211, 4),
(4, 212, 4),
(4, 213, 5),
(4, 214, 5),
(4, 215, 5),
(4, 216, 5),
(4, 217, 5),
(4, 218, 5),
(4, 219, 5),
(4, 220, 5),
(4, 221, 5),
(4, 222, 6),
(4, 223, 6),
(4, 224, 6),
(4, 225, 6),
(4, 226, 6),
(4, 227, 6),
(4, 228, 6),
(4, 229, 7),
(4, 230, 7),
(4, 231, 7),
(4, 232, 7),
(4, 233, 7),
(4, 234, 7),
(4, 235, 7),
(4, 236, 7),
(4, 237, 7),
(4, 238, 7),
(4, 239, 7),
(4, 240, 7),
(4, 241, 8),
(4, 242, 8),
(4, 243, 8),
(4, 244, 8),
(4, 245, 8),
(4, 246, 8),
(4, 247, 8),
(4, 248, 8),
(4, 249, 8),
(4, 250, 8),
(4, 251, 8),
(4, 252, 8),
(4, 253, 9),
(4, 254, 9);

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
(1, 1, '16.2.b.Tác giả thứ nhất (bài có nhiều tác giả) là viên chức Trường ĐHTV: 50% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18, trường hợp đồng tác giả thứ nhất thì chia đều 50% cho đồng tác giả thứ nhất; 50% còn lại được chia đều cho các đồng tác giả còn lại bao gồm tác giả chịu trách nhiệm (nếu có); tác giả độc lập hưởng 50% như tác giả thứ nhất;', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chia đều cho các Tác giả thứ nhất'),
(2, 1, '16.2.b.Tác giả thứ nhất (bài có nhiều tác giả) là viên chức Trường ĐHTV: 50% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18, trường hợp đồng tác giả thứ nhất thì chia đều 50% cho đồng tác giả thứ nhất; 50% còn lại được chia đều cho các đồng tác giả còn lại bao gồm tác giả chịu trách nhiệm (nếu có); tác giả độc lập hưởng 50% như tác giả thứ nhất;', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chia đều cho các đồng tác giả còn lại bao gồm tác giả chịu trách nhiệm (nếu có). Trừ tác giả thứ nhất'),
(3, 1, '16.2.c.Trường hợp tác giả thứ nhất không phải là viên chức của trường thì xét đến tác giả chịu trách nhiệm: nếu có hai tác giả chịu trách nhiệm thì chia đều 50% cho đồng tác giả này, nếu có một tác giả chịu trách nhiệm thì hưởng 30% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18; các đồng tác giả còn lại được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất);', 0, 'Không', 'Có', 'Đang áp dụng', 'Tác giả thứ nhất không thuộc trường'),
(4, 1, '16.2.c.Trường hợp tác giả thứ nhất không phải là viên chức của trường thì xét đến tác giả chịu trách nhiệm: nếu có hai tác giả chịu trách nhiệm thì chia đều 50% cho đồng tác giả này, nếu có một tác giả chịu trách nhiệm thì hưởng 30% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18; các đồng tác giả còn lại được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất);', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chia cho 2 tác giả chịu trách nhiệm, chia đều'),
(5, 1, '16.2.c.Trường hợp tác giả thứ nhất không phải là viên chức của trường thì xét đến tác giả chịu trách nhiệm: nếu có hai tác giả chịu trách nhiệm thì chia đều 50% cho đồng tác giả này, nếu có một tác giả chịu trách nhiệm thì hưởng 30% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18; các đồng tác giả còn lại được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất);', 0.3, 'Có', 'Có', 'Đang áp dụng', 'Chia cho 1  tác giả chịu trách nhiệm'),
(6, 1, '16.2.c.Trường hợp tác giả thứ nhất không phải là viên chức của trường thì xét đến tác giả chịu trách nhiệm: nếu có hai tác giả chịu trách nhiệm thì chia đều 50% cho đồng tác giả này, nếu có một tác giả chịu trách nhiệm thì hưởng 30% định mức sản phẩm KH&CN tương ứng quy định tại Điều 17, Điều 18; các đồng tác giả còn lại được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất);', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Các đồng tác giả còn lại (trừ tác giả chịu trách nhiệm) được chia đều từ 50% định mức quy định cho tổng số tác giả (bao gồm tác giả thứ nhất ngoài trường);'),
(7, 1, '16.2.dTrường hợp tác giả thứ nhất là viên chức của Trường ĐHTV nhưng không phải thực hiện chuẩn thì các tác giả còn lại hưởng 50% chia đều cho các đồng tác giả (kể cả tác giả chịu trách nhiệm). Tác giả thứ nhất được thưởng giờ dư theo quy định.', 0, 'Có', 'Không', 'Đang áp dụng', 'Tác giả thứ nhất không thực hiện chuẩn'),
(8, 1, '16.2.dTrường hợp tác giả thứ nhất là viên chức của Trường ĐHTV nhưng không phải thực hiện chuẩn thì các tác giả còn lại hưởng 50% chia đều cho các đồng tác giả (kể cả tác giả chịu trách nhiệm). Tác giả thứ nhất được thưởng giờ dư theo quy định.', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chia đều cho các đồng tác giả (kể cả tác giả chịu trách nhiệm). Trừ tác giả thứ nhất'),
(9, 1, '16.3.a. Đối với bằng SHTT, chỉ xem xét sản phẩm SHTT do Trường ĐHTV làm chủ đơn hoặc đồng chủ đơn. Tác giả thứ nhất tài sản trí tuệ (TSTT) liên quan quyết định tỷ lệ hưởng giờ quy chuẩn NCKH trên cơ sở đồng thuận đối với TSTT có nhiều tác giả (trường hợp tác giả thứ nhất là viên chức của Trường ĐHTV); Trường hợp cá nhân thực hiện thì hưởng 100% mức quy đổi; Trường hợp tác giả thứ nhất không phải là viên chức Trường ĐHTV và viên chức Trường ĐHTV là tác giả khác thì hưởng bằng 50% định mức chia đều cho tổng số tác giả;', 1, 'Có', 'Có', 'Đang áp dụng', 'Trường hợp cá nhân thực hiện thì hưởng 100% mức quy đổi;'),
(10, 1, '16.3.a. Đối với bằng SHTT, chỉ xem xét sản phẩm SHTT do Trường ĐHTV làm chủ đơn hoặc đồng chủ đơn. Tác giả thứ nhất tài sản trí tuệ (TSTT) liên quan quyết định tỷ lệ hưởng giờ quy chuẩn NCKH trên cơ sở đồng thuận đối với TSTT có nhiều tác giả (trường hợp tác giả thứ nhất là viên chức của Trường ĐHTV); Trường hợp cá nhân thực hiện thì hưởng 100% mức quy đổi; Trường hợp tác giả thứ nhất không phải là viên chức Trường ĐHTV và viên chức Trường ĐHTV là tác giả khác thì hưởng bằng 50% định mức chia đều cho tổng số tác giả;', 0, 'Không', 'Có', 'Đang áp dụng', 'Trường hợp tác giả thứ nhất không phải là viên chức Trường ĐHTV'),
(11, 1, '16.3.a. Đối với bằng SHTT, chỉ xem xét sản phẩm SHTT do Trường ĐHTV làm chủ đơn hoặc đồng chủ đơn. Tác giả thứ nhất tài sản trí tuệ (TSTT) liên quan quyết định tỷ lệ hưởng giờ quy chuẩn NCKH trên cơ sở đồng thuận đối với TSTT có nhiều tác giả (trường hợp tác giả thứ nhất là viên chức của Trường ĐHTV); Trường hợp cá nhân thực hiện thì hưởng 100% mức quy đổi; Trường hợp tác giả thứ nhất không phải là viên chức Trường ĐHTV và viên chức Trường ĐHTV là tác giả khác thì hưởng bằng 50% định mức chia đều cho tổng số tác giả;', 0, 'Có', 'Không', 'Đang áp dụng', 'Trường hợp tác giả thứ nhất không thực hiện chuẩn (Không được luật nhắc đến)'),
(12, 1, '16.3.a. Đối với bằng SHTT, chỉ xem xét sản phẩm SHTT do Trường ĐHTV làm chủ đơn hoặc đồng chủ đơn. Tác giả thứ nhất tài sản trí tuệ (TSTT) liên quan quyết định tỷ lệ hưởng giờ quy chuẩn NCKH trên cơ sở đồng thuận đối với TSTT có nhiều tác giả (trường hợp tác giả thứ nhất là viên chức của Trường ĐHTV); Trường hợp cá nhân thực hiện thì hưởng 100% mức quy đổi; Trường hợp tác giả thứ nhất không phải là viên chức Trường ĐHTV và viên chức Trường ĐHTV là tác giả khác thì hưởng bằng 50% định mức chia đều cho tổng số tác giả;', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Tác giả thứ nhất tài sản trí tuệ (TSTT) liên quan quyết định tỷ lệ hưởng giờ quy chuẩn NCKH trên cơ sở đồng thuận đối với TSTT có nhiều tác giả (trường hợp tác giả thứ nhất là viên chức của Trường ĐHTV)'),
(13, 1, '16.3.a. Đối với bằng SHTT, chỉ xem xét sản phẩm SHTT do Trường ĐHTV làm chủ đơn hoặc đồng chủ đơn. Tác giả thứ nhất tài sản trí tuệ (TSTT) liên quan quyết định tỷ lệ hưởng giờ quy chuẩn NCKH trên cơ sở đồng thuận đối với TSTT có nhiều tác giả (trường hợp tác giả thứ nhất là viên chức của Trường ĐHTV); Trường hợp cá nhân thực hiện thì hưởng 100% mức quy đổi; Trường hợp tác giả thứ nhất không phải là viên chức Trường ĐHTV và viên chức Trường ĐHTV là tác giả khác thì hưởng bằng 50% định mức chia đều cho tổng số tác giả;', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Viên chức Trường ĐHTV là tác giả khác thì hưởng bằng 50% định mức chia đều cho tổng số tác giả;'),
(14, 1, '20.3. Quy đổi viết thuyết minh đề tài, dự án và các hoạt động KH&CN ra giờ chuẩn NCKH.', 0, 'Có', 'Không', 'Đang áp dụng', 'Trường hợp không thực hiện chuẩn'),
(15, 1, '20.3. Quy đổi viết thuyết minh đề tài, dự án và các hoạt động KH&CN ra giờ chuẩn NCKH.', 0, 'Không', 'Có', 'Đang áp dụng', 'Trường hợp không thuộc trường'),
(16, 1, '20.3. Quy đổi viết thuyết minh đề tài, dự án và các hoạt động KH&CN ra giờ chuẩn NCKH.', 1, 'Có', 'Có', 'Đang áp dụng', 'Cá nhân thực hiện'),
(17, 1, '21.1. Chủ nhiệm đề tài quyết tỷ lệ hưởng giờ quy chuẩn NCKH cho các thành viên thực hiện đề tài trên cơ sở đồng thuận bằng văn bản (quyết định của chủ nhiệm đề tài là quyết định cuối cùng); trong trường hợp chủ nhiệm đề tài không phải là viên chức Trường ĐHTV thì lấy 50% số giờ được quy chuẩn quy định tại khoản 2 Điều này chia đều cho tổng số thành viên thực hiện đề tài (bao gồm chủ nhiệm đề tài).', 0, 'Có', 'Không', 'Đang áp dụng', 'Trường hợp không thực hiện chuẩn'),
(18, 1, '21.1. Chủ nhiệm đề tài quyết tỷ lệ hưởng giờ quy chuẩn NCKH cho các thành viên thực hiện đề tài trên cơ sở đồng thuận bằng văn bản (quyết định của chủ nhiệm đề tài là quyết định cuối cùng); trong trường hợp chủ nhiệm đề tài không phải là viên chức Trường ĐHTV thì lấy 50% số giờ được quy chuẩn quy định tại khoản 2 Điều này chia đều cho tổng số thành viên thực hiện đề tài (bao gồm chủ nhiệm đề tài).', 0, 'Không', 'Có', 'Đang áp dụng', 'Trường hợp không thuộc trường'),
(19, 1, '21.1. Chủ nhiệm đề tài quyết tỷ lệ hưởng giờ quy chuẩn NCKH cho các thành viên thực hiện đề tài trên cơ sở đồng thuận bằng văn bản (quyết định của chủ nhiệm đề tài là quyết định cuối cùng); trong trường hợp chủ nhiệm đề tài không phải là viên chức Trường ĐHTV thì lấy 50% số giờ được quy chuẩn quy định tại khoản 2 Điều này chia đều cho tổng số thành viên thực hiện đề tài (bao gồm chủ nhiệm đề tài).', 1, 'Có', 'Có', 'Đang áp dụng', 'Cá nhân thực hiện'),
(20, 1, 'Điều 19.d. Trường hợp sản phẩm có chủ biên/tác giả thứ nhất là viên chức thuộc khối phục vụ đào tạo và các đồng tác giả (ĐTG) còn lại nếu là giảng viên thuộc khối đào tạo thì được kê khai nhiệm vụ NCKH với định mức bằng 50% định mức tương ứng quy định tại Điều này được chia đều cho các ĐTG; chủ biên/tác giả thứ nhất được xem xét khen thưởng bằng 50% định mức khen thưởng theo quy định;', 0, 'Có', 'Không', 'Đang áp dụng', 'Trường hợp chủ biên không thực hiện chuẩn'),
(21, 1, 'Điều 19.d. Trường hợp sản phẩm có chủ biên/tác giả thứ nhất là viên chức thuộc khối phục vụ đào tạo và các đồng tác giả (ĐTG) còn lại nếu là giảng viên thuộc khối đào tạo thì được kê khai nhiệm vụ NCKH với định mức bằng 50% định mức tương ứng quy định tại Điều này được chia đều cho các ĐTG; chủ biên/tác giả thứ nhất được xem xét khen thưởng bằng 50% định mức khen thưởng theo quy định;', 0, 'Không', 'Có', 'Đang áp dụng', 'Trường hợp chủ biên không thuộc trường'),
(22, 1, 'Điều 19.d. Trường hợp sản phẩm có chủ biên/tác giả thứ nhất là viên chức thuộc khối phục vụ đào tạo và các đồng tác giả (ĐTG) còn lại nếu là giảng viên thuộc khối đào tạo thì được kê khai nhiệm vụ NCKH với định mức bằng 50% định mức tương ứng quy định tại Điều này được chia đều cho các ĐTG; chủ biên/tác giả thứ nhất được xem xét khen thưởng bằng 50% định mức khen thưởng theo quy định;', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Chủ biên/tác giả thứ nhất được xem xét khen thưởng bằng 50% định mức khen thưởng theo quy định;'),
(23, 1, 'Điều 19.d. Trường hợp sản phẩm có chủ biên/tác giả thứ nhất là viên chức thuộc khối phục vụ đào tạo và các đồng tác giả (ĐTG) còn lại nếu là giảng viên thuộc khối đào tạo thì được kê khai nhiệm vụ NCKH với định mức bằng 50% định mức tương ứng quy định tại Điều này được chia đều cho các ĐTG; chủ biên/tác giả thứ nhất được xem xét khen thưởng bằng 50% định mức khen thưởng theo quy định;', 0.5, 'Có', 'Có', 'Đang áp dụng', 'Các đồng tác giả (ĐTG) còn lại nếu là giảng viên thuộc khối đào tạo thì được kê khai nhiệm vụ NCKH với định mức bằng 50% định mức tương ứng quy định tại Điều này được chia đều cho các ĐTG;');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bangphancong`
--
ALTER TABLE `bangphancong`
  ADD PRIMARY KEY (`MAPHANCONG`),
  ADD KEY `FK_PHAN_CONG_HOC_KY` (`MAHKNK`),
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
  ADD PRIMARY KEY (`MA_DANH_MUC`,`MAGV`,`MANAMHOC`,`MA_LOAI_TAC_GIA`,`TEN_DE_TAI`),
  ADD KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI2` (`MAGV`),
  ADD KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI3` (`MANAMHOC`),
  ADD KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI4` (`MA_LOAI_TAC_GIA`),
  ADD KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI5` (`TEN_DE_TAI`);

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
-- Chỉ mục cho bảng `nghien_cuu_kh`
--
ALTER TABLE `nghien_cuu_kh`
  ADD PRIMARY KEY (`TEN_DE_TAI`);

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
  MODIFY `MAPHANCONG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT cho bảng `bomon`
--
ALTER TABLE `bomon`
  MODIFY `MABOMON` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `chitietphancong`
--
ALTER TABLE `chitietphancong`
  MODIFY `MACHITIETPHANCONG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;

--
-- AUTO_INCREMENT cho bảng `chucdanh`
--
ALTER TABLE `chucdanh`
  MODIFY `MACHUCDANH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `chucvu`
--
ALTER TABLE `chucvu`
  MODIFY `MACHUCVU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `chuongtrinhdaotao`
--
ALTER TABLE `chuongtrinhdaotao`
  MODIFY `MACHUONGTRINH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `danhmucquydoispkhcn`
--
ALTER TABLE `danhmucquydoispkhcn`
  MODIFY `MA_DANH_MUC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT cho bảng `hinhthucdanhgia`
--
ALTER TABLE `hinhthucdanhgia`
  MODIFY `MADANHGIAKETTHUC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `hockynienkhoa`
--
ALTER TABLE `hockynienkhoa`
  MODIFY `MAHKNK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `khoa`
--
ALTER TABLE `khoa`
  MODIFY `MAKHOA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
  MODIFY `MAMONHOC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=255;

--
-- AUTO_INCREMENT cho bảng `namhoc`
--
ALTER TABLE `namhoc`
  MODIFY `MANAMHOC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `quy_dinh`
--
ALTER TABLE `quy_dinh`
  MODIFY `MA_QUY_DINH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `thoigian_xacnhan`
--
ALTER TABLE `thoigian_xacnhan`
  MODIFY `MA_THOIGIAN_XACNHAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `ty_le_quy_doi_gio_chuan`
--
ALTER TABLE `ty_le_quy_doi_gio_chuan`
  MODIFY `MA_QUY_DOI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bangphancong`
--
ALTER TABLE `bangphancong`
  ADD CONSTRAINT `FK_PHAN_CONG_HOC_KY` FOREIGN KEY (`MAHKNK`) REFERENCES `hockynienkhoa` (`MAHKNK`),
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
  ADD CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI4` FOREIGN KEY (`MA_LOAI_TAC_GIA`) REFERENCES `loai_tac_gia` (`MA_LOAI_TAC_GIA`),
  ADD CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI5` FOREIGN KEY (`TEN_DE_TAI`) REFERENCES `nghien_cuu_kh` (`TEN_DE_TAI`);

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
