import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../utils';

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({});
  }
  const { decoded, expired, valid } = verifyToken(accessToken);

  const currentUser = await prisma?.user.findUnique({
    where: {
      id: decoded,
    },
  });

  if (!currentUser) return NextResponse.json({});

  return NextResponse.json({ user: currentUser });
}
