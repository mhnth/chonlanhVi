import { Navbar } from '@/components/navbar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { verifyToken } from '../api/utils';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  const { valid, decoded } = verifyToken(token?.value!);

  return (
    <>
      <Navbar isLoggedIn={valid} user={decoded?.user} />
      <main className="">{children}</main>
    </>
  );
}
