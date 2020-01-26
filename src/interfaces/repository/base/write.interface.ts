import { UpdateOptions, DestroyOptions, Transaction } from "sequelize";

export interface IWriteOperations<TInstance, TAttributes> {
  create(item: TAttributes, transaction: Transaction): PromiseLike<TInstance>;
  update(item: Partial<TAttributes>, transaction: Transaction, options: UpdateOptions): PromiseLike<[number, TInstance[]]>;
  updateById(id: number, item: Partial<TAttributes>, transaction: Transaction): PromiseLike<[number, TInstance[]]>;
  delete(options: DestroyOptions, transaction: Transaction): PromiseLike<number>;
  deleteById(id: number, transaction: Transaction): PromiseLike<number>;
}
