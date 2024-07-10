import Dexie, { Table } from "dexie";
import { v4 as uuidv4 } from "uuid";
import { createDir, writeBinaryFile, removeFile } from "@tauri-apps/api/fs";
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
export async function saveImage(filePath: string, blob: Blob) {
  const imageId = uuidv4();
  const imageItem: ImageItem = { id: imageId, path: filePath, blob: blob };
  return await db.images.add(imageItem);
}

export async function resetImageDatabase() {
  return db.transaction("rw", db.images, async () => {
    // delete the png image filepath
    const images = await db.images.toArray();
    images.forEach(async (image) => {
      await removeFile(image.path);
    });
    await db.images.clear();
  });
}
