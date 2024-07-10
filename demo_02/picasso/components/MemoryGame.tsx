import { useLiveQuery } from "dexie-react-hooks";
import Image from "next/image";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";

export function MemoryGame() {
  const images = useLiveQuery(() => db.images.toArray());
  const [imageUrls, setImageUrls] = useState<{ id: string; url: string }[]>([]);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!images) return;
    const urls = images.map((img, index) => ({
      id: `${img.id}-${index}`, // Append index to make id unique
      url: URL.createObjectURL(img.blob),
    }));
    // Duplicate and shuffle
    const duplicatedUrls = [
      ...urls,
      ...urls.map((item, index) => ({ ...item, id: `${item.id}-duplicate` })),
    ].sort(() => Math.random() - 0.5);
    setImageUrls(duplicatedUrls);

    return () => {
      urls.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageClick = (uniqueId: string) => {
    // Check if the clicked image is already revealed or matched
    if (
      revealedIds.includes(uniqueId) ||
      matchedIds.some((id) => uniqueId.startsWith(id))
    )
      return;
    const newRevealedIds = [...revealedIds, uniqueId];
    setRevealedIds(newRevealedIds);

    // When two images are revealed
    if (newRevealedIds.length === 2) {
      const [firstUniqueId, secondUniqueId] = newRevealedIds;
      // Function to remove "-duplicate" suffix if present
      const getBaseId = (uniqueId: string) => {
        if (uniqueId.endsWith("-duplicate")) {
          return uniqueId.substring(0, uniqueId.lastIndexOf("-duplicate"));
        }
        return uniqueId;
      };

      const firstBaseId = getBaseId(firstUniqueId);
      const secondBaseId = getBaseId(secondUniqueId);
      // Check if the base IDs match, indicating a match
      if (firstBaseId === secondBaseId) {
        // Update matchedIds with baseId to keep both images visible
        setMatchedIds((prev) => [...prev, firstBaseId]);
        // Increment score
        setScore((prev) => prev + 1);
      }

      // Clear revealedIds after a delay, whether it's a match or not
      setTimeout(() => {
        setRevealedIds([]);
      }, 1000);
    }
  };

  return (
    <div className="grid grid-cols-6 auto-rows-auto p-4 -mr-6 overflow-y-scroll gap-5 h-full">
      {imageUrls.map(({ id, url }, index) => {
        // Determine if the current id or its base version is in matchedIds
        const isMatched = matchedIds.some((matchedId) => {
          const baseMatchedId = matchedId.replace("-duplicate", "");
          const baseId = id.replace("-duplicate", "");
          return baseId === baseMatchedId;
        });

        return (
          <div
            key={index}
            className={`relative w-96 h-96 aspect-square shadow-lg rounded-lg overflow-hidden duration-150 ${
              revealedIds.includes(id) || isMatched
                ? "opacity-100"
                : "opacity-50"
            } hover:scale-105 hover:shadow-xl border-4 border-white`}
            onClick={() => handleImageClick(id)}
          >
            <Image
              id={id}
              className="absolute h-full w-full"
              src={url}
              alt={id}
              width={128}
              height={128}
              priority
              style={{
                display:
                  revealedIds.includes(id) || isMatched ? "block" : "none",
              }}
            />
          </div>
        );
      })}
      <div className="fixed top-10 right-10 font-virgil text-2xl">
        Score: {score}
      </div>
    </div>
  );
}
