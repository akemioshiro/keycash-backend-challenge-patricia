export interface IDataBaseSettings {
    readonly host: string;
    readonly database: string;
    readonly user: string;
    readonly password: string;
    readonly dialect: string;
    readonly port: number;
    // tslint:disable-next-line: ban-types
    readonly dialectOptions: Object | undefined;
  }
   