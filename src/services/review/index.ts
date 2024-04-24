import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { Review, ReviewDashboard } from "./type";

namespace review {
  export const list = (body?: any) =>
    http.post<PaginationResponse<Review>>("admin/review/list", {
      hasAuth: true,
      body,
    });

  export const dashboard = (id: number) =>
    http.get<ReviewDashboard>(`admin/review/service/dashboard/${id}`, {
      hasAuth: true,
    });
  export const remove = (id: number) =>
    http.del<SuccessResponse>(`admin/review/delete/${id}`, {
      hasAuth: true,
    });
}

export default review;
