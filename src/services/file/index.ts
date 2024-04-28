import { AntdFile } from "types";
import http from "..";
import { FileType, MultiFileUpload, SingleFileUpload } from "./types";

namespace file {
  export const upload = async ({ file }: SingleFileUpload) => {
    const body = new FormData();
    body.append("file", file.originFileObj);

    return http.post<FileType>("client/upload", {
      body,
      hasAuth: true,
    });
  };

  export const uploads = async ({ files }: MultiFileUpload) => {
    const body = new FormData();

    if (files.length === 0) {
      return [];
    }
    files.forEach((file) => {
      body.append("files", file.originFileObj);
    });

    return http.post<FileType[]>("upload/files", {
      body,
      hasAuth: true,
    });
  };

  export const fileToUrl = (val?: string) => {
    if (!val) {
      return "";
    }
    return `${import.meta.env.VITE_FILE_GET_URL}/${val}`;
  };

  export const getFileName = (val: string) => {
    return val.split("/").pop()?.substring(15);
  };

  export const getUploadableFiles = (val?: AntdFile[]) => {
    return val?.filter((item) => !!item.originFileObj) || [];
  };

  export const getPaths = (
    searchVal: string,
    uploadedItems: string[],
    existingItems?: AntdFile[]
  ) => {
    for (let val of existingItems || []) {
      if (val.uid.includes(searchVal)) {
        uploadedItems.push(val.uid);
      }
    }
    return uploadedItems;
  };
}

export default file;
