import { IClient } from "service/client/type";
import { Base } from "types";

export interface TermsOfService extends Base {
  content: string;
}

export interface TermsOfServiceInput {
  content: string;
}

export interface ProfileImages extends Base {
  images: string[];
}

export interface ProfileImagesInput {
  images: string[];
}

export interface Faq extends Base {
  question: string;
  answer: string;
}

export interface FaqInput {
  question: string;
  answer: string;
}
// Name         string `json:"name"`
// 	PhoneNumber  string `json:"phone_number"`
// 	FacebookUrl  string `json:"facebook_url"`
// 	InstagramUrl string `json:"instagram_url"`
// 	Location     string `json:"location"`
// 	Latitude     string `json:"latitude"`
// 	Longitude    string `json:"longitude"`
export interface Contact extends Base {
  name: string;
  phone_number: string;
  facebook_url: string;
  instagram_url: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface ContactInput {
  name: string;
  phone_number: string;
  facebook_url?: string;
  instagram_url?: string;
  location?: string;
  latitude?: string;
  longitude?: string;
}

export interface Feedback extends Base {
  content: string;
  user: IClient;
}
