import { IErrorInfo } from "./error-info";
import { IResponseData } from "./response-data";

export class ResponseDataHelper {
  private static buildErrors(errors: any): IErrorInfo[] {
    const errorsInfo: IErrorInfo[] = [];
    if(errors) {
      const localErrors: any = errors instanceof Array
        ? errors
        : [errors];
      localErrors.forEach(e => {
        if (typeof e === "string") {
          errorsInfo.push({ message: e.toString() });
        } else if (e instanceof Error) {
          errorsInfo.push({ message: e.message, additionalInfo: e.stack });
        } else if (e.message) {
          errorsInfo.push(e.code ? { message: e.message, code: e.code } : { message: e.message });
        }
      });
    }
    return errorsInfo;
  }
 
  static toResponseData(msg: any): IResponseData {
    const json = JSON.parse(msg!.toString());

    return {
      statusCode: json.statusCode || 500,
      hasError: json.hasError === undefined ? true : json.hasError,
      data: json.data,
      errors: ResponseDataHelper.buildErrors(json.errors)
    };
  }

  static success(statusCode: number, data?: any): IResponseData {
    return data ? { hasError: false, statusCode, data } : { hasError: false, statusCode };
  }

  static failure(statusCode: number, errors: any): IResponseData {
    return { hasError: true, statusCode, errors: ResponseDataHelper.buildErrors(errors) };
  }
}