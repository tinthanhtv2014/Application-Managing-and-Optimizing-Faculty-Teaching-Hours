

import { lazy, Suspense } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import DashboardLayoutNoTop from '../layouts/dashboard/indexNoNavbarTop';




const IndexDangKyDanhmuc = lazy(() => import('../sections/RegisterDanhMucGioChuan/IndexDangKyDanhMuc'));
const DangKyDanhMucGioChuan = lazy(() => import('../sections/RegisterDanhMucGioChuan/RegisterDanhMucGioChuan'));
const DanhMucGioChuan = lazy(() => import('../sections/DanhMucGioChuan/DanhMucGioChuan'));
const AdminCreate = lazy(() => import('../sections/Admincreate/AdminCreate'));
const DangKyGioChuan = lazy(() => import('../sections/DangKyGioChuan/IndexDangKyGioChuan'));
const AccountGV = lazy(() => import('../sections/Account/AccountGV'));
const CreateChucVuGV = lazy(() => import('../sections/KhoaTVU/CreateChucVuGV/CreateChucVuGV'));
const CreateGV = lazy(() => import('../sections/KhoaTVU/CreateGV/CreateGV'));
const CreateBM = lazy(() => import('../sections/KhoaTVU/CreateBM/CreateBM'));
const CreateCTDT = lazy(() => import('../sections/KhoaTVU/CreateCTDT/CreateCTDT'));
const CreateKhoa = lazy(() => import('../sections/KhoaTVU/CreateKhoa/CreateKhoa'));

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
            {/* <IndexPage /> */}
            <AdminCreate />
          </Suspense>
        </DashboardLayout>
      )
    }, {
      path: 'quan-ly-khoa',
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            {/* <IndexPage /> */}
            <CreateKhoa />
          </Suspense>
        </DashboardLayout>
      )
    },
    // {
    //   path: '/giangvien',
    //   element: (
    //     <DashboardLayout>
    //       <Suspense fallback={<div>Loading...</div>}>
    //         <CreateGV />

    //       </Suspense>
    //     </DashboardLayout>
    //   )
    // },
    {
      path: '/quan-ly-chuc-vu', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>

            <CreateChucVuGV />
          </Suspense>
        </DashboardLayout>
      )
    }
    , {
      path: '/quan-ly-danh-muc-gio-chuan', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>

            <DanhMucGioChuan />

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

            {/* <ListOrdersDaHuy /> */}

          </Suspense>
        </DashboardLayout>
      )
    }
    ,
    {
      path: '/nhap-lop-tu-file', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>

          </Suspense>
        </DashboardLayout>
      )
    }
    , {
      path: '/nhap-chuong-trinh-tu-file', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>



          </Suspense>
        </DashboardLayout>
      )
    }
    , {
      path: '/quan-ly-mon-hoc', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>



          </Suspense>
        </DashboardLayout>
      )
    }
    , {
      path: '/dang-ky-khung-gio-chuan', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <DangKyGioChuan />
          </Suspense>
        </DashboardLayout>
      )
    }, {
      path: '/create-khoa', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <CreateKhoa />
          </Suspense>
        </DashboardLayout>
      )
    },
    {
      path: '/create-chuong-trinh-dao-tao', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <CreateCTDT />
          </Suspense>
        </DashboardLayout>
      )
    },
    {
      path: '/create-bm', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <CreateBM />
          </Suspense>
        </DashboardLayout>
      )
    },
    {
      path: '/giangvien', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayoutNoTop>
          <Suspense fallback={<div>Loading...</div>}>
            <CreateGV />
          </Suspense>
        </DashboardLayoutNoTop>
      )
    },
    {
      path: '/create-chucvu-gv', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <CreateChucVuGV />
          </Suspense>
        </DashboardLayout>
      )
    }, {
      path: '/create-chuong-trinh-dao-tao', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <CreateKhoa />
          </Suspense>
        </DashboardLayout>
      )
    }, {
      path: '/account-giangvien', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <AccountGV />
          </Suspense>
        </DashboardLayout>
      )
    }, {
      path: '/dang-ky-nghien-cuu-khoa-hoc', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>

          </Suspense>
        </DashboardLayout>
      )
    }, {
      path: '/dang-ky-danh-muc', // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <IndexDangKyDanhmuc />
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
    // {
    //   path: '*',
    //   element: <Navigate to="/dashboard/404" replace />
    // }

  ]);

  return routes;
}






