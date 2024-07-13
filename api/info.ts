import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { regno } = req.query;

  try {
    const response = await axios.get(
      "https://info.ebarimt.mn/rest/merchant/info",
      {
        params: { regno },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching company info:", error); // Log the error
    res.status(500).json({ error: "Error fetching company info" });
  }
};
