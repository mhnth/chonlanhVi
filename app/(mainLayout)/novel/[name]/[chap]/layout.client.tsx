'use client';

import { useState, useEffect } from 'react';
import { ChapUtil } from './chap-util';

export default function ReadClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    let previousScrollTop = 0;
    const handleScroll = () => {
      console.log('scroll');

      const { scrollTop } = document.documentElement;

      setScrollingDown(scrollTop > previousScrollTop);
      previousScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main className="md:mt-3">{children}</main>
      {!scrollingDown && <ChapUtil />}
    </>
  );
}
