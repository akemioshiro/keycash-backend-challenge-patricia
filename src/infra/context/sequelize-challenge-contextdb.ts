const sequelizeReq = require("sequelize");
import { injectable, inject } from "inversify";
import { ISequelizeChallenge } from "../../interfaces/infra/context/sequelize-challenge.interface";
import * as sequelize from "sequelize";
import * as Bluebird from "bluebird";
import { IDataBaseSettings } from "../../interfaces/config/database-settings.interface";
import { IAppSettings } from "../../interfaces/config/app-settings.interface";
import { TYPES } from "../../interfaces/types";

@injectable()
export class SequelizeChallengeContextDb implements ISequelizeChallenge {
  private readonly sequelizeChallenge: sequelize.Sequelize;
  private readonly dbSettings: IDataBaseSettings;

  // tslint:disable-next-line: only-arrow-functions
  hook = function (sequelizeChallenge) {
    sequelizeChallenge.options.handleDisconnects = false; 

    // Disable pool completely
    sequelizeChallenge.connectionManager.pool.clear();
    sequelizeChallenge.connectionManager.pool = null;
    sequelizeChallenge.connectionManager.getConnection = function getConnection() {
      return this._connect(sequelizeChallenge.config);
    };
    sequelizeChallenge.connectionManager.releaseConnection = function releaseConnection(connection) {
      return this._disconnect(connection);
    };
  };

  constructor(@inject(TYPES.settings.IAppSettings) private readonly appSettings: IAppSettings) {

    this.dbSettings = this.appSettings.dataBaseSettings;

    // if (this.dbSettings.disablePool) {
    //   Sequelize.addHook('afterInit', this.hook);
    // }

    // ref: http://nataliesmith.ca/blog/sqlserver-node-sequelize
    this.sequelizeChallenge = new sequelizeReq({
        host: this.appSettings.dataBaseSettings.host,
        database: this.appSettings.dataBaseSettings.database,
        port: this.dbSettings.port || 3306, // PORTA PADRAO DO MYSQL
        username: this.appSettings.dataBaseSettings.user,
        password: this.appSettings.dataBaseSettings.password,
        dialect: this.appSettings.dataBaseSettings.dialect,
        dialectOptions: this.dbSettings.dialectOptions
      });

    // Known issue: https://github.com/sequelize/sequelize/issues/7879
    this.instance.Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
      date = this._applyTimezone(date, options);
      return date.format('YYYY-MM-DD HH:mm:ss.SSS');
    };
  }

  get instance(): sequelize.Sequelize {
    return this.sequelizeChallenge;
  }

  get authenticate(): Bluebird<void> {
    return this.instance.authenticate();
  }
}