import { INotification } from "../../interfaces/domain/notification/notification.interface";

export class Notification implements INotification {
    constructor(readonly message: string, readonly code: any) { }
}
