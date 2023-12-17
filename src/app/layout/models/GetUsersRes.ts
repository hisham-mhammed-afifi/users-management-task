import { User } from './User';

export interface GetUsersRes {
  data: User[] | null;
  total: string;
}
