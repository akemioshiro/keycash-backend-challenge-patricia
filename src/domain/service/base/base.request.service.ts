import { injectable } from "inversify";
import * as HTTP_STATUS_CODES from "http-status-codes";
import { BaseSchemaValidation } from "../../validation/base/base-schema-validation";
import { ResponseDataHelper } from "../../../helpers/response-request-data/response-data-helper";
import { IResponseData } from "../../../helpers/response-request-data/response-data";

@injectable()
export abstract class BaseRequestService extends BaseSchemaValidation {
  protected created(result: any): IResponseData {
    return ResponseDataHelper.success(HTTP_STATUS_CODES.CREATED, result);
  }

  protected ok(result: any): IResponseData {
    return ResponseDataHelper.success(HTTP_STATUS_CODES.OK, result);
  }

  protected notFound(): IResponseData {
    return ResponseDataHelper.failure(HTTP_STATUS_CODES.NOT_FOUND, "Registro não encontrado");
  }

}