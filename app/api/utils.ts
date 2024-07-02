import { UserWithoutPassword } from '@/lib/types';
import jwt from 'jsonwebtoken';

const createToken = (
  user: UserWithoutPassword,
  secret: string,
  expiresIn: string | number,
) => {
  const payload = { user };
  return jwt.sign(payload, secret, { expiresIn });
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const createAuthHeaders = (user: UserWithoutPassword) => {
  const maxAge = 1000 * 60 * 60 * 24 * 365; // 1y
  const access_token = createToken(user, ACCESS_TOKEN_SECRET!, maxAge);

  const setCookieHeader = `access_token=${access_token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}
  `;

  const headers = {
    'Content-Type': 'application/json',
    'Set-Cookie': setCookieHeader,
  };

  return headers;
};

export const verifyToken = (token: string) => {
  if (!token) return { valid: false, expired: false, decoded: null };
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET!);

    return {
      valid: true,
      expired: false,
      decoded: JSON.parse(JSON.stringify(decoded)),
    };
  } catch (error) {
    console.log('ERR verify token:', error);

    // Token verification failed
    if (error instanceof jwt.TokenExpiredError) {
      // Token is expired
      return { valid: false, expired: true, decoded: null };
    } else {
      // Some other error
      return { valid: false, expired: false, decoded: null };
    }
  }
};
