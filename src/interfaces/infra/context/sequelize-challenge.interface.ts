import * as sequelize from "sequelize";
import * as Bluebird from "bluebird";

export interface ISequelizeChallenge {
  instance: sequelize.Sequelize;
  authenticate: Bluebird<void>;
}
