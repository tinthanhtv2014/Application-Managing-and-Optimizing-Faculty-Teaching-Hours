-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 05, 2024 lúc 03:20 PM
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

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `giangvien`
--
ALTER TABLE `giangvien`
  ADD PRIMARY KEY (`MAGV`),
  ADD KEY `FK_THUOC_BO_MON` (`MABOMON`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `giangvien`
--
ALTER TABLE `giangvien`
  ADD CONSTRAINT `FK_THUOC_BO_MON` FOREIGN KEY (`MABOMON`) REFERENCES `bomon` (`MABOMON`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
