"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = {
  coverImage: string;
  title?: string;
  subtitle?: string;
};

export default function LocationHero({ coverImage }: Props) {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const heroImage = container.current?.querySelector(".hero-image");
      const heroContent =
        container.current?.querySelectorAll(".hero-content > *");

      const timeline = gsap.timeline();

      // IMAGE ZOOM
      if (heroImage) {
        timeline.from(heroImage, {
          scale: 1.15,
          duration: 2,
          ease: "power3.out",
        });
      }

      // TEXT REVEAL
      if (heroContent?.length) {
        timeline.from(
          heroContent,
          {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.18,
            ease: "power3.out",
          },
          "-=1.2",
        );
      }
    },
    {
      scope: container,
      dependencies: [],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={container}
      className='relative h-[75vh] min-h-[550px] md:h-[95vh] overflow-hidden bg-[#182b2c]'>
      {/* HERO IMAGE */}
      <Image
        src={coverImage}
        alt='Discover Dharavandhoo Maldives'
        fill
        priority
        sizes='100vw'
        className='hero-image object-cover opacity-80'
      />

      {/* DARK OVERLAY */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20' />

      {/* HERO CONTENT */}
      <div className='hero-content absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6'>
        <h1 className='body-font text-white text-4xl md:text-7xl max-w-5xl leading-tight'>
          Dharavandhoo
        </h1>
        <span className='text-[10px] md:text-xs tracking-[0.5em] uppercase mb-7 text-white'>
          Baa Atoll, Maldives
        </span>
      </div>

      {/* BOTTOM LABELS */}
      <div className='absolute bottom-8 left-8 text-[10px] tracking-[0.3em] uppercase text-white/60 hidden md:block'>
        Dharavandhoo · Maldives
      </div>
    </section>
  );
}
