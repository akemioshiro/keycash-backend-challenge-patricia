import { where, fn, col, and, or } from "sequelize";
import { injectable } from "inversify";
import { IIsDeletedFilter } from "../../interfaces/repository/filter/is-deleted.filter";

@injectable()
export class IsDeletedFilter implements IIsDeletedFilter {
    where: where | fn | Array<col | and | or | string> | any = { deletedAt: null };
}