import { where, fn, col, and, or } from "sequelize";

export interface IBaseFilter {
    where: where | fn | Array<col | and | or | string> | any;
}