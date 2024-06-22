/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2008                    */
/* Created on:     6/22/2024 6:33:39 PM                         */
/*==============================================================*/


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('BANGPHANCONG') and o.name = 'FK_BANGPHAN__UOC_PHAN_GIANGVIE')
alter table BANGPHANCONG
   drop constraint FK_BANGPHAN__UOC_PHAN_GIANGVIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('BAO_CAO_KET_THUC_MON') and o.name = 'FK_BAO_CAO__BAO_CAO_K_HINHTHUC')
alter table BAO_CAO_KET_THUC_MON
   drop constraint FK_BAO_CAO__BAO_CAO_K_HINHTHUC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('BAO_CAO_KET_THUC_MON') and o.name = 'FK_BAO_CAO__BAO_CAO_K_CHITIETP')
alter table BAO_CAO_KET_THUC_MON
   drop constraint FK_BAO_CAO__BAO_CAO_K_CHITIETP
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('BOMON') and o.name = 'FK_BOMON_THUOC_KHO_KHOA')
alter table BOMON
   drop constraint FK_BOMON_THUOC_KHO_KHOA
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHITIETPHANCONG') and o.name = 'FK_CHITIETP_CO_BANGPHAN')
alter table CHITIETPHANCONG
   drop constraint FK_CHITIETP_CO_BANGPHAN
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHITIETPHANCONG') and o.name = 'FK_CHITIETP_PHAN_CONG_LOP')
alter table CHITIETPHANCONG
   drop constraint FK_CHITIETP_PHAN_CONG_LOP
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHITIETPHANCONG') and o.name = 'FK_CHITIETP_PHAN_CONG_HOCKYNIE')
alter table CHITIETPHANCONG
   drop constraint FK_CHITIETP_PHAN_CONG_HOCKYNIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHITIETPHANCONG') and o.name = 'FK_CHITIETP_PHAN_CONG_MONHOC')
alter table CHITIETPHANCONG
   drop constraint FK_CHITIETP_PHAN_CONG_MONHOC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHON_KHUNG') and o.name = 'FK_CHON_KHU_CHON_KHUN_GIANGVIE')
alter table CHON_KHUNG
   drop constraint FK_CHON_KHU_CHON_KHUN_GIANGVIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHON_KHUNG') and o.name = 'FK_CHON_KHU_CHON_KHUN_NAMHOC')
alter table CHON_KHUNG
   drop constraint FK_CHON_KHU_CHON_KHUN_NAMHOC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHON_KHUNG') and o.name = 'FK_CHON_KHU_CHON_KHUN_KHUNGGIO')
alter table CHON_KHUNG
   drop constraint FK_CHON_KHU_CHON_KHUN_KHUNGGIO
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CHUONGTRINHDAOTAO') and o.name = 'FK_CHUONGTR_THUOC_CHU_BOMON')
alter table CHUONGTRINHDAOTAO
   drop constraint FK_CHUONGTR_THUOC_CHU_BOMON
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CO_CHUC_DANH') and o.name = 'FK_CO_CHUC__CO_CHUC_D_CHUCDANH')
alter table CO_CHUC_DANH
   drop constraint FK_CO_CHUC__CO_CHUC_D_CHUCDANH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('CO_CHUC_DANH') and o.name = 'FK_CO_CHUC__CO_CHUC_D_GIANGVIE')
alter table CO_CHUC_DANH
   drop constraint FK_CO_CHUC__CO_CHUC_D_GIANGVIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('GIANGVIEN') and o.name = 'FK_GIANGVIE_THUOC_BO__BOMON')
alter table GIANGVIEN
   drop constraint FK_GIANGVIE_THUOC_BO__BOMON
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('GIU_CHUC_VU') and o.name = 'FK_GIU_CHUC_GIU_CHUC__GIANGVIE')
alter table GIU_CHUC_VU
   drop constraint FK_GIU_CHUC_GIU_CHUC__GIANGVIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('GIU_CHUC_VU') and o.name = 'FK_GIU_CHUC_GIU_CHUC__CHUCVU')
alter table GIU_CHUC_VU
   drop constraint FK_GIU_CHUC_GIU_CHUC__CHUCVU
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('KHUNGGIOCHUAN') and o.name = 'FK_KHUNGGIO_CO_KHUNG__CHUCDANH')
alter table KHUNGGIOCHUAN
   drop constraint FK_KHUNGGIO_CO_KHUNG__CHUCDANH
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('LOP') and o.name = 'FK_LOP_HOC_CHUONGTR')
alter table LOP
   drop constraint FK_LOP_HOC_CHUONGTR
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TAIKHOAN') and o.name = 'FK_TAIKHOAN_TAI_KHOAN_GIANGVIE')
alter table TAIKHOAN
   drop constraint FK_TAIKHOAN_TAI_KHOAN_GIANGVIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THUOC') and o.name = 'FK_THUOC_THUOC_CHUONGTR')
alter table THUOC
   drop constraint FK_THUOC_THUOC_CHUONGTR
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('THUOC') and o.name = 'FK_THUOC_THUOC2_MONHOC')
alter table THUOC
   drop constraint FK_THUOC_THUOC2_MONHOC
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('_ANG_KY_THUC_HIEN_QUY__OI') and o.name = 'FK__ANG_KY___ANG_KY_T_DANHMUCQ')
alter table _ANG_KY_THUC_HIEN_QUY__OI
   drop constraint FK__ANG_KY___ANG_KY_T_DANHMUCQ
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('_ANG_KY_THUC_HIEN_QUY__OI') and o.name = 'FK__ANG_KY___ANG_KY_T_GIANGVIE')
alter table _ANG_KY_THUC_HIEN_QUY__OI
   drop constraint FK__ANG_KY___ANG_KY_T_GIANGVIE
go

if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('_ANG_KY_THUC_HIEN_QUY__OI') and o.name = 'FK__ANG_KY___ANG_KY_T_NAMHOC')
alter table _ANG_KY_THUC_HIEN_QUY__OI
   drop constraint FK__ANG_KY___ANG_KY_T_NAMHOC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('BANGPHANCONG')
            and   name  = '_UOC_PHAN_CONG_FK'
            and   indid > 0
            and   indid < 255)
   drop index BANGPHANCONG._UOC_PHAN_CONG_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('BANGPHANCONG')
            and   type = 'U')
   drop table BANGPHANCONG
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('BAO_CAO_KET_THUC_MON')
            and   name  = 'BAO_CAO_KET_THUC_MON2_FK'
            and   indid > 0
            and   indid < 255)
   drop index BAO_CAO_KET_THUC_MON.BAO_CAO_KET_THUC_MON2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('BAO_CAO_KET_THUC_MON')
            and   name  = 'BAO_CAO_KET_THUC_MON_FK'
            and   indid > 0
            and   indid < 255)
   drop index BAO_CAO_KET_THUC_MON.BAO_CAO_KET_THUC_MON_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('BAO_CAO_KET_THUC_MON')
            and   type = 'U')
   drop table BAO_CAO_KET_THUC_MON
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('BOMON')
            and   name  = 'THUOC_KHOA_FK'
            and   indid > 0
            and   indid < 255)
   drop index BOMON.THUOC_KHOA_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('BOMON')
            and   type = 'U')
   drop table BOMON
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CHITIETPHANCONG')
            and   name  = 'PHAN_CONG_MON_HOC_FK'
            and   indid > 0
            and   indid < 255)
   drop index CHITIETPHANCONG.PHAN_CONG_MON_HOC_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CHITIETPHANCONG')
            and   name  = 'PHAN_CONG_HOC_KY_NIEN_KHOA_FK'
            and   indid > 0
            and   indid < 255)
   drop index CHITIETPHANCONG.PHAN_CONG_HOC_KY_NIEN_KHOA_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CHITIETPHANCONG')
            and   name  = 'PHAN_CONG_DAY_FK'
            and   indid > 0
            and   indid < 255)
   drop index CHITIETPHANCONG.PHAN_CONG_DAY_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CHITIETPHANCONG')
            and   name  = 'CO_FK'
            and   indid > 0
            and   indid < 255)
   drop index CHITIETPHANCONG.CO_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CHITIETPHANCONG')
            and   type = 'U')
   drop table CHITIETPHANCONG
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CHON_KHUNG')
            and   name  = 'CHON_KHUNG3_FK'
            and   indid > 0
            and   indid < 255)
   drop index CHON_KHUNG.CHON_KHUNG3_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CHON_KHUNG')
            and   name  = 'CHON_KHUNG2_FK'
            and   indid > 0
            and   indid < 255)
   drop index CHON_KHUNG.CHON_KHUNG2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CHON_KHUNG')
            and   name  = 'CHON_KHUNG_FK'
            and   indid > 0
            and   indid < 255)
   drop index CHON_KHUNG.CHON_KHUNG_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CHON_KHUNG')
            and   type = 'U')
   drop table CHON_KHUNG
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CHUCDANH')
            and   type = 'U')
   drop table CHUCDANH
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CHUCVU')
            and   type = 'U')
   drop table CHUCVU
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CHUONGTRINHDAOTAO')
            and   name  = 'THUOC_CHUONG_TRINH__AO_TAO_FK'
            and   indid > 0
            and   indid < 255)
   drop index CHUONGTRINHDAOTAO.THUOC_CHUONG_TRINH__AO_TAO_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CHUONGTRINHDAOTAO')
            and   type = 'U')
   drop table CHUONGTRINHDAOTAO
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CO_CHUC_DANH')
            and   name  = 'CO_CHUC_DANH2_FK'
            and   indid > 0
            and   indid < 255)
   drop index CO_CHUC_DANH.CO_CHUC_DANH2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('CO_CHUC_DANH')
            and   name  = 'CO_CHUC_DANH_FK'
            and   indid > 0
            and   indid < 255)
   drop index CO_CHUC_DANH.CO_CHUC_DANH_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CO_CHUC_DANH')
            and   type = 'U')
   drop table CO_CHUC_DANH
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DANHMUCQUYDOISPKHCN')
            and   type = 'U')
   drop table DANHMUCQUYDOISPKHCN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('GIANGVIEN')
            and   name  = 'THUOC_BO_MON_FK'
            and   indid > 0
            and   indid < 255)
   drop index GIANGVIEN.THUOC_BO_MON_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('GIANGVIEN')
            and   type = 'U')
   drop table GIANGVIEN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('GIU_CHUC_VU')
            and   name  = 'GIU_CHUC_VU2_FK'
            and   indid > 0
            and   indid < 255)
   drop index GIU_CHUC_VU.GIU_CHUC_VU2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('GIU_CHUC_VU')
            and   name  = 'GIU_CHUC_VU_FK'
            and   indid > 0
            and   indid < 255)
   drop index GIU_CHUC_VU.GIU_CHUC_VU_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('GIU_CHUC_VU')
            and   type = 'U')
   drop table GIU_CHUC_VU
go

if exists (select 1
            from  sysobjects
           where  id = object_id('HINHTHUCDANHGIA')
            and   type = 'U')
   drop table HINHTHUCDANHGIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('HOCKYNIENKHOA')
            and   type = 'U')
   drop table HOCKYNIENKHOA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('KHOA')
            and   type = 'U')
   drop table KHOA
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('KHUNGGIOCHUAN')
            and   name  = 'CO_KHUNG_GIO_CHUAN_FK'
            and   indid > 0
            and   indid < 255)
   drop index KHUNGGIOCHUAN.CO_KHUNG_GIO_CHUAN_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('KHUNGGIOCHUAN')
            and   type = 'U')
   drop table KHUNGGIOCHUAN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('LOP')
            and   name  = 'HOC_FK'
            and   indid > 0
            and   indid < 255)
   drop index LOP.HOC_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('LOP')
            and   type = 'U')
   drop table LOP
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MONHOC')
            and   type = 'U')
   drop table MONHOC
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NAMHOC')
            and   type = 'U')
   drop table NAMHOC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TAIKHOAN')
            and   name  = 'TAI_KHOAN_CUA_GIANG_VIEN_FK'
            and   indid > 0
            and   indid < 255)
   drop index TAIKHOAN.TAI_KHOAN_CUA_GIANG_VIEN_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TAIKHOAN')
            and   type = 'U')
   drop table TAIKHOAN
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('THUOC')
            and   name  = 'THUOC2_FK'
            and   indid > 0
            and   indid < 255)
   drop index THUOC.THUOC2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('THUOC')
            and   name  = 'THUOC_FK'
            and   indid > 0
            and   indid < 255)
   drop index THUOC.THUOC_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('THUOC')
            and   type = 'U')
   drop table THUOC
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('_ANG_KY_THUC_HIEN_QUY__OI')
            and   name  = '_ANG_KY_THUC_HIEN_QUY__OI3_FK'
            and   indid > 0
            and   indid < 255)
   drop index _ANG_KY_THUC_HIEN_QUY__OI._ANG_KY_THUC_HIEN_QUY__OI3_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('_ANG_KY_THUC_HIEN_QUY__OI')
            and   name  = '_ANG_KY_THUC_HIEN_QUY__OI2_FK'
            and   indid > 0
            and   indid < 255)
   drop index _ANG_KY_THUC_HIEN_QUY__OI._ANG_KY_THUC_HIEN_QUY__OI2_FK
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('_ANG_KY_THUC_HIEN_QUY__OI')
            and   name  = '_ANG_KY_THUC_HIEN_QUY__OI_FK'
            and   indid > 0
            and   indid < 255)
   drop index _ANG_KY_THUC_HIEN_QUY__OI._ANG_KY_THUC_HIEN_QUY__OI_FK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('_ANG_KY_THUC_HIEN_QUY__OI')
            and   type = 'U')
   drop table _ANG_KY_THUC_HIEN_QUY__OI
go

/*==============================================================*/
/* Table: BANGPHANCONG                                          */
/*==============================================================*/
create table BANGPHANCONG (
   MAPHANCONG           int                  not null,
   MAGV                 varchar(255)         not null,
   THOIGIANLAP          datetime             null,
   constraint PK_BANGPHANCONG primary key nonclustered (MAPHANCONG)
)
go

/*==============================================================*/
/* Index: _UOC_PHAN_CONG_FK                                     */
/*==============================================================*/
create index _UOC_PHAN_CONG_FK on BANGPHANCONG (
MAGV ASC
)
go

/*==============================================================*/
/* Table: BAO_CAO_KET_THUC_MON                                  */
/*==============================================================*/
create table BAO_CAO_KET_THUC_MON (
   MADANHGIAKETTHUC     int                  not null,
   MACHITIETPHANCONG    int                  not null,
   LANDANHGIA           int                  null,
   NGAYDANHGIA          datetime             null,
   NGAYBAOCAOKETTHUC    datetime             null,
   TRANGTHAI            text                 null,
   constraint PK_BAO_CAO_KET_THUC_MON primary key (MADANHGIAKETTHUC, MACHITIETPHANCONG)
)
go

/*==============================================================*/
/* Index: BAO_CAO_KET_THUC_MON_FK                               */
/*==============================================================*/
create index BAO_CAO_KET_THUC_MON_FK on BAO_CAO_KET_THUC_MON (
MADANHGIAKETTHUC ASC
)
go

/*==============================================================*/
/* Index: BAO_CAO_KET_THUC_MON2_FK                              */
/*==============================================================*/
create index BAO_CAO_KET_THUC_MON2_FK on BAO_CAO_KET_THUC_MON (
MACHITIETPHANCONG ASC
)
go

/*==============================================================*/
/* Table: BOMON                                                 */
/*==============================================================*/
create table BOMON (
   MABOMON              int                  not null,
   MAKHOA               int                  not null,
   TENBOMON             text                 null,
   constraint PK_BOMON primary key nonclustered (MABOMON)
)
go

/*==============================================================*/
/* Index: THUOC_KHOA_FK                                         */
/*==============================================================*/
create index THUOC_KHOA_FK on BOMON (
MAKHOA ASC
)
go

/*==============================================================*/
/* Table: CHITIETPHANCONG                                       */
/*==============================================================*/
create table CHITIETPHANCONG (
   MACHITIETPHANCONG    int                  not null,
   MAMONHOC             int                  not null,
   MAPHANCONG           int                  not null,
   MALOP                varchar(255)         not null,
   MAHKNK               int                  not null,
   THOIGIANBATDAUPHANCONG datetime             null,
   THOIGIANKETTHUCPHANCONG datetime             null,
   constraint PK_CHITIETPHANCONG primary key nonclustered (MACHITIETPHANCONG)
)
go

/*==============================================================*/
/* Index: CO_FK                                                 */
/*==============================================================*/
create index CO_FK on CHITIETPHANCONG (
MAPHANCONG ASC
)
go

/*==============================================================*/
/* Index: PHAN_CONG_DAY_FK                                      */
/*==============================================================*/
create index PHAN_CONG_DAY_FK on CHITIETPHANCONG (
MALOP ASC
)
go

/*==============================================================*/
/* Index: PHAN_CONG_HOC_KY_NIEN_KHOA_FK                         */
/*==============================================================*/
create index PHAN_CONG_HOC_KY_NIEN_KHOA_FK on CHITIETPHANCONG (
MAHKNK ASC
)
go

/*==============================================================*/
/* Index: PHAN_CONG_MON_HOC_FK                                  */
/*==============================================================*/
create index PHAN_CONG_MON_HOC_FK on CHITIETPHANCONG (
MAMONHOC ASC
)
go

/*==============================================================*/
/* Table: CHON_KHUNG                                            */
/*==============================================================*/
create table CHON_KHUNG (
   MAGV                 varchar(255)         not null,
   MANAMHOC             int                  not null,
   MAKHUNG              int                  not null,
   constraint PK_CHON_KHUNG primary key (MAGV, MANAMHOC, MAKHUNG)
)
go

/*==============================================================*/
/* Index: CHON_KHUNG_FK                                         */
/*==============================================================*/
create index CHON_KHUNG_FK on CHON_KHUNG (
MAGV ASC
)
go

/*==============================================================*/
/* Index: CHON_KHUNG2_FK                                        */
/*==============================================================*/
create index CHON_KHUNG2_FK on CHON_KHUNG (
MANAMHOC ASC
)
go

/*==============================================================*/
/* Index: CHON_KHUNG3_FK                                        */
/*==============================================================*/
create index CHON_KHUNG3_FK on CHON_KHUNG (
MAKHUNG ASC
)
go

/*==============================================================*/
/* Table: CHUCDANH                                              */
/*==============================================================*/
create table CHUCDANH (
   MACHUCDANH           int                  not null,
   TENCHUCDANH          text                 null,
   constraint PK_CHUCDANH primary key nonclustered (MACHUCDANH)
)
go

/*==============================================================*/
/* Table: CHUCVU                                                */
/*==============================================================*/
create table CHUCVU (
   MACHUCVU             int                  not null,
   TENCHUCVU            text                 null,
   constraint PK_CHUCVU primary key nonclustered (MACHUCVU)
)
go

/*==============================================================*/
/* Table: CHUONGTRINHDAOTAO                                     */
/*==============================================================*/
create table CHUONGTRINHDAOTAO (
   MACHUONGTRINH        int                  not null,
   MABOMON              int                  not null,
   TENCHUONGTRINH       text                 null,
   constraint PK_CHUONGTRINHDAOTAO primary key nonclustered (MACHUONGTRINH)
)
go

/*==============================================================*/
/* Index: THUOC_CHUONG_TRINH__AO_TAO_FK                         */
/*==============================================================*/
create index THUOC_CHUONG_TRINH__AO_TAO_FK on CHUONGTRINHDAOTAO (
MABOMON ASC
)
go

/*==============================================================*/
/* Table: CO_CHUC_DANH                                          */
/*==============================================================*/
create table CO_CHUC_DANH (
   MACHUCDANH           int                  not null,
   MAGV                 varchar(255)         not null,
   THOIGIANNHAN         datetime             null,
   TRANGTHAI            text                 null,
   constraint PK_CO_CHUC_DANH primary key (MACHUCDANH, MAGV)
)
go

/*==============================================================*/
/* Index: CO_CHUC_DANH_FK                                       */
/*==============================================================*/
create index CO_CHUC_DANH_FK on CO_CHUC_DANH (
MACHUCDANH ASC
)
go

/*==============================================================*/
/* Index: CO_CHUC_DANH2_FK                                      */
/*==============================================================*/
create index CO_CHUC_DANH2_FK on CO_CHUC_DANH (
MAGV ASC
)
go

/*==============================================================*/
/* Table: DANHMUCQUYDOISPKHCN                                   */
/*==============================================================*/
create table DANHMUCQUYDOISPKHCN (
   MADANHMUC            int                  not null,
   GIOQUYDOI            int                  null,
   NOIDUNGDANHMUC       text                 null,
   constraint PK_DANHMUCQUYDOISPKHCN primary key nonclustered (MADANHMUC)
)
go

/*==============================================================*/
/* Table: GIANGVIEN                                             */
/*==============================================================*/
create table GIANGVIEN (
   MAGV                 varchar(255)         not null,
   MABOMON              int                  not null,
   TENGV                varchar(100)         null,
   EMAIL                text                 null,
   DIENTHOAI            varchar(50)          null,
   DIACHI               text                 null,
   constraint PK_GIANGVIEN primary key nonclustered (MAGV)
)
go

/*==============================================================*/
/* Index: THUOC_BO_MON_FK                                       */
/*==============================================================*/
create index THUOC_BO_MON_FK on GIANGVIEN (
MABOMON ASC
)
go

/*==============================================================*/
/* Table: GIU_CHUC_VU                                           */
/*==============================================================*/
create table GIU_CHUC_VU (
   MAGV                 varchar(255)         not null,
   MACHUCVU             int                  not null,
   SOQUYETDINH          varchar(255)         null,
   TUNGAY               datetime             null,
   constraint PK_GIU_CHUC_VU primary key (MAGV, MACHUCVU)
)
go

/*==============================================================*/
/* Index: GIU_CHUC_VU_FK                                        */
/*==============================================================*/
create index GIU_CHUC_VU_FK on GIU_CHUC_VU (
MAGV ASC
)
go

/*==============================================================*/
/* Index: GIU_CHUC_VU2_FK                                       */
/*==============================================================*/
create index GIU_CHUC_VU2_FK on GIU_CHUC_VU (
MACHUCVU ASC
)
go

/*==============================================================*/
/* Table: HINHTHUCDANHGIA                                       */
/*==============================================================*/
create table HINHTHUCDANHGIA (
   MADANHGIAKETTHUC     int                  not null,
   TENDANHGIA           text                 null,
   constraint PK_HINHTHUCDANHGIA primary key nonclustered (MADANHGIAKETTHUC)
)
go

/*==============================================================*/
/* Table: HOCKYNIENKHOA                                         */
/*==============================================================*/
create table HOCKYNIENKHOA (
   MAHKNK               int                  not null,
   TENHKNK              text                 null,
   NGAYBATDAUNIENKHOA   datetime             null,
   NGAYKETTHUCNIENKHOA  datetime             null,
   constraint PK_HOCKYNIENKHOA primary key nonclustered (MAHKNK)
)
go

/*==============================================================*/
/* Table: KHOA                                                  */
/*==============================================================*/
create table KHOA (
   MAKHOA               int                  not null,
   TENKHOA              text                 null,
   constraint PK_KHOA primary key nonclustered (MAKHOA)
)
go

/*==============================================================*/
/* Table: KHUNGGIOCHUAN                                         */
/*==============================================================*/
create table KHUNGGIOCHUAN (
   MAKHUNG              int                  not null,
   MACHUCDANH           int                  not null,
   TENKHUNGCHUAN        text                 null,
   GIOGIANGDAY          int                  null,
   GIONGHIENCUUKHOAHOC  int                  null,
   GIOPHUCVUCONGDONG    int                  null,
   constraint PK_KHUNGGIOCHUAN primary key nonclustered (MAKHUNG)
)
go

/*==============================================================*/
/* Index: CO_KHUNG_GIO_CHUAN_FK                                 */
/*==============================================================*/
create index CO_KHUNG_GIO_CHUAN_FK on KHUNGGIOCHUAN (
MACHUCDANH ASC
)
go

/*==============================================================*/
/* Table: LOP                                                   */
/*==============================================================*/
create table LOP (
   MALOP                varchar(255)         not null,
   MACHUONGTRINH        int                  not null,
   TENLOP               text                 null,
   NAMTUYENSINH         int                  null,
   SISO                 int                  null,
   constraint PK_LOP primary key nonclustered (MALOP)
)
go

/*==============================================================*/
/* Index: HOC_FK                                                */
/*==============================================================*/
create index HOC_FK on LOP (
MACHUONGTRINH ASC
)
go

/*==============================================================*/
/* Table: MONHOC                                                */
/*==============================================================*/
create table MONHOC (
   MAMONHOC             int                  not null,
   TENMONHOC            text                 null,
   SOTINCHILYTHUYET     int                  null,
   SOTINCHITHUCHANH     int                  null,
   constraint PK_MONHOC primary key nonclustered (MAMONHOC)
)
go

/*==============================================================*/
/* Table: NAMHOC                                                */
/*==============================================================*/
create table NAMHOC (
   MANAMHOC             int                  not null,
   TENNAMHOC            text                 null,
   constraint PK_NAMHOC primary key nonclustered (MANAMHOC)
)
go

/*==============================================================*/
/* Table: TAIKHOAN                                              */
/*==============================================================*/
create table TAIKHOAN (
   TENDANGNHAP          varchar(255)         not null,
   MAGV                 varchar(255)         not null,
   MATKHAU              text                 null,
   PHANQUYEN            text                 null,
   constraint PK_TAIKHOAN primary key nonclustered (TENDANGNHAP)
)
go

/*==============================================================*/
/* Index: TAI_KHOAN_CUA_GIANG_VIEN_FK                           */
/*==============================================================*/
create index TAI_KHOAN_CUA_GIANG_VIEN_FK on TAIKHOAN (
MAGV ASC
)
go

/*==============================================================*/
/* Table: THUOC                                                 */
/*==============================================================*/
create table THUOC (
   MACHUONGTRINH        int                  not null,
   MAMONHOC             int                  not null,
   SOTHUTUHOCKI         int                  null,
   constraint PK_THUOC primary key (MACHUONGTRINH, MAMONHOC)
)
go

/*==============================================================*/
/* Index: THUOC_FK                                              */
/*==============================================================*/
create index THUOC_FK on THUOC (
MACHUONGTRINH ASC
)
go

/*==============================================================*/
/* Index: THUOC2_FK                                             */
/*==============================================================*/
create index THUOC2_FK on THUOC (
MAMONHOC ASC
)
go

/*==============================================================*/
/* Table: _ANG_KY_THUC_HIEN_QUY__OI                             */
/*==============================================================*/
create table _ANG_KY_THUC_HIEN_QUY__OI (
   MADANHMUC            int                  not null,
   MAGV                 varchar(255)         not null,
   MANAMHOC             int                  not null,
   SOGIOQUYDOI          int                  null,
   TRANGTHAI            text                 null,
   constraint PK__ANG_KY_THUC_HIEN_QUY__OI primary key (MADANHMUC, MAGV, MANAMHOC)
)
go

/*==============================================================*/
/* Index: _ANG_KY_THUC_HIEN_QUY__OI_FK                          */
/*==============================================================*/
create index _ANG_KY_THUC_HIEN_QUY__OI_FK on _ANG_KY_THUC_HIEN_QUY__OI (
MADANHMUC ASC
)
go

/*==============================================================*/
/* Index: _ANG_KY_THUC_HIEN_QUY__OI2_FK                         */
/*==============================================================*/
create index _ANG_KY_THUC_HIEN_QUY__OI2_FK on _ANG_KY_THUC_HIEN_QUY__OI (
MAGV ASC
)
go

/*==============================================================*/
/* Index: _ANG_KY_THUC_HIEN_QUY__OI3_FK                         */
/*==============================================================*/
create index _ANG_KY_THUC_HIEN_QUY__OI3_FK on _ANG_KY_THUC_HIEN_QUY__OI (
MANAMHOC ASC
)
go

alter table BANGPHANCONG
   add constraint FK_BANGPHAN__UOC_PHAN_GIANGVIE foreign key (MAGV)
      references GIANGVIEN (MAGV)
go

alter table BAO_CAO_KET_THUC_MON
   add constraint FK_BAO_CAO__BAO_CAO_K_HINHTHUC foreign key (MADANHGIAKETTHUC)
      references HINHTHUCDANHGIA (MADANHGIAKETTHUC)
go

alter table BAO_CAO_KET_THUC_MON
   add constraint FK_BAO_CAO__BAO_CAO_K_CHITIETP foreign key (MACHITIETPHANCONG)
      references CHITIETPHANCONG (MACHITIETPHANCONG)
go

alter table BOMON
   add constraint FK_BOMON_THUOC_KHO_KHOA foreign key (MAKHOA)
      references KHOA (MAKHOA)
go

alter table CHITIETPHANCONG
   add constraint FK_CHITIETP_CO_BANGPHAN foreign key (MAPHANCONG)
      references BANGPHANCONG (MAPHANCONG)
go

alter table CHITIETPHANCONG
   add constraint FK_CHITIETP_PHAN_CONG_LOP foreign key (MALOP)
      references LOP (MALOP)
go

alter table CHITIETPHANCONG
   add constraint FK_CHITIETP_PHAN_CONG_HOCKYNIE foreign key (MAHKNK)
      references HOCKYNIENKHOA (MAHKNK)
go

alter table CHITIETPHANCONG
   add constraint FK_CHITIETP_PHAN_CONG_MONHOC foreign key (MAMONHOC)
      references MONHOC (MAMONHOC)
go

alter table CHON_KHUNG
   add constraint FK_CHON_KHU_CHON_KHUN_GIANGVIE foreign key (MAGV)
      references GIANGVIEN (MAGV)
go

alter table CHON_KHUNG
   add constraint FK_CHON_KHU_CHON_KHUN_NAMHOC foreign key (MANAMHOC)
      references NAMHOC (MANAMHOC)
go

alter table CHON_KHUNG
   add constraint FK_CHON_KHU_CHON_KHUN_KHUNGGIO foreign key (MAKHUNG)
      references KHUNGGIOCHUAN (MAKHUNG)
go

alter table CHUONGTRINHDAOTAO
   add constraint FK_CHUONGTR_THUOC_CHU_BOMON foreign key (MABOMON)
      references BOMON (MABOMON)
go

alter table CO_CHUC_DANH
   add constraint FK_CO_CHUC__CO_CHUC_D_CHUCDANH foreign key (MACHUCDANH)
      references CHUCDANH (MACHUCDANH)
go

alter table CO_CHUC_DANH
   add constraint FK_CO_CHUC__CO_CHUC_D_GIANGVIE foreign key (MAGV)
      references GIANGVIEN (MAGV)
go

alter table GIANGVIEN
   add constraint FK_GIANGVIE_THUOC_BO__BOMON foreign key (MABOMON)
      references BOMON (MABOMON)
go

alter table GIU_CHUC_VU
   add constraint FK_GIU_CHUC_GIU_CHUC__GIANGVIE foreign key (MAGV)
      references GIANGVIEN (MAGV)
go

alter table GIU_CHUC_VU
   add constraint FK_GIU_CHUC_GIU_CHUC__CHUCVU foreign key (MACHUCVU)
      references CHUCVU (MACHUCVU)
go

alter table KHUNGGIOCHUAN
   add constraint FK_KHUNGGIO_CO_KHUNG__CHUCDANH foreign key (MACHUCDANH)
      references CHUCDANH (MACHUCDANH)
go

alter table LOP
   add constraint FK_LOP_HOC_CHUONGTR foreign key (MACHUONGTRINH)
      references CHUONGTRINHDAOTAO (MACHUONGTRINH)
go

alter table TAIKHOAN
   add constraint FK_TAIKHOAN_TAI_KHOAN_GIANGVIE foreign key (MAGV)
      references GIANGVIEN (MAGV)
go

alter table THUOC
   add constraint FK_THUOC_THUOC_CHUONGTR foreign key (MACHUONGTRINH)
      references CHUONGTRINHDAOTAO (MACHUONGTRINH)
go

alter table THUOC
   add constraint FK_THUOC_THUOC2_MONHOC foreign key (MAMONHOC)
      references MONHOC (MAMONHOC)
go

alter table _ANG_KY_THUC_HIEN_QUY__OI
   add constraint FK__ANG_KY___ANG_KY_T_DANHMUCQ foreign key (MADANHMUC)
      references DANHMUCQUYDOISPKHCN (MADANHMUC)
go

alter table _ANG_KY_THUC_HIEN_QUY__OI
   add constraint FK__ANG_KY___ANG_KY_T_GIANGVIE foreign key (MAGV)
      references GIANGVIEN (MAGV)
go

alter table _ANG_KY_THUC_HIEN_QUY__OI
   add constraint FK__ANG_KY___ANG_KY_T_NAMHOC foreign key (MANAMHOC)
      references NAMHOC (MANAMHOC)
go

