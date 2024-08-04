import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';
import { Facebook, Instagram, MessageCircleDashed, MessageCircleXIcon, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 bg-zinc-900">
      <div className="grid grid-cols-1 gap-8 py-12 text-white transition-colors duration-150 border-b lg:grid-cols-12 border-zinc-600 bg-zinc-900">
        <div className="col-span-1 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center flex-initial font-bold md:mr-24"
          >
            <span className="mr-2 border rounded-full border-zinc-700">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8pafgqap2SM8xEJ7AHE8xRdRfJr4ssfhfQ&s"
                width="128px"
                height="128px"
              />
            </span>
            <span className="whitespace-nowrap">Nordkurve12 e.V.</span>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          {/* Optional additional links can be added here */}
        </div>
        <div className="col-span-1 lg:col-span-2">
          {/* Optional additional links can be added here */}
        </div>
        <div className="flex items-start col-span-1 text-white lg:col-span-6 lg:justify-end">
          <div className="flex items-center h-10 mx-1 space-x-6">
            <a aria-label="Github" href="https://github.com/talon-group">
              <GitHub />
            </a>
          </div>
          <div className="flex items-center h-10 mx-1 space-x-6">
            <a aria-label="Instagram" href="https://instagram.com/nordkurve">
              <Instagram />
            </a>
          </div>
          <div className="flex items-center h-10 mx-1 space-x-6">
            <a aria-label="Twitter" href="https://twitter.com/nordkurve">
              <Twitter />
            </a>
          </div>
          <div className="flex items-center h-10 mx-1 space-x-6">
            <a aria-label="Facebook" href="https://facebook.com/nordkurve12">
              <Facebook />
            </a>
          </div>
          <div className="flex items-center h-10 mx-1 space-x-6">
            <a aria-label="Telegram" href="https://t.me/nordkurve12">
              <MessageCircleDashed />
            </a>
          </div>
          <div className="flex items-center h-10 mx-1 space-x-6">
            <a aria-label="Whatsapp" href="https://whatsapp.com/channel/0029VaGJpBP23n3axYoFie0S">
              <MessageCircleXIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-12 space-y-4 md:flex-row bg-zinc-900">
        <div>
          <span className="text-white">
            &copy; {new Date().getFullYear()} Entworfen von Nordkurve-Mitglied Liam Arbuckle (Talonova Aerospace) in Australien. 🇦🇺 🤝 🇩🇪
          </span>
        </div>
        <div>
          <Link legacyBehavior href="/impressum">
            <a className="text-white underline">Impressum</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
