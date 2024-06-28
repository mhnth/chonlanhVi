'use client';

import { Header } from '@/components/header';
import ILeft from '@/components/icons/left';
import { cx } from '@/lib/utils';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChapUtil } from './chap-util';

function setTranslateMode<T>(value: T) {
  const key = 'translate-mode';
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(`Error setting localStorage key=${key}: `, error);
  }
}

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

    window.addEventListener('storage', () => {
      // When local storage changes, dump the list to
      // the console.
      console.log('change');
    });
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <main className="md:mt-3">{children}</main>
      {!scrollingDown && <ChapUtil />}
    </>
  );
}
