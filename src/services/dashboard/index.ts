import http from "..";
import { Dashboard } from "./types";

namespace dashboard {
  export const dashboardStats = (id: number) =>
    http.get<Dashboard>(`admin/counts/${id}`, { hasAuth: true });
}

export default dashboard;

//userAppTerms
