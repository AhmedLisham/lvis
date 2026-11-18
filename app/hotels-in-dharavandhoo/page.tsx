import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

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

async function getHotelsData() {
  const query = `*[_type == "hotelsInDharavandhoo"]{
        title,
        coverImage,
        subtitle,
        description,
        shortdescription
    }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export async function generateMetadata(): Promise<Metadata> {
  const query = `*[_type == "hotelsInDharavandhoo"][0]{
    title,
    subtitle,
    shortdescription,
    coverImage
  }`;

  const data = await client.fetch(query);

  return {
    title: "Hotels in Dharavandhoo",
    description: data?.shortdescription || data?.subtitle,

    openGraph: {
      title: "Hotels in Dharavandhoo",
      description: data?.shortdescription || data?.subtitle,
      //   images: data?.coverImage ? [urlFor(data.coverImage)] : [],
    },
  };
}

export default async function page() {
  const hotelsData = await getHotelsData();
  const properties = await getProperties();

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
        <p className='text-sm md:text-xl text-black/30 text-center mb-4 lg:mb-6 body-font pt-6'>
          {hotelsData[0].shortdescription}
        </p>
        <section className='px-5 md:px-12 lg:px-20 pb-12 mt-6 md:mt-12'>
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
        <div className='prose custom-prose body-font text-zinc-500'>
          {hotelsData[0].description && (
            <PortableText value={hotelsData[0].description} />
          )}
        </div>
      </div>
    </div>
  );
}
