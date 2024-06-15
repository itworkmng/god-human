import axios from "axios";
import { ICompany } from "./types";

namespace company {
  export const info = async (register: string): Promise<ICompany> => {
    try {
      const response = await axios.get<ICompany>(
        `/api/info`, // Proxy path
        {
          params: { regno: register },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching company info:", error);
      throw error;
    }
  };
}

export default company;
