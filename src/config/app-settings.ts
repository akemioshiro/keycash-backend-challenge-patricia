import { injectable } from "inversify";
import { IAppSettings } from "../interfaces/config/app-settings.interface";
import * as dotenv from "dotenv";
dotenv.config();
process.env["NODE_CONFIG_DIR"] = __dirname;
import * as config from "config";
import { IDataBaseSettings } from "../interfaces/config/database-settings.interface";

@injectable()
export class AppSettings implements IAppSettings {
  readonly nodeEnv: string;
  readonly port: number;
  readonly dataBaseSettings: IDataBaseSettings;
  constructor() {
    const localConfig: IAppSettings = config.get<IAppSettings>("appSettings");
    this.nodeEnv = localConfig.nodeEnv;
    this.port = localConfig.port;
    this.dataBaseSettings = localConfig.dataBaseSettings;
  }
}
