import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Skeleton } from "@mui/material";
import DashboardLayout from "../layouts/dashboard";

const AccountGV = lazy(() => import("../sections/Account/AccountGV"));

const Page404 = lazy(() => import("../pages/page-not-found"));

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
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
      path: "/bao-cao-ket-thuc-mon",
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
            {/* Component tương ứng */}
          </Suspense>
        </DashboardLayout>
      ),
    },
    {
      path: "/phan-cong-cua-toi",
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
            {/* Component tương ứng */}
          </Suspense>
        </DashboardLayout>
      ),
    },

    {
      path: "/404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
