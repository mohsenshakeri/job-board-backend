import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  email: string;
  password: string;
  role?: UserRole; // Optional: default is set in entity
}
