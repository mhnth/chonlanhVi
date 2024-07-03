import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  const tag = await prisma?.tag.findMany();
  return NextResponse.json({ tag });
}
