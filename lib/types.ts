import { $Enums, Prisma, novel } from '@prisma/client';

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

export type NovelUpload = {
  slug: string;
  cover: string;
  name: string;
  author: string;
  desc: string;
  chapTitles: string[];
  nameVi: string;
  authorVi: string;
  descVi: string;
  tagsVi: string[];
  chapTitlesVi: string[];
  parts: Prisma.JsonValue;
  tags: number[];
};
