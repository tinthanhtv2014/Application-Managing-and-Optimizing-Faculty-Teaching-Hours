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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bomon`
--

LOCK TABLES `bomon` WRITE;
/*!40000 ALTER TABLE `bomon` DISABLE KEYS */;
INSERT INTO `bomon` VALUES (2,1,'Bộ Môn Công Nghệ Phần Mềm'),(16,11,'Bộ môn Công nghệ thông tin');
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
INSERT INTO `chon_khung` VALUES ('0123',2,11);
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
INSERT INTO `co_chuc_danh` VALUES (1,'00245','2024-07-08','Đang giữ chức danh'),(1,'00254','2024-07-09','Đang giữ chức danh'),(1,'0123','2024-07-09','Đang giữ chức danh'),(1,'99999','2024-07-09','Đang giữ chức danh'),(2,'00249','2024-07-09','Đang giữ chức danh'),(2,'00250','2024-07-08','Đang giữ chức danh'),(3,'12705','2024-07-08','Đang giữ chức danh'),(5,'00248','2024-07-08','Đang giữ chức danh');
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
  `SOTACGIA` int(11) DEFAULT NULL,
  `GHICHU` text,
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
INSERT INTO `giangvien` VALUES ('00241',16,'Nguyễn Hoàng Duy Thiện',NULL,NULL,NULL),('00242',16,'Dương Ngọc Vân Khanh',NULL,NULL,NULL),('00243',16,'Huỳnh Văn Thanh',NULL,NULL,NULL),('00244',16,'Nguyễn Nhứt Lam',NULL,NULL,NULL),('00245',16,'ưeqweqweq','annb@tvu.edu.vn','0369258147','Mỹ'),('00246',16,'Nguyễn Ngọc Đan Thanh',NULL,NULL,NULL),('00248',16,'Hồ Hoàng Phúc Fix','duongminh@tvu.edu.vn','0258741369','Đáy biển Đen'),('00249',16,'Hà Thị Thúy Vi','Hattvi201084@tvu.edu.vn','0123654987','Trà Vinh'),('00250',16,'','vothanhc@tvu.edu.vn','',''),('00251',16,'Trịnh Quốc Việt',NULL,NULL,NULL),('00252',16,'Trầm Hoàng Nam',NULL,NULL,NULL),('00253',16,'Đoàn Phước Miền',NULL,NULL,NULL),('00254',16,'Ngô Thanh Huy','huyngocntt@tvu.edu.vn','',''),('00255',16,'Phạm Thị Trúc Mai',NULL,NULL,NULL),('00257',16,'Nguyễn Mộng Hiền','hientvu@tvu.edu.vn','0123456987','TV'),('01027',16,'Nguyễn Khánh Duy ',NULL,NULL,NULL),('0123',16,'Hồ Hoàng Phúc ','hohoangphucjob@gmail.com','0327434821','Sao Hỏa'),('01548',16,'Thạch Kọng SaOane',NULL,NULL,NULL),('03539',16,'Lê Minh Tự',NULL,NULL,NULL),('03546',16,'Phan Thị Phương Nam',NULL,NULL,NULL),('03562',16,'Nguyễn Khắc Quốc',NULL,NULL,NULL),('11012',2,NULL,NULL,NULL,NULL),('12700',16,'Khấu Văn Nhựt',NULL,NULL,NULL),('12701',16,'Trần Văn Nam',NULL,NULL,NULL),('12702',16,'Nguyễn Thừa Phát Tài',NULL,NULL,NULL),('12705',16,'','','',''),('14204',16,'Nguyễn Bá Nhiệm',NULL,NULL,NULL),('99999',16,'Nguyễn Lâm Quốc Bảo','baoquoczero@gmail.com','0987654321','Sao Hỏa');
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
INSERT INTO `giu_chuc_vu` VALUES ('00244',9,NULL,NULL),('00245',2,'99','2024-07-08'),('00248',8,'99','2024-07-08'),('00249',1,'99','2024-07-09'),('00254',1,'99','2024-07-09'),('00257',1,'99','2024-07-08'),('01548',8,NULL,NULL),('12705',8,NULL,NULL),('14204',8,NULL,NULL),('99999',6,'99','2024-07-09');
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
  `MAKHOA` int(11) NOT NULL AUTO_INCREMENT,
  `TENKHOA` text,
  PRIMARY KEY (`MAKHOA`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoa`
--

LOCK TABLES `khoa` WRITE;
/*!40000 ALTER TABLE `khoa` DISABLE KEYS */;
INSERT INTO `khoa` VALUES (1,'Khoa Công Nghệ Thông Tin'),(11,'Khoa Kỹ Thuật Công Nghệ');
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
  `MANAMHOC` int(11) NOT NULL AUTO_INCREMENT,
  `TENNAMHOC` text,
  PRIMARY KEY (`MANAMHOC`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `namhoc`
--

LOCK TABLES `namhoc` WRITE;
/*!40000 ALTER TABLE `namhoc` DISABLE KEYS */;
INSERT INTO `namhoc` VALUES (2,'Năm 2022 - 2023'),(3,'Năm 2023 - 2024');
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
INSERT INTO `taikhoan` VALUES ('annb@tvu.edu.vn','00245',NULL,'Trưởng Khoa','Đang hoạt động'),('baoquoczero@gmail.com','99999',NULL,'Admin','Đang hoạt động'),('diemhanh_tvu@tvu.edu.vn','12705',NULL,'Giảng Viên','Đang hoạt động'),('duongminh@tvu.edu.vn','00248',NULL,'Trưởng Bộ Môn','Đang hoạt động'),('Hattvi201084@tvu.edu.vn','00249',NULL,'Trưởng Khoa','Đang hoạt động'),('hientvu@tvu.edu.vn','00257',NULL,'Admin','Đang hoạt động'),('hohoangphucjob@gmail.com','0123',NULL,'Admin','Đang hoạt động'),('huyngocntt@tvu.edu.vn','00254',NULL,'Admin','Đang hoạt động'),('hvthanh@tvu.edu.vn','00243',NULL,'Giảng Viên','Đang hoạt động'),('lamnn@tvu.edu.vn','00244',NULL,'Giảng Viên','Đang hoạt động'),('lmtu@tvu.edu.vn','03539',NULL,'Giảng Viên','Đang hoạt động'),('namtv@tvu.edu.vn','12701',NULL,'Giảng Viên','Đang hoạt động'),('ngocdanthanhdt@tvu.edu.vn','00246',NULL,'Giảng Viên','Đang hoạt động'),('nhiemnb@tvu.edu.vn','14204',NULL,'Giảng Viên','Đang hoạt động'),('nhutkhau@tvu.edu.vn','12700',NULL,'Giảng Viên','Đang hoạt động'),('nkduy@tvu.edu.vn','01027',NULL,'Giảng Viên','Đang hoạt động'),('nkquoc@tvu.edu.vn','03562',NULL,'Giảng Viên','Đang hoạt động'),('oane@tvu.edu.vn','01548',NULL,'Giảng Viên','Đang hoạt động'),('phattai@tvu.edu.vn','12702',NULL,'Giảng Viên','Đang hoạt động'),('phuocmien@tvu.edu.vn','00253',NULL,'Giảng Viên','Đang hoạt động'),('ptpnam@tvu.edu.vn','03546',NULL,'Giảng Viên','Đang hoạt động'),('pttmai@tvu.edu.vn','00255',NULL,'Giảng Viên','Đang hoạt động'),('thiennhd@tvu.edu.vn','00241',NULL,'Giảng Viên','Đang hoạt động'),('tqviettv@tvu.edu.vn','00251',NULL,'Giảng Viên','Đang hoạt động'),('tramhoangnam@tvu.edu.vn','00252',NULL,'Giảng Viên','Đang hoạt động'),('vankhanh@tvu.edu.vn','00242',NULL,'Giảng Viên','Đang hoạt động'),('vothanhc@tvu.edu.vn','00250',NULL,'Giảng Viên','Đang hoạt động');
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
  PRIMARY KEY (`MA_THOIGIAN_XACNHAN`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thoigian_xacnhan`
--

LOCK TABLES `thoigian_xacnhan` WRITE;
/*!40000 ALTER TABLE `thoigian_xacnhan` DISABLE KEYS */;
INSERT INTO `thoigian_xacnhan` VALUES (1,'2024-07-22 20:46:00','2024-07-26 20:46:00','Khoa Kỹ Thuật Công Nghệ');
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

-- Dump completed on 2024-07-23 20:56:31
