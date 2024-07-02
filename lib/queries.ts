export const getCurrentUser = async () => {
  const res = await fetch('/api/auth/verify', {
    method: 'POST',
  });

  const data = await res.json();

  if (!data.error) return null;

  const user = data.user;

  return user;
};
