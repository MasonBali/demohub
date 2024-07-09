"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { RgbaColor, RgbaColorPicker } from "react-colorful";

interface ToolboxProps {
  onSetSelection: () => void;
  onSetBrush: () => void;
  onClear: () => void;
  onAddCircle: () => void;
  onAddRectangle: () => void;
  onColorChange: (color: RgbaColor) => void;
  onBrushSizeChange: (size: number[]) => void;
  onGenerateImage: () => void;
  onTextChange: (text: string) => void;
}

export default function Toolbox(props: ToolboxProps) {
  return (
    <div className="flex flex-col h-full w-full gap-5 p-5 bg-gray-50 border-2 border-gray-100 rounded-lg shadow-lg">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <Button onClick={props.onSetSelection} className="w-12 h-12">
            <div className="absolute w-8 h-8 bg-icon-select bg-no-repeat bg-center bg-cover" />
          </Button>
          <Button onClick={props.onSetBrush} className="w-12 h-12">
            <div className="absolute w-8 h-8 bg-icon-draw bg-no-repeat bg-center bg-cover" />
          </Button>
          <Button onClick={props.onClear} className="w-12 h-12">
            <div className="absolute w-8 h-8 bg-icon-clear bg-no-repeat bg-center  bg-cover" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => {}} className="w-12 h-12">
            <div className="absolute w-8 h-8 text-xl">S</div>
          </Button>
          <Button onClick={() => {}} className="w-12 h-12">
            <div className="absolute w-8 h-8 text-xl">W</div>
          </Button>
          <Button onClick={() => {}} className="w-12 h-12">
            <div className="absolute w-8 h-8 text-xl">R</div>
          </Button>
          <Button onClick={() => {}} className="w-12 h-12">
            <div className="absolute w-8 h-8 text-xl">V</div>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={props.onAddCircle} className="w-12 h-12">
            <div className="absolute w-8 h-8 bg-icon-circle bg-no-repeat bg-center bg-cover" />
          </Button>
          <Button onClick={props.onAddRectangle} className="w-12 h-12">
            <div className="absolute w-8 h-8 bg-icon-rectangle bg-no-repeat bg-center bg-cover" />
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
