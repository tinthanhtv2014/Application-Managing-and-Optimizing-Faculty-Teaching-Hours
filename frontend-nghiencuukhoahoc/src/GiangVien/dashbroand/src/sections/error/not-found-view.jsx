import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../routes/components';
import illustration404 from '../../../public/assets/illustrations/illustration_404.svg';
import Logo from '../../components/logo';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      {/* <Logo /> */}

    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Xin lỗi, trang này không tồn tại  O.o !
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Xin lỗi bạn vì sự bất tiện này, bạn vui lòng quay lại trang chủ nha
          </Typography>

          <Box
            component="img"
            // src="src/public/assets/illustrations/illustration_404.svg"
            src={illustration404}
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button href="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
}
