import { Message } from "../../domain/models/Message";
import { User } from "../../domain/models/User";

export interface NotificationsSenderRepository {
  //createUser(name: string, email: string): User;
  sendNotification(message: Message, users: User[]): Promise<{ status: boolean }>;
}
