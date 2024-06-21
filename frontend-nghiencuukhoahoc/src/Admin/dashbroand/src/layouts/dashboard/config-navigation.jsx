import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Kho Sách',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'List Orders',
    path: '/orders',
    icon: icon('ic_blog'),
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: icon('ic_blog'),
  }, {
    title: 'ChangePassword',
    path: '/changePass',
    icon: icon('ic_blog'),
  },
  {
    title: 'Excel',
    path: '/excel',
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
