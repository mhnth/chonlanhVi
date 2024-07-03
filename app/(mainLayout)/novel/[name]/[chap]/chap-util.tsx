'use client';

import { IBar, ILeft } from '@/components/icons';
import { cx } from '@/lib/utils';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ChapterSidebar } from './chapter-sidebar';

interface ChapUtilProps {}

const trans_options = [
  {
    label: 'Bing',
    code: 'bing',
  },
  {
    label: 'Baidu',
    code: 'baidu',
  },
  {
    label: 'STV',
    code: 'stv',
  },
  {
    label: 'Tiktok',
    code: 'tt',
  },
];

export const ChapUtil: React.FC<ChapUtilProps> = ({}) => {
  const params = useParams();
  const trans_mode = useSearchParams().get('mt');
  const [openSidebar, setOpenSidebar] = useState(false);

  const { name, chap } = params;
  const url = '/novel/' + name + '/' + chap;

  const nextChapter =
    url.replace(chap as string, `${+chap + 1}`) + '?mt=' + trans_mode;
  const preChapter =
    url.replace(chap as string, `${+chap - 1}`) + '?mt=' + trans_mode;

  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    // let previousScrollTop = 0;
    let lastScrollTop = 0;
    const handleScroll = () => {
      // console.log('scroll');
      // const { scrollTop } = document.documentElement;
      // setScrollingDown(scrollTop > previousScrollTop);
      // console.log('open', openSidebar);
      // previousScrollTop = scrollTop;
      const { scrollTop } = document.documentElement;
      const isScrollingUp = scrollTop < lastScrollTop;
      const isScrollingDown = scrollTop > lastScrollTop;

      // Người dùng cuộn lên ít nhất 20px
      if (isScrollingUp && scrollTop + 200 <= lastScrollTop) {
        setScrollingDown(false);
        lastScrollTop = scrollTop;
      }

      // Người dùng cuộn xuống ít nhất 20px
      if (isScrollingDown && scrollTop - 200 >= lastScrollTop) {
        setScrollingDown(true);
        lastScrollTop = scrollTop;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollingDown) setOpenSidebar(() => false);
  }, []);

  return (
    <div
      className={cx(
        'fixed bottom-0 w-full bg-neutral-600 py-3',
        scrollingDown && 'hidden',
      )}
    >
      <ChapterSidebar
        isOpen={openSidebar}
        slug={name as string}
        currentChap={chap as string}
      />
      <div className="mx-auto flex max-w-3xl justify-between px-3">
        <Link
          href={'#chapter' + chap}
          onClick={() => {
            setOpenSidebar(() => !openSidebar);
          }}
        >
          <IBar
            className={cx(
              openSidebar ? '[&>path]:fill-blue-500' : '[&>path]:fill-white',
            )}
          />
        </Link>
        <div className="flex items-center gap-8">
          <div className="space-x-4">
            {trans_options.map((t, i) => (
              <Link
                className={cx(t.code === trans_mode && 'text-blue-300')}
                key={i}
                href={`${url}?mt=${t.code}`}
              >
                {t.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <Link
              className={cx(
                chap === '1' && 'pointer-events-none [&>svg>path]:opacity-50',
              )}
              href={preChapter}
            >
              <ILeft />
            </Link>
            <Link href={nextChapter}>
              <ILeft className={cx('rotate-180')} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
