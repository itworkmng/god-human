import { lazy } from "react";
import { IRoute } from "./types";

const Login = lazy(() => import("pages/auth/login"));
const Forgot = lazy(() => import("pages/auth/forgot"));

const auhtRoutes: IRoute[] = [
  {
    key: "login",
    path: "login",
    component: <Login />,
  },
  { key: "forgot-password", path: "forgot-password", component: <Forgot /> },
];

export default auhtRoutes;
