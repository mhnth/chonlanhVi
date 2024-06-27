'use client';

import Link from 'next/link';
import React from 'react';
import IAvatar from './icons/avatar';
import ILogo from './icons/logo';
import ISearch from './icons/search';
import { IMenu } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-2 sm:items-baseline sm:p-2">
        <nav className="flex items-baseline">
          <Link href={'/'} className="flex items-baseline gap-1">
            <ILogo />
            <div className="mr-6 hidden text-xl sm:block">CHONLANH</div>
          </Link>
          <div className="hidden gap-3 sm:flex">
            <Link href={'#'}>Bookmarks</Link>
            <Link href={'#'}>Booklists</Link>
          </div>
        </nav>
        <div className="flex">
          <form
            action=""
            className="hidden items-center gap-2 rounded-3xl bg-[#212121] px-4 py-2 sm:flex"
          >
            <ISearch />
            <input
              type="text"
              className="search-input bg-gray-800"
              placeholder="search"
            />
          </form>
          <div className="flex gap-1 p-2">
            <IAvatar />
            <span className="cursor-pointer">
              <IMenu className="fill-white" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
