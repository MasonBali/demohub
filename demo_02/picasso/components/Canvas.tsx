import { useEffect, useRef, useState } from "react";

import fabric from "../node_modules/fabric/dist";
import Toolbox from "@/components/Toolbox";
import { RgbaColor } from "react-colorful";

import { saveImage } from "@/lib/db";
import { sendPostRequest2 } from "@/lib/api";
import { writeBinaryFile, createDir, readBinaryFile } from "@tauri-apps/api/fs";

import { v4 as uuidv4 } from "uuid";
import path from "path";

const Canvas = () => {
  // useState variables
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [brush, setBrush] = useState<fabric.PencilBrush | null>(null);
  const [brushSize, setBrushSize] = useState<number>(5);
  const [color, setColor] = useState<string>("rgba(0,0,0,1)");
  const [prompt, setPrompt] = useState<string>("");
  // useRef variables
  const canvasMaskRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<any>(null);

  const onAddCircle = () => {
    console.log("onAddCircle");
    if (canvas) {
      canvas.isDrawingMode = false;
      const radius = 50;
      const circle = new fabric.Circle({
        radius: radius,
        fill: color,
        left: canvas.width! / 2 - radius,
        top: canvas.height! / 2 - radius,
      });
      canvas.add(circle);
      canvas.renderAll();
    }
  };

  const onAddRectangle = () => {
    console.log("onAddRectangle");
    if (canvas) {
      canvas.isDrawingMode = false;
      const width = 100;
      const height = 100;
      const rect = new fabric.Rect({
        left: canvas.width / 2 - width / 2,
        top: canvas.height / 2 - height / 2,
        fill: color,
        width: width,
        height: height,
      });
      canvas.add(rect);
      canvas.renderAll();
    }
  };

  const onSetBrush = () => {
    console.log("onSetBrush");
    if (canvas && brush) {
      canvas.discardActiveObject();
      // Enable drawing mode
      canvas.isDrawingMode = true;
      brush.width = brushSize; // Set the brush width
      brush.color = color; // Set the brush color
    }
  };

  const onSetSelection = () => {
    console.log("onSetSelection");
    if (canvas) {
      // Disable drawing mode
      canvas.isDrawingMode = false;
    }
  };

  const onClear = () => {
    console.log("onClear");
    if (canvas) {
      canvas.clear();
    }
  };

  const onColorChange = (color: RgbaColor) => {
    console.log("onColorChange");
    if (brush) {
      brush.color = `rgba(${color.r},${color.g},${color.b},${color.a})`;
      setColor(brush.color);
    }
  };

  const onBrushSizeChange = (size: number[]) => {
    console.log("onBrushSizeChange");
    if (brush) {
      brush.width = size[0];
      setBrushSize(size[0]);
    }
  };

  const onTextChange = (text: string) => {
    setPrompt(text);
  };

  const bringCanvasElementsToFront = () => {
    if (!canvas) return;
    canvas
      .getObjects()
      .filter((obj: any) => obj.type === "path")
      .forEach((brushData: any) => canvas.bringObjectToFront(brushData));
    canvas.renderAll();
  };

  const animateCanvasPath = () => {
    if (!canvas) return;
    let canvasPaths = canvas
      .getObjects()
      .filter((obj: { type: string }) => obj.type === "path");
    let latestPath = canvasPaths.pop();
    // exclude the latestPath from the canvasPaths
    canvasPaths = canvasPaths.filter((path: any) => path !== latestPath);

    if (latestPath) {
      // Animate the opacity of the path to 0 over 3 seconds
      animationId.current = fabric.util.animate({
        startValue: latestPath.opacity,
        endValue: 0,
        duration: 2000,
        onChange: (value: any) => {
          latestPath.set({ opacity: value });
          try {
            canvas.renderAll();
          } catch (error) {}
        },
        onComplete: () => {
          canvasPaths.forEach((canvasPath: any) => {
            // Animate the opacity of the path to 0 over 3 seconds
            animationId.current = fabric.util.animate({
              startValue: canvasPath.opacity,
              endValue: 0,
              duration: 3000,
              onChange: (value: any) => {
                canvasPath.set({ opacity: value });
                try {
                  canvas.renderAll();
                } catch (error) {}
              },
              onComplete: () => {
                canvas.remove(latestPath);
                canvas.remove(canvasPath);
              },
            });
          });
        },
      });
    }
  };

  const createImage = async (outputFilePath: string) => {
    return new Promise(async (resolve, reject) => {
      if (!canvas) {
        console.log("No active scene selected");
        return;
      }
      // Read the file as a data URL
      const binaryData = await readBinaryFile(outputFilePath);
      // Convert the binary data to a Blob
      const blob = new Blob([binaryData], { type: "image/png" });
      await saveImage(blob);
      // Create a data URL from the Blob
      const liveOutputUrl = URL.createObjectURL(blob);
      const canvasMask = canvasMaskRef.current?.getBoundingClientRect();
      fabric.FabricImage.fromURL(liveOutputUrl).then((oImg: any) => {
        // resize image to original resolution
        console.log("canvasMask", canvasMask);
        oImg.scaleToWidth(canvasMask?.width);
        oImg.scaleToHeight(canvasMask?.height);
        oImg.top = canvasMask?.top;
        oImg.left = canvasMask?.left;
        canvas.add(oImg);
        animateCanvasPath();
        bringCanvasElementsToFront();
        canvas.discardActiveObject();
        canvas.renderAll();
        resolve(oImg.getSrc());
      });
    });
  };

  const onGenerateImage = () => {
    console.log("onGenerateImage");
    if (canvas && canvasMaskRef.current) {
      // Calculate the position and size of the canvasMask relative to the canvas
      const maskBounds = canvasMaskRef.current.getBoundingClientRect();
      const canvasBounds = canvas.getElement().getBoundingClientRect();
      const left = maskBounds.left - canvasBounds.left;
      const top = maskBounds.top - canvasBounds.top;
      const width = maskBounds.width;
      const height = maskBounds.height;

      // Use toDataURL with cropping parameters to generate the image of the canvasMask area
      const canvasData = canvas.toDataURL({
        format: "png",
        quality: 1.0,
        multiplier: 1,
        enableRetinaScaling: false,
        left: left,
        top: top,
        width: width,
        height: height,
      });

      fabric.FabricImage.fromURL(canvasData, {
        crossOrigin: "anonymous",
      }).then(async (img: any) => {
        const { homeDir } = await import("@tauri-apps/api/path");
        const imageId = uuidv4();
        const initName = `initImage.png`;
        const outName = `${imageId}.png`;
        // Get the path to the public directory
        const folderPath = path.join(await homeDir(), "picasso");
        await createDir(folderPath, { recursive: true });
        const initImgPath = path.join(folderPath, initName);
        const outputPath = path.join(folderPath, outName);
        // Resize the image to store resolution before sending it to the server
        const resolution = { width: 512, height: 512 };
        img.scaleToWidth(resolution.width);
        img.scaleToHeight(resolution.height);
        img.filters.push(new fabric.filters.Noise({ noise: 96 }));
        img.applyFilters();

        let croppedBase64 = img.toDataURL({
          format: "png",
          enableRetinaScaling: true,
          quality: 1,
        });

        // Remove the base64 image prefix if it exists
        const base64DataCleaned = croppedBase64.replace(
          /^data:image\/png;base64,/,
          ""
        );
        // Convert base64 to bytes
        const imageBytes = Uint8Array.from(atob(base64DataCleaned), (c) =>
          c.charCodeAt(0)
        );
        await writeBinaryFile(initImgPath, imageBytes);
        const data: any = {
          prompt: prompt,
          width: resolution.width,
          height: resolution.height,
          output_path: outputPath,
          init_image_file: initImgPath,
          strength: 0.5,
          guidance_scale: 0.0,
          num_inference_steps: 2.0,
          aspect_ratio: "1:1",
        };
        const model = "img2img_turbo_xl";
        try {
          sendPostRequest2(model, data).then(async (response) => {
            console.log("Response:", response);
            await createImage(outputPath);
          });
        } catch (error) {
          console.error("Error generating image:", error);
        }
      });
    }
  };

  useEffect(() => {
    console.log("initCanvas");
    const newCanvas = new fabric.Canvas("c", {
      height: window.innerHeight,
      width: window.innerWidth,
      isDrawingMode: true,
      preserveObjectStacking: true,
      backgroundColor: "#fff",
    });
    const newBrush = new fabric.PencilBrush(newCanvas);
    newBrush.width = brushSize;
    newBrush.color = color;
    newCanvas.freeDrawingBrush = newBrush;
    newCanvas.renderAll();
    setCanvas(newCanvas);
    setBrush(newBrush);
    return () => {
      newCanvas?.dispose();
    };
  }, []);

  return (
    <div>
      <canvas className="fixed h-screen w-screen" id="c" />
      <div
        ref={canvasMaskRef}
        className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-3/4 w-1/3 aspect-square border-4 border-black pointer-events-none "
      />
      <div className="flex justify-center items-center w-1/3 h-1/4 fixed bottom-28 left-1/2 -translate-x-1/2 z-50">
        <Toolbox
          onSetSelection={onSetSelection}
          onSetBrush={onSetBrush}
          onClear={onClear}
          onAddCircle={onAddCircle}
          onAddRectangle={onAddRectangle}
          onColorChange={onColorChange}
          onBrushSizeChange={onBrushSizeChange}
          onGenerateImage={onGenerateImage}
          onTextChange={onTextChange}
        />
      </div>
    </div>
  );
};

export default Canvas;
