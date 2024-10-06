import * as React from "react";
import { motion } from "framer-motion";
import Navigation from "./navigation";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
const colors = [];

interface MenuItemProps {
  i: number;
}

export const MenuItem: React.FC<MenuItemProps> = ({ i }) => {
  // const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 1.0 }}
    >
      <Navigation />
      {/* <div className="left-10 top-20 flex flex-row">
        <div className="mr-20 flex h-12 w-12 rounded-full" style={style} />
        <div className="flex h-10 w-10 rounded-full" style={style} />
      </div> */}
    </motion.li>
  );
};
