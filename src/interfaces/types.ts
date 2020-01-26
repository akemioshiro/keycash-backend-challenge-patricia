// generates a constante type and find interfaces in run time
export const TYPES = {
    IApplicationRunner: Symbol.for("IApplicationRunner"),
    IContainer: Symbol.for("IContainer"),
    controllers: {
      IImovelController: Symbol.for("IImovelController")
    },
    settings: {
      IAppSettings: Symbol.for("IAppSettings"),
      IConfig: Symbol.for("IConfig")
    },
    repositories: {
      filters: {
        IIsDeletedFilter: Symbol.for("IIsDeletedFilter")
      },
      IImovelRepository: Symbol.for("IImovelRepository")
    },
    models: {
     IImovelModel: Symbol.for("IImovelModel")
    },
    domain: {
      notification: {
        INotificationService: Symbol.for("INotificationService")
      }, 
      validation:{
        IImovelValidation: Symbol.for("IImovelValidation")
      },
      services: {
        IImovelService: Symbol.for("IImovelService")
      }
    },
    infra:{
      ISequelizeChallenge: Symbol.for("ISequelizeChallenge"),
      IUnitOfWork: Symbol.for("IUnitOfWork")
    }
    
  };
  