import { Notification } from "./notification";
import { INotificationService } from "../../interfaces/domain/notification/notification-service.interface";
import { INotification } from "../../interfaces/domain/notification/notification.interface";
import { injectable } from "inversify";

@injectable()
export class NotificationService implements INotificationService {
    private notifications = new Array<INotification>();

    addKey(message: string, key: string): void {
        this.notifications.push(new Notification(message, key));
    }

    add(message: string): void {
        this.notifications.push(new Notification(message, undefined));
    }

    hasNotifications(): boolean {
        return this.notifications.length > 0;
    }
    getNotifications(): INotification[] {
        return this.notifications;
    }
}