import { FindOptions, CountOptions, where, fn, col, and, or, WhereOptions, Model } from "sequelize";
import * as Sequelize from "sequelize";
import { IBaseModelDefinition } from "../../domain/base/base-model-definition.interface";
import { IBaseAttribute } from "../../../domain/models/base/base.attribute";
 
export interface IReadOperations<TInstance, TAttributes extends IBaseAttribute> {
	domain: IBaseModelDefinition<TInstance, TAttributes>;
	model: Sequelize.Model<TInstance, TAttributes>;
	query(predicate?: WhereOptions<TAttributes & TInstance> | where | fn | Array<col | and | or | string> | any): IReadOperations<TInstance, TAttributes>;
	findOne(options?: FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance | null>;
	find(options?: FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance[]>;
	findById(id: any, options?: FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance | null>;
	count(options?: CountOptions | undefined): PromiseLike<number>;
}