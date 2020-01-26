import { UpdateOptions, DestroyOptions, Transaction } from "sequelize";
import { injectable } from "inversify";
import { Guid } from "guid-typescript";
import { IBaseAttribute } from "../../domain/models/base/base.attribute";
import { IWriteOperations } from "../../interfaces/repository/base/write.interface";
import { IBaseModelDefinition } from "../../interfaces/domain/base/base-model-definition.interface";
import { BaseReadOnlyRepository } from "./base-read-only-repository";
import { IBaseFilter } from "../../interfaces/domain/base/base-filter.interface";
import { SequelizeQuery } from "./sequelize.query";

@injectable()
export abstract class BaseRepository<TInstance, TAttributes extends IBaseAttribute>
    extends BaseReadOnlyRepository<TInstance, TAttributes>
    implements IWriteOperations<TInstance, TAttributes> {
  
  constructor(domain: IBaseModelDefinition<TInstance, TAttributes>,
              filter: IBaseFilter) {
      super(domain, filter);
    }
  
  protected checkId(item: TAttributes): void {
    if (!item.id) {
      item.id = Guid.create().toString();
    }
  }

  create(item: TAttributes, transaction: Transaction): PromiseLike<TInstance> {
    this.checkId(item);
    if(!item.createdAt){
      const dataBase = new Date();
      item.createdAt = new Date(dataBase.valueOf() - dataBase.getTimezoneOffset() * 60000);
    }
    return this.model.create(item, { transaction });
  }

  update(item: Partial<TAttributes>, transaction: Transaction, options: UpdateOptions): PromiseLike<[number, TInstance[]]> {
    if (this.filter.where) {
      SequelizeQuery.prepareOptions(options, this.filter.where);
    }
    options.transaction = transaction;
    return this.model.update(item, options);
  }

  updateById(id: any, item: Partial<TAttributes>, transaction: Transaction): PromiseLike<[number, TInstance[]]> {
    let where = { id };
    if (this.filter.where) {
      where = SequelizeQuery.buildWhere(where, this.filter.where);
    }
    return this.model.update(item, { where, transaction });
  }

  delete(options: DestroyOptions, transaction: Transaction): PromiseLike<number> {
    if (this.filter.where) {
      SequelizeQuery.prepareOptions(options, this.filter.where);
    }
    options.transaction = transaction;
    return this.model.destroy(options);
  }

  deleteById(id: any, transaction: Transaction): PromiseLike<number> {
    let where = { id };
    if (this.filter.where) {
      where = SequelizeQuery.buildWhere(where, this.filter.where);
    }
    return this.model.destroy({ where, transaction });
  }
}