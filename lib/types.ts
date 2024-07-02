import { $Enums } from '@prisma/client';

export type UserLogin = {
  email: string;
  password: string;
  username: string;
};

export type UserData = {
  id: string;
  username: string;
  email: string;
  img: string;
  role: string;
};
export type UserWithoutPassword = {
  id: string;
  email: string;
  username: string;
  img: string;
  role: $Enums.Role;
};
