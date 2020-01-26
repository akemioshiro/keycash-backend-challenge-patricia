import { IBaseAttribute } from "../../../domain/models/base/base.attribute";
import { IReadOperations } from "./read.interface";
import { IWriteOperations } from "./write.interface";

export interface IBaseRepository<TInstance, TAttributes extends IBaseAttribute>
    extends IReadOperations<TInstance, TAttributes>, IWriteOperations<TInstance, TAttributes> {

}