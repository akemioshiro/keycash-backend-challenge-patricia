import { IBaseRepository } from "./base/base-operations.interface";
import { IImovelInstance, IImovelAttribute } from "../domain/imovel-model-definition.interface";

export interface IImovelRepository extends IBaseRepository<IImovelInstance, IImovelAttribute> {
  
}