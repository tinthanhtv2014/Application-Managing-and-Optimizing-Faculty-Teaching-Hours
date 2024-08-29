import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Trang Chủ",
    path: "/",
    icon: icon("ic_analytics"),
  },
  {
    title: "Khoa Và Bộ Môn",
    path: "/quan-ly-khoa",
    icon: icon("ic_analytics"),
  },
  {
    title: "Giảng Viên",
    path: "/giangvien",
    icon: icon("ic_user"),
  },

  {
    title: "Danh Mục Giờ Chuẩn",
    path: "/quan-ly",
    icon: icon("ic_blog"),
  },
  // {
  //   title: 'Chức Danh Giảng Viên',
  //   path: '/quan-ly-chuc-danh',
  //   icon: icon('ic_blog'),
  // },
  {
    title: "Quản Lý Lớp Học",
    path: "/quan-ly-lop-hoc",
    icon: icon("ic_blog"),
  },
  {
    title: "Chương Trình Học",
    path: "/chuong-trinh-dao-tao",
    icon: icon("ic_blog"),
  },
  {
    title: "Quản Lý Môn Học",
    path: "/quan-ly-mon-hoc",
    icon: icon("ic_blog"),
  },
  {
    title: "Đăng Ký Khung Giờ Chuẩn",
    path: "/dang-ky-khung-gio-chuan",
    icon: icon("ic_blog"),
  },
  {
    title: "Tài Khoản",
    path: "/tai-khoan-giangvien",
    icon: icon("ic_blog"),
    children: [
      {
        title: "Xem Profile",
        path: "/tai-khoan-giangvien",
      },
      {
        title: "Đổi Mật Khẩu",
        path: "/tai-khoan-giangvien/doi-mat-khau",
      },
    ],
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
