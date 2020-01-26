import { IBaseModelDefinition } from "../../interfaces/domain/base/base-model-definition.interface";
import * as Sequelize from "sequelize";
import { injectable } from "inversify";

@injectable()
export abstract class BaseModel<TInstance, TAttributes> implements IBaseModelDefinition<TInstance, TAttributes> {
    abstract instance: Sequelize.Model<TInstance, TAttributes>;
    protected visibleProperties?: Array<keyof TAttributes> | undefined = undefined;

    getIncludeOption(): Sequelize.IncludeOptions {
        return {
            model: this.instance,
            attributes: this.getVisibleProperties()
        };
    }

    getVisibleProperties(): string[] {
        return this.visibleProperties as string[];
    }
}

export abstract class BaseModelIsDeleted<TInstance, TAttributes> extends BaseModel<TInstance, TAttributes> {
    getIncludeOption(): Sequelize.IncludeOptions {
        const result = super.getIncludeOption();
        result.where = {
            deleted_at: {
                $eq: null
            } 
        };
        console.log(result);
        return result;
    }
}