import { IErrorInfo } from "./error-info";

export interface IResponseData {
  statusCode?: number;
  hasError?: boolean;
  errors?: IErrorInfo[];
  data?: any;
} 