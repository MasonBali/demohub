import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface TooltipButtonProps extends ButtonProps {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "glass"
    | null
    | undefined;
  className: string;
  tooltipText: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

const TooltipButton = React.forwardRef<HTMLButtonElement, TooltipButtonProps>(
  ({ tooltipText, tooltipSide = "top", children, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button ref={ref} {...props}>
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side={tooltipSide}
            className="text-md m-2 flex items-center justify-center bg-white bg-opacity-80 text-gray-800"
          >
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);

TooltipButton.displayName = "TooltipButton";

export { TooltipButton };
