import { client } from "@/sanity/lib/client";
import React from "react";
import HeroSection from "../components/HeroSection";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

async function getProperties() {
  const query = `*[_type == "properties"]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function getOurHotelPageBannerData() {
  const query = `*[_type == "ourHotelPageBanner"] | order(id asc){
  image,
  title
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const properties = await getProperties();
  const slides = await getOurHotelPageBannerData();

  return (
    <div className=''>
      <HeroSection data={slides} />
      <div className='min-h-screen w-full md:w-[80vw] mx-auto '>
        <h1 className='text-xl md:text-3xl text-zinc-400 mb-4 uppercase body-font text-center pt-4 md:pt-12'>
          Our Hotels
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {properties.map((property: any, index: number) => {
            return (
              <div key={index}>
                <Image
                  src={urlFor(property.coverImage)}
                  alt={property.propertyName}
                  width={600}
                  height={500}
                  className='aspect-4/3 object-cover'
                />
                <p className='text-xl md:text-2xl text-center text-cyan-500 mb-4 mt-2 uppercase body-font'>
                  {property.propertyName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
