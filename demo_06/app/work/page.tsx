"use client";

import Link from "next/link";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WorkSliderButtons from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    title: "Project One",
    description: "Description One",
    category: "frontend",
    stack: [{ name: "React" }, { name: "TypeScript" }],
    image: "/assets/work/thumb0.png",
    live: "",
    github: "",
  },
  {
    num: "02",
    title: "Project Two",
    description: "Description Two",
    category: "backend",
    stack: [{ name: "Node.js" }, { name: "Express" }],
    image: "/assets/work/thumb1.png",
    live: "",
    github: "",
  },
  {
    num: "03",
    title: "Project Three",
    description: "Description Three",
    category: "fullstack",
    stack: [{ name: "React" }, { name: "Node.js" }, { name: "Express" }],
    image: "/assets/work/thumb2.png",
    live: "",
    github: "",
  },
  {
    num: "04",
    title: "Project Four",
    description: "Description Four",
    category: "frontend",
    stack: [{ name: "React" }, { name: "TypeScript" }],
    image: "/assets/work/thumb3.png",
    live: "",
    github: "",
  },
  {
    num: "05",
    title: "Project Five",
    description: "Description Five",
    category: "backend",
    stack: [{ name: "Node.js" }, { name: "Express" }],
    image: "/assets/work/thumb4.png",
    live: "",
    github: "",
  },
  {
    num: "06",
    title: "Project Six",
    description: "Description Six",
    category: "fullstack",
    stack: [{ name: "React" }, { name: "Node.js" }, { name: "Express" }],
    image: "/assets/work/thumb5.png",
    live: "",
    github: "",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper: { activeIndex: number }) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based off current slide index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.4, delay: 1.5, ease: "easeIn" },
      }}
      className="flex min-h-[80vh] flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-12">
          <div className="order-2 flex w-full flex-col xl:order-none xl:h-32 xl:w-1/2 xl:justify-between">
            <div className="flex h-1/2 flex-col gap-4">
              {/* outine num */}
              <div className="text-outline text-8xl font-extrabold leading-none text-transparent">
                {project.num}
              </div>
              {/* project catgeory */}
              <h2 className="text-2xl font-bold capitalize leading-none text-white transition-all duration-500 group-hover:text-accent">
                {project.category}
              </h2>
              {/* project description */}
              <p className="text-sm text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex w-full flex-row gap-2">
                {project.stack.map((stack, index) => {
                  return (
                    <li key={index} className="text-md text-accent">
                      {stack.name}
                      {/* remove the last comma */}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              {/* border */}
              <div className="border border-white/20" />
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* Live project button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                        <BsArrowUpRight className="text-3xl text-white group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* Github project button */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                        <BsGithub className="text-3xl text-white group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-1/2">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              className="mb-12 xl:h-72"
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="group relative flex h-60 items-center justify-center bg-white/20">
                      {/* overly */}
                      <div className="absolute bottom-0 top-0 z-10 h-full w-full bg-black/10"></div>
                      {/* image */}
                      <div className="relative h-full w-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          layout="fill"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* work slider buttons */}
              <WorkSliderButtons
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_20px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-lg w-8 h-8 flex justify-center items-center transition-all"
                iconStyles="text-white text-2xl"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
