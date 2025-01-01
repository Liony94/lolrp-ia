export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  description?: string;
  region?: string;
  profileImage?: string;
}
