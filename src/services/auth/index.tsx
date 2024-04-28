import { decryptWithAES, encryptWithAES } from "utils/parse";
import http from "..";
import { LoginData, LoginResponse, Admin } from "./type";
import { SuccessResponse } from "types";
const tokenKey = "app.token";
const userKey = "app.user";
namespace auth {
  export const login = (body?: any) =>
    http.post<LoginResponse>("user/signin", {
      body,
    });
  export const forgot = (body?: any) =>
    http.post<LoginResponse>("user/forgot-password", {
      body,
    });
  // export const singOut = () => auth.signOut();
  export const saveToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
  };

  export const hasToken = () => !!localStorage.getItem(tokenKey);
  export const removeToken = () => localStorage.removeItem(tokenKey);
  export const getToken = () => localStorage.getItem(tokenKey);

  export const info = () => http.get<Admin>("user/info", { hasAuth: true });

  export const rememberUser = (values: LoginData) => {
    if (values.remember) {
      localStorage.setItem(userKey, encryptWithAES(JSON.stringify(values)));
    } else {
      localStorage.removeItem(userKey);
    }
  };

  export const update = (id: number, body: Admin) =>
    http.put<SuccessResponse>(`user/${id}`, {
      hasAuth: true,
      body,
    });
  export const change_password = (id: number) =>
    http.post<SuccessResponse>(`user/password/${id}`, {
      hasAuth: true,
    });
  export const getRememberUser = () => {
    const userData = localStorage.getItem(userKey);
    if (userData) {
      const _userData = JSON.parse(decryptWithAES(userData)) as LoginData;
      return _userData;
    }
    return undefined;
  };
}

export default auth;
