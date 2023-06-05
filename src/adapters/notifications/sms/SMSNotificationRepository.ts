import { Message } from "../../../domain/models/Message";
import { User } from "../../../domain/models/User";
import { NotificationsSenderRepository } from "../NotificationsRepository";

export class PushNotificationsRepository implements NotificationsSenderRepository {
  //createUser(name: string, email: string): User;
  public async sendNotification(
    message: Message,
    users: User[]
  ): Promise<{ status: boolean }> {
    return { status: true };
  }
}
