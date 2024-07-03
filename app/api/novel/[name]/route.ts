import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const slug = pathname.split('/').slice(-1)[0];

  if (!slug) return NextResponse.json({ error: 'need slug' });
  const novel = await prisma?.novel.findUnique({
    where: {
      slug,
    },
    select: {
      chapTitlesVi: true,
      cover: true,
      nameVi: true,
    },
  });

  return NextResponse.json({ novel });
}
