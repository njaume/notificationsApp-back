import { Inject, Service } from "typedi";
import { UserPersistenceRepository } from "../../adapters/persistence/Memory/UserPersistenceRepository";
import { UserRepository } from "../../adapters/persistence/UserRepository";
import { Message } from "../../domain/models/Message";
import { NotificationService } from "./NotificationService";
@Service()
export class UserService {
  userRepository: UserRepository;
  notificationService: NotificationService;
  constructor(
    @Inject() userRepository: UserPersistenceRepository,
    @Inject() notificationService: NotificationService
  ) {
    this.userRepository = userRepository;
    this.notificationService = notificationService;
  }
  async getUserById(id: string) {
    try {
      console.log('getUserById', id)
      const user = await this.userRepository.getUserById(id);
      return user;
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }
  async sendMessage(message: Message) {
    try {
      console.log("message", message);
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
