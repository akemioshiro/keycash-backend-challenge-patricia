import { injectable, inject } from "inversify";
import { TYPES } from "../../interfaces/types";
import { INotificationService } from "../../interfaces/domain/notification/notification-service.interface";
import * as Joi from "joi";
import { BaseValidation } from "./base/base.validation";
import { IImovelRepository } from "../../interfaces/repository/imovel-repository.interfacey";
import { IImovelInstance, IImovelAttribute } from "../../interfaces/domain/imovel-model-definition.interface";
import { IImovelValidation } from "../../interfaces/domain/validation/imovel-validation.interface";

@injectable()
export class ImovelValidation extends BaseValidation<IImovelInstance, IImovelAttribute> implements IImovelValidation {

    constructor(
        @inject(TYPES.repositories.IImovelRepository) repository: IImovelRepository,
        @inject(TYPES.domain.notification.INotificationService) notification: INotificationService) {
        super(repository, notification);
    }

    // TODO: verificar se haverá outras validações
    // async validatePut(attributes: IImovelAttribute, currentInstance: IImovelInstance): Promise<void> {

    //     return Promise.resolve();
    // }
    // async validatePost(attributes: IImovelAttribute): Promise<void> {

    //     return Promise.resolve();
    // }

    getSchema(): Joi.ObjectSchema {
        const schema = Joi.object()
            .keys({
                metragem: Joi.number().required(),
                qtdQuartos: Joi.number().required(),
                dataLancamentoImovel: Joi.date().optional(),
                qtdVagasGaragem: Joi.number().required(),
                qtdBanheiros: Joi.number().required(),
                tipo: Joi.number().valid(1,2).required(), // 1 (apartamento)  ou 2 (casa)
                endereco: Joi.string().min(1).max(500).required(),
                bairro: Joi.string().min(1).max(300).required(),
                municipio: Joi.string().min(1).max(300).required(),
                estado: Joi.string().min(1).max(2).required()
            })
            .unknown();
        return schema;
    }
} 