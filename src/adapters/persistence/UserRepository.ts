import { MESSAGE_CATEGORIES } from "../../constants";
import { User } from "../../domain/models/User";

export interface UserRepository {
  getUserById(id: string): User | undefined;
  getUsersByCategory(category: MESSAGE_CATEGORIES): User[];
}
