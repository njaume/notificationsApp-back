import { Service } from "typedi";
import { NotificationRepository } from "../NotificationRepository";
import { Notification } from "../../../domain/models/Notification";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { Message } from "../../../domain/models/Message";
import { User } from "../../../domain/models/User";

@Service({ global: true })
export class NotificationPersistenceRepository
  implements NotificationRepository
{
  private db: any;
  public async createNotification(
    message: Message,
    toUsers: User[] = []
  ): Promise<Notification[]> {
    await this.db.read();
    const notifSent = toUsers.map((user) => {
      const notification: Notification = {
        ...message,
        type: user.channels,
        fromUserEmail: user.email,
        fromUserId: user.id,
      };
      this.db.data.notifications.push(notification);
      return notification;
    });
    await this.db.write()

    return notifSent;
  }
  construct() {
    const __dirname = dirname(fileURLToPath("./"));
    const file = join(__dirname, "db.json");

    // Configure lowdb to write data to JSON file
    const adapter = new JSONFile(file);
    const defaultData = { notifications: [] };
    const db = new Low(adapter, defaultData);
    this.db = db;
  }
}
