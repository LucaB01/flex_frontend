export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  confirmed: boolean;
  setupCompleted: boolean;
}
