import { UserRole } from './UserRole.enum';

export class User {
  id?: number;
  image: string;
  name: string;
  email: string;
  isActive?: boolean;
  address: string;
  joined: string;
  role: UserRole;

  constructor(
    name: string,
    email: string,
    address: string,
    image: string,
    role: UserRole
  ) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.image = image;
    this.role = role;
    this.joined = new Date().toISOString();
  }
}
