import { toast } from "sonner";
import { TooltipButton } from "./tooltipbutton";
import { Label } from "./ui/label";
import { SettingsDialog } from "./settings";
import { BackgroundDrawer } from "./bgimage";

export default function Navigation() {
  return (
    <div className="flex h-full w-32 flex-col items-center justify-center gap-4 rounded-md p-2">
      {/* <div className="pointer-events-none flex min-h-20 w-full items-center justify-center gap-2 rounded-lg">
        <div className="bg-pilot-default h-14 w-14 bg-contain bg-center bg-no-repeat" />
        <Label className="text-lg font-semibold text-white"> PipePilot </Label>
      </div> */}
      <div className="flex h-full w-full flex-col items-center justify-start gap-10 rounded-lg">
        <TooltipButton
          variant="glass"
          className="aspect-square h-16 w-16"
          tooltipText="Home"
          tooltipSide="right"
        >
          <div className="h-12 w-12 bg-home-default bg-contain bg-center bg-no-repeat" />
        </TooltipButton>
        <TooltipButton
          variant="glass"
          className="aspect-square h-16 w-16"
          tooltipText="Chat"
          tooltipSide="right"
        >
          <div className="h-12 w-12 bg-chat-default bg-contain bg-center bg-no-repeat" />
        </TooltipButton>
        <TooltipButton
          variant="glass"
          className="aspect-square h-16 w-16"
          tooltipText="Notifications"
          tooltipSide="right"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          <div className="h-12 w-12 bg-notification-default bg-contain bg-center bg-no-repeat" />
        </TooltipButton>
        <BackgroundDrawer />
        <SettingsDialog />
      </div>
    </div>
  );
}
