import { Inject, Service } from "typedi";
import { User } from "../../domain/models/User";
import { Message } from "../../domain/models/Message";
import { NotificationPersistenceRepository } from "../../adapters/persistence/fs/NotificationPersistenceRepository";
import { NotificationsSenderRepository } from "../../adapters/notifications/NotificationsSenderRepository";
import { PushNotificationsRepository } from "../../adapters/notifications/push/PushNotificationRepository";
import { EmailNotificationsRepository } from "../../adapters/notifications/email/EmailNotificationRepository";
import { SMSNotificationsRepository } from "../../adapters/notifications/sms/SMSNotificationRepository";
import { NOTIFICATION_TYPES } from "../../constants";
@Service()
export class NotificationService {
  private notificationPersistenceRepository: NotificationPersistenceRepository;
  private pushSenderRepository: NotificationsSenderRepository;
  private smsSenderRepository: NotificationsSenderRepository;
  private emailSenderRepository: NotificationsSenderRepository;
  constructor(
    @Inject()
    notificationPersistenceRepository: NotificationPersistenceRepository,
    @Inject() pushSenderRepository: PushNotificationsRepository,
    @Inject() smsSenderRepository: SMSNotificationsRepository,
    @Inject() emailSenderRepository: EmailNotificationsRepository
  ) {
    this.notificationPersistenceRepository = notificationPersistenceRepository;
    this.pushSenderRepository = pushSenderRepository;
    this.emailSenderRepository = emailSenderRepository;
    this.smsSenderRepository = smsSenderRepository;
  }

  public async sendMessage(message: Message, toUsers: User[]) {
    try {
      const promises = [];
      const emailUsers: User[] = [];
      const smsUsers: User[] = [];
      const pushUsers: User[] = [];
      console.log("toUsers", toUsers);
      toUsers.forEach((user) => {
        if (user.channels.includes(NOTIFICATION_TYPES.EMAIL))
          emailUsers.push(user);
        if (user.channels.includes(NOTIFICATION_TYPES.SMS)) smsUsers.push(user);
        if (user.channels.includes(NOTIFICATION_TYPES.PUSH))
          pushUsers.push(user);
      });
      if (emailUsers.length)
        promises.push(
          this.emailSenderRepository.sendNotification(message, emailUsers)
        );
      if (smsUsers.length)
        promises.push(
          this.smsSenderRepository.sendNotification(message, smsUsers)
        );
      if (pushUsers.length)
        promises.push(
          this.pushSenderRepository.sendNotification(message, pushUsers)
        );

      promises.push(
        this.notificationPersistenceRepository.createNotification(
          message,
          toUsers
        )
      );
      await Promise.allSettled(promises);
      return true;
    } catch (error) {
      //code some error handler
      console.log("error", error);
      return error;
    }
  }

  public async getLogs() {
    try {
      const logs = await this.notificationPersistenceRepository.getLogs();
      return logs;
    } catch (error) {
      //code some error handler
      console.log("error", error);
      return error;
    }
  }
}
