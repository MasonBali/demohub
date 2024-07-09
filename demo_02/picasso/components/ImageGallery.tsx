import { useLiveQuery } from "dexie-react-hooks";
import Image from "next/image";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";

export function ImageGallery() {
  const images = useLiveQuery(() => db.images.toArray());
  const [imageUrls, setImageUrls] = useState<{ id: string; url: string }[]>([]);

  useEffect(() => {
    // Convert each Blob to a URL
    if (!images) return;
    const urls =
      images?.map((img) => ({
        id: img.id,
        url: URL.createObjectURL(img.blob),
      })) || [];

    setImageUrls(urls);

    // Cleanup: Revoke the blob URLs to avoid memory leaks
    return () => {
      urls.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [images]);

  return (
    <div className="grid grid-cols-6 auto-rows-auto p-4 -mr-6 overflow-y-scroll gap-5 h-full">
      {imageUrls.map(({ id, url }) => (
        <div
          key={id}
          className="relative w-96 h-96 aspect-square shadow-lg rounded-lg overflow-hidden duration-150 hover:scale-105 hover:shadow-xl border-4 border-white "
        >
          <Image
            id={id}
            className="absolute h-full w-full"
            src={url}
            alt={id}
            width={128}
            height={128}
            priority
          />
        </div>
      ))}
    </div>
  );
}
