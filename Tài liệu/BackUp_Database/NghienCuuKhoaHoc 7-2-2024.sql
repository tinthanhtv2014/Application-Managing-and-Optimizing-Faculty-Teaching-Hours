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
  `MAPHANCONG` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `THOIGIANLAP` date DEFAULT NULL,
  PRIMARY KEY (`MAPHANCONG`),
  KEY `FK__UOC_PHAN_CONG` (`MAGV`),
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
  `TRANGTHAI` text,
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bomon`
--

LOCK TABLES `bomon` WRITE;
/*!40000 ALTER TABLE `bomon` DISABLE KEYS */;
INSERT INTO `bomon` VALUES (1,1,'Bộ Môn Khoa Học Máy Tính'),(2,1,'Bộ Môn Công Nghệ Phần Mềm'),(3,2,'Bộ Môn Quản Trị Kinh Doanh'),(4,2,'Bộ Môn Kế Toán'),(5,3,'Bộ Môn Kỹ Thuật Điện'),(6,3,'Bộ Môn Kỹ Thuật Cơ Khí'),(7,4,'Bộ Môn Dược Học'),(8,4,'Bộ Môn Y Học Cơ Sở'),(15,1,'asda111aasdafadsad');
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
  `MAHKNK` int(11) NOT NULL,
  `THOIGIANBATDAUPHANCONG` date DEFAULT NULL,
  `THOIGIANKETTHUCPHANCONG` date DEFAULT NULL,
  PRIMARY KEY (`MACHITIETPHANCONG`),
  KEY `FK_CO` (`MAPHANCONG`),
  KEY `FK_PHAN_CONG_DAY` (`MALOP`),
  KEY `FK_PHAN_CONG_HOC_KY_NIEN_KHOA` (`MAHKNK`),
  KEY `FK_PHAN_CONG_MON_HOC` (`MAMONHOC`),
  CONSTRAINT `FK_CO` FOREIGN KEY (`MAPHANCONG`) REFERENCES `bangphancong` (`MAPHANCONG`),
  CONSTRAINT `FK_PHAN_CONG_DAY` FOREIGN KEY (`MALOP`) REFERENCES `lop` (`MALOP`),
  CONSTRAINT `FK_PHAN_CONG_HOC_KY_NIEN_KHOA` FOREIGN KEY (`MAHKNK`) REFERENCES `hockynienkhoa` (`MAHKNK`),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chucdanh`
--

LOCK TABLES `chucdanh` WRITE;
/*!40000 ALTER TABLE `chucdanh` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chucvu`
--

LOCK TABLES `chucvu` WRITE;
/*!40000 ALTER TABLE `chucvu` DISABLE KEYS */;
INSERT INTO `chucvu` VALUES (0,'Trưởng Khoa'),(1,'Phó Trưởng Khoa'),(2,'Trưởng Bộ Môn'),(3,'Phó Trưởng Bộ Môn'),(4,'Giảng Viên Chính'),(5,'Giảng Viên');
/*!40000 ALTER TABLE `chucvu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuongtrinhdaotao`
--

DROP TABLE IF EXISTS `chuongtrinhdaotao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chuongtrinhdaotao` (
  `MACHUONGTRINH` int(11) NOT NULL,
  `MABOMON` int(11) NOT NULL,
  `TENCHUONGTRINH` text,
  PRIMARY KEY (`MACHUONGTRINH`),
  KEY `FK_THUOC_CHUONG_TRINH__AO_TAO` (`MABOMON`),
  CONSTRAINT `FK_THUOC_CHUONG_TRINH__AO_TAO` FOREIGN KEY (`MABOMON`) REFERENCES `bomon` (`MABOMON`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuongtrinhdaotao`
--

LOCK TABLES `chuongtrinhdaotao` WRITE;
/*!40000 ALTER TABLE `chuongtrinhdaotao` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `co_chuc_danh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dang_ky_thuc_hien_quy_doi`
--

DROP TABLE IF EXISTS `dang_ky_thuc_hien_quy_doi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dang_ky_thuc_hien_quy_doi` (
  `MADANHMUC` int(11) NOT NULL,
  `MAGV` varchar(255) NOT NULL,
  `MANAMHOC` int(11) NOT NULL,
  `SOGIOQUYDOI` int(11) DEFAULT NULL,
  `TRANGTHAI` text,
  PRIMARY KEY (`MADANHMUC`,`MAGV`,`MANAMHOC`),
  KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI2` (`MAGV`),
  KEY `FK_DANG_KY_THUC_HIEN_QUY_DOI3` (`MANAMHOC`),
  CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI` FOREIGN KEY (`MADANHMUC`) REFERENCES `danhmucquydoispkhcn` (`MADANHMUC`),
  CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI2` FOREIGN KEY (`MAGV`) REFERENCES `giangvien` (`MAGV`),
  CONSTRAINT `FK_DANG_KY_THUC_HIEN_QUY_DOI3` FOREIGN KEY (`MANAMHOC`) REFERENCES `namhoc` (`MANAMHOC`)
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
  `MADANHMUC` int(11) NOT NULL,
  `GIOQUYDOI` int(11) DEFAULT NULL,
  `NOIDUNGDANHMUC` text,
  PRIMARY KEY (`MADANHMUC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhmucquydoispkhcn`
--

LOCK TABLES `danhmucquydoispkhcn` WRITE;
/*!40000 ALTER TABLE `danhmucquydoispkhcn` DISABLE KEYS */;
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
INSERT INTO `giangvien` VALUES ('GV001',1,'Nguyễn Văn A','nguyenvana@example.com','0123456789','123 Đường ABC, Quận 1, TP.HCM'),('GV002',2,'Trần Thị B','tranthib@example.com','0987654321','456 Đường DEF, Quận 2, TP.HCM'),('GV003',3,'Lê Văn C','levanc@example.com','0912345678','789 Đường GHI, Quận 3, TP.HCM'),('GV004',4,'Phạm Thị D','phamthid@example.com','0923456789','123 Đường JKL, Quận 4, TP.HCM'),('GV005',5,'Hoàng Văn E','hoangvane@example.com','0934567890','456 Đường MNO, Quận 5, TP.HCM'),('GV006',6,'Đặng Thị F','dangthif@example.com','0945678901','789 Đường PQR, Quận 6, TP.HCM'),('GV007',7,'Ngô Văn G','ngovang@example.com','0956789012','123 Đường STU, Quận 7, TP.HCM'),('GV008',8,'Vũ Thị H','vuthih@example.com','0967890123','456 Đường VWX, Quận 8, TP.HCM'),('GV009',2,NULL,NULL,NULL,NULL);
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
  `MAHKNK` int(11) NOT NULL,
  `TENHKNK` text,
  `NGAYBATDAUNIENKHOA` date DEFAULT NULL,
  `NGAYKETTHUCNIENKHOA` date DEFAULT NULL,
  PRIMARY KEY (`MAHKNK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hockynienkhoa`
--

LOCK TABLES `hockynienkhoa` WRITE;
/*!40000 ALTER TABLE `hockynienkhoa` DISABLE KEYS */;
/*!40000 ALTER TABLE `hockynienkhoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khoa`
--

DROP TABLE IF EXISTS `khoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khoa` (
  `TENKHOA` text,
  `MAKHOA` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`MAKHOA`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoa`
--

LOCK TABLES `khoa` WRITE;
/*!40000 ALTER TABLE `khoa` DISABLE KEYS */;
INSERT INTO `khoa` VALUES ('Khoa Công Nghệ Thông Tin',1),('Khoa Kinh Tế',2),('Khoa Kỹ Thuật',3),('Khoa Y Dược',4),('Khoa Nông Nghiệp Thủy Hải Sản',10);
/*!40000 ALTER TABLE `khoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khunggiochuan`
--

DROP TABLE IF EXISTS `khunggiochuan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khunggiochuan` (
  `MAKHUNG` int(11) NOT NULL,
  `MACHUCDANH` int(11) NOT NULL,
  `TENKHUNGCHUAN` text,
  `GIOGIANGDAY` int(11) DEFAULT NULL,
  `GIONGHIENCUUKHOAHOC` int(11) DEFAULT NULL,
  `GIOPHUCVUCONGDONG` int(11) DEFAULT NULL,
  PRIMARY KEY (`MAKHUNG`),
  KEY `FK_CO_KHUNG_GIO_CHUAN` (`MACHUCDANH`),
  CONSTRAINT `FK_CO_KHUNG_GIO_CHUAN` FOREIGN KEY (`MACHUCDANH`) REFERENCES `chucdanh` (`MACHUCDANH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khunggiochuan`
--

LOCK TABLES `khunggiochuan` WRITE;
/*!40000 ALTER TABLE `khunggiochuan` DISABLE KEYS */;
/*!40000 ALTER TABLE `khunggiochuan` ENABLE KEYS */;
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
/*!40000 ALTER TABLE `lop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monhoc`
--

DROP TABLE IF EXISTS `monhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monhoc` (
  `MAMONHOC` int(11) NOT NULL,
  `TENMONHOC` text,
  `SOTINCHILYTHUYET` int(11) DEFAULT NULL,
  `SOTINCHITHUCHANH` int(11) DEFAULT NULL,
  PRIMARY KEY (`MAMONHOC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monhoc`
--

LOCK TABLES `monhoc` WRITE;
/*!40000 ALTER TABLE `monhoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `monhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `namhoc`
--

DROP TABLE IF EXISTS `namhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `namhoc` (
  `MANAMHOC` int(11) NOT NULL,
  `TENNAMHOC` text,
  PRIMARY KEY (`MANAMHOC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `namhoc`
--

LOCK TABLES `namhoc` WRITE;
/*!40000 ALTER TABLE `namhoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `namhoc` ENABLE KEYS */;
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
INSERT INTO `taikhoan` VALUES ('admin','GV001','$2b$10$9xtSelaB1iUYOFe6p5rV3eEZmE3OYImAM0YoG6XoFidELkRjiZ.Im','Admin','Đang hoạt động'),('admin@gmail.com','GV001','$2b$10$r60.Om5UpOibMyiRDsib3.y2PUsF9KeIMpjTFbjqZ2j3rcUcdOi42','Admin','Đang hoạt động'),('hohoangphucjob@gmail.com','GV009',NULL,'Admin','Đang hoạt động');
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
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
/*!40000 ALTER TABLE `thuoc` ENABLE KEYS */;
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

-- Dump completed on 2024-07-02 18:07:16
