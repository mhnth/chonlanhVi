import type { Metadata } from 'next';
import ReadClientLayout from './layout.client';

export const metadata: Metadata = {
  title: 'Chồn Lanh',
  description: '楓 かれん',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReadClientLayout>{children}</ReadClientLayout>;
}
