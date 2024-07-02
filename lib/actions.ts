'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { formDataToObject } from './utils';
import { NovelUpload } from './types';
import prisma from './prismadb';

type Tag = {
  code: number;
  nameVi: string | null;
  name: string | null;
};

export async function Logout() {
  cookies().delete('access_token');

  revalidatePath('/');
  redirect('/');
}

export async function createTag(params: FormData) {
  const data = formDataToObject<Tag>(params);

  try {
    const tag = await prisma?.tag.create({
      data: {
        code: data?.code || 699,
        name: data?.name,
        nameVi: data?.nameVi,
      },
    });

    return tag;
  } catch (error) {
    console.log('ERR create Tag:', error);
    return null;
  }
}

export async function createNovel(params: NovelUpload) {
  try {
    const novel = await prisma?.novel.create({ data: params });

    return novel;
  } catch (error) {
    console.log('ERR create Novel:', error);

    return null;
  }
}
