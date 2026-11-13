import { client } from "@/sanity/lib/client";
import React from "react";

async function getProperties() {
  const query = `*[_type == "properties"]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const properties = await getProperties();

  return (
    <div className='min-h-screen '>
      <div className='h-32'></div>
      <h1 className='text-xl md:text-3xl text-zinc-400 mb-4 uppercase body-font text-center'>
        Our Hotels
      </h1>
    </div>
  );
}
