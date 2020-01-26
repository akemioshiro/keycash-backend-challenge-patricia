import { BaseModel } from "../base/base.model";
import { injectable, inject } from "inversify";
import * as Sequelize from "sequelize";
import { TYPES } from "../../interfaces/types";
import { ISequelizeChallenge } from "../../interfaces/infra/context/sequelize-challenge.interface";
import { IImovelInstance, IImovelModel, IImovelAttribute } from "../../interfaces/domain/imovel-model-definition.interface";


@injectable()
export class ImovelModel extends BaseModel<IImovelInstance, IImovelAttribute> implements IImovelModel {

    private readonly domain: Sequelize.Model<IImovelInstance, IImovelAttribute>;

    constructor(@inject(TYPES.infra.ISequelizeChallenge) sequelize: ISequelizeChallenge) {
        super();
        this.domain = sequelize.instance.define<IImovelInstance, IImovelAttribute>(
            "imovel", { 
            id: {
                type: Sequelize.STRING(36),
                allowNull: false,
                primaryKey: true,
                field: "id",
            },
            metragem: {
                type: Sequelize.NUMERIC,
                allowNull: false,
                field: "metragem",
            },
            qtdQuartos: {
                type: Sequelize.NUMERIC,
                allowNull: false,
                field: "qtd_quartos",
            },            
            qtdVagasGaragem: { 
                type: Sequelize.NUMERIC,
                allowNull: false,
                field: "qtd_vagas_garagem",
            },
            qtdBanheiros: {
                type: Sequelize.NUMERIC,
                allowNull: false,
                field: "qtd_banheiros",
            },    
            tipo: {
                type: Sequelize.NUMERIC,
                allowNull: false,
                field: "tipo",
            },         
            endereco: {
                type: Sequelize.STRING(500),
                allowNull: false,
                field: "endereco",
            },
            bairro: {
                type: Sequelize.STRING(300),
                allowNull: false,
                field: "bairro",
            },
            municipio: {
                type: Sequelize.STRING(300),
                allowNull: false,
                field: "municipio",
            },
            estado: {
                type: Sequelize.STRING(2),
                allowNull: false,
                field: "estado",
            },
            dataLancamentoImovel: {
                type: Sequelize.DATE,
                allowNull: true,
                field: "data_lancamento_imovel",
            },         
            createdAt: {
                field: "created_at",
                type: Sequelize.DATE,
                allowNull: false
            },
            deletedAt: {
                field: "deleted_at",
                type: Sequelize.DATE,
                allowNull: true
            }
        },
            { tableName: "imovel", createdAt: false, updatedAt: false });
    }

    get instance(): Sequelize.Model<IImovelInstance, IImovelAttribute> {
        return this.domain;
    }
}