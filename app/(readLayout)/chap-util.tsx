'use client';

import ILeft from '@/components/icons/left';
import { cx } from '@/lib/utils';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';

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
];

export const ChapUtil: React.FC<ChapUtilProps> = ({}) => {
  const params = useParams();
  const trans_mode = useSearchParams().get('mt');

  const { name, chap } = params;
  const url = '/novel/' + name + '/' + chap;
  console.log('url', url);

  const nextChapter =
    url.replace(chap as string, `${+chap + 1}`) + '?mt=' + trans_mode;
  const preChapter =
    url.replace(chap as string, `${+chap - 1}`) + '?mt=' + trans_mode;

  return (
    <div className="fixed bottom-0 w-full bg-neutral-600 py-3">
      <div className="mx-auto flex max-w-3xl justify-between px-3">
        <div>Chapters</div>
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
              href={url.replace(chap as string, `${+chap - 1}`)}
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
