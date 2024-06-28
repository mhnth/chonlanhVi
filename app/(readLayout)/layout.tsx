import type { Metadata } from 'next';
import ReadClientLayout from './layout.client';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReadClientLayout>{children}</ReadClientLayout>;
}
