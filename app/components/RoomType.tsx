import RoomGallery from "./RoomGallery";

export default function RoomType({ roomTypeData }: any) {
  const room = roomTypeData;

  return (
    <div>
      {/* <h2 className='text-xl font-semibold mb-4'>{room.roomType}</h2> */}

      {/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {room.roomPhotos?.map((photo: any, index: number) => (
          <Image
            key={index}
            src={urlFor(photo.roomPhoto)}
            width={600}
            height={400}
            alt={`${room.roomType} photo ${index + 1}`}
            className='w-full h-auto object-cover rounded-md aspect-4/3 '
          />
        ))}
      </div> */}
      <div>
        <RoomGallery data={room} />
      </div>
    </div>
  );
}
