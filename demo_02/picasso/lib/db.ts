import Dexie, { Table } from "dexie";
import { v4 as uuidv4 } from "uuid";
import { createDir, writeBinaryFile } from "@tauri-apps/api/fs";
import path from "path";

const DATABASE_NAME = "PicassoDB";

export interface ImageItem {
  id: string;
  path: string;
  blob: Blob;
}

export class PicassoDB extends Dexie {
  images!: Table<ImageItem, string>;
  constructor() {
    super(DATABASE_NAME);
    this.version(1).stores({
      images: "id, path, blob",
    });
  }
}

export const db = new PicassoDB();

// Function to save an image blob
export async function saveImage(blob: Blob) {
  const { homeDir } = await import("@tauri-apps/api/path");
  const imageId = uuidv4();
  const fileName = `${imageId}.png`;

  // Convert Blob to ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer();

  // Get the path to the public directory
  const folderPath = path.join(await homeDir(), "picasso");
  await createDir(folderPath, { recursive: true });
  const filePath = path.join(folderPath, fileName);

  // Use Tauri's API to write the file
  await writeBinaryFile({
    path: filePath,
    contents: new Uint8Array(arrayBuffer),
  });
  const imageItem: ImageItem = { id: imageId, path: filePath, blob: blob };
  return await db.images.add(imageItem);
}

export async function resetImageDatabase() {
  return db.transaction("rw", db.images, async () => {
    await db.images.clear();
    // Optionally, repopulate the table with initial data
    // await populateImages();
  });
}
