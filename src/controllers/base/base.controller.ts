import { injectable } from "inversify";
import * as Sequelize from "sequelize";
import { IBaseAttribute } from "../../domain/models/base/base.attribute";
import { IBaseController } from "../../interfaces/controllers/base/base-controller.interface";
import { INotificationService } from "../../interfaces/domain/notification/notification-service.interface";
import { BaseRequestController } from "./base.request.controller";
import { IBaseService } from "../../interfaces/domain/service/base/base-service.interface";
import { httpGet, request, response, httpPost, httpDelete, requestParam, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
import * as HTTP_STATUS_CODES from "http-status-codes";

@injectable()
export abstract class BaseController<TInstance extends Sequelize.Instance<TAttributes>, TAttributes extends IBaseAttribute>
    extends BaseRequestController implements IBaseController<TInstance, TAttributes> {

    constructor(
        protected readonly service: IBaseService<TInstance, TAttributes>,
        protected readonly notifications: INotificationService) {
        super();
    }

    @httpGet("/")
    async getAll(@request() req: Request, @response() res: Response) {

        const result = await this.service.get(req);
        if (result && !this.notifications.hasNotifications()) {
            this.sendSuccessMessage(res, result);
        }
        else {
            this.sendErrorMessage(res);
        }
    }
    @httpGet("/:id")
    async getById(@requestParam("id") id: string, @request() req: Request, @response() res: Response) {

            // setting params
            req = {
                params: {
                    id
                }
            } as any;
            const result = await this.service.get(req);
            if (result && !this.notifications.hasNotifications()) {
                this.sendSuccessMessage(res, result);
            } else {
                this.sendErrorMessage(res);
            }
    }

    @httpPost("/")
    async post(@request() req: Request, @response() res: Response) {
        try {

            const result = await this.service.post(req);
            if (result && !this.notifications.hasNotifications()) {
                this.sendSuccessMessage(res, result);
            }
            else {
                this.sendErrorMessage(res);
            }

        } catch (err) {
            this.sendErrorException(res, err);
        }
    }

    @httpDelete("/:id")
    async delete(@requestParam("id") id: string, @request() req: Request, @response() res: Response) {
        try {

            const result = await this.service.delete(id);
            if (result && !this.notifications.hasNotifications()) {
                this.sendSuccessMessage(res, result);
            }
            else {
                this.sendErrorMessage(res);
            }
        } catch (err) {
            this.sendErrorException(res, err);
        }
    }

    @httpPut("/:id")
    async put(@request() req: Request, @response() res: Response) {
        try {
                 // console.log(req.params);
                 const result = await this.service.put(req);
                 if (result && !this.notifications.hasNotifications()) {
                     this.sendSuccessMessage(res, result);
                 }
                 else {
                     this.sendErrorMessage(res);
                 }

        } catch (err) {
            this.sendErrorException(res, err);
        }
    }

    private sendErrorException(res: Response, err: any) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST);
        res.send(this.badRequest(err));
    }

    private sendSuccessMessage(res: Response, result: any) {
        res.status(HTTP_STATUS_CODES.OK);
        res.send(result);
    }

    private sendErrorMessage(res: Response) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST);
        res.send(this.badRequest(this.notifications.getNotifications()));
    }
} 
