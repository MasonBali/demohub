import * as React from "react";
import { motion } from "framer-motion";
import { Label } from "./ui/label";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(100, 100%, 100%)"
    strokeLinecap="round"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: () => void;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => (
  <button onClick={toggle} className="absolute left-10 top-16 z-50">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 10 2.5" },
          open: { d: "M -20 -20 L 8 7" },
        }}
      />
      <Path
        variants={{
          closed: { opacity: 1, d: "M 2 2.5 L 10 2.5" },
          open: { opacity: 1, d: "M 10 8 L 25 -7" },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { opacity: 1, d: "M 10 16.346 L 10 16.346" },
        }}
      />
    </svg>
  </button>
);
