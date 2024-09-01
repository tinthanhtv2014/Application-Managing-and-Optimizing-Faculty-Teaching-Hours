/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     8/5/2024 8:31:04 PM                          */
/*==============================================================*/


drop table if exists BANGPHANCONG;

drop table if exists BAO_CAO_KET_THUC_MON;

drop table if exists BOMON;

drop table if exists CHITIETPHANCONG;

drop table if exists CHON_KHUNG;

drop table if exists CHUCDANH;

drop table if exists CHUCVU;

drop table if exists CHUONGTRINHDAOTAO;

drop table if exists CO_CHUC_DANH;

drop table if exists CO_QUY_DINH;

drop table if exists DANG_KY_THUC_HIEN_QUY_DOI;

drop table if exists DANHMUCQUYDOISPKHCN;

drop table if exists GIANGVIEN;

drop table if exists GIU_CHUC_VU;

drop table if exists HINHTHUCDANHGIA;

drop table if exists HOCKYNIENKHOA;

drop table if exists KHOA;

drop table if exists KHUNGGIOCHUAN;

drop table if exists LOAI_DANH_MUC;

drop table if exists LOAI_TAC_GIA;

drop table if exists LOP;

drop table if exists MONHOC;

drop table if exists NAMHOC;

drop table if exists QUY_DINH;

drop table if exists TAIKHOAN;

drop table if exists THOIGIAN_XACNHAN;

drop table if exists THUOC;

drop table if exists TY_LE_QUY_DOI_GIO_CHUAN;

/*==============================================================*/
/* Table: BANGPHANCONG                                          */
/*==============================================================*/
create table BANGPHANCONG
(
   MAPHANCONG           int not null,
   MAGV                 varchar(255) not null,
   THOIGIANLAP          date,
   primary key (MAPHANCONG)
);

/*==============================================================*/
/* Table: BAO_CAO_KET_THUC_MON                                  */
/*==============================================================*/
create table BAO_CAO_KET_THUC_MON
(
   MADANHGIAKETTHUC     int not null,
   MACHITIETPHANCONG    int not null,
   LANDANHGIA           int,
   NGAYDANHGIA          date,
   NGAYBAOCAOKETTHUC    date,
   TRANG_THAI_DANG_KY   text,
   primary key (MADANHGIAKETTHUC, MACHITIETPHANCONG)
);

/*==============================================================*/
/* Table: BOMON                                                 */
/*==============================================================*/
create table BOMON
(
   MABOMON              int not null,
   MAKHOA               int not null,
   TENBOMON             text,
   primary key (MABOMON)
);

/*==============================================================*/
/* Table: CHITIETPHANCONG                                       */
/*==============================================================*/
create table CHITIETPHANCONG
(
   MACHITIETPHANCONG    int not null,
   MAMONHOC             int not null,
   MAPHANCONG           int not null,
   MALOP                varchar(255) not null,
   MAHKNK               int not null,
   THOIGIANBATDAUPHANCONG date,
   THOIGIANKETTHUCPHANCONG date,
   primary key (MACHITIETPHANCONG)
);

/*==============================================================*/
/* Table: CHON_KHUNG                                            */
/*==============================================================*/
create table CHON_KHUNG
(
   MAGV                 varchar(255) not null,
   MANAMHOC             int not null,
   MAKHUNG              int not null,
   primary key (MAGV, MANAMHOC, MAKHUNG)
);

/*==============================================================*/
/* Table: CHUCDANH                                              */
/*==============================================================*/
create table CHUCDANH
(
   MACHUCDANH           int not null,
   TENCHUCDANH          text,
   primary key (MACHUCDANH)
);

/*==============================================================*/
/* Table: CHUCVU                                                */
/*==============================================================*/
create table CHUCVU
(
   MACHUCVU             int not null,
   TENCHUCVU            text,
   primary key (MACHUCVU)
);

/*==============================================================*/
/* Table: CHUONGTRINHDAOTAO                                     */
/*==============================================================*/
create table CHUONGTRINHDAOTAO
(
   MACHUONGTRINH        int not null,
   MABOMON              int not null,
   TENCHUONGTRINH       text,
   primary key (MACHUONGTRINH)
);

/*==============================================================*/
/* Table: CO_CHUC_DANH                                          */
/*==============================================================*/
create table CO_CHUC_DANH
(
   MACHUCDANH           int not null,
   MAGV                 varchar(255) not null,
   THOIGIANNHAN         date,
   TRANG_THAI_DANG_KY   text,
   primary key (MACHUCDANH, MAGV)
);

/*==============================================================*/
/* Table: CO_QUY_DINH                                           */
/*==============================================================*/
create table CO_QUY_DINH
(
   MA_QUY_DOI           int not null,
   MA_LOAI_DANH_MUC     int not null,
   MA_LOAI_TAC_GIA      int not null,
   SO_TAC_GIA           int,
   primary key (MA_QUY_DOI, MA_LOAI_DANH_MUC, MA_LOAI_TAC_GIA)
);

/*==============================================================*/
/* Table: DANG_KY_THUC_HIEN_QUY_DOI                             */
/*==============================================================*/
create table DANG_KY_THUC_HIEN_QUY_DOI
(
   MA_DANH_MUC          int not null,
   MAGV                 varchar(255) not null,
   MANAMHOC             int not null,
   MA_LOAI_TAC_GIA      int not null,
   SOGIOQUYDOI          int,
   TEN_NGHIEN_CUU       text,
   THOI_GIAN_DANG_KY    date,
   TRANG_THAI_DANG_KY   text,
   primary key (MA_DANH_MUC, MAGV, MANAMHOC, MA_LOAI_TAC_GIA)
);

/*==============================================================*/
/* Table: DANHMUCQUYDOISPKHCN                                   */
/*==============================================================*/
create table DANHMUCQUYDOISPKHCN
(
   MA_DANH_MUC          int not null,
   MA_LOAI_DANH_MUC     int not null,
   GIO_CHUAN            int,
   NOI_DUNG_DANH_MUC    text,
   ISBN                 varchar(50),
   WOS_SCOUPUS          varchar(50),
   HANG_WOS_SCOUPUS     varchar(10),
   LOI_NHUAN            varchar(100),
   DON_VI_TINH          varchar(50),
   GIAI_THUONG          varchar(50),
   XEP_HANG_QUARTILES   varchar(50),
   NAM_THUC_HIEN        text,
   TRANG_THAI_DANH_MUC  varchar(100),
   GHI_CHU_DANH_MUC     text,
   primary key (MA_DANH_MUC)
);

/*==============================================================*/
/* Table: GIANGVIEN                                             */
/*==============================================================*/
create table GIANGVIEN
(
   MAGV                 varchar(255) not null,
   MABOMON              int not null,
   TENGV                varchar(100),
   EMAIL                text,
   DIENTHOAI            varchar(50),
   DIACHI               text,
   primary key (MAGV)
);

/*==============================================================*/
/* Table: GIU_CHUC_VU                                           */
/*==============================================================*/
create table GIU_CHUC_VU
(
   MAGV                 varchar(255) not null,
   MACHUCVU             int not null,
   SOQUYETDINH          varchar(255),
   TUNGAY               date,
   primary key (MAGV, MACHUCVU)
);

/*==============================================================*/
/* Table: HINHTHUCDANHGIA                                       */
/*==============================================================*/
create table HINHTHUCDANHGIA
(
   MADANHGIAKETTHUC     int not null,
   TENDANHGIA           text,
   primary key (MADANHGIAKETTHUC)
);

/*==============================================================*/
/* Table: HOCKYNIENKHOA                                         */
/*==============================================================*/
create table HOCKYNIENKHOA
(
   MAHKNK               int not null,
   TENHKNK              text,
   NGAYBATDAUNIENKHOA   date,
   NGAYKETTHUCNIENKHOA  date,
   primary key (MAHKNK)
);

/*==============================================================*/
/* Table: KHOA                                                  */
/*==============================================================*/
create table KHOA
(
   MAKHOA               int not null,
   TENKHOA              text,
   primary key (MAKHOA)
);

/*==============================================================*/
/* Table: KHUNGGIOCHUAN                                         */
/*==============================================================*/
create table KHUNGGIOCHUAN
(
   MAKHUNG              int not null,
   MACHUCDANH           int not null,
   TENKHUNGCHUAN        text,
   GIOGIANGDAY_HANHCHINH int,
   GIOGIANGDAY_CHUAN    int,
   GIONGHIENCUUKHOAHOC_HANHCHINH int,
   GIONGHIENCUUKHOAHOC_CHUAN int,
   GIOPHUCVUCONGDONG_HANHCHINH int,
   GIOPHUCVUCONGDONG_CHUAN int,
   GHICHU               text,
   primary key (MAKHUNG)
);

/*==============================================================*/
/* Table: LOAI_DANH_MUC                                         */
/*==============================================================*/
create table LOAI_DANH_MUC
(
   MA_LOAI_DANH_MUC     int not null,
   TEN_LOAI_DANH_MUC    text,
   TRANG_THAI_DANH_MUC  varchar(100),
   primary key (MA_LOAI_DANH_MUC)
);

/*==============================================================*/
/* Table: LOAI_TAC_GIA                                          */
/*==============================================================*/
create table LOAI_TAC_GIA
(
   MA_LOAI_TAC_GIA      int not null,
   TEN_LOAI_TAC_GIA     text,
   primary key (MA_LOAI_TAC_GIA)
);

/*==============================================================*/
/* Table: LOP                                                   */
/*==============================================================*/
create table LOP
(
   MALOP                varchar(255) not null,
   MACHUONGTRINH        int not null,
   TENLOP               text,
   NAMTUYENSINH         int,
   SISO                 int,
   primary key (MALOP)
);

/*==============================================================*/
/* Table: MONHOC                                                */
/*==============================================================*/
create table MONHOC
(
   MAMONHOC             int not null,
   TENMONHOC            text,
   SOTINCHILYTHUYET     int,
   SOTINCHITHUCHANH     int,
   primary key (MAMONHOC)
);

/*==============================================================*/
/* Table: NAMHOC                                                */
/*==============================================================*/
create table NAMHOC
(
   MANAMHOC             int not null,
   TENNAMHOC            text,
   primary key (MANAMHOC)
);

/*==============================================================*/
/* Table: QUY_DINH                                              */
/*==============================================================*/
create table QUY_DINH
(
   MA_QUY_DINH          int not null,
   TEN_QUY_DINH         text,
   TRANG_THAI_QUY_DINH  text,
   primary key (MA_QUY_DINH)
);

/*==============================================================*/
/* Table: TAIKHOAN                                              */
/*==============================================================*/
create table TAIKHOAN
(
   TENDANGNHAP          varchar(255) not null,
   MAGV                 varchar(255) not null,
   MATKHAU              text,
   PHANQUYEN            text,
   TRANGTHAITAIKHOAN    varchar(255),
   primary key (TENDANGNHAP)
);

/*==============================================================*/
/* Table: THOIGIAN_XACNHAN                                      */
/*==============================================================*/
create table THOIGIAN_XACNHAN
(
   MA_THOIGIAN_XACNHAN  int not null,
   THOIGIANBATDAU       datetime,
   THOIGIANKETTHUC      datetime,
   TEN_KHOA             text,
   primary key (MA_THOIGIAN_XACNHAN)
);

/*==============================================================*/
/* Table: THUOC                                                 */
/*==============================================================*/
create table THUOC
(
   MACHUONGTRINH        int not null,
   MAMONHOC             int not null,
   SOTHUTUHOCKI         int,
   primary key (MACHUONGTRINH, MAMONHOC)
);

/*==============================================================*/
/* Table: TY_LE_QUY_DOI_GIO_CHUAN                               */
/*==============================================================*/
create table TY_LE_QUY_DOI_GIO_CHUAN
(
   MA_QUY_DOI           int not null,
   MA_QUY_DINH          int not null,
   TEN_QUY_DOI          text,
   TY_LE                float,
   TRANG_THAI_QUY_DOI   text,
   GHI_CHU_QUY_DOI      text,
   primary key (MA_QUY_DOI)
);

alter table BANGPHANCONG add constraint FK__UOC_PHAN_CONG foreign key (MAGV)
      references GIANGVIEN (MAGV) on delete restrict on update restrict;

alter table BAO_CAO_KET_THUC_MON add constraint FK_BAO_CAO_KET_THUC_MON foreign key (MADANHGIAKETTHUC)
      references HINHTHUCDANHGIA (MADANHGIAKETTHUC) on delete restrict on update restrict;

alter table BAO_CAO_KET_THUC_MON add constraint FK_BAO_CAO_KET_THUC_MON2 foreign key (MACHITIETPHANCONG)
      references CHITIETPHANCONG (MACHITIETPHANCONG) on delete restrict on update restrict;

alter table BOMON add constraint FK_THUOC_KHOA foreign key (MAKHOA)
      references KHOA (MAKHOA) on delete restrict on update restrict;

alter table CHITIETPHANCONG add constraint FK_CO foreign key (MAPHANCONG)
      references BANGPHANCONG (MAPHANCONG) on delete restrict on update restrict;

alter table CHITIETPHANCONG add constraint FK_PHAN_CONG_DAY foreign key (MALOP)
      references LOP (MALOP) on delete restrict on update restrict;

alter table CHITIETPHANCONG add constraint FK_PHAN_CONG_HOC_KY_NIEN_KHOA foreign key (MAHKNK)
      references HOCKYNIENKHOA (MAHKNK) on delete restrict on update restrict;

alter table CHITIETPHANCONG add constraint FK_PHAN_CONG_MON_HOC foreign key (MAMONHOC)
      references MONHOC (MAMONHOC) on delete restrict on update restrict;

alter table CHON_KHUNG add constraint FK_CHON_KHUNG foreign key (MAGV)
      references GIANGVIEN (MAGV) on delete restrict on update restrict;

alter table CHON_KHUNG add constraint FK_CHON_KHUNG2 foreign key (MANAMHOC)
      references NAMHOC (MANAMHOC) on delete restrict on update restrict;

alter table CHON_KHUNG add constraint FK_CHON_KHUNG3 foreign key (MAKHUNG)
      references KHUNGGIOCHUAN (MAKHUNG) on delete restrict on update restrict;

alter table CHUONGTRINHDAOTAO add constraint FK_THUOC_CHUONG_TRINH__AO_TAO foreign key (MABOMON)
      references BOMON (MABOMON) on delete restrict on update restrict;

alter table CO_CHUC_DANH add constraint FK_CO_CHUC_DANH foreign key (MACHUCDANH)
      references CHUCDANH (MACHUCDANH) on delete restrict on update restrict;

alter table CO_CHUC_DANH add constraint FK_CO_CHUC_DANH2 foreign key (MAGV)
      references GIANGVIEN (MAGV) on delete restrict on update restrict;

alter table CO_QUY_DINH add constraint FK_CO_QUY_DINH foreign key (MA_QUY_DOI)
      references TY_LE_QUY_DOI_GIO_CHUAN (MA_QUY_DOI) on delete restrict on update restrict;

alter table CO_QUY_DINH add constraint FK_CO_QUY_DINH2 foreign key (MA_LOAI_DANH_MUC)
      references LOAI_DANH_MUC (MA_LOAI_DANH_MUC) on delete restrict on update restrict;

alter table CO_QUY_DINH add constraint FK_CO_QUY_DINH3 foreign key (MA_LOAI_TAC_GIA)
      references LOAI_TAC_GIA (MA_LOAI_TAC_GIA) on delete restrict on update restrict;

alter table DANG_KY_THUC_HIEN_QUY_DOI add constraint FK_DANG_KY_THUC_HIEN_QUY_DOI foreign key (MA_DANH_MUC)
      references DANHMUCQUYDOISPKHCN (MA_DANH_MUC) on delete restrict on update restrict;

alter table DANG_KY_THUC_HIEN_QUY_DOI add constraint FK_DANG_KY_THUC_HIEN_QUY_DOI2 foreign key (MAGV)
      references GIANGVIEN (MAGV) on delete restrict on update restrict;

alter table DANG_KY_THUC_HIEN_QUY_DOI add constraint FK_DANG_KY_THUC_HIEN_QUY_DOI3 foreign key (MANAMHOC)
      references NAMHOC (MANAMHOC) on delete restrict on update restrict;

alter table DANG_KY_THUC_HIEN_QUY_DOI add constraint FK_DANG_KY_THUC_HIEN_QUY_DOI4 foreign key (MA_LOAI_TAC_GIA)
      references LOAI_TAC_GIA (MA_LOAI_TAC_GIA) on delete restrict on update restrict;

alter table DANHMUCQUYDOISPKHCN add constraint FK_THUOC_DANH_MUC foreign key (MA_LOAI_DANH_MUC)
      references LOAI_DANH_MUC (MA_LOAI_DANH_MUC) on delete restrict on update restrict;

alter table GIANGVIEN add constraint FK_THUOC_BO_MON foreign key (MABOMON)
      references BOMON (MABOMON) on delete restrict on update restrict;

alter table GIU_CHUC_VU add constraint FK_GIU_CHUC_VU foreign key (MAGV)
      references GIANGVIEN (MAGV) on delete restrict on update restrict;

alter table GIU_CHUC_VU add constraint FK_GIU_CHUC_VU2 foreign key (MACHUCVU)
      references CHUCVU (MACHUCVU) on delete restrict on update restrict;

alter table KHUNGGIOCHUAN add constraint FK_CO_KHUNG_GIO_CHUAN foreign key (MACHUCDANH)
      references CHUCDANH (MACHUCDANH) on delete restrict on update restrict;

alter table LOP add constraint FK_HOC foreign key (MACHUONGTRINH)
      references CHUONGTRINHDAOTAO (MACHUONGTRINH) on delete restrict on update restrict;

alter table TAIKHOAN add constraint FK_TAI_KHOAN_CUA_GIANG_VIEN foreign key (MAGV)
      references GIANGVIEN (MAGV) on delete restrict on update restrict;

alter table THUOC add constraint FK_THUOC foreign key (MACHUONGTRINH)
      references CHUONGTRINHDAOTAO (MACHUONGTRINH) on delete restrict on update restrict;

alter table THUOC add constraint FK_THUOC2 foreign key (MAMONHOC)
      references MONHOC (MAMONHOC) on delete restrict on update restrict;

alter table TY_LE_QUY_DOI_GIO_CHUAN add constraint FK_DUOC_QUY_DINH foreign key (MA_QUY_DINH)
      references QUY_DINH (MA_QUY_DINH) on delete restrict on update restrict;

