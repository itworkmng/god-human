import http from "../company-service";
import { ICompany } from "./types";
namespace company {
  export const info = (register: number) =>
    http.get<ICompany>(`info?regno=${register}`);
}
export default company;
