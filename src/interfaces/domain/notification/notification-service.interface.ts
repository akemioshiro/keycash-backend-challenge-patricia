import { INotification } from "./notification.interface";

export interface INotificationService {
    addKey(message: string, key: string): void;
    add(message: string): void;
    hasNotifications(): boolean;
    getNotifications(): INotification[];
}