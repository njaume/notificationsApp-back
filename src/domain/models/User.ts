import { MESSAGE_CATEGORIES, NOTIFICATION_TYPES } from "../../constants";
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscribed: MESSAGE_CATEGORIES[];
  channels: NOTIFICATION_TYPES[];
}
