-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: nghiencuukhoahoc
-- ------------------------------------------------------
-- Server version	5.7.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bangphancong`
--

DROP TABLE IF EXISTS `bangphancong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bangphancong` (
  `MAPHANCONG` int(11) NOT NULL AUTO_INCREMENT,
  `MAHKNK` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `THOIGIANLAP` date DEFAULT NULL,
  PRIMARY KEY (`MAPHANCONG`),
  KEY `FK_PHAN_CONG_HOC_KY` (`MAHKNK`),
  KEY `FK__UOC_PHAN_CONG` (`MAGV`),
  CONSTRAINT `FK_PHAN_CONG_HOC_KY` FOREIGN KEY (`MAHKNK`) REFERENCES `hockynienkhoa` (`MAHKNK`),
  CONSTRAINT `FK__UOC_PHAN_CONG` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bangphancong`
--

LOCK TABLES `bangphancong` WRITE;
/*!40000 ALTER TABLE `bangphancong` DISABLE KEYS */;
/*!40000 ALTER TABLE `bangphancong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bao_cao_ket_thuc_mon`
--

DROP TABLE IF EXISTS `bao_cao_ket_thuc_mon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bao_cao_ket_thuc_mon` (
  `MADANHGIAKETTHUC` int(11) NOT NULL,
  `MACHITIETPHANCONG` int(11) NOT NULL,
  `LANDANHGIA` int(11) DEFAULT NULL,
  `NGAYDANHGIA` date DEFAULT NULL,
  `NGAYBAOCAOKETTHUC` date DEFAULT NULL,
  `TRANG_THAI_DANG_KY` text,
  PRIMARY KEY (`MADANHGIAKETTHUC`,`MACHITIETPHANCONG`),
  KEY `FK_BAO_CAO_KET_THUC_MON2` (`MACHITIETPHANCONG`),
  CONSTRAINT `FK_BAO_CAO_KET_THUC_MON` FOREIGN KEY (`MADANHGIAKETTHUC`) REFERENCES `hinhthucdanhgia` (`MADANHGIAKETTHUC`),
  CONSTRAINT `FK_BAO_CAO_KET_THUC_MON2` FOREIGN KEY (`MACHITIETPHANCONG`) REFERENCES `chitietphancong` (`MACHITIETPHANCONG`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bao_cao_ket_thuc_mon`
--

LOCK TABLES `bao_cao_ket_thuc_mon` WRITE;
/*!40000 ALTER TABLE `bao_cao_ket_thuc_mon` DISABLE KEYS */;
/*!40000 ALTER TABLE `bao_cao_ket_thuc_mon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bomon`
--

DROP TABLE IF EXISTS `bomon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bomon` (
  `MABOMON` int(11) NOT NULL AUTO_INCREMENT,
  `MAKHOA` int(11) NOT NULL,
  `TENBOMON` text,
  PRIMARY KEY (`MABOMON`),
  KEY `FK_THUOC_KHOA` (`MAKHOA`),
  CONSTRAINT `FK_THUOC_KHOA` FOREIGN KEY (`MAKHOA`) REFERENCES `khoa` (`MAKHOA`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bomon`
--

LOCK TABLES `bomon` WRITE;
/*!40000 ALTER TABLE `bomon` DISABLE KEYS */;
INSERT INTO `bomon` VALUES (2,1,'Bộ Môn Công Nghệ Phần Mềm'),(16,11,'Bộ môn Công nghệ thông tin'),(18,12,'Ngoài trường'),(19,11,'Bộ môn Cơ khí - Động lực');
/*!40000 ALTER TABLE `bomon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietphancong`
--

DROP TABLE IF EXISTS `chitietphancong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietphancong` (
  `MACHITIETPHANCONG` int(11) NOT NULL,
  `MAMONHOC` int(11) NOT NULL,
  `MAPHANCONG` int(11) NOT NULL,
  `MALOP` varchar(255) NOT NULL,
  PRIMARY KEY (`MACHITIETPHANCONG`),
  KEY `FK_CO` (`MAPHANCONG`),
  KEY `FK_PHAN_CONG_DAY` (`MALOP`),
  KEY `FK_PHAN_CONG_MON_HOC` (`MAMONHOC`),
  CONSTRAINT `FK_CO` FOREIGN KEY (`MAPHANCONG`) REFERENCES `bangphancong` (`MAPHANCONG`),
  CONSTRAINT `FK_PHAN_CONG_DAY` FOREIGN KEY (`MALOP`) REFERENCES `lop` (`MALOP`),
  CONSTRAINT `FK_PHAN_CONG_MON_HOC` FOREIGN KEY (`MAMONHOC`) REFERENCES `monhoc` (`MAMONHOC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietphancong`
--

LOCK TABLES `chitietphancong` WRITE;
/*!40000 ALTER TABLE `chitietphancong` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitietphancong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chon_khung`
--

DROP TABLE IF EXISTS `chon_khung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chon_khung` (
  `MAGV` varchar(255) NOT NULL,
  `MANAMHOC` int(11) NOT NULL,
  `MAKHUNG` int(11) NOT NULL,
  PRIMARY KEY (`MAGV`,`MANAMHOC`,`MAKHUNG`),
  KEY `FK_CHON_KHUNG2` (`MANAMHOC`),
  KEY `FK_CHON_KHUNG3` (`MAKHUNG`),
  CONSTRAINT `FK_CHON_KHUNG` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`),
  CONSTRAINT `FK_CHON_KHUNG2` FOREIGN KEY (`MANAMHOC`) REFERENCES `namhoc` (`MANAMHOC`),
  CONSTRAINT `FK_CHON_KHUNG3` FOREIGN KEY (`MAKHUNG`) REFERENCES `khunggiochuan` (`MAKHUNG`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chon_khung`
--

LOCK TABLES `chon_khung` WRITE;
/*!40000 ALTER TABLE `chon_khung` DISABLE KEYS */;
/*!40000 ALTER TABLE `chon_khung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chucdanh`
--

DROP TABLE IF EXISTS `chucdanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chucdanh` (
  `MACHUCDANH` int(11) NOT NULL AUTO_INCREMENT,
  `TENCHUCDANH` text,
  PRIMARY KEY (`MACHUCDANH`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chucdanh`
--

LOCK TABLES `chucdanh` WRITE;
/*!40000 ALTER TABLE `chucdanh` DISABLE KEYS */;
INSERT INTO `chucdanh` VALUES (1,'Giảng viên cao cấp (Hạng I)'),(2,'Giảng viên chính (Hạng II)'),(3,'Giảng viên (Hạng III)'),(4,'Trợ Giảng'),(5,'Giảng viên Tập sự');
/*!40000 ALTER TABLE `chucdanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chucvu`
--

DROP TABLE IF EXISTS `chucvu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chucvu` (
  `MACHUCVU` int(11) NOT NULL AUTO_INCREMENT,
  `TENCHUCVU` text,
  PRIMARY KEY (`MACHUCVU`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chucvu`
--

LOCK TABLES `chucvu` WRITE;
/*!40000 ALTER TABLE `chucvu` DISABLE KEYS */;
INSERT INTO `chucvu` VALUES (1,'Phó Trưởng Khoa'),(2,'Trưởng Bộ Môn'),(3,'Phó Trưởng Bộ Môn'),(4,'Giảng Viên Chính'),(5,'Giảng Viên'),(6,'Trưởng Khoa'),(7,'Bộ môn Công nghệ thông tin'),(8,'Phó Trưởng bộ môn CNTT'),(9,'Trưởng bộ môn CNTT');
/*!40000 ALTER TABLE `chucvu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuongtrinhdaotao`
--

DROP TABLE IF EXISTS `chuongtrinhdaotao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuongtrinhdaotao` (
  `MACHUONGTRINH` int(11) NOT NULL AUTO_INCREMENT,
  `MABOMON` int(11) NOT NULL,
  `TENCHUONGTRINH` text,
  `SO_QUYET_DINH` text,
  `TRINH_DO` varchar(255) DEFAULT NULL,
  `TONG_SO_TIN_CHI` int(11) DEFAULT NULL,
  `MO_TA_HOC_KY` text,
  `GHI_CHUONG_TRINH` text,
  PRIMARY KEY (`MACHUONGTRINH`),
  KEY `FK_THUOC_CHUONG_TRINH__AO_TAO` (`MABOMON`),
  CONSTRAINT `FK_THUOC_CHUONG_TRINH__AO_TAO` FOREIGN KEY (`MABOMON`) REFERENCES `bomon` (`MABOMON`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuongtrinhdaotao`
--

LOCK TABLES `chuongtrinhdaotao` WRITE;
/*!40000 ALTER TABLE `chuongtrinhdaotao` DISABLE KEYS */;
INSERT INTO `chuongtrinhdaotao` VALUES (1,16,'CÔNG NGHỆ THÔNG TIN','3455/QĐ-ĐHTV, ngày 12 tháng 7 năm 2018','ĐẠI HỌC',138,'7480201',NULL),(2,19,'Công nghệ ô tô','        /QĐ – ĐHTV, ngày       tháng       năm 20','Đại học',140,'Chính quy',NULL);
/*!40000 ALTER TABLE `chuongtrinhdaotao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `co_chuc_danh`
--

DROP TABLE IF EXISTS `co_chuc_danh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_chuc_danh` (
  `MACHUCDANH` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `THOIGIANNHAN` date DEFAULT NULL,
  `TRANGTHAI` text,
  PRIMARY KEY (`MACHUCDANH`,`MAGV`),
  KEY `FK_CO_CHUC_DANH2` (`MAGV`),
  CONSTRAINT `FK_CO_CHUC_DANH` FOREIGN KEY (`MACHUCDANH`) REFERENCES `chucdanh` (`MACHUCDANH`),
  CONSTRAINT `FK_CO_CHUC_DANH2` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `co_chuc_danh`
--

LOCK TABLES `co_chuc_danh` WRITE;
/*!40000 ALTER TABLE `co_chuc_danh` DISABLE KEYS */;
INSERT INTO `co_chuc_danh` VALUES (1,'00245','2024-07-08','Đang giữ chức danh'),(1,'00254','2024-07-09','Đang giữ chức danh'),(1,'0122','2024-08-08','Đang giữ chức danh'),(1,'0123','2024-08-12','Đang giữ chức danh'),(1,'99999','2024-06-30','Đang giữ chức danh'),(2,'00249','2024-07-09','Đang giữ chức danh'),(2,'00250','2024-07-08','Đang giữ chức danh'),(3,'12705','2024-07-08','Đang giữ chức danh'),(5,'00248','2024-07-08','Đang giữ chức danh');
/*!40000 ALTER TABLE `co_chuc_danh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `co_ty_le`
--

DROP TABLE IF EXISTS `co_ty_le`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_ty_le` (
  `MA_QUY_DOI` int(11) NOT NULL,
  `MA_LOAI_DANH_MUC` int(11) NOT NULL,
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `SO_TAC_GIA_THUOC_LOAI` int(11) DEFAULT NULL,
  `NHOM_CHIA_GIO` text,
  PRIMARY KEY (`MA_QUY_DOI`,`MA_LOAI_DANH_MUC`,`MA_LOAI_TAC_GIA`),
  KEY `FK_CO_TY_LE2` (`MA_LOAI_DANH_MUC`),
  KEY `FK_CO_TY_LE3` (`MA_LOAI_TAC_GIA`),
  CONSTRAINT `FK_CO_TY_LE` FOREIGN KEY (`MA_QUY_DOI`) REFERENCES `ty_le_quy_doi_gio_chuan` (`MA_QUY_DOI`),
  CONSTRAINT `FK_CO_TY_LE2` FOREIGN KEY (`MA_LOAI_DANH_MUC`) REFERENCES `loai_danh_muc` (`MA_LOAI_DANH_MUC`),
  CONSTRAINT `FK_CO_TY_LE3` FOREIGN KEY (`MA_LOAI_TAC_GIA`) REFERENCES `loai_tac_gia` (`MA_LOAI_TAC_GIA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `co_ty_le`
--

LOCK TABLES `co_ty_le` WRITE;
/*!40000 ALTER TABLE `co_ty_le` DISABLE KEYS */;
/*!40000 ALTER TABLE `co_ty_le` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dang_ky_thuc_hien_quy_doi`
--

DROP TABLE IF EXISTS `dang_ky_thuc_hien_quy_doi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dang_ky_thuc_hien_quy_doi` (
  `MA_DANH_MUC` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `MANAMHOC` int(11) NOT NULL,
  `MA_LOAI_TAC_GIA` int(11) NOT NULL,
  `TEN_DE_TAI` varchar(255) NOT NULL,
  `SOGIOQUYDOI` int(11) DEFAULT NULL,
  `TRANG_THAI_DANG_KY` text,
  PRIMARY KEY (`MA_DANH_MUC`,`MAGV`,`MANAMHOC`,`MA_LOAI_TAC_GIA`,`TEN_DE_TAI`),
  KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI2` (`MAGV`),
  KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI3` (`MANAMHOC`),
  KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI4` (`MA_LOAI_TAC_GIA`),
  KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI5` (`TEN_DE_TAI`),
  CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI` FOREIGN KEY (`MA_DANH_MUC`) REFERENCES `danhmucquydoispkhcn` (`MA_DANH_MUC`),
  CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI2` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`),
  CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI3` FOREIGN KEY (`MANAMHOC`) REFERENCES `namhoc` (`MANAMHOC`),
  CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI4` FOREIGN KEY (`MA_LOAI_TAC_GIA`) REFERENCES `loai_tac_gia` (`MA_LOAI_TAC_GIA`),
  CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI5` FOREIGN KEY (`TEN_DE_TAI`) REFERENCES `nghien_cuu_kh` (`TEN_DE_TAI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dang_ky_thuc_hien_quy_doi`
--

LOCK TABLES `dang_ky_thuc_hien_quy_doi` WRITE;
/*!40000 ALTER TABLE `dang_ky_thuc_hien_quy_doi` DISABLE KEYS */;
/*!40000 ALTER TABLE `dang_ky_thuc_hien_quy_doi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhmucquydoispkhcn`
--

DROP TABLE IF EXISTS `danhmucquydoispkhcn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhmucquydoispkhcn` (
  `MA_DANH_MUC` int(11) NOT NULL AUTO_INCREMENT,
  `MA_LOAI_DANH_MUC` int(11) NOT NULL,
  `GIO_CHUAN` int(11) DEFAULT NULL,
  `NOI_DUNG_DANH_MUC` text,
  `ISBN` varchar(50) DEFAULT NULL,
  `WOS_SCOUPUS` varchar(50) DEFAULT NULL,
  `HANG_WOS_SCOUPUS` varchar(10) DEFAULT NULL,
  `LOI_NHUAN` varchar(100) DEFAULT NULL,
  `DON_VI_TINH` varchar(50) DEFAULT NULL,
  `GIAI_THUONG` varchar(50) DEFAULT NULL,
  `XEP_HANG_QUARTILES` varchar(50) DEFAULT NULL,
  `NAM_THUC_HIEN` text,
  `TRANG_THAI_DANH_MUC` varchar(100) DEFAULT NULL,
  `GHI_CHU_DANH_MUC` text,
  PRIMARY KEY (`MA_DANH_MUC`),
  KEY `FK_THUOC_DANH_MUC` (`MA_LOAI_DANH_MUC`),
  CONSTRAINT `FK_THUOC_DANH_MUC` FOREIGN KEY (`MA_LOAI_DANH_MUC`) REFERENCES `loai_danh_muc` (`MA_LOAI_DANH_MUC`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhmucquydoispkhcn`
--

LOCK TABLES `danhmucquydoispkhcn` WRITE;
/*!40000 ALTER TABLE `danhmucquydoispkhcn` DISABLE KEYS */;
INSERT INTO `danhmucquydoispkhcn` VALUES (1,2,195,'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 1 Điều 11.','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Kỷ yếu có mã số ISBN'),(2,2,98,'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 1 Điều 11.','Không','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Kỷ yếu không có mã số ISBN'),(3,2,255,'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 2 Điều 11.','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Kỷ yếu (proceedings) có mã số ISBN'),(4,2,195,'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 2 Điều 11.','Không','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Kỷ yếu (proceedings) không có mã số ISBN'),(5,2,98,'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 3 Điều 11.','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Kỷ yếu/proceedings có mã số ISBN'),(6,2,49,'Báo cáo khoa học/tham luận đăng toàn văn hội thảo khoa học cấp Trường được tổ chức bởi các ĐVĐT thuộc và trực thuộc đáp ứng yêu cầu khoản 3 Điều 11.','Không','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Kỷ yếu/proceedings không có mã số ISBN'),(7,2,64,'Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu hội nghị hội thảo chuyên ngành bên ngoài trường có phản biện, sử dụng ngôn ngữ tiếng Việt và các hội thảo hội nghị khác có chỉ số ISBN','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không'),(8,2,234,'Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu (proceedings) hội nghị hội thảo quốc tế xuất bản bằng ngôn ngữ tiếng Anh có phản biện, có chỉ số ISBN không thuộc danh mục WoS/Scopus.','Có','Không','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không'),(9,2,378,' Báo cáo khoa học/tham luận đăng toàn văn trong kỷ yếu (proceedings) hội nghị hội thảo quốc tế xuất bản bằng ngôn ngữ tiếng Anh, có chỉ số ISBN thuộc danh mục WoS/Scopus.','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không'),(10,2,0,'Các báo cáo khoa học/ tham luận đăng toàn văn hoặc tóm tắt tại hội thảo/hội nghị đặc biệt khác phục vụ cho quan hệ đối ngoại, nâng cao hình ảnh và vị thế của Trường ĐHTV, thì các đơn vị được giao tổ chức/tham gia sự kiện phối hợp với Phòng KHCN để trình Hiệu trưởng xem xét, quyết định mức giờ chuẩn quy đổi cụ thể trước khi thực hiện.','Không rõ','Không rõ','Không rõ','Không rõ','Không rõ','Không rõ','Không rõ','2024-2025','Đang áp dụng','Hiệu trưởng xem xét, quyết định mức giờ chuẩn quy đổi cụ thể trước khi thực hiện.'),(11,3,195,'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, không được tính điểm công trình của HĐGSNN.','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Tạp chí khoa học Trường ĐHTV'),(12,3,146,'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, không được tính điểm công trình của HĐGSNN.','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Các tập chí khác'),(13,3,235,'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, được tính điểm công trình của HĐGSNN (tạp chí khoa học trong nước có uy tín).','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Tạp chí khoa học Trường ĐHTV'),(14,3,195,'Bài báo khoa học được công bố trên tạp chí khoa học trong nước có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Việt, được tính điểm công trình của HĐGSNN (tạp chí khoa học trong nước có uy tín).','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Các tạp chí khác'),(15,3,244,'Bài báo khoa học được công bố trên tạp chí khoa học trong nước hoặc quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, không có trong danh mục WoS/Scopus','Có','Không','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Tạp chí khoa học Trường ĐHTV'),(16,3,195,'Bài báo khoa học được công bố trên tạp chí khoa học trong nước hoặc quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, không có trong danh mục WoS/Scopus','Có','Không','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Các tạp chí khác'),(17,3,420,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS/Scopus (tạp chí khoa học quốc tế uy tín), không được xếp hạng.','Có','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không được xếp hạng'),(18,3,855,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.','Có','Có','Không','Không','Bài','Không','Q1','2024-2025','Đang áp dụng','Được xếp hạng'),(19,3,642,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.','Có','Có','Không','Không','Bài','Không','Q2','2024-2025','Đang áp dụng','Được xếp hạng'),(20,3,535,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.','Có','Có','Không','Không','Bài','Không','Q3','2024-2025','Đang áp dụng','Được xếp hạng'),(21,3,428,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục Scopus, được xếp hạng.','Có','Có','Không','Không','Bài','Không','Q4','2024-2025','Đang áp dụng','Được xếp hạng'),(22,3,1050,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.','Có','Có','Không','Không','Bài','Không','Q1','2024-2025','Đang áp dụng','Được xếp hạng'),(23,3,855,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.','Có','Có','Không','Không','Bài','Không','Q2','2024-2025','Đang áp dụng','Được xếp hạng'),(24,3,642,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.','Có','Có','Không','Không','Bài','Không','Q3','2024-2025','Đang áp dụng','Được xếp hạng'),(25,3,535,'Bài báo khoa học được công bố trên tạp chí khoa học quốc tế có mã số chuẩn quốc tế ISSN, xuất bản bằng ngôn ngữ tiếng Anh, có trong danh mục WoS, được xếp hạng.','Có','Có','Không','Không','Bài','Không','Q4','2024-2025','Đang áp dụng','Được xếp hạng'),(26,3,98,'Các sản phẩm KH&CN công bố bởi viên chức (chỉ tính đối với tác giả thứ nhất hoặc tác giả chịu trách nhiệm trong trường hợp tác giả thứ nhất không phải viên chức của Trường ĐHTV, trường hợp đồng tác giả thứ nhất hoặc đồng tác giả chịu trách nhiệm thì chia đôi) được xuất bản bởi các tạp chí và nhà xuất bản quốc tế uy tín (nằm trong danh mục WoS/Scopus) mà tên đơn vị của Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations) thì được tính giờ nhiệm vụ NCKH là 98 giờ, đứng thứ nhất được tính 195 giờ.','Có','Có','Không','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations)'),(27,3,195,'Các sản phẩm KH&CN công bố bởi viên chức (chỉ tính đối với tác giả thứ nhất hoặc tác giả chịu trách nhiệm trong trường hợp tác giả thứ nhất không phải viên chức của Trường ĐHTV, trường hợp đồng tác giả thứ nhất hoặc đồng tác giả chịu trách nhiệm thì chia đôi) được xuất bản bởi các tạp chí và nhà xuất bản quốc tế uy tín (nằm trong danh mục WoS/Scopus) mà tên đơn vị của Trường ĐHTV đứng thứ hai (trường hợp dual-affiliations) thì được tính giờ nhiệm vụ NCKH là 98 giờ, đứng thứ nhất được tính 195 giờ.','Có','Có','Không','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Trường ĐHTV đứng thứ nhất'),(28,3,390,'Bằng độc quyền Giải pháp hữu ích Việt Nam','Không','Không','Không','Không','Bằng','Không','Không','2024-2025','Đang áp dụng','Các sản phẩm SHTT (đơn vị tính trên 01 bằng).'),(29,3,488,'Bằng độc quyền sáng chế (chuẩn patent Việt Nam)','Không','Không','Không','Không','Bằng','Không','Không','2024-2025','Đang áp dụng','Các sản phẩm SHTT (đơn vị tính trên 01 bằng).'),(30,3,585,'Bằng độc quyền sáng chế chuẩn Patent của Mỹ/ của Châu Âu/ của Đông Bắc Á','Không','Không','Không','Không','Bằng','Không','Không','2024-2025','Đang áp dụng','Các sản phẩm SHTT (đơn vị tính trên 01 bằng).'),(31,4,295,'Sách chuyên khảo','Có','Có','Không','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Không'),(32,4,295,'Giáo trình','Có','Có','Không','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Không'),(33,4,295,'Sách tham khảo','Có','Có','Không','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Không'),(34,4,295,'Sách hướng dẫn, tự điển chuyên ngành, sách bài tập, sách dịch','Có','Có','Không','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Không'),(35,4,1500,'Xuất bản sách phục vụ đào tạo do một nhà xuất bản có uy tín (top 10, thuộc danh mục WoS/Scopus) trên thế giới xuất bản','Có','Có','Top 10','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Top 10, thuộc danh mục WoS/Scopus'),(36,4,342,'Xuất bản sách phục vụ đào tạo do một nhà xuất bản có uy tín (top 1000, thuộc danh mục WoS/Scopus) trên thế giới xuất bản','Có','Có','Top 1000','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Top 1000, thuộc danh mục WoS/Scopus'),(37,4,390,'Xuất bản chương sách phục vụ đào tạo do một nhà xuất bản có uy tín (top 10, thuộc danh mục WoS/Scopus) trên thế giới xuất bản','Có','Có','Top 10','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Top 10, thuộc danh mục WoS/Scopus'),(38,4,145,'Xuất bản chương sách phục vụ đào tạo do một nhà xuất bản có uy tín (top 1000, thuộc danh mục WoS/Scopus) trên thế giới xuất bản','Có','Có','Top 1000','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Top 1000, thuộc danh mục WoS/Scopus'),(39,4,115,'Chương sách nằm trong bộ sách nâng cấp từ bài báo khoa học/báo cáo khoa học (tham luận toàn văn) đã công bố thuộc danh mục WoS/Scopus.','Có','Có','Không','Không','Sản phẩm','Không','Không','2024-2025','Đang áp dụng','Không'),(40,5,100,'Viết thuyết minh nhiệm vụ KH&CN cấp quốc gia, cấp bộ và tương đương;','Không','Không','Không','Không','Thuyết minh','Không','Không','2024-2025','Đang áp dụng','Không'),(41,5,50,'Viết thuyết minh nhiệm vụ KH&CN cấp tỉnh và tương đương;','Không','Không','Không','Không','Thuyết minh','Không','Không','2024-2025','Đang áp dụng','Không'),(42,5,40,'Viết thuyết minh/đề xuất dự án quốc tế được Trường ĐHTV giao','Không','Không','Không','Không','Thuyết minh','Không','Không','2024-2025','Đang áp dụng','Không'),(43,5,98,'Viết hồ sơ đăng ký sáng chế Việt Nam được Trường ĐHTV giao;','Không','Không','Không','Không','Hồ sơ','Không','Không','2024-2025','Đang áp dụng','Không'),(44,5,195,'Viết hồ sơ đăng ký sáng chế quốc tế được Trường ĐHTV giao;','Không','Không','Không','Không','Hồ sơ','Không','Không','2024-2025','Đang áp dụng','Không'),(45,5,78,'Viết hồ sơ đăng ký giải pháp hữu ích Việt Nam được Trường ĐHTV giao;','Không','Không','Không','Không','Hồ sơ','Không','Không','2024-2025','Đang áp dụng','Không'),(46,5,98,'Thiết kế đồ hoạ sản phẩm SHTT được Trường ĐHTV sử dụng đăng ký;','Không','Không','Không','Không','Sản Phẩm','Không','Không','2024-2025','Đang áp dụng','Không'),(47,5,10,'Phản biện bài báo khoa học trong nước;','Không','Không','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không'),(48,5,20,'Phản biện bài báo khoa học quốc tế;','Không','Không','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không'),(49,5,8,'Phản biện bài báo cáo (tham luận) hội thảo hội nghị khoa học trong nước;','Không','Không','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không'),(50,5,15,'Phản biện bài báo cáo (tham luận) hội thảo hội nghị khoa học quốc tế;','Không','Không','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không'),(51,5,10,'Bài báo khoa học đăng trên các tạp chí quốc tế nằm trong danh mục WoS/Scopus có trích dẫn bài báo khoa học đăng trên tạp chí khoa học Trường ĐHTV (tính cho tác giả thứ nhất, trường hợp tác giả thứ nhất không phải là viên chức Trường ĐHTV thì tính cho tác giả chịu trách nhiệm)','Không','Có','Không','Không','Bài','Không','Không','2024-2025','Đang áp dụng','Không'),(52,5,46,'Hướng dẫn người học thực hiện đề tài NCKH cấp Trường và tương đương được nghiệm thu đạt;','Không','Không','Không','Không','Đề tài','Không','Không','2024-2025','Đang áp dụng','Không'),(53,5,98,'Hướng dẫn người học thực hiện đề tài NCKH cấp Trường và tương đương được nghiệm thu đạt loại xuất sắc;','Không','Không','Không','Không','Đề tài','Không','Không','2024-2025','Đang áp dụng','Không'),(54,5,195,'Hướng dẫn người học có kết quả nghiên cứu được áp dụng, triển khai đem lại lợi nhuận tính theo mỗi 25 triệu đồng','Không','Không','Không','25 triệu đồng','Sản Phẩm','Không','Không','2024-2025','Đang áp dụng','195/25 triệu đồng'),(55,5,195,'Hướng dẫn người học tham gia các giải thưởng KH&CN trong nước cấp tỉnh hoặc tương đương đạt huy chương vàng (giải nhất)','Không','Không','Không','Không','Giải thưởng','Vàng (giải nhất)','Không','2024-2025','Đang áp dụng','Vàng (giải nhất)'),(56,5,137,'Hướng dẫn người học tham gia các giải thưởng KH&CN trong nước cấp tỉnh hoặc tương đương đạt huy chương bạc (giải nhì)','Không','Không','Không','Không','Giải thưởng','Bạc (giải nhì)','Không','2024-2025','Đang áp dụng','Bạc (giải nhì)'),(57,5,98,'Hướng dẫn người học tham gia các giải thưởng KH&CN trong nước cấp tỉnh hoặc tương đương đạt huy chương đồng (giải ba);','Không','Không','Không','Không','Giải thưởng','Đồng (giải ba);','Không','2024-2025','Đang áp dụng','Đồng (giải ba);'),(58,5,390,'Hướng dẫn người học tham gia các 3 giải thưởng KH&CN trong nước cấp vùng trở lên đạt huy chương vàng (giải nhất)','Không','Không','Không','Không','Giải thưởng','Vàng (giải nhất)','Không','2024-2025','Đang áp dụng','Vàng (giải nhất)'),(59,5,273,'Hướng dẫn người học tham gia các 3 giải thưởng KH&CN trong nước cấp vùng trở lên đạt huy chương bạc (giải nhì)','Không','Không','Không','Không','Giải thưởng','Bạc (giải nhì)','Không','2024-2025','Đang áp dụng','Bạc (giải nhì)'),(60,5,195,'Hướng dẫn người học tham gia các 3 giải thưởng KH&CN trong nước cấp vùng trở lên đạt huy chương đồng (giải ba)','Không','Không','Không','Không','Giải thưởng','Đồng (giải ba);','Không','2024-2025','Đang áp dụng','Đồng (giải ba);'),(61,5,49,'Hướng dẫn người học tham gia các 3 giải thưởng KH&CN trong nước cấp vùng trở lên đạt giải khuyến khích và không đạt giải;','Không','Không','Không','Không','Giải thưởng','Giải khuyến khích và không đạt giải;','Không','2024-2025','Đang áp dụng','Giải khuyến khích và không đạt giải;'),(62,5,273,'Hướng dẫn người học tham gia các 2 cuộc thi về học thuật (Olympic Tin học, Toán học, Hóa học,...) trong nước cấp vùng trở lên đạt huy chương vàng (giải nhất)','Không','Không','Không','Không','Giải thưởng','Vàng (giải nhất)','Không','2024-2025','Đang áp dụng','Vàng (giải nhất)'),(63,5,195,'Hướng dẫn người học tham gia các 2 cuộc thi về học thuật (Olympic Tin học, Toán học, Hóa học,...) trong nước cấp vùng trở lên đạt huy chương bạc (giải nhì)','Không','Không','Không','Không','Giải thưởng','Bạc (giải nhì)','Không','2024-2025','Đang áp dụng','Bạc (giải nhì)'),(64,5,137,'Hướng dẫn người học tham gia các 2 cuộc thi về học thuật (Olympic Tin học, Toán học, Hóa học,...) trong nước cấp vùng trở lên đạt huy chương đồng (giải ba)','Không','Không','Không','Không','Giải thưởng','Đồng (giải ba);','Không','2024-2025','Đang áp dụng','Đồng (giải ba);'),(65,5,49,'Hướng dẫn người học tham gia các 2 cuộc thi về học thuật (Olympic Tin học, Toán học, Hóa học,...) trong nước cấp vùng trở lên đạt khuyến khích và không đạt giải;','Không','Không','Không','Không','Giải thưởng','Giải khuyến khích và không đạt giải;','Không','2024-2025','Đang áp dụng','Giải khuyến khích và không đạt giải;'),(66,5,390,'Hướng dẫn người học tham gia các giải thưởng khởi nghiệp từ cấp bộ hoặc tương đương trở lên.','Không','Không','Không','Không','Giải thưởng','Không','Không','2024-2025','Đang áp dụng','Không'),(67,5,195,'Tham gia thực hiện Dự án nghiên cứu bên ngoài Trường với mức kinh phí dự án từ 100 triệu trở lên (do đơn vị bên ngoài Trường cấp kinh phí thực hiện và thông qua BGH kí Hợp đồng) và có số tiền trích nộp về Trường/giảng viên từ 25 triệu đồng trở lên;','Không','Không','Không','25 triệu đồng','Dự án','Không','Không','2024-2025','Đang áp dụng','195 giờ/thành viên có trích nộp về Trường theo quy định.'),(68,5,195,'Tham gia thực hiện hoạt động sản xuất dịch vụ với lợi nhuận có trích nộp về Trường/giảng viên từ 25 triệu đồng trở lên;','Không','Không','Không','25 triệu đồng','Hoạt động','Không','Không','2024-2025','Đang áp dụng','195 giờ/thành viên có trích nộp về Trường theo quy định.'),(69,5,195,'Biên soạn 01 bộ ngân hàng câu hỏi trắc nghiệm trên máy tính (tối thiểu 400 câu) không nhận thù lao biên soạn.','Không','Không','Không','Không','Bộ ngân hàng câu hỏi','Không','Không','2024-2025','Đang áp dụng','(tối thiểu 400 câu) không nhận thù lao biên soạn.'),(70,6,195,'Đề tài KH&CN cấp Trường ĐHTV, cấp huyện hoặc tương đương được nghiệm thu đạt;','Không','Không','Không','Không','Đề tài','Không','Không','2024-2025','Đang áp dụng','Không'),(71,6,390,'Đề tài KH&CN cấp Bộ, Tỉnh, Thành phố (TP) thuộc Trung ương được nghiệm thu đạt có kinh phí ≥ 500 triệu đồng;','Không','Không','Không','Không','Đề tài','Không','Không','2024-2025','Đang áp dụng','Được nghiệm thu đạt có kinh phí ≥ 500 triệu đồng;'),(72,6,244,'Đề tài KH&CN cấp Bộ, Tỉnh, TP thuộc Trung ương được nghiệm thu đạt có kinh phí < 500 triệu đồng;','Không','Không','Không','Không','Đề tài','Không','Không','2024-2025','Đang áp dụng','Được nghiệm thu đạt có kinh phí < 500 triệu đồng;'),(73,6,488,'Đề tài KH&CN cấp Quốc gia được nghiệm thu đạt;','Không','Không','Không','Không','Đề tài','Không','Không','2024-2025','Đang áp dụng','Không'),(74,6,293,'Dự án KH&CN đem lại lợi nhuận trên 100 triệu và dưới 300 triệu đồng;','Không','Không','Không','Không','Dự án','Không','Không','2024-2025','Đang áp dụng','Lợi nhuận trên 100 triệu và dưới 300 triệu đồng;'),(75,6,390,'Dự án KH&CN đem lại lợi nhuận từ trên 300 triệu đồng đến 500 triệu đồng;','Không','Không','Không','Không','Dự án','Không','Không','2024-2025','Đang áp dụng','Lợi nhuận từ trên 300 triệu đồng đến 500 triệu đồng;'),(76,6,585,'Dự án KH&CN đem lại lợi nhuận từ trên 500 triệu đồng;','Không','Không','Không','Không','Dự án','Không','Không','2024-2025','Đang áp dụng','Lợi nhuận từ trên 500 triệu đồng;'),(77,6,0,'Các trường hợp khác (đề tài/dự án hợp tác doanh nghiệp, hợp tác quốc tế, nghị định thư, ...) không nêu trong quy chế các đơn vị làm tờ trình trình Hiệu trưởng quyết định trước khi thực hiện.','Không','Không','Không','Không','Theo tờ trình được duyệt','Không','Không','2024-2025','Đang áp dụng','Làm tờ trình trình Hiệu trưởng quyết định trước khi thực hiện.'),(78,7,250,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp tỉnh và tương đương) đạt huy chương vàng','Không','Không','Không','Không','Huy chương','Vàng','Không','2024-2025','Đang áp dụng','Không'),(79,7,200,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp tỉnh và tương đương) đạt huy chương bạc','Không','Không','Không','Không','Huy chương','Bạc','Không','2024-2025','Đang áp dụng','Không'),(80,7,150,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp tỉnh và tương đương) đạt huy chương đồng;','Không','Không','Không','Không','Huy chương','Đồng','Không','2024-2025','Đang áp dụng','Không'),(81,7,400,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc gia) đạt huy chương vàng','Không','Không','Không','Không','Huy chương','Vàng','Không','2024-2025','Đang áp dụng','Không'),(82,7,300,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc gia) đạt huy chương bạc','Không','Không','Không','Không','Huy chương','Bạc','Không','2024-2025','Đang áp dụng','Không'),(83,7,200,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc gia) đạt huy chương đồng;','Không','Không','Không','Không','Huy chương','Đồng','Không','2024-2025','Đang áp dụng','Không'),(84,7,600,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc tế) đạt huy chương vàng','Không','Không','Không','Không','Huy chương','Vàng','Không','2024-2025','Đang áp dụng','Không'),(85,7,500,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc tế) đạt huy chương bạc','Không','Không','Không','Không','Huy chương','Bạc','Không','2024-2025','Đang áp dụng','Không'),(86,7,400,'Thành tích huấn luyện, thi đấu thể dục thể thao (giải cấp quốc tế) đạt huy chương đồng;','Không','Không','Không','Không','Huy chương','Đồng','Không','2024-2025','Đang áp dụng','Không'),(87,7,195,'Sáng tác một tác phẩm âm nhạc, múa, điện ảnh được công diễn từ cấp tỉnh trở lên và đạt giải;','Không','Không','Không','Không','Tác phẩm','Có','Không','2024-2025','Đang áp dụng','Không'),(88,7,195,'Dàn dựng/Biên đạo Đạo diễn một tác phẩm âm nhạc, múa, điện ảnh được công diễn từ cấp tỉnh trở lên và đạt giải;','Không','Không','Không','Không','Tác phẩm','Có','Không','2024-2025','Đang áp dụng','Không'),(89,7,195,'Sáng tác và Dàn dựng/Biên đạo Đạo diễn một tác phẩm âm nhạc, múa, điện ảnh được công diễn cấp tỉnh trở lên và đạt giải;','Không','Không','Không','Không','Tác phẩm','Có','Không','2024-2025','Đang áp dụng','Không'),(90,7,195,'Đạo diễn trọn một vở diễn cấp tỉnh trở lên có thời gian từ 30 phút trở lên;','Không','Không','Không','Không','Vở diễn','Không','Không','2024-2025','Đang áp dụng','Không'),(91,7,195,'Biên đạo múa (một vở kịch múa từ ba màn trở lên hoặc một chương trình từ 5 tiết mục trở lên được dựng ở các Nhà hát cấp tỉnh trở lên);','Không','Không','Không','Không','Vở kịch múa','Không','Không','2024-2025','Đang áp dụng','Một vở kịch múa từ ba màn trở lên hoặc một chương trình từ 5 tiết mục trở lên được dựng ở các Nhà hát cấp tỉnh trở lên'),(92,7,195,'Dàn dựng, chỉ huy hoặc biểu diễn một chương trình hòa nhạc có độ dài trên 45 phút cấp tỉnh trở lên;','Không','Không','Không','Không','Không rõ','Không','Không','2024-2025','Đang áp dụng','Dàn dựng, chỉ huy hoặc biểu diễn một chương trình hòa nhạc có độ dài trên 45 phút cấp tỉnh trở lên;'),(93,7,195,'Sáng tác và dàn dựng một tác phẩm âm nhạc/tác phẩm múa/ tác phẩm kịch hoặc tuồng được công diễn từ cấp tỉnh trở lên có độ dài trên 30 phút;','Không','Không','Không','Không','Không rõ','Không','Không','2024-2025','Đang áp dụng','Từ cấp tỉnh trở lên có độ dài trên 30 phút;'),(94,7,98,'Các bài hát, bài thơ sáng tác mới và được cấp phép sử dụng;','Không','Không','Không','Không','Không rõ','Không','Không','2024-2025','Đang áp dụng','Không');
/*!40000 ALTER TABLE `danhmucquydoispkhcn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giangvien`
--

DROP TABLE IF EXISTS `giangvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giangvien` (
  `MAGV` varchar(255) NOT NULL,
  `MABOMON` int(11) NOT NULL,
  `TENGV` varchar(100) DEFAULT NULL,
  `EMAIL` text,
  `DIENTHOAI` varchar(50) DEFAULT NULL,
  `DIACHI` text,
  PRIMARY KEY (`MAGV`),
  KEY `FK_THUOC_BO_MON` (`MABOMON`),
  CONSTRAINT `FK_THUOC_BO_MON` FOREIGN KEY (`MABOMON`) REFERENCES `bomon` (`MABOMON`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giangvien`
--

LOCK TABLES `giangvien` WRITE;
/*!40000 ALTER TABLE `giangvien` DISABLE KEYS */;
INSERT INTO `giangvien` VALUES ('00241',16,'Nguyễn Hoàng Duy Thiện','duythien@tvu.edu.vn','0912345678','123 Đường ABC, Trà Vinh'),('00242',16,'Dương Ngọc Vân Khanh','vankhanh@tvu.edu.vn','0912345679','456 Đường DEF, Trà Vinh'),('00243',16,'Huỳnh Văn Thanh','vanthanh@tvu.edu.vn','0912345680','789 Đường GHI, Trà Vinh'),('00244',16,'Nguyễn Nhứt Lam','nhutlam@tvu.edu.vn','0912345681','101 Đường JKL, Trà Vinh'),('00245',16,'Ưeqweqweq','annb@tvu.edu.vn','0369258147','Mỹ'),('00246',16,'Nguyễn Ngọc Đan Thanh','danthanh@tvu.edu.vn','0912345682','102 Đường MNO, Trà Vinh'),('00248',16,'Hồ Hoàng Phúc Fix','duongminh@tvu.edu.vn','0258741369','Đáy biển Đen'),('00249',16,'Hà Thị Thúy Vi','Hattvi201084@tvu.edu.vn','0123654987','Trà Vinh'),('00250',16,'Võ Thanh C','vothanhc@tvu.edu.vn','0912345683','103 Đường PQR, Trà Vinh'),('00251',16,'Trịnh Quốc Việt','quocviet@tvu.edu.vn','0912345684','104 Đường STU, Trà Vinh'),('00252',16,'Trầm Hoàng Nam','hoangnam@tvu.edu.vn','0912345685','105 Đường VWX, Trà Vinh'),('00253',16,'Đoàn Phước Miền','phuocmien@tvu.edu.vn','0912345686','106 Đường YZ, Trà Vinh'),('00254',16,'Ngô Thanh Huy','huyngocntt@tvu.edu.vn','0912345687','107 Đường ABC, Trà Vinh'),('00255',16,'Phạm Thị Trúc Mai','trucmai@tvu.edu.vn','0912345688','108 Đường DEF, Trà Vinh'),('00257',16,'Nguyễn Mộng Hiền','hientvu@tvu.edu.vn','0123456987','TV'),('01027',16,'Nguyễn Khánh Duy','khanhduy@tvu.edu.vn','0912345689','109 Đường GHI, Trà Vinh'),('0122',16,'Nguyễn Tín Thành','tinthanhtv2014@gmail.com','0325698741','Sao Hỏa'),('0123',16,'Hồ Hoàng Phúc','hohoangphucjob@gmail.com','0327434821','Sao Hỏa'),('01548',16,'Thạch Kọng SaOane','saone@tvu.edu.vn','0912345690','110 Đường JKL, Trà Vinh'),('03539',16,'Lê Minh Tự','minhtu@tvu.edu.vn','0912345691','111 Đường MNO, Trà Vinh'),('03546',16,'Phan Thị Phương Nam','phuongnam@tvu.edu.vn','0912345692','112 Đường PQR, Trà Vinh'),('03562',16,'Nguyễn Khắc Quốc','khacquoc@tvu.edu.vn','0912345693','113 Đường STU, Trà Vinh'),('11012',2,'Nguyễn Văn A','vana@tvu.edu.vn','0912345694','114 Đường VWX, Trà Vinh'),('12700',16,'Khấu Văn Nhựt','vannhut@tvu.edu.vn','0912345695','115 Đường YZ, Trà Vinh'),('12701',16,'Trần Văn Nam','vannam@tvu.edu.vn','0912345696','116 Đường ABC, Trà Vinh'),('12702',16,'Nguyễn Thừa Phát Tài','phattai@tvu.edu.vn','0912345697','117 Đường DEF, Trà Vinh'),('12705',16,'Lê Văn B','vanb@tvu.edu.vn','0912345698','118 Đường GHI, Trà Vinh'),('14204',16,'Nguyễn Bá Nhiệm','banhiem@tvu.edu.vn','0912345699','119 Đường JKL, Trà Vinh'),('99997',16,'Bảo Trưởng Khoa','baoquocone@gmail.com','0325698741','Sao Hỏa'),('99999',16,'Nguyễn Lâm Quốc Bảo','baoquoczero@gmail.com','0987654321','Sao Hỏa'),('GVNT22424',16,'Nguyễn Ngọc Đan Thanh','ngocdanthanhdt@tvu.edu.vn',NULL,NULL),('GVNT8909',18,'Hana','hana@gmail.com',NULL,NULL);
/*!40000 ALTER TABLE `giangvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giu_chuc_vu`
--

DROP TABLE IF EXISTS `giu_chuc_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giu_chuc_vu` (
  `MAGV` varchar(255) NOT NULL,
  `MACHUCVU` int(11) NOT NULL,
  `SOQUYETDINH` varchar(255) DEFAULT NULL,
  `TUNGAY` date DEFAULT NULL,
  PRIMARY KEY (`MAGV`,`MACHUCVU`),
  KEY `FK_GIU_CHUC_VU2` (`MACHUCVU`),
  CONSTRAINT `FK_GIU_CHUC_VU` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`),
  CONSTRAINT `FK_GIU_CHUC_VU2` FOREIGN KEY (`MACHUCVU`) REFERENCES `chucvu` (`MACHUCVU`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giu_chuc_vu`
--

LOCK TABLES `giu_chuc_vu` WRITE;
/*!40000 ALTER TABLE `giu_chuc_vu` DISABLE KEYS */;
INSERT INTO `giu_chuc_vu` VALUES ('00244',9,NULL,NULL),('00245',2,'99','2024-07-08'),('00248',8,'99','2024-07-08'),('00249',1,'99','2024-07-09'),('00254',1,'99','2024-07-09'),('00257',1,'99','2024-07-08'),('0122',1,'21','2024-08-08'),('01548',8,NULL,NULL),('12705',8,NULL,NULL),('14204',8,NULL,NULL),('99997',6,'88','2024-08-09'),('99999',6,'','2024-08-13');
/*!40000 ALTER TABLE `giu_chuc_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hinhthucdanhgia`
--

DROP TABLE IF EXISTS `hinhthucdanhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinhthucdanhgia` (
  `MADANHGIAKETTHUC` int(11) NOT NULL,
  `TENDANHGIA` text,
  PRIMARY KEY (`MADANHGIAKETTHUC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinhthucdanhgia`
--

LOCK TABLES `hinhthucdanhgia` WRITE;
/*!40000 ALTER TABLE `hinhthucdanhgia` DISABLE KEYS */;
/*!40000 ALTER TABLE `hinhthucdanhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hockynienkhoa`
--

DROP TABLE IF EXISTS `hockynienkhoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hockynienkhoa` (
  `MAHKNK` int(11) NOT NULL AUTO_INCREMENT,
  `TENHKNK` text,
  `TEN_NAM_HOC` varchar(255) DEFAULT NULL,
  `NGAYBATDAUNIENKHOA` date DEFAULT NULL,
  PRIMARY KEY (`MAHKNK`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hockynienkhoa`
--

LOCK TABLES `hockynienkhoa` WRITE;
/*!40000 ALTER TABLE `hockynienkhoa` DISABLE KEYS */;
INSERT INTO `hockynienkhoa` VALUES (2,'Học Kì 1','Năm Học 2024','2024-10-11'),(3,'Học Kì 2','Năm Học 2024','2024-08-31'),(4,'Học Kì 1','Năm Học 2025','2025-09-07'),(5,'Học Kì 2','Năm Học 2025','2024-08-31');
/*!40000 ALTER TABLE `hockynienkhoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoa`
--

DROP TABLE IF EXISTS `khoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khoa` (
  `MAKHOA` int(11) NOT NULL AUTO_INCREMENT,
  `TENKHOA` text,
  PRIMARY KEY (`MAKHOA`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoa`
--

LOCK TABLES `khoa` WRITE;
/*!40000 ALTER TABLE `khoa` DISABLE KEYS */;
INSERT INTO `khoa` VALUES (1,'Khoa Công Nghệ Thông Tin'),(11,'Khoa Kỹ Thuật Công Nghệ'),(12,'Ngoài trường');
/*!40000 ALTER TABLE `khoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khunggiochuan`
--

DROP TABLE IF EXISTS `khunggiochuan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khunggiochuan` (
  `MAKHUNG` int(11) NOT NULL AUTO_INCREMENT,
  `MACHUCDANH` int(11) NOT NULL,
  `TENKHUNGCHUAN` text,
  `GIOGIANGDAY_HANHCHINH` int(11) DEFAULT NULL,
  `GIOGIANGDAY_CHUAN` int(11) DEFAULT NULL,
  `GIONGHIENCUUKHOAHOC_HANHCHINH` int(11) DEFAULT NULL,
  `GIONGHIENCUUKHOAHOC_CHUAN` int(11) DEFAULT NULL,
  `GIOPHUCVUCONGDONG_HANHCHINH` int(11) DEFAULT NULL,
  `GIOPHUCVUCONGDONG_CHUAN` int(11) DEFAULT NULL,
  `GHICHU` text,
  PRIMARY KEY (`MAKHUNG`),
  KEY `FK_CO_KHUNG_GIO_CHUAN` (`MACHUCDANH`),
  CONSTRAINT `FK_CO_KHUNG_GIO_CHUAN` FOREIGN KEY (`MACHUCDANH`) REFERENCES `chucdanh` (`MACHUCDANH`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khunggiochuan`
--

LOCK TABLES `khunggiochuan` WRITE;
/*!40000 ALTER TABLE `khunggiochuan` DISABLE KEYS */;
INSERT INTO `khunggiochuan` VALUES (10,1,'Khung 1',630,210,855,285,275,91,NULL),(11,1,'Khung 2',810,270,720,240,230,76,NULL),(12,1,'Khung 3',990,330,585,195,185,61,NULL),(13,2,'Khung 1',630,210,765,255,365,121,NULL),(14,2,'Khung 2',810,270,630,210,320,106,NULL),(15,2,'Khung 3',990,330,495,165,275,91,NULL),(16,3,'Khung 1',630,210,675,225,455,151,NULL),(17,3,'Khung 2',810,270,540,180,410,136,NULL),(18,3,'Khung 3',990,330,405,135,365,121,NULL);
/*!40000 ALTER TABLE `khunggiochuan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai_danh_muc`
--

DROP TABLE IF EXISTS `loai_danh_muc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai_danh_muc` (
  `MA_LOAI_DANH_MUC` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_LOAI_DANH_MUC` text,
  `TRANG_THAI_DANH_MUC` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`MA_LOAI_DANH_MUC`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_danh_muc`
--

LOCK TABLES `loai_danh_muc` WRITE;
/*!40000 ALTER TABLE `loai_danh_muc` DISABLE KEYS */;
INSERT INTO `loai_danh_muc` VALUES (2,'Điều 17. Quy đổi sản phẩm KH&CN là các báo cáo khoa học tại các hội thảo được tính giờ chuẩn NCKH','Đang áp dụng'),(3,'Điều 18. Quy đổi sản phẩm KH&CN là các sản phẩm SHTT, bài báo khoa học đăng trên các tạp chí khoa học được tính giờ chuẩn NCKH','Đang áp dụng'),(4,'Điều 19. Quy đổi sản phẩm KH&CN là sách phục vụ đào tạo được tính giờ chuẩn NCKH','Đang áp dụng'),(5,'Điều 20. Quy đổi hoạt động viết thuyết minh các đề tài, dự án, các hoạt động KH&CN khác được tính giờ chuẩn NCKH','Đang áp dụng'),(6,'Điều 21. Quy đổi các hoạt động thực hiện đề tài, dự án các cấp được tính giờ chuẩn NCKH','Đang áp dụng'),(7,'Điều 22. Quy đổi các hoạt động thể dục thể thao, sáng tác, biểu diễn nghệ thuật đặc thù được tính giờ chuẩn NCKH','Đang áp dụng');
/*!40000 ALTER TABLE `loai_danh_muc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai_tac_gia`
--

DROP TABLE IF EXISTS `loai_tac_gia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai_tac_gia` (
  `MA_LOAI_TAC_GIA` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_LOAI_TAC_GIA` text,
  `DO_UU_TIEN` int(11) DEFAULT NULL,
  PRIMARY KEY (`MA_LOAI_TAC_GIA`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_tac_gia`
--

LOCK TABLES `loai_tac_gia` WRITE;
/*!40000 ALTER TABLE `loai_tac_gia` DISABLE KEYS */;
INSERT INTO `loai_tac_gia` VALUES (1,'Tác giả thứ nhất',NULL),(2,'Tác giả chịu trách nhiệm',NULL),(3,'Tác giả còn lại',NULL),(4,'Chủ đơn',NULL),(5,'Đồng chủ đơn',NULL),(6,'Chủ biên',NULL),(7,'Đồng chủ biên',NULL),(8,'Cá nhân',NULL);
/*!40000 ALTER TABLE `loai_tac_gia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lop`
--

DROP TABLE IF EXISTS `lop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lop` (
  `MALOP` varchar(255) NOT NULL,
  `MACHUONGTRINH` int(11) NOT NULL,
  `TENLOP` text,
  `NAMTUYENSINH` int(11) DEFAULT NULL,
  `SISO` int(11) DEFAULT NULL,
  PRIMARY KEY (`MALOP`),
  KEY `FK_HOC` (`MACHUONGTRINH`),
  CONSTRAINT `FK_HOC` FOREIGN KEY (`MACHUONGTRINH`) REFERENCES `chuongtrinhdaotao` (`MACHUONGTRINH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lop`
--

LOCK TABLES `lop` WRITE;
/*!40000 ALTER TABLE `lop` DISABLE KEYS */;
INSERT INTO `lop` VALUES ('DA21TTA',1,'công nghệ thông tin A',2021,40),('DA22TTB',1,'công nghệ thông tin B',2024,23),('DA23TTC',1,'công nghệ thông tin C',2022,33),('DA24TTD',1,'công nghệ thông tin E',2025,33),('DA32TTF',1,'công nghệ thông tin F',2023,44);
/*!40000 ALTER TABLE `lop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monhoc`
--

DROP TABLE IF EXISTS `monhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monhoc` (
  `MAMONHOC` int(11) NOT NULL AUTO_INCREMENT,
  `TENMONHOC` text,
  `SOTINCHILYTHUYET` int(11) DEFAULT NULL,
  `SOTINCHITHUCHANH` int(11) DEFAULT NULL,
  `GHICHU` text,
  PRIMARY KEY (`MAMONHOC`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monhoc`
--

LOCK TABLES `monhoc` WRITE;
/*!40000 ALTER TABLE `monhoc` DISABLE KEYS */;
INSERT INTO `monhoc` VALUES (1,'Giáo dục quốc phòng - An ninh',2,6,NULL),(2,'Giáo dục thể chất 1*',0,1,NULL),(3,'Triết học Mác - Lênin',3,0,NULL),(4,'Anh văn không chuyên 1',2,1,NULL),(5,'Pháp luật đại cương',1,1,NULL),(6,'Nhập môn CNTT',1,1,NULL),(7,'Vi tích phân A1',2,1,NULL),(8,'Đại số tuyến tính',1,1,NULL),(9,'Kỹ thuật lập trình',2,2,NULL),(10,'Giáo dục thể chất 2*',0,1,NULL),(11,'Kinh tế chính trị Mác - Lênin',2,0,NULL),(12,'Anh văn không chuyên 2',2,2,NULL),(13,'Phương pháp NCKH',1,1,NULL),(14,'Tiếng Việt thực hành',1,1,NULL),(15,'Logic học đại cương',1,1,NULL),(16,'Toán rời rạc',1,1,NULL),(17,'Đại số đại cương',1,1,NULL),(18,'Cấu trúc dữ liệu và giải thuật',2,2,NULL),(19,'Giáo dục thể chất 3*',0,1,NULL),(20,'Chủ nghĩa xã hội khoa học',2,0,NULL),(21,'Anh văn không chuyên 3',2,1,NULL),(22,'Cơ sở dữ liệu',2,1,NULL),(23,'Vi tích phân A2',2,0,NULL),(24,'Lý thuyết đồ thị',2,1,NULL),(25,'Kiến trúc máy tính',2,1,NULL),(26,'Lập trình hướng đối tượng',2,1,NULL),(27,'Lịch sử Đảng cộng sản',2,0,NULL),(28,'Anh văn không chuyên 4',2,1,NULL),(29,'Hệ điều hành',2,1,NULL),(30,'Thiết kế Web',2,1,NULL),(31,'Mạng máy tính',2,1,NULL),(32,'Tiếng Anh chuyên ngành',2,1,NULL),(33,'Lý thuyết xếp hàng',1,1,NULL),(34,'Quy hoạch tuyến tính',1,1,NULL),(35,'Vật lý đại cương',1,1,NULL),(36,'Tư tưởng Hồ Chí Minh',2,0,NULL),(37,'Thống kê và Phân tích dữ liệu',2,1,NULL),(38,'Đồ án CSN',0,3,NULL),(39,'Chuyên đề Linux',2,1,NULL),(40,'PTTK HTTT',2,1,NULL),(41,'Lập trình UD trên Windows',2,1,NULL),(42,'Thương mại điện tử',2,1,NULL),(43,'Đồ họa ứng dụng',2,1,NULL),(44,'An toàn và bảo mật TT',2,1,NULL),(45,'Công nghệ phần mềm',2,1,NULL),(46,'Lập trình thiết bị di động',2,1,NULL),(47,'Khai khoáng dữ liệu',2,1,NULL),(48,'Cơ sở trí tuệ nhân tạo',2,1,NULL),(49,'Hệ quản trị CSDL',2,1,NULL),(50,'Nguyên lý kế toán',1,1,NULL),(51,'Kĩ thuật xây dựng và ban hành văn bản',1,1,NULL),(52,'Tâm lí học đại cương',1,1,NULL),(53,'Quản trị doanh nghiệp',1,1,NULL),(54,'Phát triển ứng dụng Web với mã nguồn mở',2,1,NULL),(55,'Xây dựng phần mềm HĐT',2,1,NULL),(56,'Quản trị dự án CNTT',2,1,NULL),(57,'Đồ án chuyên ngành',0,3,NULL),(58,'Xử lý ảnh',2,1,NULL),(59,'Tương tác người máy',2,1,NULL),(60,'Hệ hỗ trợ ra quyết định',2,1,NULL),(61,'Chuyên đề ASP.NET',2,1,NULL),(62,'Blockchaine',2,1,NULL),(63,'Máy học ứng dụng',2,1,NULL),(64,'Thực tập tốt nghiệp',0,3,NULL),(65,'Khóa luận tốt nghiệp',0,7,NULL),(66,'- Hệ thống thông tin quản lý',2,1,NULL),(67,'- Thị giác máy tính',2,2,NULL),(68,'Những nguyên lý cơ bản của Chủ nghĩa Mác - Lênin',5,0,NULL),(69,'Giáo dục thể chất 1',0,1,NULL),(70,'Giáo dục Quốc phòng- An ninh',2,6,NULL),(71,'Tin học đại cương',1,2,NULL),(72,'Nhập môn ngành công nghệ kỹ thuật cơ khí',1,1,NULL),(73,'Toán cao cấp A1',2,1,NULL),(74,'Vật lý đại cương A1',2,1,NULL),(75,'Giáo dục thể chất 2',0,1,NULL),(76,'Toán cao cấp A2',1,1,NULL),(77,'Vật lý đại cương A2',2,1,NULL),(78,'Hình họa - Vẽ kỹ thuật',1,1,NULL),(79,'Dung sai – kỹ thuật đo',1,1,NULL),(80,'An toàn lao động và môi trường công nghiệp',2,0,NULL),(81,'Tâm lý học đại cương',1,1,NULL),(82,'Maketing căn bản',1,1,NULL),(83,'Tiếng Việt thực hành ',1,1,NULL),(84,'Kinh tế học đại cương',2,0,NULL),(85,'Giáo dục thể chất 3',0,1,NULL),(86,'Đường lối cách mạng của Đảng Cộng sản Việt Nam',3,0,NULL),(87,'Phương pháp Nghiên cứu khoa học',1,1,NULL),(88,'Cơ lý thuyết',2,0,NULL),(89,'Thực hành nguội ',0,2,NULL),(90,'Vật liệu cơ khí',2,0,NULL),(91,'Văn hóa Việt Nam',1,1,NULL),(92,'Kỹ năng chăm sóc khách hàng',1,1,NULL),(93,'Kỹ năng giao tiếp',1,1,NULL),(94,'Tư duy hệ thống',1,1,NULL),(95,'Xác suất thống kê',1,1,NULL),(96,'Kỹ thuật nhiệt         ',2,0,NULL),(97,'Vẽ Kỹ thuật với CAD',1,1,NULL),(98,'Kỹ thuật điện – điện tử      ',2,1,NULL),(99,'Sức bền vật liệu',1,1,NULL),(100,'Nguyên lý - Chi tiết máy ',3,0,NULL),(101,'Đồ án nguyên lý- chi tiết máy',0,1,NULL),(102,'Cơ sở Công nghệ chế tạo máy',2,0,NULL),(103,'Cơ học lưu chất',2,0,NULL),(104,'Kỹ thuật số ',1,1,NULL),(105,'Tổ chức quản lý kinh tế kỹ thuật',2,0,NULL),(106,'Thực hành cơ khí cơ bản',0,2,NULL),(107,'Nguyên lý động cơ đốt trong',2,1,NULL),(108,'Lý thuyết ô tô',3,0,NULL),(109,'Thực hành hệ thống truyền động ô tô',0,3,NULL),(110,'Hệ thống điện động cơ',2,2,NULL),(111,'Kỹ thuật máy nâng vận chuyển',2,0,NULL),(112,'Cảm biến trên ô tô',1,1,NULL),(113,'Vi điều khiển',1,1,NULL),(114,'Kỹ thuật khí nén – Thủy lực',1,1,NULL),(115,'Dao động trong kỹ thuật',2,0,NULL),(116,'Kết cấu và tính toán động cơ đốt trong',2,1,NULL),(117,'Thực hành Động cơ đốt trong',0,4,NULL),(118,'Hệ thống điện thân xe ',2,2,NULL),(119,'Kết cấu tính toán ô tô',2,1,NULL),(120,'Anh văn chuyên ngành ô tô',2,0,NULL),(121,'Chẩn đoán và bảo trì động cơ',1,1,NULL),(122,'Thí nghiệm điện – điện tử ô tô',0,2,NULL),(123,'Ô tô điện',1,1,NULL),(124,'Ô tô và môi trường',1,1,NULL),(125,'Hệ thống điều hòa không khí trên ô tô',0,2,NULL),(126,'Thực hành hệ thống vận hành và điều khiển ô tô',0,3,NULL),(127,'Đồ án chuyên ngành ô tô',0,1,NULL),(128,'Hệ thống điều khiển động cơ',2,2,NULL),(129,'Thực tập xí nghiệp',0,2,NULL),(130,'Kỹ thuật mô tô xe máy',0,2,NULL),(131,'Kiểm định và Chẩn đoán kỹ thuật ô tô',1,1,NULL),(132,'Xe chuyên dùng',0,2,NULL),(133,'Ô tô Hybrid',1,1,NULL),(134,'Hệ thống định vị ô tô (GPS)',1,1,NULL),(135,'Ô tô sử dụng năng lượng mới',1,1,NULL),(136,'Đồ án tốt nghiệp ',0,7,NULL),(137,'Chuyên đề tính toán, thiết kế ô tô',1,1,NULL),(138,'Chuyên đề hệ thống điều khiển ô tô',2,1,NULL),(139,'Chuyên đề công nghệ mới trên ô tô',1,1,NULL);
/*!40000 ALTER TABLE `monhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `namhoc`
--

DROP TABLE IF EXISTS `namhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `namhoc` (
  `MANAMHOC` int(11) NOT NULL AUTO_INCREMENT,
  `TENNAMHOC` text,
  PRIMARY KEY (`MANAMHOC`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `namhoc`
--

LOCK TABLES `namhoc` WRITE;
/*!40000 ALTER TABLE `namhoc` DISABLE KEYS */;
INSERT INTO `namhoc` VALUES (5,'Năm học 2020-2021'),(6,'Năm học 2021-2022'),(7,'Năm học 2022-2023'),(8,'Năm học 2023-2024'),(9,'Năm Học 2024'),(10,'Năm Học 2024'),(11,'Năm Học 2025'),(12,'Năm Học 2025');
/*!40000 ALTER TABLE `namhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nghien_cuu_kh`
--

DROP TABLE IF EXISTS `nghien_cuu_kh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nghien_cuu_kh` (
  `TEN_DE_TAI` varchar(255) NOT NULL,
  `THOI_GIAN_DANG_KY` date DEFAULT NULL,
  PRIMARY KEY (`TEN_DE_TAI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nghien_cuu_kh`
--

LOCK TABLES `nghien_cuu_kh` WRITE;
/*!40000 ALTER TABLE `nghien_cuu_kh` DISABLE KEYS */;
/*!40000 ALTER TABLE `nghien_cuu_kh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quy_dinh`
--

DROP TABLE IF EXISTS `quy_dinh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quy_dinh` (
  `MA_QUY_DINH` int(11) NOT NULL AUTO_INCREMENT,
  `TEN_QUY_DINH` text,
  `TRANG_THAI_QUY_DINH` text,
  PRIMARY KEY (`MA_QUY_DINH`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quy_dinh`
--

LOCK TABLES `quy_dinh` WRITE;
/*!40000 ALTER TABLE `quy_dinh` DISABLE KEYS */;
INSERT INTO `quy_dinh` VALUES (1,'Tỷ lệ quy đổi giữa các tác giả đối với bài tham luận (báo cáo khoa học) và bài báo khoa học','Đang áp dụng');
/*!40000 ALTER TABLE `quy_dinh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan` (
  `TENDANGNHAP` varchar(255) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `MATKHAU` text,
  `PHANQUYEN` text,
  `TRANGTHAITAIKHOAN` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`TENDANGNHAP`),
  KEY `FK_TAI_KHOAN_CUA_GIANG_VIEN` (`MAGV`),
  CONSTRAINT `FK_TAI_KHOAN_CUA_GIANG_VIEN` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` VALUES ('annb@tvu.edu.vn','00245',NULL,'Trưởng Khoa','Đang hoạt động'),('baoquocone@gmail.com','99997',NULL,'Trưởng Khoa','Đang hoạt động'),('baoquoczero@gmail.com','99999',NULL,'Admin','Đang hoạt động'),('diemhanh_tvu@tvu.edu.vn','12705',NULL,'Giảng Viên','Đang hoạt động'),('duongminh@tvu.edu.vn','00248',NULL,'Trưởng Bộ Môn','Đang hoạt động'),('Hattvi201084@tvu.edu.vn','00249',NULL,'Trưởng Khoa','Đang hoạt động'),('hientvu@tvu.edu.vn','00257',NULL,'Admin','Đang hoạt động'),('hohoangphucjob@gmail.com','0123',NULL,'Trưởng Bộ Môn','Đang hoạt động'),('huyngocntt@tvu.edu.vn','00254',NULL,'Admin','Đang hoạt động'),('hvthanh@tvu.edu.vn','00243',NULL,'Giảng Viên','Đang hoạt động'),('lamnn@tvu.edu.vn','00244',NULL,'Giảng Viên','Đang hoạt động'),('lmtu@tvu.edu.vn','03539',NULL,'Giảng Viên','Đang hoạt động'),('namtv@tvu.edu.vn','12701',NULL,'Giảng Viên','Đang hoạt động'),('ngocdanthanhdt@tvu.edu.vn','00246',NULL,'Giảng Viên','Đang hoạt động'),('nhiemnb@tvu.edu.vn','14204',NULL,'Giảng Viên','Đang hoạt động'),('nhutkhau@tvu.edu.vn','12700',NULL,'Giảng Viên','Đang hoạt động'),('nkduy@tvu.edu.vn','01027',NULL,'Giảng Viên','Đang hoạt động'),('nkquoc@tvu.edu.vn','03562',NULL,'Giảng Viên','Đang hoạt động'),('oane@tvu.edu.vn','01548',NULL,'Giảng Viên','Đang hoạt động'),('phattai@tvu.edu.vn','12702',NULL,'Giảng Viên','Đang hoạt động'),('phuocmien@tvu.edu.vn','00253',NULL,'Giảng Viên','Đang hoạt động'),('ptpnam@tvu.edu.vn','03546',NULL,'Giảng Viên','Đang hoạt động'),('pttmai@tvu.edu.vn','00255',NULL,'Giảng Viên','Đang hoạt động'),('thiennhd@tvu.edu.vn','00241',NULL,'Giảng Viên','Đang hoạt động'),('tinthanhtv2014@gmail.com','0122',NULL,'Admin','Đang hoạt động'),('tqviettv@tvu.edu.vn','00251',NULL,'Giảng Viên','Đang hoạt động'),('tramhoangnam@tvu.edu.vn','00252',NULL,'Giảng Viên','Đang hoạt động'),('vankhanh@tvu.edu.vn','00242',NULL,'Giảng Viên','Đang hoạt động'),('vothanhc@tvu.edu.vn','00250',NULL,'Giảng Viên','Đang hoạt động');
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thoigian_xacnhan`
--

DROP TABLE IF EXISTS `thoigian_xacnhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thoigian_xacnhan` (
  `MA_THOIGIAN_XACNHAN` int(11) NOT NULL AUTO_INCREMENT,
  `THOIGIANBATDAU` datetime DEFAULT NULL,
  `THOIGIANKETTHUC` datetime DEFAULT NULL,
  `TEN_KHOA` text,
  `GHICHU` text,
  PRIMARY KEY (`MA_THOIGIAN_XACNHAN`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thoigian_xacnhan`
--

LOCK TABLES `thoigian_xacnhan` WRITE;
/*!40000 ALTER TABLE `thoigian_xacnhan` DISABLE KEYS */;
INSERT INTO `thoigian_xacnhan` VALUES (9,'2024-08-06 20:29:00','2030-12-01 20:29:00','Khoa Kỹ Thuật Công Nghệ','CHONKHUNG'),(20,'2024-08-01 21:21:00','2024-08-31 21:21:00','Khoa Công Nghệ Thông Tin','NGHIENCUU'),(21,'2024-08-01 21:21:00','2024-08-31 21:21:00','Khoa Kỹ Thuật Công Nghệ','NGHIENCUU'),(22,'2024-08-06 20:29:00','2030-12-01 20:29:00','Khoa Công Nghệ Thông Tin','CHONKHUNG');
/*!40000 ALTER TABLE `thoigian_xacnhan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuoc`
--

DROP TABLE IF EXISTS `thuoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuoc` (
  `MACHUONGTRINH` int(11) NOT NULL,
  `MAMONHOC` int(11) NOT NULL,
  `SOTHUTUHOCKI` int(11) DEFAULT NULL,
  PRIMARY KEY (`MACHUONGTRINH`,`MAMONHOC`),
  KEY `FK_THUOC2` (`MAMONHOC`),
  CONSTRAINT `FK_THUOC` FOREIGN KEY (`MACHUONGTRINH`) REFERENCES `chuongtrinhdaotao` (`MACHUONGTRINH`),
  CONSTRAINT `FK_THUOC2` FOREIGN KEY (`MAMONHOC`) REFERENCES `monhoc` (`MAMONHOC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuoc`
--

LOCK TABLES `thuoc` WRITE;
/*!40000 ALTER TABLE `thuoc` DISABLE KEYS */;
INSERT INTO `thuoc` VALUES (1,1,1),(1,2,1),(1,3,1),(1,4,1),(1,5,1),(1,6,1),(1,7,1),(1,8,1),(1,9,1),(1,10,2),(1,11,2),(1,12,2),(1,13,2),(1,14,2),(1,15,2),(1,16,2),(1,17,2),(1,18,2),(1,19,3),(1,20,3),(1,21,3),(1,22,3),(1,23,3),(1,24,3),(1,25,3),(1,26,3),(1,27,4),(1,28,4),(1,29,4),(1,30,4),(1,31,4),(1,32,4),(1,33,4),(1,34,4),(1,35,4),(1,36,5),(1,37,5),(1,38,5),(1,39,5),(1,40,5),(1,41,5),(1,42,5),(1,43,5),(1,44,6),(1,45,6),(1,46,6),(1,47,6),(1,48,6),(1,49,6),(1,50,6),(1,51,6),(1,52,6),(1,53,6),(1,54,7),(1,55,7),(1,56,7),(1,57,7),(1,58,7),(1,59,7),(1,60,7),(1,61,7),(1,62,7),(1,63,8),(1,64,8),(1,65,8),(1,66,8),(1,67,8),(2,4,1),(2,5,1),(2,8,3),(2,9,4),(2,12,2),(2,15,2),(2,21,3),(2,36,2),(2,53,3),(2,64,8),(2,68,1),(2,69,1),(2,70,1),(2,71,1),(2,72,1),(2,73,1),(2,74,1),(2,75,2),(2,76,2),(2,77,2),(2,78,2),(2,79,2),(2,80,2),(2,81,2),(2,82,2),(2,83,2),(2,84,2),(2,85,3),(2,86,3),(2,87,3),(2,88,3),(2,89,3),(2,90,3),(2,91,3),(2,92,3),(2,93,3),(2,94,3),(2,95,4),(2,96,4),(2,97,4),(2,98,4),(2,99,4),(2,100,4),(2,101,4),(2,102,4),(2,103,4),(2,104,4),(2,105,4),(2,106,4),(2,107,5),(2,108,5),(2,109,5),(2,110,5),(2,111,5),(2,112,5),(2,113,5),(2,114,5),(2,115,5),(2,116,6),(2,117,6),(2,118,6),(2,119,6),(2,120,6),(2,121,6),(2,122,6),(2,123,6),(2,124,6),(2,125,6),(2,126,7),(2,127,7),(2,128,7),(2,129,7),(2,130,7),(2,131,7),(2,132,7),(2,133,7),(2,134,7),(2,135,7),(2,136,8),(2,137,8),(2,138,8),(2,139,8);
/*!40000 ALTER TABLE `thuoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ty_le_quy_doi_gio_chuan`
--

DROP TABLE IF EXISTS `ty_le_quy_doi_gio_chuan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ty_le_quy_doi_gio_chuan` (
  `MA_QUY_DOI` int(11) NOT NULL AUTO_INCREMENT,
  `MA_QUY_DINH` int(11) NOT NULL,
  `TEN_QUY_DOI` text,
  `TY_LE` float DEFAULT NULL,
  `VIEN_CHUC_TRUONG` varchar(50) DEFAULT NULL,
  `THUC_HIEN_CHUAN` varchar(50) DEFAULT NULL,
  `TRANG_THAI_QUY_DOI` text,
  `GHI_CHU_QUY_DOI` text,
  PRIMARY KEY (`MA_QUY_DOI`),
  KEY `FK_DUOC_QUY_DINH` (`MA_QUY_DINH`),
  CONSTRAINT `FK_DUOC_QUY_DINH` FOREIGN KEY (`MA_QUY_DINH`) REFERENCES `quy_dinh` (`MA_QUY_DINH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ty_le_quy_doi_gio_chuan`
--

LOCK TABLES `ty_le_quy_doi_gio_chuan` WRITE;
/*!40000 ALTER TABLE `ty_le_quy_doi_gio_chuan` DISABLE KEYS */;
/*!40000 ALTER TABLE `ty_le_quy_doi_gio_chuan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nghiencuukhoahoc'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-30 21:26:10
