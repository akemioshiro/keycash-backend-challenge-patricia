import { ResponseDataHelper } from "../../../helpers/response-request-data/response-data-helper";
import * as HTTP_STATUS_CODES from "http-status-codes";
import { injectable } from "inversify";
import { IResponseData } from "../../../helpers/response-request-data/response-data";

@injectable()
export abstract class BaseSchemaValidation {
  protected badRequest(error: any): IResponseData {
    return ResponseDataHelper.failure(HTTP_STATUS_CODES.BAD_REQUEST, error);
  }
}
 