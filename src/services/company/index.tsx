// company.tsx
import company_http from "../company-service";
import { ICompany } from "./types";

namespace company {
  export const info = (register: number) =>
    company_http.get<ICompany>(`/rest/merchant/info?regno=${register}`, {
      hasAuth: true,
    });
}

export default company;
