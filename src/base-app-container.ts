import 'reflect-metadata';
import { Container } from 'inversify';
import { IApplicationRunner } from './interfaces/application/application-runner.interface';
export declare abstract class BaseAppContainer extends Container {
    protected static instance: any;
    constructor(automaticBind?: boolean);
    protected registerServices(): void;
    private registerCommonBase;
    protected abstract registerCommon(): any;
    protected registerFilters(): void;
    protected registerDomain(): void;
    protected registerInfra(): void;
    getScope(requestData: any): Container;
    protected abstract registerModels(): void;
    protected abstract registerRepository(): void;
    protected abstract registerDomainValidations(): void;
    getMainApp(): IApplicationRunner;
}
