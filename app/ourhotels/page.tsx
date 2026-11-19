// import { client } from "@/sanity/lib/client";
// import React from "react";
// import HeroSection from "../components/HeroSection";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";

// async function getProperties() {
//   const query = `*[_type == "properties"]`;
//   const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
//   return data;
// }

// async function getOurHotelPageBannerData() {
//   const query = `*[_type == "ourHotelPageBanner"] | order(id asc){
//   image,
//   title
//   }`;
//   const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
//   return data;
// }

// export default async function page() {
//   const properties = await getProperties();
//   const slides = await getOurHotelPageBannerData();

//   return (
//     <div className=''>
//       <HeroSection data={slides} />
//       <div className='min-h-screen w-full md:w-[80vw] mx-auto '>
//         <h1 className='text-xl md:text-3xl text-zinc-400 mb-4 uppercase body-font text-center pt-4 md:pt-12'>
//           Our Hotels
//         </h1>
//         <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//           {properties.map((property: any, index: number) => {
//             return (
//               <div key={index}>
//                 <Image
//                   src={urlFor(property.coverImage)}
//                   alt={property.propertyName}
//                   width={600}
//                   height={500}
//                   className='aspect-4/3 object-cover'
//                 />
//                 <p className='text-xl md:text-2xl text-center text-cyan-500 mb-4 mt-2 uppercase body-font'>
//                   {property.propertyName}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

import { client } from "@/sanity/lib/client";
import React from "react";
import HeroSection from "../components/HeroSection";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

async function getProperties() {
  const query = `*[_type == "properties"]{
    propertyName,
    coverImage,
    slug
  }`;
  const data = await client.fetch(
    query,
    {},
    {
      next: { revalidate: 60 },
    },
  );
  return data;
}

async function getOurHotelPageBannerData() {
  const query = `*[_type == "ourHotelPageBanner"] | order(id asc){
    image,
    title
  }`;
  const data = await client.fetch(
    query,
    {},
    {
      next: { revalidate: 60 },
    },
  );
  return data;
}

export default async function Page() {
  const properties = await getProperties();
  const slides = await getOurHotelPageBannerData();

  return (
    <main className='bg-[#faf9f6]'>
      {/* Hero */}
      <HeroSection data={slides} />

      {/* Introduction */}
      <section className='px-6 md:px-12 lg:px-20 pt-20 pb-14 text-center'>
        <p className='text-xs tracking-[0.4em] uppercase text-cyan-700 mb-5 body-font'>
          Discover Our Collection
        </p>

        <h1 className='text-4xl md:text-6xl text-zinc-500 body-font mb-6'>
          Our Hotels
        </h1>

        <div className='w-16 h-[1px] bg-cyan-600 mx-auto mb-6' />

        <p className='max-w-2xl mx-auto text-zinc-500 body-font text-sm md:text-base leading-8'>
          Discover a collection of exceptional destinations, where thoughtful
          hospitality, beautiful surroundings, and unforgettable experiences
          come together.
        </p>
      </section>

      {/* Hotels Grid */}
      <section className='px-5 md:px-12 lg:px-20 pb-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9'>
          {properties.map((property: any, index: number) => (
            <Link
              href={`/ourhotels/${property.slug.current}`}
              key={property._id || index}
              className='group relative overflow-hidden rounded-sm bg-white shadow-sm'>
              {/* Image */}
              <div className='relative aspect-[4/5] overflow-hidden'>
                {property.coverImage && (
                  <Image
                    src={urlFor(property.coverImage)}
                    alt={property.propertyName || "Hotel"}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover transition-transform duration-700 ease-out group-hover:scale-102'
                  />
                )}

                {/* Gradient */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100' />

                {/* Hotel Content */}
                <div className='absolute inset-x-0 bottom-0 p-7 md:p-8 text-white'>
                  {/* <p className='text-[10px] tracking-[0.3em] uppercase text-white/70 mb-3 body-font'>
                    Our Collection · {String(index + 1).padStart(2, "0")}
                  </p> */}

                  <h2 className='font-serif text-2xl md:text-3xl mb-4'>
                    {property.propertyName}
                  </h2>

                  <div className='flex items-center gap-3'>
                    <span className='h-[1px] w-8 bg-cyan-400 transition-all duration-500 group-hover:w-12' />

                    <span className='text-xs uppercase tracking-[0.2em] body-font'>
                      Explore
                    </span>

                    <span className='transition-transform duration-300 group-hover:translate-x-2'>
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Section */}
      <section className='bg-[#204350] text-white px-6 py-15 md:py-20 text-center'>
        {/* <p className='text-cyan-300 text-xs tracking-[0.35em] uppercase mb-5'>
          Your Next Escape
        </p> */}

        <h2 className='body-font text-3xl md:text-5xl mb-6'>
          Find Your Perfect Stay
        </h2>

        <p className='max-w-xl mx-auto text-white/60 text-sm leading-7'>
          Every destination has a story. Discover yours with our collection of
          unique stays and memorable experiences
        </p>
      </section>
    </main>
  );
}
