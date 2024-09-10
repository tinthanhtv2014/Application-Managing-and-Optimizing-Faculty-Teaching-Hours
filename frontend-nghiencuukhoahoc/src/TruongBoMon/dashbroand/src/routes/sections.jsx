import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import AccountGV from "../sections/Account/AccountGV";
import Skeleton from "@mui/material/Skeleton";
const IndexPhanCongGiangVien = lazy(() =>
  import("../sections/PhanCongGiangVien/IndexPhanCongGiangVien")
);
const DangKyGioChuan = lazy(() =>
  import("../sections/DangKyGioChuan/IndexDangKyGioChuan")
);
const FileExcel = lazy(() => import("../sections/FileExcel/FileExcel"));
const IndexDangKyDanhmuc = lazy(() =>
  import("../sections/RegisterDanhMucGioChuan/IndexDangKyDanhMuc")
);
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
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "grey.300" }}
              />
            }
          >
            <IndexPage />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/giang-vien", // Danh sách giảng viên trong bộ môn.
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "grey.300" }}
              />
            }
          >
            <UserPage />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/dang-ky-khung-gio-chuan", // Quản lý phân công giảng dạy.
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "grey.300" }}
              />
            }
          >
            <DangKyGioChuan />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/phan-cong-giang-vien", // Quản lý phân công giảng dạy.
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "grey.300" }}
              />
            }
          >
            <IndexPhanCongGiangVien />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/quan-ly-phan-cong-giang-day", // Quản lý phân công giảng dạy.
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "grey.300" }}
              />
            }
          />
        </DashboardLayout>
      ),
    },
    {
      path: "/theo-doi-dang-ky", // Theo dõi việc đăng ký của giảng viên.
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "grey.300" }}
              />
            }
          >
            <BlogPage />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/dang-ky-danh-muc", // Thêm ký tự '*' vào cuối đường dẫn
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "grey.300" }}
              />
            }
          >
            <IndexDangKyDanhmuc />
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/thong-tin", // Gợi ý phân công giảng viên.
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: "grey.300" }}
              />
            }
          >
            <AccountGV />
          </Suspense>
        </DashboardLayout>
      ),
    },
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
