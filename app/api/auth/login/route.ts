import { formDataToObject } from '@/lib/utils';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prismadb';
import { createAuthHeaders } from '../../utils';
import { UserLogin } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const formData = await req.formData();

  const userData = formDataToObject<UserLogin>(formData);

  if (!userData)
    return NextResponse.json(
      { error: 'Input data is missing or empty!' },
      { status: 401 },
    );

  const foundUser = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });

  if (!foundUser) {
    return NextResponse.json(
      { error: 'Not found user with this email!' },
      { status: 404 },
    );
  }

  const validPassword = await bcrypt.compare(
    userData.password,
    foundUser.password,
  );

  if (!validPassword)
    return NextResponse.json(
      {
        error: 'Invalid Password',
      },
      { status: 401 },
    );

  const { password, ...userWithoutPassword } = foundUser;

  const headers = createAuthHeaders(userWithoutPassword);

  revalidatePath('/');

  return NextResponse.json(
    { user: userWithoutPassword },
    {
      status: 200,
      headers,
    },
  );
}
