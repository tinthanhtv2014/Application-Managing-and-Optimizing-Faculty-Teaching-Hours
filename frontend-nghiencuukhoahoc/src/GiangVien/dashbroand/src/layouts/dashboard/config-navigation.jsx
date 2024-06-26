import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Thông tin cá nhân',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Phân công của tôi',
    path: '/phan-cong-cua-toi',
    icon: icon('ic_user'),
  },
  {
    title: 'Đăng ký công việc thực hiện',
    path: '/dang-ky-cong-viec-thuc-hien',
    icon: icon('ic_cart'),
  },
  {
    title: 'Đăng ký mức chuẩn giờ giảng',
    path: '/dang-ky-muc-chuan-gio-giang',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
