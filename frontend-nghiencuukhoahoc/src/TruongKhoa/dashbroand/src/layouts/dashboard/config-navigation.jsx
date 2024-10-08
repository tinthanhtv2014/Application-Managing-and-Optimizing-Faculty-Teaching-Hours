import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Thống kê',
    path: '/thong-ke',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Danh sách giảng viên',
    path: '/giang-vien',
    icon: icon('ic_user'),
  },
  {
    title: 'Đăng ký khung giờ chuẩn',
    path: '/dang-ky-khung-gio-chuan',
    icon: icon('ic_user'),
  },
  {
    title: 'Đăng ký danh mục sản phẩm KHCN',
    path: '/Dang-ky-danh-muc',
    icon: icon('ic_user'),
  },
  {
    title: 'test',
    path: '/test',
    icon: icon('ic_user'),
  },

];

export default navConfig;
