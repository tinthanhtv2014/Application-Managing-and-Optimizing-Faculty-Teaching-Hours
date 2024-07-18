import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Trang Chủ',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Khoa Và Bộ Môn',
    path: '/quan-ly-khoa',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Giảng Viên',
    path: '/giangvien',
    icon: icon('ic_user'),
  },
  {
    title: 'Chức Vụ Giảng Viên',
    path: '/quan-ly-chuc-vu',
    icon: icon('ic_cart'),
  },
  {
    title: 'Danh Mục Giờ Chuẩn',
    path: '/quan-ly-danh-muc-gio-chuan',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'Chức Danh Giảng Viên',
  //   path: '/quan-ly-chuc-danh',
  //   icon: icon('ic_blog'),
  // }, 
  {
    title: 'Quản Lý Lớp Học',
    path: '/nhap-lop-tu-file',
    icon: icon('ic_blog'),
  }, {
    title: 'Chương Trình Học',
    path: '/nhap-chuong-trinh-tu-file',
    icon: icon('ic_blog'),
  }, {
    title: 'Quản Lý Môn Học',
    path: '/quan-ly-mon-hoc',
    icon: icon('ic_blog'),
  },
  {
    title: 'Đăng Ký Khung Giờ Chuẩn',
    path: '/dang-ky-khung-gio-chuan',
    icon: icon('ic_blog'),
  },
  {
    title: 'Account',
    path: '/account-giangvien',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
