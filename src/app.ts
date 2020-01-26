import * as express from "express";
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { AppContainer } from './app-container';
import { injectable, inject, interfaces } from 'inversify';
import { IApplicationRunner } from './interfaces/application/application-runner.interface';
import { TYPES } from './interfaces/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import { IAppSettings } from './interfaces/config/app-settings.interface';
import { ISequelizeChallenge } from "./interfaces/infra/context/sequelize-challenge.interface";


@injectable()
export class Application implements IApplicationRunner {

  constructor(
    @inject(TYPES.IContainer) private readonly container: interfaces.Container,
    @inject(TYPES.settings.IAppSettings) private readonly appSettings: IAppSettings,
    @inject(TYPES.infra.ISequelizeChallenge) private readonly sequelize: ISequelizeChallenge
  ) { }

  start(): void {
    const server = new InversifyExpressServer(this.container, null, { rootPath: "/api" });
    server.setConfig(app => {
      app.use(helmet());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cors());
      app.use((_req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
      app.use(express.static(__dirname + '/static', {
        dotfiles: 'allow'
      }));
    });


    this.sequelize.authenticate
      .then(() => {
        console.log("Connected to keycash-challenge database...");

        // Attaches all registered controllers and middleware to the express application. Returns the application instance.
        const app = server.build();

        const port = this.appSettings.port;

        app.listen(port, () => {
          console.log(`Listening on port: ${port}.`);
        });
      })
      .catch(err => {
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("Error connecting keycash-challenge database:", err);
      });
  }
}

new AppContainer().getMainApp().start();
