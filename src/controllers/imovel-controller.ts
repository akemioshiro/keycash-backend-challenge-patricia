import { controller, httpGet, request, response, httpPost, httpDelete, requestParam, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../interfaces/types";
import { BaseController } from "./base/base.controller";
import { INotificationService } from "../interfaces/domain/notification/notification-service.interface";
import { IImovelInstance, IImovelAttribute } from "../interfaces/domain/imovel-model-definition.interface";
import { IImovelService } from "../interfaces/domain/service/imovel-service.interface";
import { IImovelController } from "../interfaces/controllers/imovel-controller.interface";

@controller("/imovel")
export class ImovelController extends BaseController<IImovelInstance, IImovelAttribute>  implements IImovelController {

    constructor(
        @inject(TYPES.domain.services.IImovelService) service: IImovelService, 
        @inject(TYPES.domain.notification.INotificationService) notification: INotificationService
    ){
        super(service, notification);
    }


}