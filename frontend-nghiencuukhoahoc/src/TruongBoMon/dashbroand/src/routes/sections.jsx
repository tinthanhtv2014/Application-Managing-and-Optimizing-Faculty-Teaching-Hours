import { lazy, Suspense } from "react";

import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import ProductsPageFake from "../pages/products";
import AccountGV from "../sections/Account/AccountGV";

const IndexPhanCongGiangVien = lazy(() =>
  import("../sections/PhanCongGiangVien/IndexPhanCongGiangVien")
);
const DangKyGioChuan = lazy(() =>
  import("../sections/DangKyGioChuan/IndexDangKyGioChuan")
);
const FileExcel = lazy(() => import("../sections/FileExcel/FileExcel"));

const IndexPage = lazy(() => import("../pages/app"));
const BlogPage = lazy(() => import("../pages/blog"));
const UserPage = lazy(() => import("../pages/user"));
const LoginPage = lazy(() => import("../pages/login"));
const Page404 = lazy(() => import("../pages/page-not-found"));

export default function Router() {
  const routes = useRoutes([
    {
      path: "/", // Thống kê
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <IndexPage />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/giang-vien", // Danh sách giảng viên trong bộ môn.

      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <UserPage />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/dang-ky-khung-gio-chuan", // Quản lý phân công giảng dạy.

      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <DangKyGioChuan />
          </Suspense>
        </DashboardLayout>
      ),
    },

    {
      path: "/phan-cong-giang-vien", // Quản lý phân công giảng dạy.

      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <IndexPhanCongGiangVien />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/quan-ly-phan-cong-giang-day", // Quản lý phân công giảng dạy.

      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}></Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/theo-doi-dang-ky", //  Theo dõi việc đăng ký của giảng viên.

      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <BlogPage />
          </Suspense>
        </DashboardLayout>
      ),
    },

    {
      path: "/thong-tin", // Gợi ý phân công giảng viên.

      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <AccountGV />
          </Suspense>
        </DashboardLayout>
      ),
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
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/dashboard/404" replace />,
    },
  ]);

  return routes;
}
