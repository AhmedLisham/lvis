// "use client";

// import React, { useLayoutEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// type Property = {
//   propertyName: string;
//   slug: string;
//   coverImage?: string;
// };

// type Props = {
//   title: string;
//   subtitle?: string;
//   shortdescription?: string;
//   coverImage?: string;
//   properties: Property[];
//   children?: React.ReactNode;
// };

// export default function HotelsExperience({
//   title,
//   subtitle,
//   shortdescription,
//   coverImage,
//   properties,
//   children,
// }: Props) {
//   const container = useRef<HTMLDivElement>(null);
//   const gridRef = useRef<HTMLDivElement>(null);
//   const [layout, setLayout] = useState<"grid" | "list">("grid");
//   const [animating, setAnimating] = useState(false);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // Hero animation
//       const hero = gsap.timeline();

//       hero
//         .from(".hero-image", {
//           scale: 1.12,
//           duration: 2,
//           ease: "power3.out",
//         })
//         .from(
//           ".hero-label, .hero-title, .hero-subtitle, .hero-button",
//           {
//             y: 35,
//             opacity: 0,
//             duration: 1,
//             stagger: 0.15,
//             ease: "power3.out",
//           },
//           "-=1.2",
//         );

//       // Collection heading
//       gsap.from(".collection-heading > *", {
//         y: 30,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.15,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".collection-heading",
//           start: "top 85%",
//           once: true,
//         },
//       });

//       // Initial card animation
//       gsap.from(".hotel-card", {
//         y: 60,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.15,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".hotel-grid",
//           start: "top 85%",
//           once: true,
//         },
//       });

//       // Description animation
//       gsap.from(".description-content", {
//         y: 40,
//         opacity: 0,
//         duration: 1,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".description-content",
//           start: "top 90%",
//           once: true,
//         },
//       });
//     }, container);

//     return () => ctx.revert();
//   }, []);

//   // Smooth layout transition without FLIP
//   const changeLayout = () => {
//     if (animating || !gridRef.current) return;

//     setAnimating(true);

//     const cards = gsap.utils.toArray<HTMLElement>(
//       gridRef.current.querySelectorAll(".hotel-card"),
//     );

//     const nextLayout = layout === "grid" ? "list" : "grid";

//     const timeline = gsap.timeline({
//       onComplete: () => {
//         setLayout(nextLayout);
//         setAnimating(false);
//       },
//     });

//     // Fade cards out
//     timeline.to(cards, {
//       opacity: 0,
//       y: 20,
//       duration: 0.3,
//       stagger: 0.035,
//       ease: "power2.in",
//     });

//     // Update layout after cards disappear
//     timeline.call(() => {
//       setLayout(nextLayout);
//     });

//     // Wait for React to render the new layout
//     timeline.call(() => {
//       gsap.set(cards, {
//         opacity: 0,
//         y: 25,
//       });
//     });

//     timeline.to(
//       cards,
//       {
//         opacity: 1,
//         y: 0,
//         duration: 0.65,
//         stagger: 0.09,
//         ease: "power3.out",
//       },
//       "+=0.12",
//     );
//   };

//   return (
//     <main ref={container} className='bg-[#faf9f6] text-[#252b29]'>
//       {/* HERO */}
//       <section className='relative h-[75vh] min-h-[550px] md:h-[90vh] overflow-hidden bg-[#182b2c]'>
//         {coverImage && (
//           <Image
//             src={coverImage}
//             alt={title}
//             fill
//             priority
//             sizes='100vw'
//             className='hero-image object-cover opacity-75'
//           />
//         )}

//         <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20' />

//         <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6'>
//           <span className='hero-label text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6 text-white/70'>
//             Discover the Maldives
//           </span>

//           <h1 className='hero-title font-serif text-4xl md:text-7xl lg:text-8xl max-w-5xl leading-tight'>
//             {title}
//           </h1>

//           {subtitle && (
//             <p className='hero-subtitle mt-6 text-sm md:text-lg tracking-wide text-white/80'>
//               {subtitle}
//             </p>
//           )}

//           <a
//             href='#collection'
//             className='hero-button mt-12 border border-white/50 px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500'>
//             Explore our collection ↓
//           </a>
//         </div>

//         <div className='absolute bottom-8 left-8 text-[10px] tracking-[0.3em] uppercase text-white/60 hidden md:block'>
//           Dharavandhoo · Maldives
//         </div>
//       </section>

//       {/* INTRO */}
//       <section className='max-w-4xl mx-auto text-center px-6 py-20 md:py-32'>
//         <span className='text-[10px] tracking-[0.4em] uppercase text-[#a58c68]'>
//           Your island escape
//         </span>

//         <h2 className='font-serif text-3xl md:text-5xl leading-tight mt-6'>
//           Find your place in paradise.
//         </h2>

//         {shortdescription && (
//           <p className='text-sm md:text-base leading-8 text-zinc-500 mt-8 max-w-2xl mx-auto'>
//             {shortdescription}
//           </p>
//         )}

//         <div className='w-12 h-px bg-[#b99b70] mx-auto mt-10' />
//       </section>

//       {/* COLLECTION */}
//       <section
//         id='collection'
//         className='max-w-[1500px] mx-auto px-5 md:px-12 pb-24 md:pb-36'>
//         <div className='collection-heading flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10'>
//           <div>
//             <span className='text-[10px] tracking-[0.35em] uppercase text-[#a58c68]'>
//               The collection
//             </span>

//             <h2 className='font-serif text-3xl md:text-5xl mt-3'>
//               Places to stay
//             </h2>
//           </div>

//           <div className='flex items-center justify-between md:justify-end gap-5'>
//             <span className='text-xs text-zinc-400 tracking-wider'>
//               {String(properties.length).padStart(2, "0")} Properties
//             </span>

//             <button
//               onClick={changeLayout}
//               disabled={animating}
//               className='text-[10px] tracking-[0.2em] uppercase border border-zinc-300 px-5 py-3 hover:bg-[#252b29] hover:text-white transition-colors disabled:opacity-50'>
//               {layout === "grid" ? "List view +" : "Grid view +"}
//             </button>
//           </div>
//         </div>

//         <div
//           ref={gridRef}
//           className={`hotel-grid grid gap-6 md:gap-8 ${
//             layout === "grid"
//               ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//               : "grid-cols-1"
//           }`}>
//           {properties.map((property, index) => (
//             <Link
//               href={`/ourhotels/${property.slug}`}
//               key={property.slug}
//               className='hotel-card group block relative'>
//               <div
//                 className={`relative overflow-hidden bg-zinc-200 ${
//                   layout === "grid"
//                     ? "aspect-[4/5]"
//                     : "aspect-[4/3] md:aspect-[16/7]"
//                 }`}>
//                 {property.coverImage && (
//                   <Image
//                     src={property.coverImage}
//                     alt={property.propertyName}
//                     fill
//                     sizes='(max-width: 768px) 100vw, 50vw'
//                     className='object-cover transition-transform duration-1000 ease-out group-hover:scale-105'
//                   />
//                 )}

//                 <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent' />

//                 <div className='absolute top-6 left-6 text-white/70 text-[10px] tracking-[0.3em]'>
//                   COLLECTION / {String(index + 1).padStart(2, "0")}
//                 </div>

//                 <div
//                   className={`absolute bottom-0 inset-x-0 p-7 md:p-9 text-white ${
//                     layout === "list"
//                       ? "md:flex md:items-end md:justify-between"
//                       : ""
//                   }`}>
//                   <div className='card-content'>
//                     <h3 className='font-serif text-2xl md:text-4xl leading-tight'>
//                       {property.propertyName}
//                     </h3>

//                     <p className='text-[10px] tracking-[0.25em] uppercase text-white/70 mt-3'>
//                       Dharavandhoo · Maldives
//                     </p>
//                   </div>

//                   <div className='flex items-center gap-3 mt-6 md:mt-0 text-xs tracking-[0.2em] uppercase'>
//                     <span className='w-8 h-px bg-[#d2b58b]' />
//                     Explore
//                     <span className='ml-auto text-xl transition-transform duration-500 group-hover:translate-x-2'>
//                       →
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* DESCRIPTION */}
//       {children && (
//         <section className='description-content max-w-4xl mx-auto px-6 pb-24 md:pb-36'>
//           <div className='w-12 h-px bg-[#b99b70] mb-12' />
//           <div className='prose custom-prose body-font text-zinc-500'>
//             {children}
//           </div>
//         </section>
//       )}
//     </main>
//   );
// }

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Property = {
  propertyName: string;
  slug: string;
  coverImage?: string;
  shortdescription: string;
};

type Props = {
  title: string;
  subtitle?: string;
  shortdescription?: string;
  coverImage?: string;
  properties: Property[];
  children?: React.ReactNode;
};

export default function HotelsExperience({
  title,
  shortdescription,
  coverImage,
  properties,
  children,
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // HERO
      const heroImage = container.current?.querySelector(".hero-image");
      const heroContent =
        container.current?.querySelectorAll(".hero-content > *");

      const hero = gsap.timeline();

      if (heroImage) {
        hero.from(heroImage, {
          scale: 1.15,
          duration: 2,
          ease: "power3.out",
        });
      }

      if (heroContent?.length) {
        hero.from(
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

      // SECTION HEADINGS
      const headings = gsap.utils.toArray<HTMLElement>(
        container.current!.querySelectorAll(".reveal-heading"),
      );

      headings.forEach((item) => {
        gsap.from(item, {
          y: 45,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      });

      // EDITORIAL CARDS
      const cards = gsap.utils.toArray<HTMLElement>(
        container.current!.querySelectorAll(".editorial-card"),
      );

      cards.forEach((card) => {
        const image = card.querySelector(".editorial-image");
        const content = card.querySelector(".editorial-content");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            once: true,
          },
        });

        timeline.from(card, {
          y: 65,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });

        if (image) {
          timeline.from(
            image,
            {
              scale: 1.12,
              duration: 1.5,
              ease: "power3.out",
            },
            "-=0.9",
          );
        }

        if (content) {
          timeline.from(
            content,
            {
              y: 30,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.8",
          );
        }
      });

      // Refresh after all triggers have been created
      ScrollTrigger.refresh();
    },
    {
      scope: container,
      dependencies: [],
      revertOnUpdate: true,
    },
  );

  return (
    <main
      ref={container}
      className='bg-[#faf9f6] text-[#252b29] overflow-hidden'>
      {/* HERO */}
      <section className='relative h-[75vh] min-h-[550px] md:h-[95vh] overflow-hidden bg-[#182b2c]'>
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            sizes='100vw'
            className='hero-image object-cover opacity-75'
          />
        )}

        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/10' />

        <div className='hero-content absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6'>
          <span className='text-[10px] md:text-xs tracking-[0.5em] uppercase mb-7 text-white/70'>
            Discover Dharavandhoo Maldives
          </span>

          <h1 className='body-font text-white text-4xl md:text-7xl max-w-5xl leading-tight'>
            {title}
          </h1>

          {/* {subtitle && (
            <p className='mt-6 text-sm md:text-lg tracking-wide text-white/80 max-w-xl'>
              {subtitle}
            </p>
          )} */}
        </div>

        <div className='absolute bottom-8 left-8 text-[10px] tracking-[0.3em] uppercase text-white/60 hidden md:block'>
          Dharavandhoo · Maldives
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className='max-w-5xl mx-auto px-6 py-24 md:py-36 text-center'>
        <span className='reveal-heading text-[10px] tracking-[0.4em] uppercase text-cyan-500'>
          A collection of stays
        </span>

        <h2 className='reveal-heading font-serif text-3xl md:text-6xl leading-tight mt-7 max-w-4xl mx-auto'>
          Somewhere between the ocean and your dreams.
        </h2>

        {shortdescription && (
          <p className='reveal-heading text-sm md:text-base leading-8 text-zinc-500 mt-8 max-w-2xl mx-auto'>
            {shortdescription}
          </p>
        )}

        <div className='w-12 h-px bg-cyan-600/50 mx-auto mt-12' />
      </section>

      {/* EDITORIAL COLLECTION */}
      <section
        id='collection'
        className='w-auto md:max-w-[80vw] mx-auto px-5 md:px-12 pb-28 md:pb-40'>
        <div className='reveal-heading mb-20 md:mb-32'>
          <span className='text-[10px] tracking-[0.4em] uppercase text-cyan-500'>
            Explore the island
          </span>

          <div className='flex flex-col md:flex-row md:items-end justify-between gap-5 mt-5'>
            <h2 className='font-serif text-4xl md:text-6xl'>
              The places we love.
            </h2>

            <p className='text-xs tracking-wider text-zinc-400'>
              {String(properties.length).padStart(2, "0")} UNIQUE PROPERTIES
            </p>
          </div>
        </div>

        <div className='space-y-24 md:space-y-40'>
          {properties.map((property, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <article
                key={property.slug}
                className={`editorial-card grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
                  isReverse ? "" : ""
                }`}>
                {/* IMAGE */}
                <Link
                  href={`/ourhotels/${property.slug}`}
                  className={`group block relative ${
                    isReverse
                      ? "md:col-span-7 md:col-start-6 md:row-start-1"
                      : "md:col-span-8"
                  }`}>
                  <div
                    className={`relative overflow-hidden bg-zinc-200 rounded-lg ${
                      isReverse
                        ? "aspect-[4/3] md:aspect-[5/4]"
                        : "aspect-[4/3] md:aspect-[5/4]"
                    }`}>
                    {property.coverImage && (
                      <Image
                        src={property.coverImage}
                        alt={property.propertyName}
                        fill
                        sizes='(max-width: 768px) 100vw, 70vw'
                        className='editorial-image object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 '
                      />
                    )}

                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700' />

                    <span className='absolute top-6 left-6 text-white text-[10px] tracking-[0.3em]'>
                      DHARAVANDHOO / {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>

                {/* CONTENT */}
                <div
                  className={`editorial-content relative ${
                    isReverse
                      ? "md:col-span-5 md:col-start-1 md:row-start-1 md:pl-8"
                      : "md:col-span-4 md:col-start-9 md:pr-5"
                  }`}>
                  {/* <span className='text-[10px] tracking-[0.35em] uppercase text-cyan-500'>
                    Stay / {String(index + 1).padStart(2, "0")}
                  </span> */}

                  <h3 className='font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mt-5'>
                    {property.propertyName}
                  </h3>

                  <div className='w-12 h-px bg-cyan-600/30 my-7' />
                  {/* bg-[#b99b70] */}

                  <p className='text-sm text-zinc-500 leading-8'>
                    {property.shortdescription}
                  </p>
                  {/* <p className='text-sm text-zinc-500 leading-8'>
                    Discover a unique island experience in Dharavandhoo, where
                    the beauty of the Maldives meets the comfort of exceptional
                    accommodation.
                  </p> */}

                  <Link
                    href={`/ourhotels/${property.slug}`}
                    className='inline-flex items-center gap-4 mt-9 text-[10px] text-cyan-700 uppercase tracking-[0.25em] group/link'>
                    <span className='border-b border-cyan-600/30 pb-2'>
                      Discover this stay
                    </span>

                    <span className='text-lg transition-transform duration-500 group-hover/link:translate-x-2'>
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* DESCRIPTION */}
      {children && (
        <section className=' max-w-6xl mx-auto px-6 pb-28 md:pb-40'>
          <div className='w-12 h-px bg-cyan-600/30 mb-12' />

          <div className='prose custom-prose body-font text-zinc-500'>
            {children}
          </div>
        </section>
      )}

      {/* FOOTER STATEMENT */}
      <section className='bg-[#204350] text-white py-24 md:py-36 px-6 text-center'>
        <span className='text-[10px] tracking-[0.4em] uppercase text-white/50'>
          Your journey begins here
        </span>

        <h2 className='font-serif text-4xl md:text-6xl max-w-3xl mx-auto mt-7 leading-tight'>
          Let the island become your story.
        </h2>

        {/* <div className='w-12 h-px bg-[#b99b70] mx-auto mt-10' /> */}
      </section>
    </main>
  );
}
