'use client';

import Link from 'next/link';
import React from 'react';

interface ReaderProps {
  translatedText: string;
  title: string;
  slug: string;
}

export const NReader: React.FC<ReaderProps> = ({
  translatedText,
  slug,
  title,
}) => {
  return (
    <div className="novel-read-bg bookerly max-w-2xl border border-gray-800 p-6 pb-20 text-justify leading-8 text-neutral-300">
      <Link
        className="mx-auto mb-2 inline-block border-b border-b-gray-700"
        href={`/novel/${slug}`}
      >
        {title}
      </Link>
      <div
        className="space-y-3"
        dangerouslySetInnerHTML={{
          __html: translatedText,
        }}
      />
    </div>
  );
};
