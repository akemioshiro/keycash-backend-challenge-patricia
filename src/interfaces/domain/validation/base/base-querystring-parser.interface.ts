import { IBaseAttribute } from "../../../../domain/models/base/base.attribute";
import { IReadOperations } from "../../../repository/base/read.interface";

export interface IBaseQueryStringParser<TInstance, TAttributes extends IBaseAttribute> {
    parse(queryString: any): IReadOperations<TInstance, TAttributes>;
} 