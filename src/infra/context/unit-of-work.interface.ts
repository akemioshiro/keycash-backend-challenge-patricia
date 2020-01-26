import { Transaction } from "sequelize";
import * as Bluebird from "bluebird";
import { injectable, inject } from "inversify";
import { TYPES } from "../../interfaces/types";
import { ISequelizeChallenge } from "../../interfaces/infra/context/sequelize-challenge.interface";
import { IUnitOfWork } from "../../interfaces/infra/context/unit-of-work.interface";

@injectable()
export class UnitOfWorkService implements IUnitOfWork {
    constructor(@inject(TYPES.infra.ISequelizeChallenge) private sequelize: ISequelizeChallenge) { }

    getTransaction(): Bluebird<Transaction> {
        return this.sequelize.instance.transaction({});
    }
} 