import { Message } from "../../domain/models/Message";
import { Notification } from "../../domain/models/Notification";
import { User } from "../../domain/models/User";

export interface NotificationRepository {
  //createUser(name: string, email: string): User;
  createNotification(
    message: Message,
    toUsers: User[]
  ): Promise<Notification[]>;
}
