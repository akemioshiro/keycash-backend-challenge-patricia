import { injectable, inject } from "inversify";
import { TYPES } from "../../interfaces/types";
import { INotificationService } from "../../interfaces/domain/notification/notification-service.interface";
import { IUnitOfWork } from "../../interfaces/infra/context/unit-of-work.interface";
import { BaseService } from "./base/base-service";
import { IImovelInstance, IImovelAttribute } from "../../interfaces/domain/imovel-model-definition.interface";
import { IImovelService } from "../../interfaces/domain/service/imovel-service.interface";
import { IImovelRepository } from "../../interfaces/repository/imovel-repository.interfacey";
import { IImovelValidation } from "../../interfaces/domain/validation/imovel-validation.interface";

@injectable()
export class ImovelService extends BaseService<IImovelInstance, IImovelAttribute>  implements IImovelService {

    constructor(
        @inject(TYPES.repositories.IImovelRepository) repository: IImovelRepository,
        @inject(TYPES.domain.validation.IImovelValidation) validation: IImovelValidation,
        @inject(TYPES.domain.notification.INotificationService)  notifications: INotificationService,
        @inject(TYPES.infra.IUnitOfWork)  unitOfWork: IUnitOfWork
    ) {
        super(repository, validation, notifications, unitOfWork);
    }


}