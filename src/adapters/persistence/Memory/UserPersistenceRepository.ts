import { Service } from "typedi";
import { User } from "../../../domain/models/User";
import { UserRepository } from "../UserRepository";
import { MESSAGE_CATEGORIES, NOTIFICATION_TYPES } from "../../../constants";

const Users: User[] = [
  {
    id: "1",
    name: "User1",
    email: "email1",
    subscribed: [MESSAGE_CATEGORIES.FINANCE],
    phone: "phone1",
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH, NOTIFICATION_TYPES.SMS],
  },
  {
    id: "2",
    name: "User2",
    email: "email2",
    subscribed: [MESSAGE_CATEGORIES.MOVIES],
    phone: "phone2",
    channels: [NOTIFICATION_TYPES.PUSH, NOTIFICATION_TYPES.SMS],
  },
  {
    id: "3",
    name: "User3",
    email: "email3",
    subscribed: [MESSAGE_CATEGORIES.SPORTS],
    phone: "phone3",
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.SMS],
  },
  {
    id: "3",
    name: "User3",
    email: "email3",
    subscribed: [MESSAGE_CATEGORIES.SPORTS, MESSAGE_CATEGORIES.FINANCE, MESSAGE_CATEGORIES.MOVIES],
    phone: "phone3",
    channels: [NOTIFICATION_TYPES.EMAIL, NOTIFICATION_TYPES.PUSH, NOTIFICATION_TYPES.SMS],
  }
];


@Service()
export class UserPersistenceRepository implements UserRepository {
  public getUsersByCategory(category: MESSAGE_CATEGORIES): User[] {
    return Users.filter(u => u.subscribed.includes(category))
  }
}
