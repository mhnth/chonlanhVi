import { cx } from '@/lib/utils';
import { novel } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  slug: string;
  currentChap: string;
}

export const ChapterSidebar: React.FC<Props> = ({
  isOpen,
  slug,
  currentChap,
}) => {
  const [novel, setNovel] = useState<novel>();

  const fetchNovel = async () => {
    const res = await fetch(`/api/novel/${slug}`);

    const data = await res.json();

    if (!data.error) setNovel(() => data.novel);
  };

  useEffect(() => {
    fetchNovel();
  }, []);

  return (
    <div
      className={cx(
        'chapter-bar absolute bottom-full h-[calc(100vh-48px)] w-[300px] overflow-y-scroll bg-neutral-800 transition-all duration-500 ease-in-out',
        !isOpen ? '-ml-[300px]' : '',
      )}
    >
      <Link
        href={`/novel/${slug}`}
        className="sticky left-0 top-0 flex items-center gap-2 bg-neutral-950 p-2"
      >
        <img
          src={novel?.cover}
          className="h-16 w-14 rounded-md object-cover"
          alt=""
        />
        {novel?.nameVi}
      </Link>
      <div className="px-4 text-gray-400">
        {novel &&
          novel.chapTitlesVi.map((n, i) => (
            <Link
              href={`/novel/${slug}/${i + 1}`}
              key={i}
              id={'chapter' + (i + 4)}
              className={cx(
                'block border-b border-neutral-700 px-1 py-2 hover:bg-neutral-700 hover:text-blue-300',
                i + 1 == +currentChap && 'text-blue-400',
              )}
            >
              {n}
            </Link>
          ))}
      </div>
    </div>
  );
};
