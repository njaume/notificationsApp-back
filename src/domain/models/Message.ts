import { MESSAGE_CATEGORIES } from "../../constants";
export interface Message {
  userId: string;
  name: string;
  email: string;
  phone: string;
  category: MESSAGE_CATEGORIES;
  date: Date;
  message: string;
}
