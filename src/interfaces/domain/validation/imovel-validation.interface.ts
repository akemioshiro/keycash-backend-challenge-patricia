import { IBaseValidation } from "./base/base-validation.interface";
import { IImovelInstance, IImovelAttribute } from "../imovel-model-definition.interface";

export interface IImovelValidation extends IBaseValidation<IImovelInstance, IImovelAttribute> { }