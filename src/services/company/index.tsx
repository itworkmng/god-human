// company.tsx
import http from "..";
import { ICompany } from "./types";

namespace company {
  export const info = (rgstr: number) =>
    http.get<ICompany>(`other/company/${rgstr}`, { hasAuth: true });
}

export default company;
