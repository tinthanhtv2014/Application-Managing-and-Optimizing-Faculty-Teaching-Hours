

import { lazy, Suspense } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';


const AccountGV = lazy(() => import('../sections/Account/AccountGV'));
const DangKyGioChuan = lazy(() => import('../sections/DangKyGioChuan/IndexDangKyGioChuan'));
const FileExcel = lazy(() => import('../sections/FileExcel/FileExcel'));

const ListOrdersPage = lazy(() => import('../pages/ListOrders'));
const IndexPage = lazy(() => import('../pages/app'));
const BlogPage = lazy(() => import('../pages/blog'));
const UserPage = lazy(() => import('../pages/user'));
const LoginPage = lazy(() => import('../pages/login'));
const Page404 = lazy(() => import('../pages/page-not-found'));

export default function Router() {
  const routes = useRoutes([
    {
      path: '/', // thông tin cá nhân giảng viên
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <AccountGV />
          </Suspense>
        </DashboardLayout>
      )
    },
    {
      path: '/dang-ky-muc-chuan-gio-giang',  //đăng ký giờ chuẩn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <DangKyGioChuan />
          </Suspense>
        </DashboardLayout>
      )
    },
    {
      path: '/dang-ky-cong-viec-thuc-hien', // Đăng ký công việc thực hiện.
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>



          </Suspense>
        </DashboardLayout>
      )
    }
    , {
      path: '/phan-cong-cua-toi', //  Xem các môn học và số tiết được phân công giảng dạy.
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>



          </Suspense>
        </DashboardLayout>
      )
    }

    , {
      path: '/excel', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <FileExcel />
          </Suspense>
        </DashboardLayout>
      )
    },
    // {
    //   path: '/blog',
    //   element: (
    //     <DashboardLayout>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <BlogPage />
    //       </Suspense>
    //     </DashboardLayout>
    //   )
    // },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/404',
      element: <Page404 />
    },
    {
      path: '*',
      element: <Navigate to="/dashboard/404" replace />
    }

  ]);

  return routes;
}






