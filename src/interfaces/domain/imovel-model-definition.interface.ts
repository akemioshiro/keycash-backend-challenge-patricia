import * as Sequelize from "sequelize";
import { IBaseModelDefinition } from "./base/base-model-definition.interface";
import { IBaseAttribute } from "../../domain/models/base/base.attribute";
import { IBaseDeletableAttribute } from "./base/base-deletable.attribute";

export interface IImovelAttribute extends IBaseAttribute, IBaseDeletableAttribute {
    metragem: number;
    qtdQuartos: number;
    qtdVagasGaragem:number;
    qtdBanheiros:number;
    tipo:number; // apt ou casa
    endereco:string;
    bairro:string;
    municipio:string;
    estado:string;
    dataLancamentoImovel:Date;
} 

export interface IImovelInstance extends Sequelize.Instance<IImovelAttribute>, IImovelAttribute {

}

export interface IImovelModel extends IBaseModelDefinition<IImovelInstance, IImovelAttribute> {

}