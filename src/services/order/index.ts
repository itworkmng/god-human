import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { Order, OrderCheck } from "./type";

namespace order {
  export const list = (body?: any) =>
    http.get<PaginationResponse<Order>>("order?sort=id", {
      hasAuth: true,
      body,
    });
  export const unPaidlist = (body?: any) =>
    http.get<PaginationResponse<Order>>("order/unpaid?sort=id", {
      hasAuth: true,
      body,
    });
  export const detail = (id: string) =>
    http.get<Order>(`order/${id}`, {
      hasAuth: true,
    });

  export const update = (id: number, body?: any) =>
    http.post<SuccessResponse>(`order/user/${id}`, {
      body,
      hasAuth: true,
    });
  export const check = (order_uuid: string) =>
    http.get<OrderCheck>(`admin/order/check/${order_uuid}`, { hasAuth: true });
}

export default order;
