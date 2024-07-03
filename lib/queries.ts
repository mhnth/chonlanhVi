import prisma from '@/lib/prismadb';
export const getCurrentUser = async () => {
  const res = await fetch('/api/auth/verify', {
    method: 'POST',
  });

  const data = await res.json();

  if (!data.error) return null;

  const user = data.user;

  return user;
};

export const getTags = async () => {
  const res = await fetch('/api/tag');

  const data = await res.json();

  console.log(data);

  return data.tag;
};
