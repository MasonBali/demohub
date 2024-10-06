"use client";

import PromptBox from "@/components/promptbox";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/navigation";
import SearchBar from "@/components/searchbar";
import { Sidebar } from "@/components/sidebar";

export default function Chat() {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch("/api/images");
      const images = await response.json();
      const randomImage = images[Math.floor(Math.random() * images.length)];
      setBackgroundImage(randomImage);
    }
    fetchImages();
  }, []);

  return (
    <div className="fixed z-50 flex h-full w-full flex-row items-center justify-center gap-4 p-6">
      <div
        className="fixed -z-10 flex h-screen w-screen scale-125 flex-row items-center justify-center shadow-inner blur-3xl"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Sidebar />
      {/* <Navigation /> */}
      <Separator orientation="vertical" className="h-screen opacity-40" />
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-2">
        <SearchBar />
        <PromptBox />
      </div>
      <div className="h-full w-1/4 p-2 pl-0 pr-0">
        <div className="h-full w-full rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 backdrop-filter"></div>
      </div>
    </div>
  );
}
