import type { Metadata } from 'next';
import { ChapUtil } from './chap-util';

export const metadata: Metadata = {
  title: 'Chồn Lanh',
  description: '楓 かれん',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="md:mt-3">{children}</main>
      <ChapUtil />
    </>
  );
}
