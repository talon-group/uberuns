'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    await handleRequest(e, SignOut, router, 'POST'); // Assuming 'POST' is the method
  };

  return (
    <nav className="relative flex flex-col md:flex-row justify-between items-center py-4 md:py-6">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center" aria-label="Logo">
          {/* <Logo /> */}
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8pafgqap2SM8xEJ7AHE8xRdRfJr4ssfhfQ&s" alt="Logo" height="32px" width="32px" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center px-3 py-2 border rounded text-gray-500 border-gray-400 hover:text-gray-900 hover:border-gray-900"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
          {/* Left-aligned links */}
          <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              STARTSEITE
            </Link>
            <Link href="/about/" className="text-gray-700 hover:text-gray-900">
              ÜBER UNS
            </Link>
            <Link href="https://nordkurve2-newsletter.ghost.io/" className="text-gray-700 hover:text-gray-900">
              NEUIGKEITEN
            </Link>
            <Link href="/about/reines" className="text-gray-700 hover:text-gray-900">
              REINES GEWISSEN
            </Link>
            <Link href="/about/podcast" className="text-gray-700 hover:text-gray-900">
              PODCAST
            </Link>
            <Link href="/about/fussballroute" className="text-gray-700 hover:text-gray-900">
              FUSSBALLROUTE
            </Link>
            <Link href="/about/stadioneck" className="text-gray-700 hover:text-gray-900">
              STADIONECK
            </Link>
          </nav>
          {/* Right-aligned buttons */}
          <div className="ml-auto flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
            {user ? (
              <>
                <Link href="/account" className="text-gray-700 hover:text-gray-900">
                  Account
                </Link>
                <form onSubmit={handleSignOut} className="inline-block">
                  <input type="hidden" name="pathName" value={pathname ?? ''} />
                  <button type="submit" className="text-gray-700 hover:text-gray-900">
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <Link href="/signin" className="text-gray-700 hover:text-gray-900">
                Anmelden
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
