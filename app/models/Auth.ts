import { User } from './User';

export interface Auth {
  jwt: string;
  user: User;
}
