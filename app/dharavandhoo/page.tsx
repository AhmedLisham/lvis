import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import React from "react";
import GalleryComponent from "../components/GalleryComponent";
import { PortableText } from "next-sanity";
import BackButton from "../components/GoBack";
import Link from "next/link";
import LocationHero from "../components/LocationHero";

async function getLocationData() {
  const query = `*[_type == "location"]{
    coverPhoto,
    description,
    detailDescription,
    images,
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const location = await getLocationData();

  return (
    <div className='min-h-screen'>
      {/* <div>
        <Image
          src={urlFor(location[0].coverPhoto)}
          width={1000}
          height={800}
          alt='cover photo'
          className='aspect-4/3 md:aspect-video object-cover w-full'
        />
      </div> */}
      <LocationHero
        coverImage={urlFor(location[0].coverPhoto)}
        title='Discover Dharavandhoo'
        subtitle='A beautiful island in the Maldives'
      />
      <div className='pt-4 px-4 lg:pt-8 lg:px-8 flex justify-between  md:sticky md:top-24 z-10'>
        <BackButton />
        <div className=''>
          <Link
            href={"/hotels-in-dharavandhoo"}
            className='text-sm md:text-base bg-cyan-500 hover:bg-cyan-400 px-4 py-1 text-white body-font rounded '>
            View Hotels
          </Link>
        </div>
      </div>

      <div className='w-full md:w-[80vw] mx-auto  mb-12 md:mb-24 mt-12 lg:mt-24 px-6 lg:px-0'>
        <h1 className='text-xl md:text-4xl text-zinc-600 text-center md:text-start body-font my-6 md:my-12 '>
          Discover Dharavandhoo - A Beautiful Island in the Maldives
        </h1>
        <div className='mb-12 lg:mb-24 '>
          <div className='prose custom-prose body-font'>
            {location[0].detailDescription && (
              <PortableText value={location[0].detailDescription} />
            )}
          </div>
        </div>

        <div className='mx-auto'>
          <h2 className='text-xl md:text-2xl text-zinc-600 text-center  uppercase body-font mt-6 md:mt-12'>
            Photo Gallery
          </h2>
          <GalleryComponent data={location[0].images} />
        </div>
      </div>
    </div>
  );
}
