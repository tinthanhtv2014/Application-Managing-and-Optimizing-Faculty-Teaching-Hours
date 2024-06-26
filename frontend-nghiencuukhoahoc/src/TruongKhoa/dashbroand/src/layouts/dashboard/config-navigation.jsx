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
    title: 'Danh sách bộ môn',
    path: '/bo-mon',
    icon: icon('ic_user'),
  },

];

export default navConfig;
