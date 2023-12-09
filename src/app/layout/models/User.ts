export interface User {
  id: number;
  image: string;
  name: string;
  email: string;
  isActive: boolean;
  address: string;
  joined: string;
  role: UserRole;
}

export enum UserRole {
  Admin,
  Contributer,
  Viewer,
  Editor,
}
