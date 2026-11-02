"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { urlFor } from "@/sanity/lib/image";
import Motion from "./Motion";

export default function FoodGallery({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides =
    data?.map((img: any) => ({
      src: urlFor(img.image),
      title: img.imageTitle,
      description: img.imageTitle,
    })) ?? [];

  return (
    <div className='mt-6 lg:mt-12 pb-12 md:pb-24'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data &&
          data.map((img: any, i: number) => {
            return (
              <div
                key={i}
                className='cursor-pointer w-full'
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}>
                <Motion>
                  <div className=' rounded-md pb-1'>
                    <Image
                      src={urlFor(img.image)}
                      width={1000}
                      height={800}
                      alt={`Image ${i + 1}`}
                      className='w-full aspect-[4/3] object-cover rounded-md hover:opacity-90 transition'
                    />
                    <div>
                      <p className='text-xs md:text-sm text-center body-font text-zinc-500 mt-1 capitalize'>
                        {img.imageTitle}
                      </p>
                    </div>
                  </div>
                </Motion>
              </div>
            );
          })}
      </div>
      {data && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Zoom, Thumbnails, Captions]}
          captions={{
            descriptionTextAlign: "center",
            descriptionMaxLines: 3,
            showToggle: false,
          }}
        />
      )}
    </div>
  );
}
