import { Service } from "typedi";
import { NotificationRepository } from "../NotificationRepository";
import { Notification } from "../../../domain/models/Notification";
import { Message } from "../../../domain/models/Message";
import { User } from "../../../domain/models/User";
const fs = require("fs");
@Service({ global: true })
export class NotificationPersistenceRepository
  implements NotificationRepository
{
  private filename: string = "datastore.json";

  constructor() {
    // Filename where datas are going to store

    try {
      fs.accessSync(this.filename);
    } catch (err) {
      // If file not exist
      // it is created with empty array
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getLogs() {
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });

    const records = JSON.parse(jsonRecords);
    return records.sort((x: Notification, y: Notification) => {
      return new Date(y.date).getTime() - new Date(x.date).getTime();
    });
  }
  public async createNotification(
    message: Message,
    toUsers: User[] = []
  ): Promise<Notification[]> {
    // Assign unique Id to each record

    // Read filecontents of the datastore
    const jsonRecords = await fs.promises.readFile(this.filename, {
      encoding: "utf8",
    });

    // Parsing JSON records in JavaScript
    // object type records
    const objRecord = JSON.parse(jsonRecords);

    // Adding new record

    const notifSent = toUsers.map((user) => {
      const notification: Notification = {
        ...message,
        type: user.channels,
        fromUserEmail: user.email,
        fromUserId: user.id,
      };
      objRecord.push(notification);
      return notification;
    });

    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(objRecord, null, 2)
    );

    return notifSent;
  }
}
