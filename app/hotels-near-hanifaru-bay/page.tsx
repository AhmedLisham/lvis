import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import type { Metadata } from "next";
import HotelsExperience from "../components/HotelsExperience";

async function getProperties() {
  const query = `*[_type == "properties"] | order(_createdAt asc) {
    propertyName,
    coverImage,
    slug,
    shortDescription,
  }`;

  return client.fetch(
    query,
    {},
    {
      next: { revalidate: 60 },
    },
  );
}

async function getHotelsData() {
  const query = `*[_type == "hotelsNearHanifaruBay"][0]{
    title,
    coverImage,
    subtitle,
    description,
    shortdescription
  }`;

  return client.fetch(
    query,
    {},
    {
      next: { revalidate: 60 },
    },
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHotelsData();

  return {
    title: "Hotels in Dharavandhoo",
    description: data?.shortdescription || data?.subtitle,
    openGraph: {
      title: "Hotels in Dharavandhoo",
      description: data?.shortdescription || data?.subtitle,
    },
  };
}

export default async function Page() {
  const [hotelsData, properties] = await Promise.all([
    getHotelsData(),
    getProperties(),
  ]);

  if (!hotelsData) return null;

  return (
    <HotelsExperience
      title={hotelsData.title || "Hotels in Dharavandhoo"}
      subtitle={hotelsData.subtitle}
      shortdescription={hotelsData.shortdescription}
      coverImage={
        hotelsData.coverImage ? urlFor(hotelsData.coverImage) : undefined
      }
      properties={properties.map((property: any) => ({
        propertyName: property.propertyName,
        slug: property.slug.current,
        shortdescription: property.shortDescription,
        coverImage: property.coverImage
          ? urlFor(property.coverImage)
          : undefined,
      }))}>
      {hotelsData.description && (
        <PortableText value={hotelsData.description} />
      )}
    </HotelsExperience>
  );
}
