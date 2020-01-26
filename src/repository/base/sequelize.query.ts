import * as Sequelize from "sequelize";
import { Op, WhereOptions, FindOptions, where, fn, col, and, or } from "sequelize";
import { IBaseAttribute } from "../../domain/models/base/base.attribute";
import { IReadOperations } from "../../interfaces/repository/base/read.interface";
import { IBaseModelDefinition } from "../../interfaces/domain/base/base-model-definition.interface";

export class SequelizeQuery<TInstance, TAttributes extends IBaseAttribute> implements IReadOperations<TInstance, TAttributes> {

    protected readonly whereClause: WhereOptions<TInstance> | any;
    get model(): Sequelize.Model<TInstance, TAttributes> {
      return this.domain.instance;
    }
  
    constructor(readonly domain: IBaseModelDefinition<TInstance, TAttributes>,
      predicate: WhereOptions<TAttributes & TInstance> | where | fn | Array<col | and | or | string> | any) {
  
      this.whereClause = SequelizeQuery.buildWhere(predicate, this.whereClause);
    }
  
    static buildWhere<TInstance, TAttributes>(predicate: WhereOptions<TAttributes & TInstance> | where | fn | Array<col | and | or | string> | any,
      whereClause: WhereOptions<TInstance> | any): WhereOptions<TInstance> | any {
      let result: WhereOptions<TInstance> | any;
      if (whereClause && predicate) {
        result = {
          [Op.and]: [
            predicate, 
            whereClause
          ]
        };
      } else if (predicate) {
        result = predicate;
      } else {
        result = whereClause;
      }
  
      return result;
    }
  
    static prepareOptions<TInstance, TAttributes>(options: Sequelize.FindOptions<TAttributes & TInstance> |
      Sequelize.CountOptions | Sequelize.DestroyOptions | any,
      whereClause: WhereOptions<TInstance> | any): Sequelize.FindOptions<TAttributes & TInstance> |
      Sequelize.CountOptions | Sequelize.DestroyOptions | any {
      if (!options) {
        options = {};
      }
      const where = SequelizeQuery.buildWhere(options.where, whereClause);
      if (where) {
        options.where = where;
      }
  
      return options;
    }
  
    query(predicate: WhereOptions<TAttributes & TInstance> | where | fn | Array<col | and | or | string> | any): SequelizeQuery<TInstance, TAttributes> {
      return new SequelizeQuery<TInstance, TAttributes>(this.domain, SequelizeQuery.buildWhere(predicate, this.whereClause));
    }
  
    find(options?: Sequelize.FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance[]> {
      const opt = SequelizeQuery.prepareOptions(options, this.whereClause);
      return this.model.findAll(opt);
    }
  
    findOne(options?: Sequelize.FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance | null> {
      const opt = SequelizeQuery.prepareOptions(options, this.whereClause);
      return this.model.findOne(opt);
    }
    findById(id: any, options?: FindOptions<TAttributes & TInstance> | undefined): PromiseLike<TInstance | null> {
      if (!options) {
        options = {};
      }
      options.where = SequelizeQuery.buildWhere({ id }, this.whereClause);
      return this.model.findOne(options);
    }
    count(options?: Sequelize.CountOptions | undefined): PromiseLike<number> {
      const opt = SequelizeQuery.prepareOptions(options, this.whereClause);
      return this.model.count(opt);
    }
  
    static concat(...fields: string[]): any {
      let result = new Array<any>();
      fields.forEach(x => {
        if (result.length > 0) {
          result.push(" ");
        }
        result.push(Sequelize.fn("IFNULL", Sequelize.col(x), " "));
      });
  
      return Sequelize.fn("concat", result);
    }
  }
  