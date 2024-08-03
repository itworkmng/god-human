// company-service.ts
import axios, { AxiosRequestConfig, CancelToken } from "axios";
import { BaseResponse } from "types";
const baseURL = "/";

export interface IParams {
  [key: string]: string;
}

export interface IHeader {
  [key: string]: any;
}

export interface IBody {
  [key: string]: any;
}

export interface IOption {
  body?: IBody;
  hasAuth?: boolean;
  headers?: IHeader;
  params?: IParams;
  cancelToken?: CancelToken;
  onUploadProgress?: (progressEvent: any) => void;
}

namespace company_http {
  export const genHeader = (headers = {}) =>
    Object.assign(headers, {}, { Locale: "mn" });

  export const handleError = (err: any, reject: any) => {
    if (err && err.response && err.response.data) {
      return reject(err.response.data);
    }

    return reject({ message: "Unhandled error" });
  };

  export const request = async <T>(options: AxiosRequestConfig) => {
    return new Promise<BaseResponse<T>>((resolve, reject) => {
      axios
        .request<BaseResponse<T>>({
          baseURL,
          ...options,
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => handleError(err, reject));
    });
  };

  export const get = async <T>(url: string, options?: IOption): Promise<T> => {
    return await request<T>({
      method: "GET",
      url,
      headers: genHeader(options?.headers),
      params: options?.params,
    }).then((data) => data.body);
  };
}

export default company_http;
