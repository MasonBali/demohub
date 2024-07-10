"use client";

import { ImageGallery } from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getDirectories } from "@/lib/paths";
import { invoke } from "@tauri-apps/api/tauri";
import { useStore } from "@/components/Store";

import { resetImageDatabase } from "@/lib/db";

let intervalId: any = null;

export default function Home() {
  const router = useRouter();
  // useStore variables
  const serverIsReady = useStore((state) => state.serverIsReady);
  const setServerIsReady = useStore((state) => state.setServerIsReady);
  // New state to track if the component has mounted
  const [hasMounted, setHasMounted] = useState(false);
  const [reset, setReset] = useState(false);
  // useRef variables
  const hasRunPythonCommand = useRef(false); // use a ref instead of state

  const runPythonCommand = async () => {
    const paths = await getDirectories();
    await invoke("run_python_command", {
      venvPythonPath: paths.plotyPythonBinary,
      scriptPath: paths.plotyPythonModule,
      serverReadyPath: paths.plotyServerReady,
    });
  };

  // Set hasMounted to true after the component has mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !hasRunPythonCommand.current && !serverIsReady) {
      runPythonCommand().then(() => {
        console.log("Python command has run");
        hasRunPythonCommand.current = true;
        intervalId = setInterval(() => {
          setServerIsReady(true);
        }, 1000);
      });
    }
  }, [hasMounted]);

  // Don't render the div until the component has mounted
  if (!hasMounted) {
    return null;
  }

  return (
    <main
      className="flex min-h-screen bg-gray-50"
      onClick={() => {
        if (reset) {
          setReset(false);
        }
      }}
    >
      <div
        className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 backdrop-blur-sm bg-black bg-opacity-30 w-screen h-screen z-30 duration-500 transition-all ease-in-out
        ${reset ? "visible" : "hidden"}
        `}
      />
      <div
        className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white w-1/6 h-40 rounded-lg shadow-lg z-50 duration-500 transition-all ease-in-out flex flex-col justify-center items-center gap-5
        ${reset ? "visible" : "hidden"}
        `}
      >
        <Label className="text-2xl font-bold font-virgil">
          Delete Image Gallery?
        </Label>
        <div className="flex gap-4">
          <Button
            className="text-2xl font-bold font-virgil"
            onClick={async () => {
              console.log("reset database");
              await resetImageDatabase();
            }}
          >
            Yes
          </Button>
        </div>
      </div>

      <div className="fixed w-screen h-screen top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
        <ImageGallery />
      </div>
      <div className="fixed top-10 left-10">
        <Label className="text-4xl font-extrabold font-virgil">Picasso</Label>
      </div>
      <div className="fixed right-10 bottom-10 flex flex-row gap-5 jutify-end items-center">
        <Button
          onClick={() => {
            router.push("/sentry-example-page");
          }}
        >
          Sentry
        </Button>
        <Button
          onClick={() => {
            setReset(true);
          }}
        >
          Reset
        </Button>
        <Button
          className="rounded-lg shadow-lg"
          onClick={() => {
            router.push("/editor");
          }}
        >
          Editor
        </Button>
      </div>
    </main>
  );
}
