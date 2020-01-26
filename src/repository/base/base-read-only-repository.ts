import * as Sequelize from "sequelize";
import { FindOptions, CountOptions, where, fn, col, and, or, WhereOptions, Model, IncludeOptions } from "sequelize";
import { injectable } from "inversify";
import { IBaseAttribute } from "../../domain/models/base/base.attribute";
import { IReadOperations } from "../../interfaces/repository/base/read.interface";
import { IBaseModelDefinition } from "../../interfaces/domain/base/base-model-definition.interface";
import { IBaseFilter } from "../../interfaces/domain/base/base-filter.interface";
import { SequelizeQuery } from "./sequelize.query";

@injectable()
export abstract class BaseReadOnlyRepository<TInstance, TAttributes extends IBaseAttribute> implements IReadOperations<TInstance, TAttributes> {

  constructor(readonly domain: IBaseModelDefinition<TInstance, TAttributes>, protected readonly filter: IBaseFilter) { }

  get model(): Sequelize.Model<TInstance, TAttributes> {
    return this.domain.instance;
  }

  query(predicate?: WhereOptions<TAttributes & TInstance> | where | fn | Array<col | and | or | string> | any): IReadOperations<TInstance, TAttributes> {
    const result = new SequelizeQuery<TInstance, TAttributes>(this.domain, this.filter.where);
    if (predicate) {
      return result.query(predicate);
    } else {
      return result;
    }
  }

  find(options?: FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance[]> {
    return this.query().find(options);
  } 

  findById(id: any, options?: FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance | null> {
    return this.query().findById(id, options);
  }

  findOne(options?: FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance | null> {
    return this.query().findOne(options);
  }

  count(options?: CountOptions | undefined): PromiseLike<number> {
    return this.query().count(options);
  }
}