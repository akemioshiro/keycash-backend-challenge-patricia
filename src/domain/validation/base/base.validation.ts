import { WhereOptions } from "sequelize";
import { IReadOperations } from "../../../interfaces/repository/base/read.interface";
import { IBaseAttribute } from "../../models/base/base.attribute";
import { IBaseValidation } from "../../../interfaces/domain/validation/base/base-validation.interface";
import { INotificationService } from "../../../interfaces/domain/notification/notification-service.interface";
import { injectable } from "inversify";
import * as Joi from "joi";

@injectable()
export abstract class BaseValidation<TInstance, TAttribute extends IBaseAttribute> implements IBaseValidation<TInstance, TAttribute> {
  constructor(
    protected readonly repository: IReadOperations<TInstance, TAttribute>, 
    private readonly notification: INotificationService) { }

  protected fieldMessage(message: string, key: string) {
    this.notification.addKey(message, key);
  }

  protected message(message: string) {
    this.notification.add(message);
  }

  protected validDuplicate(where: WhereOptions<TAttribute & TInstance>, message: (x: TInstance) => string, field: string): PromiseLike<void> {
    return this.repository.findOne({
      where
    }).then(x => {
      if (x) {
        this.fieldMessage(message(x), field);
      }
    });
  }

  protected hasNotification() {
    return this.notification.hasNotifications();
  }

  abstract getSchema(): Joi.ObjectSchema;

  parse(queryString: any): IReadOperations<TInstance, TAttribute> {
    return this.repository.query();
  }

  validatePut(attributes: TAttribute, currentInstance: TInstance): Promise<void> {
    this.validate(attributes);
    return Promise.resolve();
  }

  validatePost(attributes: TAttribute): Promise<void> {
    this.validate(attributes);
    return Promise.resolve();
  }

  validate(attributes: TAttribute): boolean {
    const schema = this.getSchema();
    const result = this.validateSchema(attributes, schema);
    return result;
  }

  protected validateSchema(attributes: TAttribute, schema: Joi.ObjectSchema): boolean {
    const validator = Joi.validate(attributes, schema, { abortEarly: false });
    if (validator.error) {
      validator.error.details.map(item => {
        this.fieldMessage(item.message, item.path.join("."));
      });
      return false;
    }
    return true;
  }
}
