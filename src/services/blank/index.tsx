import { PaginationInput, PaginationResponse, SuccessResponse } from "types";
import http from "..";
import { IBlank, IBlankInput } from "./type";
import { tokenDecode } from "utils/index";

namespace Blank {
  export const user_list = (body: PaginationInput) => {
    const user_id = tokenDecode()?.id;
    return http.get<PaginationResponse<IBlank>>(`blank/${user_id}?sort=id`, {
      body,
      hasAuth: true,
    });
  };

  export const create = (body: IBlankInput) =>
    http.post<SuccessResponse>(`blank`, {
      body,
      hasAuth: true,
    });

  export const update = (id: number, body: IBlankInput) =>
    http.put<SuccessResponse>(`blank/${id}`, {
      body,
      hasAuth: true,
    });

  export const remove = (id: number) =>
    http.del<SuccessResponse>(`blank/${id}`, {
      hasAuth: true,
    });

  export const detail = (id: number) =>
    http.get<IBlank>(`admin/blank/get/${id}`, {
      hasAuth: true,
    });
}

export default Blank;
