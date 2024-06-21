'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  header: string;
  subtitle: string;
  imageSrc: string;
  buttonText: string;
  buttonLink: string;
}

export default function HeroSection({
  header,
  subtitle,
  imageSrc,
  buttonText,
  buttonLink
}: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt="Hero Image"
          // layout="fill"
          // objectFit="cover"
          className="object-center object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
      <div className="relative max-w-6xl px-4 py-16 mx-auto sm:py-24 lg:px-8 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">{header}</h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl">{subtitle}</p>
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => router.push(buttonLink)}
              className="py-3 px-6 text-lg font-semibold color-red-800"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
