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
    title: "Thống kê",
    path: "/",
    icon: icon("ic_analytics"),
  },
  {
    title: "Phân Công Của Tôi",
    path: "/phan-cong-cua-toi",
    icon: icon("ic_user"),
  },
  {
    title: "Danh sách giảng viên",
    path: "/giang-vien",
    icon: icon("ic_user"),
  },
  {
    title: "Chương Trình Đào Tạo",
    path: "/quan-ly-phan-cong-giang-day",
    icon: icon("ic_cart"),
  },
  {
    title: "Phân Công Giảng Viên",
    path: "/phan-cong-giang-vien",
    icon: icon("ic_blog"),
  },

  {
    title: "Đăng Ký Khung Giờ Chuẩn",
    path: "/dang-ky-khung-gio-chuan",
    icon: icon("ic_blog"),
  },
  {
    title: "Theo dõi đăng ký",
    path: "/theo-doi-dang-ky",
    icon: icon("ic_blog"),
  },
];

export default navConfig;
