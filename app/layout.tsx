import type { Metadata } from 'next';
import '@/assets/fonts/fonts.css';
import './globals.css';

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
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
