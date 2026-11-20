import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import GalleryComponent from "../components/GalleryComponent";
import { PortableText } from "next-sanity";
import BackButton from "../components/GoBack";
import Link from "next/link";

async function getHanifarubayData() {
  const query = `*[_type == "hanifarubay"]{
    hanifarubayTitle,
    coverPhoto,
    description,
    detailDescription,
    images
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const hanifarubay = await getHanifarubayData();

  return (
    <div className='min-h-screen'>
      <div>
        <Image
          src={urlFor(hanifarubay[0].coverPhoto)}
          width={1000}
          height={800}
          alt='cover photo'
          className='aspect-4/3 md:aspect-video object-cover w-full'
        />
      </div>
      <div className='pt-4 px-4 lg:pt-8 lg:px-8 flex justify-between  md:sticky md:top-24 z-10'>
        <BackButton />
        <div className=''>
          <Link
            href={"/hotels-near-hanifaru-bay"}
            className='text-sm md:text-base bg-cyan-500 hover:bg-cyan-400 px-4 py-1 text-white body-font rounded '>
            View Hotels
          </Link>
        </div>
      </div>

      <div className='w-full md:w-[80vw] mx-auto mb-12 md:mb-24 mt-12 lg:mt-24 '>
        <h1 className='text-xl md:text-4xl text-zinc-800 text-center md:text-start body-font my-6 md:my-12'>
          {hanifarubay[0].hanifarubayTitle}
        </h1>
        <div className='mb-12 lg:mb-24 px-6 lg:px-0'>
          <div className='prose custom-prose body-font'>
            {hanifarubay[0].detailDescription && (
              <PortableText value={hanifarubay[0].detailDescription} />
            )}
          </div>
        </div>

        <div className='px-4 md:px-0  mx-auto'>
          <h2 className='text-xl md:text-2xl text-zinc-600 text-center  uppercase body-font mt-6 md:mt-12'>
            Photo Gallery
          </h2>
          <GalleryComponent data={hanifarubay[0].images} />
        </div>
      </div>
    </div>
  );
}
