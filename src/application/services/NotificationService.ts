import { Inject, Service } from "typedi";
import { User } from "../../domain/models/User";
import { Message } from "../../domain/models/Message";
import { NotificationPersistenceRepository } from "../../adapters/persistence/low-db/NotificationPersistenceRepository";
import { NotificationsSenderRepository } from "../../adapters/notifications/NotificationsRepository";
@Service()
export class NotificationService {
  private notificationPersistenceRepository: NotificationPersistenceRepository;
  private notificationSenderRepository: NotificationsSenderRepository
  constructor(
    @Inject()
    notificationPersistenceRepository: NotificationPersistenceRepository,
    @Inject() notificatioSenderRepository: NotificationsSenderRepository
  ) {
    this.notificationPersistenceRepository = notificationPersistenceRepository;
    this.notificationSenderRepository = notificatioSenderRepository
  }

  public async sendMessage(message: Message, toUsers: User[]) {

    return;
  }
}
