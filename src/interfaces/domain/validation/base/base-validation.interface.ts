import { IBaseAttribute } from "../../../../domain/models/base/base.attribute";
import { IBaseQueryStringParser } from "./base-querystring-parser.interface";

export interface IBaseValidation<TInstance, TAttributes extends IBaseAttribute> extends IBaseQueryStringParser<TInstance, TAttributes>  {
    validatePut(attributes: TAttributes, currentInstance: TInstance): Promise<void>;
    validatePost(attributes: TAttributes): Promise<void>;
} 