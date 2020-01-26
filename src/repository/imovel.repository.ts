import { BaseRepository } from "./base/base-repository";
import { injectable, inject } from "inversify";
import { IBaseFilter } from "../interfaces/domain/base/base-filter.interface";
import { TYPES } from "../interfaces/types";
import { IImovelInstance, IImovelAttribute, IImovelModel } from "../interfaces/domain/imovel-model-definition.interface";
import { IImovelRepository } from "../interfaces/repository/imovel-repository.interfacey";

@injectable()
export class ImovelRepository extends BaseRepository<IImovelInstance, IImovelAttribute> implements IImovelRepository {
  
  constructor(@inject(TYPES.models.IImovelModel) domain: IImovelModel,
        @inject(TYPES.repositories.filters.IIsDeletedFilter) filter: IBaseFilter
      ) {
    super(domain, filter);
  }
}