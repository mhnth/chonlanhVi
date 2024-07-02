'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IAvatar, ILogo, IMenu, ISearch } from './icons';
import { cx } from '@/lib/utils';
import { UserWithoutPassword } from '@/lib/types';

interface NavBarProps {
  isLoggedIn: boolean;
  user?: UserWithoutPassword;
}

export const Navbar: React.FC<NavBarProps> = ({ isLoggedIn, user }) => {
  const [mbMenu, setMbMenu] = useState(false);
  const mbMenuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        mbMenuRef.current &&
        !mbMenuRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        setMbMenu(() => false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mbMenuRef]);

  return (
    <header className="relative bg-black text-white">
      <div className="z-10 mx-auto flex max-w-7xl items-center justify-between p-2 sm:items-baseline sm:p-2">
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
        <div className="flex gap-2">
          <form
            action=""
            className="hidden items-center gap-2 rounded-3xl bg-[#212121] px-4 py-1 sm:flex"
          >
            <ISearch />
            <input
              type="text"
              className="search-input bg-gray-800"
              placeholder="search"
            />
          </form>
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              // <img
              //   className="h-8 w-8 rounded-full object-cover"
              //   src={user?.img}
              // />
              <Link
                href={'/profile'}
                className="rounded-md bg-neutral-800 px-2 py-1"
              >
                {user?.username}
              </Link>
            ) : (
              <Link href={'/register'} className="">
                <IAvatar />
              </Link>
            )}
            <span
              ref={toggleBtnRef}
              onClick={() => setMbMenu(() => !mbMenu)}
              className="block cursor-pointer md:hidden"
            >
              <IMenu className="fill-white" />
            </span>
          </div>
        </div>
      </div>

      <div
        ref={mbMenuRef}
        className={cx(
          'absolute w-full bg-neutral-700 transition-all delay-1000',
          !mbMenu ? '-top-3 -z-10 hidden' : '',
        )}
      >
        <div className="flex flex-col">
          <form
            action=""
            className="mx-2 mb-1 mt-3 flex items-center gap-2 rounded-3xl bg-[#212121] px-4 py-2"
          >
            <ISearch />
            <input
              type="text"
              className="search-input bg-gray-800"
              placeholder="search"
            />
          </form>
          <Link className="px-3 py-2 hover:bg-neutral-900" href={'#'}>
            Bookmarks
          </Link>
          <Link className="px-3 py-2 hover:bg-neutral-900" href={'#'}>
            Booklists
          </Link>
        </div>
      </div>
    </header>
  );
};
