export interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

export interface PasswordData {
  email: string;
}

export interface LoginResponse {
  token: string;
  user: Admin;
}

export interface Admin {
  id: number;
  role: "human" | "god" | "superman";
  first_name: string;
  last_name: string;
  photo: string;
  city: string;
  province: string;
  checker_id?: number;
  company_register?: number;
  company_name?: string;
  register: string;
  phone_number: 99455432;
  email: string;
  position: string;
  acc_number: number;
  acc_name: string;
  acc_user: string;
  is_active: boolean;
  expire_date: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
