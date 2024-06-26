import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Thống kê',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Danh sách giảng viên',
    path: '/giang-vien',
    icon: icon('ic_user'),
  },
  {
    title: 'Phân công giảng dạy',
    path: '/quan-ly-phan-cong-giang-day',
    icon: icon('ic_cart'),
  },
  {
    title: 'Gợi ý phân công giảng viên',
    path: '/goi-y-phan-cong-giang-vien',
    icon: icon('ic_blog'),
  },
  {
    title: 'Theo dõi đăng ký',
    path: '/theo-doi-dang-ky',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
