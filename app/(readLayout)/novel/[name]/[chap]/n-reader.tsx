'use client';

import React from 'react';

interface ReaderProps {
  text: string;
}

export const NReader: React.FC<ReaderProps> = ({ text }) => {
  return (
    <div
      className="novel-read-bg max-w-2xl border border-gray-800 p-6 text-justify leading-8 text-gray-400"
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
};
