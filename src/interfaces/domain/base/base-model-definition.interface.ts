import * as Sequelize from "sequelize";

export interface IBaseModelDefinition<TInstance, TAttributes> {
    instance: Sequelize.Model<TInstance, TAttributes>;

}

export interface IBaseModelDefinitionExtended<TInstance, TAttributes>
            extends IBaseModelDefinition<TInstance, TAttributes> {

    getIncludeOption(): Sequelize.IncludeOptions;
    getVisibleProperties(): string[];
} 