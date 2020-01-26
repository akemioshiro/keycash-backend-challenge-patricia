import { Transaction } from "sequelize";
import * as Bluebird from "bluebird";

export interface IUnitOfWork {
  getTransaction(): Bluebird<Transaction>;
} 