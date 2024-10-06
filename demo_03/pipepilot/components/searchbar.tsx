import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipButton } from "./tooltipbutton";

export default function SearchBar() {
  return (
    <div className="flex h-20 w-full flex-row gap-2 rounded-lg border border-white border-opacity-30 bg-white bg-opacity-20 p-2 shadow-md backdrop-filter">
      <input
        className="h-full w-full border-none border-transparent bg-transparent p-2 text-lg text-white shadow-none outline-none"
        placeholder="Search..."
      />
      <TooltipButton
        variant="glass"
        className="aspect-square h-full border-white border-opacity-30 bg-opacity-20 shadow-lg backdrop-filter"
        tooltipText="Search"
        tooltipSide="left"
      >
        <div className="bg-search-black h-8 w-8 bg-cover bg-no-repeat opacity-70" />
      </TooltipButton>
    </div>
  );
}
