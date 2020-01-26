import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import { AppSettings } from './config/app-settings';
import { IAppSettings } from './interfaces/config/app-settings.interface';
import { IApplicationRunner } from './interfaces/application/application-runner.interface';
import { TYPES } from './interfaces/types';
import { Application } from './app';
import { ISequelizeChallenge } from './interfaces/infra/context/sequelize-challenge.interface';
import { SequelizeChallengeContextDb } from './infra/context/sequelize-challenge-contextdb';
import { IIsDeletedFilter } from './interfaces/repository/filter/is-deleted.filter';
import { IsDeletedFilter } from './repository/filter/is-deleted.filter';
import { NotificationService } from './domain/notification/notification.service';
import { INotificationService } from './interfaces/domain/notification/notification-service.interface';
import { IUnitOfWork } from './interfaces/infra/context/unit-of-work.interface';
import { UnitOfWorkService } from './infra/context/unit-of-work.interface';
import { ImovelController } from './controllers/imovel-controller';
import { IImovelController } from './interfaces/controllers/imovel-controller.interface';
import { ImovelService } from './domain/service/imovel-service';
import { IImovelService } from './interfaces/domain/service/imovel-service.interface';
import { IImovelValidation } from './interfaces/domain/validation/imovel-validation.interface';
import { IImovelModel } from './interfaces/domain/imovel-model-definition.interface';
import { ImovelRepository } from './repository/imovel.repository';
import { IImovelRepository } from './interfaces/repository/imovel-repository.interfacey';
import { ImovelModel } from './domain/models/imovel.model';
import { ImovelValidation } from './domain/validation/imovel.validation';


export class AppContainer extends Container {
  protected static instance: Container;

  constructor() {
    super({ defaultScope: "Request" });
    this.registerServices();
  }

  static GetInstance(): Container {
    if (!AppContainer.instance) {
      AppContainer.instance = new AppContainer();
    }

    return AppContainer.instance;
  }

  static NewScope(requestData: any) {
    return AppContainer.GetInstance().get(requestData);
  }

  getMainApp(): IApplicationRunner {
    return this.get<IApplicationRunner>(TYPES.IApplicationRunner);
  }

  registerServices() {
    this.registerCommons();
    this.registerModels();
    this.registerRepositories();
    this.registerControllers();
    this.registerDomainServices();
    this.registerValidations();
    this.registerInfra();
  }

  registerControllers() {
    this.bind<IImovelController>(TYPES.controllers.IImovelController).to(ImovelController);
  }

  registerDomainServices() {
    this.bind<INotificationService>(TYPES.domain.notification.INotificationService).to(NotificationService);
    this.bind<IImovelService>(TYPES.domain.services.IImovelService).to(ImovelService);
  }

  registerValidations() {
    this.bind<IImovelValidation>(TYPES.domain.validation.IImovelValidation).to(ImovelValidation);
  }

  registerModels() {
    this.bind<IImovelModel>(TYPES.models.IImovelModel).to(ImovelModel).inSingletonScope();
  }

  registerRepositories() {
    this.bind<IIsDeletedFilter>(TYPES.repositories.filters.IIsDeletedFilter).to(IsDeletedFilter);
    this.bind<IImovelRepository>(TYPES.repositories.IImovelRepository).to(ImovelRepository);
  }

  registerCommons() {
    this.bind<IApplicationRunner>(TYPES.IApplicationRunner).to(Application).inSingletonScope();
    this.bind<IAppSettings>(TYPES.settings.IAppSettings).to(AppSettings);
    this.bind<interfaces.Container>(TYPES.IContainer).toConstantValue(this);
  }

  registerInfra() {
    this.bind<ISequelizeChallenge>(TYPES.infra.ISequelizeChallenge).to(SequelizeChallengeContextDb).inSingletonScope();
    this.bind<IUnitOfWork>(TYPES.infra.IUnitOfWork).to(UnitOfWorkService);
  }

}
