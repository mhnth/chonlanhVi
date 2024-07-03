'use client';

import { TransOption } from '@/lib/constants';
import { translate } from '@/lib/translate_api';
import React, { useEffect, useState } from 'react';

interface ReaderProps {
  translatedText: string;
}

export const NReader: React.FC<ReaderProps> = ({ translatedText }) => {
  return (
    <div
      className="novel-read-bg bookerly max-w-2xl border border-gray-800 p-6 pb-14 text-justify leading-8 text-neutral-300"
      dangerouslySetInnerHTML={{
        __html: translatedText,
      }}
    />
  );
};
