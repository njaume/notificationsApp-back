import { Inject, Service } from "typedi";
import { UserPersistenceRepository } from "../../adapters/persistence/Memory/UserPersistenceRepository";
import { UserRepository } from "../../adapters/persistence/UserRepository";
import { Message } from "../../domain/models/Message";
import { NotificationService } from "./NotificationService";
@Service()
export class UserService {
  private userRepository: UserRepository;
  private notificationService: NotificationService;
  constructor(
    @Inject() userRepository: UserPersistenceRepository,
    @Inject() notificationService: NotificationService
  ) {
    this.userRepository = userRepository;
    this.notificationService = notificationService;
  }

  public async sendMessage(message: Message) {
    try {
      const users = await this.userRepository.getUsersByCategory(
        message.category
      );
      await this.notificationService.sendMessage(message, users);

      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  }
}
