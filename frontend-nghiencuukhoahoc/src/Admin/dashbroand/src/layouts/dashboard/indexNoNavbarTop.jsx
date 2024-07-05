import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import NavNoTop from './navNoNavbarTop';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayoutNoNavBar({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      {/* <Header onOpenNav={() => setOpenNav(true)} /> */}

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <NavNoTop openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayoutNoNavBar.propTypes = {
  children: PropTypes.node,
};
