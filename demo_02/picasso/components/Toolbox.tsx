"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/components/Store";

import { RgbaColor, RgbaColorPicker } from "react-colorful";

interface ToolboxProps {
  onSetSelection: () => void;
  onSetBrush: () => void;
  onClear: () => void;
  onAddCircle: () => void;
  onAddRectangle: () => void;
  onAddTriangle: () => void;
  onColorChange: (color: RgbaColor) => void;
  onBrushSizeChange: (size: number[]) => void;
  onGenerateImage: () => void;
  onTextChange: (text: string) => void;
}

export default function Toolbox(props: ToolboxProps) {
  // useStore variables
  const style = useStore((state) => state.style);
  const setStyle = useStore((state) => state.setStyle);
  // useState variables
  const [styleValue, setStyleValue] = useState<string>("");
  const [tool, setTool] = useState<string>("Brush");

  useEffect(() => {
    setStyleValue(style);
  }, [style]);

  return (
    <div className="flex flex-col h-full w-full gap-5 p-5 bg-gray-50 border-2 border-gray-100 rounded-lg shadow-lg">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              props.onSetSelection();
              setTool("Selection");
            }}
            className={`w-12 h-12 ${
              tool === "Selection" ? "bg-blue-500 hover:bg-blue-500" : ""
            }`}
          >
            <div className="absolute w-8 h-8 bg-icon-select bg-no-repeat bg-center bg-cover" />
          </Button>
          <Button
            onClick={() => {
              props.onSetBrush();
              setTool("Brush");
            }}
            className={`w-12 h-12 ${
              tool === "Brush" ? "bg-blue-500 hover:bg-blue-500" : ""
            }`}
          >
            <div className="absolute w-8 h-8 bg-icon-draw bg-no-repeat bg-center bg-cover" />
          </Button>
          <Button
            onClick={() => {
              props.onClear();
            }}
            className="w-12 h-12 active:bg-blue-500"
          >
            <div className="absolute w-8 h-8 bg-icon-clear bg-no-repeat bg-center  bg-cover" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setStyle("Sketch");
            }}
            className={`w-12 h-12 ${
              styleValue === "Sketch" && "bg-blue-500 hover:bg-blue-500"
            }`}
          >
            <div className="absolute w-8 h-8 text-xl">S</div>
          </Button>
          <Button
            onClick={() => {
              setStyle("Watercolor");
            }}
            className={`w-12 h-12 ${
              styleValue === "Watercolor" && "bg-blue-500 hover:bg-blue-500"
            }`}
          >
            <div className="absolute w-8 h-8 text-xl">W</div>
          </Button>
          <Button
            onClick={() => {
              setStyle("Isometric");
            }}
            className={`w-12 h-12 ${
              styleValue === "Isometric" && "bg-blue-500 hover:bg-blue-500"
            }`}
          >
            <div className="absolute w-8 h-8 text-xl">I</div>
          </Button>
          <Button
            onClick={() => {
              setStyle("Realistic");
            }}
            className={`w-12 h-12 ${
              styleValue === "Realistic" && "bg-blue-500 hover:bg-blue-500"
            }`}
          >
            <div className="absolute w-8 h-8 text-xl">R</div>
          </Button>
          <Button
            onClick={() => {
              setStyle("Lowpoly");
            }}
            className={`w-12 h-12 ${
              styleValue === "Lowpoly" && "bg-blue-500 hover:bg-blue-500"
            }`}
          >
            <div className="absolute w-8 h-8 text-xl">L</div>
          </Button>
          {/* insert new picasso button here */}
          <Button
            onClick={() => {
              setStyle("Picasso");
            }}
            className={`w-12 h-12 ${
              styleValue === "Picasso" && "bg-blue-500 hover:bg-blue-500"
            }`}
          >
            <div className="absolute w-8 h-8 text-xl">P</div>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={props.onAddCircle} className="w-12 h-12">
            <div className="absolute w-8 h-8 bg-icon-circle bg-no-repeat bg-center bg-cover" />
          </Button>
          <Button onClick={props.onAddRectangle} className="w-12 h-12">
            <div className="absolute w-8 h-8 bg-icon-rectangle bg-no-repeat bg-center bg-cover" />
          </Button>
          <Button onClick={props.onAddTriangle} className="w-12 h-12">
            <div className="absolute w-8 h-8 bg-icon-triangle bg-no-repeat bg-center bg-cover" />
          </Button>
        </div>
      </div>
      <div className="flex gap-5">
        <Textarea
          placeholder="Enter your text here"
          onChange={(e) => {
            props.onTextChange(e.target.value);
          }}
          className="rounded-lg shadow-inner resize-none outline-none"
        />
        <div className="flex flex-col gap-5">
          <RgbaColorPicker
            onChange={(color) => props.onColorChange(color)}
            className="rounded-lg shadow-lg"
          />
          <Slider
            min={1}
            max={100}
            step={1}
            defaultValue={[5]}
            onValueChange={(value) => props.onBrushSizeChange(value)}
          />
        </div>
        <Button className="h-full" onClick={props.onGenerateImage}>
          <div className="w-5 h-5 bg-icon-generate bg-no-repeat bg-center" />
        </Button>
      </div>
    </div>
  );
}
