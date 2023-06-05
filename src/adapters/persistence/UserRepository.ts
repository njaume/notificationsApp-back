import { MESSAGE_CATEGORIES } from "../../constants";
import { User } from "../../domain/models/User";

export interface UserRepository {
  //createUser(name: string, email: string): User;
  getUsersByCategory(category: MESSAGE_CATEGORIES): User[];
}
