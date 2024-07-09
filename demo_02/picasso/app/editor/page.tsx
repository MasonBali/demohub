"use client";

import Canvas from "@/components/Canvas";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      {/* <script src="http://localhost:8097"></script> */}
      <div className="fixed top-10 left-10 z-50">
        <Label className="text-4xl font-extrabold font-virgil">Picasso</Label>
      </div>
      <div>
        <Canvas />
      </div>
      <div className="fixed right-10 bottom-10 flex flex-row gap-5 jutify-end items-center">
        <Button
          className="rounded-lg shadow-lg"
          onClick={() => {
            router.push("..");
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
