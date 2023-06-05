import { MESSAGE_CATEGORIES, NOTIFICATION_TYPES } from "../../constants";
export interface Notification {
  category: MESSAGE_CATEGORIES;
  type: NOTIFICATION_TYPES[];
  message: string;
  fromUserId: string;
  fromUserEmail: string;
  userId: string;
  email: string;
  phone: string;
  date: Date;
}
