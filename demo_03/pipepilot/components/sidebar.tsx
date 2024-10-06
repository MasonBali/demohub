import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "@/lib/use-dimensions";
import { MenuToggle } from "./menutoggle";
import { Navigation } from "./navigationbar";
import { Label } from "./ui/label";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 50px 74px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Sidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <div
      className={`flex h-full p-3 transition-all ${isOpen ? "w-52 delay-0 duration-100" : "w-16 delay-700 duration-500"}`}
    >
      <div className={`fixed left-0 top-0 h-full w-52`}>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
        >
          <div>
            <MenuToggle toggle={() => toggleOpen()} />
            <div
              className={`absolute left-4 top-10 z-50 ml-1.5 mt-0.5 flex cursor-pointer items-center justify-center gap-2`}
              onClick={() => toggleOpen()}
            >
              <div
                className={`h-14 w-14 rounded-full bg-pilot-default bg-contain bg-center bg-no-repeat p-4 transition-all ease-in-out hover:border-white`}
              />
              <Label
                className={`text-lg font-semibold text-white transition-all duration-100 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
              >
                PipePilot
              </Label>
            </div>
          </div>

          <motion.div
            className={`absolute left-0 top-0 h-full w-48 border-white bg-white bg-opacity-20 backdrop-filter ${isOpen ? "" : "animate-pulse"}`}
            variants={sidebar}
          />
          <Navigation />
        </motion.nav>
      </div>
    </div>
  );
};
