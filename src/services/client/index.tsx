import { PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { IClient, IClientFilterInput, IClientInput } from "./type";

namespace client {
  export const list = (id: number, body: IClientFilterInput) =>
    http.get<PaginationResponse<IClient>>(`user/client/${id}?sort=id`, {
      hasAuth: true,
      body,
    });
  export const create = (body: IClientInput) =>
    http.post<SuccessResponse>(`client/signup`, {
      hasAuth: true,
      body,
    });
  export const update = (id: number, body: IClientInput) =>
    http.put<SuccessResponse>(`user/client/${id}`, {
      hasAuth: true,
      body,
    });
  export const remove = (id: number) =>
    http.del<SuccessResponse>(`user/client/${id}`, {
      hasAuth: true,
    });
  export const client_change_password = (id: number) =>
    http.post<SuccessResponse>(`user/password/client/${id}`, {
      hasAuth: true,
    });
}

export default client;

//userAppTerms
