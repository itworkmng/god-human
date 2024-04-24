import { SuccessResponse } from "types";
import http from "..";

namespace payment {
  export const create = (body: any) =>
    http.post<SuccessResponse>(`payment`, { hasAuth: true, body });
}

export default payment;
