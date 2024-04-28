import { IBlank } from "service/blank/type";

export interface FileRecord {
  path: string;
}

export interface StorageFile {
  path: string;
  created_at: string;
  size: number;
}

export interface SingleFileUpload {
  file: any;
}

export interface SplashFileUpload {
  file: any;
  onUploadProgress?: (progressEvent: any) => void;
}

export interface MultiFileUpload {
  files: any[];
}

export interface FileType {
  success: boolean;
  photo: string;
}
export interface AntImage {
  name: string;
  url: string;
  id: number;
  isAlreadyUploaded?: boolean;
}
