"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const viewBoxSize = 300;
const circleCenter = viewBoxSize / 2;
const circleRadius = circleCenter - 15; // Adjusted to fit within the viewBox

const Photo = () => {
  return (
    <div className="relative h-full w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 1.4, duration: 0.4, ease: "easeIn" },
        }}
        className="relative"
      >
        {/* image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="h-24 w-24 mix-blend-lighten xl:h-80 xl:w-80" // Smaller image
        >
          <Image
            src="/assets/IMG_8607.png"
            alt="Profile Picture"
            priority
            quality={100}
            className="object-contain"
            layout="fill"
          />
        </motion.div>
        {/* circle */}
        <motion.svg
          className="absolute -left-8 -top-8 h-40 w-40 xl:h-96 xl:w-96" // Larger circle
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} // Updated viewBox to accommodate larger circle
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx={circleCenter} // Updated to match new viewBox
            cy={circleCenter} // Updated to match new viewBox
            r={circleRadius} // Increased radius
            stroke="#00ff99"
            strokeWidth="3"
            fill="transparent"
            animate={{
              rotate: [120, 360], // Rotate from 0 to 360 degrees
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "12 250 10 10"], // Randomize the dash pattern
            }}
            transition={{
              duration: 20, // Animation duration of 20 seconds
              repeat: Infinity, // Repeat the animation infinitely
              repeatType: "reverse", // Reverse the animation direction on each repeat
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Photo;
