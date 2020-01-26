import { IDataBaseSettings } from "./database-settings.interface";

export interface IAppSettings {
    readonly nodeEnv: string;
    readonly port: number;
    readonly dataBaseSettings: IDataBaseSettings;
  }
  