import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./menuitem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <div className="absolute left-8 top-28 pt-2">
    <motion.ul variants={variants}>
      {itemIds.map((i) => (
        <MenuItem i={i} key={i} />
      ))}
    </motion.ul>
  </div>
);

const itemIds = [0];
