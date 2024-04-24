import { Customer } from "service/client/types";
import { MerchantService } from "service/merchantService/type";
import { Base } from "types";

export interface Review extends Base {
  comment: string;
  customer: Customer;
  customer_id: number;
  likes: Like[];
  location: number[];
  photos: string[];
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  saves: Like[];
  service: MerchantService;
  service_id: number;
  service_name: string;
  total_rating: number;
}

export interface Like extends Base {
  customer_id: number;
  review_id?: number;
  service_id?: number;
}

export interface ReviewDashboard {
  average_taste: number;
  average_environment: number;
  average_service: number;
  average_price: number;
}
