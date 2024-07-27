'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          {/* <Logo /> */}
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8pafgqap2SM8xEJ7AHE8xRdRfJr4ssfhfQ&s" height="32px" width="32px" />
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          {/* <Link href="/newsletter" className={s.link}> {/* https://nordkurve12.vercel.app 
            Newsletter
          </Link> */}
          <Link href="/about/" className={s.link}>
            ÜBER UNS
          </Link>
          <Link href="/about/reines" className={s.link}>
            REINES GEWISSEN
          </Link>
          <Link href="/about/podcast" className={s.link}>
            PODCAST
          </Link>
          <Link href="/about/fussballroute" className={s.link}>
            FUSSBALLROUTE
          </Link>
          <Link href="/about/stadioneck" className={s.link}>
            STADIONECK
          </Link>
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <>
            <Link href="/signin" className={s.link}>
              Sign In (new member)
            </Link>
            <Link href="/signin" className={s.link}>
              Sign In (existing member)
            </Link>
          </>
        )}
      </div>
    </div>
  );
}