import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';
import { useResponsive } from '../../hooks/use-responsive';

import avatarImage from '../../../public/assets/images/avatars/lufy2.jpg';

import Logo from '../../components/logo';
import Scrollbar from '../../components/scrollbar';
import CookiesAxios from '../../sections/CookiesAxios.js';
import { NAV } from './config-layout';
import navConfig from './config-navigation';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

export default function NavNoTop({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const [selectedPath, setSelectedPath] = useState(pathname);
  const upLg = useResponsive('up', 'lg');
  const [dataProfileGiangvien, setDataProfileGiangvien] = useState(null);
  const auth = Cookies.get('accessToken');

  useEffect(() => {
    if (auth) {
      const decoded = jwtDecode(auth);
      const fetchData = async () => {
        try {
          const response = await CookiesAxios.get(
            `${process.env.REACT_APP_URL_SERVER}/api/v1/admin/giangvien/only/xemprofile/${decoded.taikhoan}`,
            { withCredentials: true }
          );

          if (response.data.EC === 1) {
            setDataProfileGiangvien(response.data.DT);
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu bộ môn:", error);
        }
      };
      fetchData();
    }
  }, [auth]);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={avatarImage} alt="photoURL" />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          {dataProfileGiangvien ? dataProfileGiangvien.TENGV : 'Đang tải...'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {dataProfileGiangvien ? dataProfileGiangvien.TENCHUCVU : ''}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem
          key={item.title}
          item={item}
          isSelected={item.path === selectedPath}
          onClick={() => setSelectedPath(item.path)}
        />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

NavNoTop.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item, isSelected, onClick }) {
  return (
    <ListItemButton
      component={RouterLink}
      href={"/admin" + item.path}
      onClick={onClick}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(isSelected && {
          color: 'blue',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.23),
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>
      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
