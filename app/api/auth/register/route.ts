import { formDataToObject } from '@/lib/utils';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prismadb';
import { UserLogin } from '@/lib/types';
import { createAuthHeaders } from '../../utils';

export async function POST(req: Request) {
  const formData = await req.formData();

  const userData = formDataToObject<UserLogin>(formData);

  if (!userData)
    return NextResponse.json(
      { error: 'Input data is missing or empty!' },
      { status: 401 },
    );

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
      },
    });

    const { password, ...userWithoutPassword } = newUser;

    const headers = createAuthHeaders(userWithoutPassword);

    return NextResponse.json(
      { user: userWithoutPassword },
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.log('ERR register user:', error);

    return NextResponse.json({ error }, { status: 400 });
  }
}
