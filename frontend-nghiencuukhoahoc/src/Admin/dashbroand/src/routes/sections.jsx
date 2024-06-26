

import { lazy, Suspense } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import ProductsPageFake from "../pages/products"

const FileExcel = lazy(() => import('../sections/FileExcel/FileExcel'));
const ChangePassword = lazy(() => import('../sections/changePassword/changePassword'));
const ChatAdmin = lazy(() => import('../sections/ChatAdmin/ChatAdmin'));
const OnlyChiTietHoaDon = lazy(() => import('../sections/ListOrders/ChiTietHoaDon/OnlyChiTietHoaDon'));
const ListOrdersChiTietHoaDon = lazy(() => import('../sections/ListOrders/ChiTietHoaDon/ListOrdersChiTietHoaDon'));
const ListOrdersDaHuy = lazy(() => import('../sections/ListOrders/ListOrdersDaHuy/ListOrdersDaHuy'));
const ListOrdersDaGiao = lazy(() => import('../sections/ListOrders/ListOrdersDaGiao/ListOrdersDaGiao'));
const ListOrdersPage = lazy(() => import('../pages/ListOrders'));
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
          <Suspense fallback={<div>Loading...</div>}>
            <IndexPage />
          </Suspense>
        </DashboardLayout>
      )
    },
    {
      path: '/quan-ly-giang-vien',
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <UserPage />
          </Suspense>
        </DashboardLayout>
      )
    },
    {
      path: '/quan-ly-chuc-vu', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>

            <ProductsPageFake />

          </Suspense>
        </DashboardLayout>
      )
    }
    , {
      path: '/quan-ly-danh-muc-gio-chuan', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>

            <ListOrdersPage />

          </Suspense>
        </DashboardLayout>
      )
    }
    ,
    {
      path: '/quan-ly-chuc-danh', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>

            <ListOrdersDaHuy />

          </Suspense>
        </DashboardLayout>
      )
    }
    ,
    {
      path: ' /nhap-lop-tu-file', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <ListOrdersDaGiao />


          </Suspense>
        </DashboardLayout>
      )
    }
    , {
      path: '/nhap-chuong-trinh-tu-file', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <ListOrdersChiTietHoaDon />


          </Suspense>
        </DashboardLayout>
      )
    }
    , {
      path: ' /quan-ly-mon-hoc', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>


            <OnlyChiTietHoaDon />
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






