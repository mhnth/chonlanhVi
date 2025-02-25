import { Navbar } from '@/components/navbar';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <main className="">{children}</main>
    </>
  );
}
