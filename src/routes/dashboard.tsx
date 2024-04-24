import { lazy } from "react";
import { IRoute } from "./types";

const SettingsPage = lazy(() => import("pages/dashboard/settings/index"));
const DashboardPage = lazy(() => import("pages/dashboard/dashboard/index"));
const FeedBackPage = lazy(() => import("pages/dashboard/feedback/index"));

const ClientPage = lazy(() => import("pages/dashboard/client/index"));
const OrdersPage = lazy(() => import("pages/dashboard/orders/index"));
const dashboardRoutes: IRoute[] = [
  {
    key: "dashboard",
    path: "home",
    component: <DashboardPage />,
  },
  { key: "orders", path: "orders", component: <OrdersPage /> },
  {
    key: "settings",
    path: "settings",
    component: <SettingsPage />,
  },
  {
    key: "client",
    path: "client",
    component: <ClientPage />,
  },
  {
    key: "feedback",
    path: "feedback",
    component: <FeedBackPage />,
  },
];

export default [...dashboardRoutes];
