'use client';

import { IUp } from '@/components/icons';
import { cx } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react';

interface TabsProps {
  desc: string;
  parts: Prisma.JsonValue;
  chapTitles: string[];
  slug: string;
}

type Parts = [from: number, to: number][];

export const Tabs: React.FC<TabsProps> = ({
  desc,
  chapTitles,
  parts,
  slug,
}) => {
  const [tab, setTab] = useState<'about' | 'chapters'>('about');
  const [activeArc, setActiveArc] = useState<number | null>(null);

  return (
    <div className="px-4">
      <div className="mb-2 space-x-4 border-b border-gray-600 text-gray-50">
        <button
          onClick={() => setTab('about')}
          className={cx(
            'border-b-2 border-transparent py-2',
            tab === 'about' && 'border-b-blue-500',
          )}
        >
          About
        </button>
        <button
          onClick={() => setTab('chapters')}
          className={cx(
            'border-b-2 border-transparent py-2',
            tab === 'chapters' && 'border-b-blue-500',
          )}
        >
          Chapters
        </button>
      </div>

      {tab === 'about' ? (
        <>
          <div className="border-b border-gray-500 py-3">
            <span className="rounded-md bg-neutral-800 px-3 py-1 text-sm font-light">
              Phi sắc
            </span>
          </div>

          <div className="border-b border-gray-500 py-3">
            <h4>Synopsis</h4>
            <p className="mt-3 font-light leading-8 text-gray-300">{desc}</p>
          </div>
        </>
      ) : (
        <>
          <div className="">
            {parts ? (
              (parts as Parts).map((p, i) => (
                <div
                  key={i}
                  className="mt-2 rounded-md bg-neutral-800 px-3 py-1"
                >
                  <div
                    className="flex cursor-pointer justify-between py-2"
                    onClick={() => setActiveArc(i === activeArc ? null : i)}
                  >
                    <span>{`#${i + 1} Arc ${i + 1}`}</span>
                    <IUp
                      className={cx(
                        i === activeArc
                          ? 'fill-blue-500'
                          : 'rotate-180 fill-gray-400',
                      )}
                    />
                  </div>
                  {i === activeArc && (
                    <ul
                      className={cx(
                        'grid max-h-0 grid-cols-1 overflow-hidden transition-all ease-in-out md:grid-cols-2',
                        i === activeArc && 'max-h-full',
                      )}
                    >
                      {chapTitles.slice(p[0], p[1] + 1).map((title, index) => (
                        <li
                          className="m-2 mt-0 border-t-[0.5px] border-neutral-700 font-light text-gray-300"
                          key={index}
                        >
                          <Link
                            className="mt-2 block w-full"
                            href={`/novel/${slug}/${p[0] + index + 1}`}
                          >
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <ul
                className={cx(
                  'grid max-h-0 grid-cols-1 gap-4 overflow-hidden transition-all ease-in-out md:grid-cols-2',
                )}
              >
                {chapTitles.map((title, index) => (
                  <li
                    className="border-t-[0.5px] border-neutral-700 font-light text-gray-300"
                    key={index}
                  >
                    <Link href={'/'}>{title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};
