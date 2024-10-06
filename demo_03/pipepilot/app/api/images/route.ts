import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import path from "path";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public/images");
  const imageFiles = readdirSync(imagesDir).filter((file) =>
    file.endsWith(".jpg"),
  );
  const imagePaths = imageFiles.map((file) => `/images/${file}`);
  return NextResponse.json(imagePaths);
}
