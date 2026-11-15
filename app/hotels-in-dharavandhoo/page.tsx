import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

async function getHotelsData() {
  const query = `*[_type == "hotelsInDharavandhoo"]{
        title,
        coverImage,
        subtitle,
        description
    }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const hotelsData = await getHotelsData();

  return (
    <div className='pb-12 md:pb-24'>
      <div className='h-full md:h-[90vh] overflow-hidden'>
        {hotelsData[0].coverImage && (
          <Image
            src={urlFor(hotelsData[0].coverImage)}
            alt='Dharavandhoo Image'
            width={1000}
            height={800}
            className='w-full aspect-4/3 md:aspect-video object-cover object-bottom'
          />
        )}
      </div>
      <div className='min-h-screen w-full md:w-[80vw] mx-auto '>
        <h1 className='text-xl md:text-3xl text-zinc-500 text-center  uppercase body-font pt-6 md:pt-12'>
          {hotelsData[0].title}
        </h1>
        <h3 className='text-sm md:text-xl text-black/30 text-center mb-4 lg:mb-6 body-font'>
          {hotelsData[0].subtitle}
        </h3>
        <div className='prose custom-prose body-font text-zinc-500'>
          {hotelsData[0].description && (
            <PortableText value={hotelsData[0].description} />
          )}
        </div>
      </div>
    </div>
  );
}
