import { injectable } from "inversify";
import * as moment from "moment";
import * as Sequelize from "sequelize";
import { Transaction } from "sequelize";
import * as HTTP_STATUS_CODES from "http-status-codes";
import { IBaseService } from "../../../interfaces/domain/service/base/base-service.interface";
import sequelize = require("sequelize");
import { BaseRequestService } from "./base.request.service";
import { INotificationService } from "../../../interfaces/domain/notification/notification-service.interface";
import { IUnitOfWork } from "../../../interfaces/infra/context/unit-of-work.interface";
import { IBaseAttribute } from "../../models/base/base.attribute";
import { IBaseRepository } from "../../../interfaces/repository/base/base-operations.interface";
import { ResponseDataHelper } from "../../../helpers/response-request-data/response-data-helper";
import { BaseModel } from "../../base/base.model";
import { IBaseValidation } from "../../../interfaces/domain/validation/base/base-validation.interface";

@injectable()
export abstract class BaseService<TInstance extends Sequelize.Instance<TAttributes>, TAttributes 
        extends IBaseAttribute> extends BaseRequestService 
        implements IBaseService <TInstance, TAttributes> {

    constructor(
        readonly repository: IBaseRepository<TInstance, TAttributes>,
        protected readonly validation: IBaseValidation<TInstance, TAttributes>,
        readonly notifications: INotificationService,
        readonly unitOfWork: IUnitOfWork
    ) {
        super();
    }

    protected defaultInclude: Array<sequelize.Model<any, any> | sequelize.IncludeOptions> = [];

    //#region PUT
    async put(requestData: any): Promise<any> {
        const id = requestData.params.id; 
        requestData.body.id = id;
        const current = await this.repository.findById(id);
        if (!current) {
            return this.notFound();
        }
        const attributes: TAttributes = { ...current.get(), ...requestData.body };

        // TODO: verificar
        await this.validation.validatePut(attributes, current);


        if (this.notifications.hasNotifications()) {
            return this.badRequest(this.notifications.getNotifications());
        }

        return this.unitOfWork.getTransaction().then(async (t) => {
            try {
                const result = await this.updateById(id, attributes, t);

                // Uma validação pós persistência ainda pode ser feita, gerando notificações que implicam em rollback
                if (this.notifications.hasNotifications()) {
                    await t.rollback();
                    return this.badRequest(this.notifications.getNotifications());
                }
                await t.commit();
                return ResponseDataHelper.success(HTTP_STATUS_CODES.OK, result);
            } catch (err) {
                await t.rollback();
                throw err;
            }
        });
    }

    protected updateById(id: any, attributes: TAttributes, t: Transaction): PromiseLike<any> {
        return this.repository.updateById(id, attributes, t).then(result =>
            (result.length > 1 ? result[1][0] : attributes)) as PromiseLike<any>;
    }
    //#endregion

    //#region POST
    async post(requestData: any): Promise<any> {
        // TODO: verificar
        await this.validation.validatePost(requestData.body);
        if (this.notifications.hasNotifications()) {
            return this.badRequest(this.notifications.getNotifications());
        }

        return await this.unitOfWork.getTransaction().then(async (t) => {
            try {
                const result = await this.create(requestData, t);
                // Uma validação pós persistência ainda pode ser feita, gerando notificações que implicam em rollback
                if (this.notifications.hasNotifications()) {
                    await t.rollback();
                    return this.badRequest(this.notifications.getNotifications());
                }
                await t.commit();
                return this.created(result);
            } catch (err) {
                await t.rollback();
                throw err;
            }
        });
    }

    protected create(requestData: any, t: Transaction): PromiseLike<any> {
        if(!requestData.createAt){
            requestData.createAt = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        }
        return this.repository.create(requestData.body, t);
    }
    //#endregion

    //#region DELETE
    async delete(id: string): Promise<any> {
        let requestData;
        const dataBase = new Date();
        const dateTime = new Date(dataBase.valueOf() - dataBase.getTimezoneOffset() * 60000);
        // TODO: verificar
        // moment().format('YYYY-MM-DD HH:mm:ss').toString()
        requestData = {
            body: {
                id,
                deletedAt: dateTime
            }
        } as any;
        
        const current = await this.repository.findById(id);
        if (!current) {
            return this.notFound();
        }
        const attributes: TAttributes = { ...current.get(), ...requestData.body };

        // TODO: verificar
        //await this.validation.validatePut(attributes, current);


        if (this.notifications.hasNotifications()) {
            return this.badRequest(this.notifications.getNotifications());
        }

        return this.unitOfWork.getTransaction().then(async (t) => {
            try {
                const result = await this.updateById(id, attributes, t);

                // Uma validação pós persistência ainda pode ser feita, gerando notificações que implicam em rollback
                if (this.notifications.hasNotifications()) {
                    await t.rollback();
                    return this.badRequest(this.notifications.getNotifications());
                }
                await t.commit();
                return ResponseDataHelper.success(HTTP_STATUS_CODES.OK, result);
            } catch (err) {
                await t.rollback();
                throw err;
            }
        });
    }
    //#endregion

    //#region GET
    get(requestData: any): PromiseLike<any> {

        console.log("**************************************************");

        if (requestData.params && requestData.params.id) {
            return this.getById(requestData.params.id, requestData);
        } else {
            return this.getAll(requestData);
        }
    }

    async getAll(requestData: any): Promise<any> {
        
        const options = {
            attributes: {
                exclude: ['deletedAt']
            }
        } as any;


        // TODO:
        // colocar as querystrings aqui e logica para controllar o filtro
        if(requestData.query){
            options["where"] = requestData.query;
        }

        return await this.repository.find(options);
    }

    protected getDefaultOptions(requestData: any): sequelize.FindOptions<TAttributes & TInstance> {
        const result: sequelize.FindOptions<TAttributes & TInstance> = this.repository.domain instanceof BaseModel ? {
            attributes: this.repository.domain.getVisibleProperties(),
            include: this.defaultInclude,
        } : {};

        if (requestData.queryString) {
            if (requestData.queryString.offset) {
                result.offset = +requestData.queryString.offset;
            }

            if (requestData.queryString.limit) {
                result.limit = +requestData.queryString.limit;
            }

            if (requestData.queryString.order) {
                // Quebrar por campos na vírgula, quebrar o campo asc/desc no espaço
                const order: string[][] = [];
                requestData.queryString.order.split(',').forEach(element => {
                    order.push(element.split(' '));
                });
                result.order = order;
            }
        }

        return result;
    }

    protected getById(id: any, requestData: any): PromiseLike<any> {
        return this.findById(id, requestData).then(result => result ?
            this.ok(result) : this.notFound());
    }

    protected findById(id: any, requestData: any): PromiseLike<TInstance | null> {
        return this.repository.findById(id, this.getDefaultOptions(requestData));
    }
    //#endregion


}