import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import DashboardLayout from '../layouts/dashboard';

const AccountGV = lazy(() => import('../sections/Account/AccountGV'));
const DangKyGioChuan = lazy(() => import('../sections/DangKyGioChuan/IndexDangKyGioChuan'));
const FileExcel = lazy(() => import('../sections/FileExcel/FileExcel'));

const IndexPage = lazy(() => import('../pages/app'));
const BlogPage = lazy(() => import('../pages/blog'));
const UserPage = lazy(() => import('../pages/user'));
const LoginPage = lazy(() => import('../pages/login'));
const Page404 = lazy(() => import('../pages/page-not-found'));

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: 'grey.300' }}
              />
            }
          >
            <AccountGV />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: '/dang-ky-muc-chuan-gio-giang',
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: 'grey.300' }}
              />
            }
          >
            <DangKyGioChuan />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: '/dang-ky-cong-viec-thuc-hien',
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: 'grey.300' }}
              />
            }
          >
            {/* Component tương ứng */}
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: '/phan-cong-cua-toi',
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: 'grey.300' }}
              />
            }
          >
            {/* Component tương ứng */}
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: '/excel',
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: 'grey.300' }}
              />
            }
          >
            <FileExcel />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
