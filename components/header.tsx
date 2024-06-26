'use client';

import Link from 'next/link';
import React from 'react';
import IAvatar from './icons/avatar';
import ILogo from './icons/logo';
import ISearch from './icons/search';

export const Header: React.FC = () => {
  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-baseline justify-between p-2 md:p-6">
        <nav className="flex items-baseline gap-6">
          <div className="flex items-baseline gap-1">
            <ILogo />
            <div className="flex text-xl">CHONLANH</div>
          </div>
          <div className="flex gap-3">
            <Link href={'#'}>Bookmarks</Link>
            <Link href={'#'}>Booklists</Link>
          </div>
        </nav>
        <div className="flex">
          <form
            action=""
            className="flex items-center gap-2 rounded-3xl bg-[#212121] px-4 py-2"
          >
            <ISearch />
            <input
              type="text"
              className="search-input bg-gray-800"
              placeholder="search"
            />
          </form>
          <div className="p-2">
            <IAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};
