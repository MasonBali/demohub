"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
} from "react-icons/fa";

import { SiTailwindcss, SiNextdotjs, SiTypescript } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

// experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My Experience",
  description: "I have worked with various companies and clients.",
  items: [
    {
      company: "Atomic Cartoons Inc",
      position: "Pipeline Technical Director",
      duration: "2017-present",
    },
    {
      company: "Atomic Cartoons Inc",
      position: "Pipeline Technical Director",
      duration: "2017-present",
    },
    {
      company: "Atomic Cartoons Inc",
      position: "Pipeline Technical Director",
      duration: "2017-present",
    },
    {
      company: "Atomic Cartoons Inc",
      position: "Pipeline Technical Director",
      duration: "2017-present",
    },
    {
      company: "Atomic Cartoons Inc",
      position: "Pipeline Technical Director",
      duration: "2017-present",
    },
    {
      company: "Atomic Cartoons Inc",
      position: "Pipeline Technical Director",
      duration: "2017-present",
    },
    {
      company: "Atomic Cartoons Inc",
      position: "Pipeline Technical Director",
      duration: "2017-present",
    },
    {
      company: "Atomic Cartoons Inc",
      position: "Pipeline Technical Director",
      duration: "2017-present",
    },
  ],
};

// education data
const education = {
  icon: "/assets/resume/graduation.svg",
  title: "My Education",
  description: "I have studied at various institutions.",
  items: [
    {
      institution: "British Columbia Institute of Technology",
      degree: "Bachelor of Technology",
      duration: "2017-2021",
    },
    {
      institution: "British Columbia Institute of Technology",
      degree: "Bachelor of Technology",
      duration: "2017-2021",
    },
    {
      institution: "British Columbia Institute of Technology",
      degree: "Bachelor of Technology",
      duration: "2017-2021",
    },
    {
      institution: "British Columbia Institute of Technology",
      degree: "Bachelor of Technology",
      duration: "2017-2021",
    },
  ],
};

const skills = {
  title: "My Skills",
  description:
    "I am proficient in various programming languages and technologies.",
  items: [
    { name: "HTML", icon: <FaHtml5 /> },
    { name: "CSS", icon: <FaCss3 /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "React", icon: <FaReact /> },
    { name: "Figma", icon: <FaFigma /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "TypeScript", icon: <SiTypescript /> },
  ],
};

// about data
const about = {
  title: "About Me",
  description:
    "I am a software developer with a passion for crafting elegant digital experiences. I am proficient in various programming languages and technologies.",
  items: [
    { fieldName: "Name", fieldValue: "Emre Tekinalp" },
    { fieldName: "Email", fieldValue: "e.tekinalp@icloud.com" },
    { fieldName: "Location", fieldValue: "Vancouver, Canada" },
    { fieldName: "Languages", fieldValue: "English, German" },
    { fieldName: "Phone", fieldValue: "+1 604 716 9703" },
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1.5, duration: 0.4, ease: "easeIn" },
      }}
      className="flex min-h-[80vh] items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col gap-12 xl:flex-row"
        >
          <TabsList className="mx-auto flex w-full max-w-[70vw] flex-col gap-6 xl:mx-0">
            <TabsTrigger value={"experience"}>Experience</TabsTrigger>
            <TabsTrigger value={"education"}>Education</TabsTrigger>
            <TabsTrigger value={"skills"}>Skills</TabsTrigger>
            <TabsTrigger value={"about"}>About me</TabsTrigger>
          </TabsList>
          {/* content */}
          <div className="min-h-[80vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-12 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="mx-auto max-w-[75vw] text-white/70 xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[80vh]">
                  <ul className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="flex h-48 flex-col items-center justify-center gap-1 rounded-xl bg-tertiary px-10 py-6 lg:items-start"
                        >
                          <span key={index} className="text-accent">
                            {item.duration}
                          </span>
                          <h3 className="min-w-24 max-w-60 text-center text-xl lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="min-h-2 min-w-2 rounded-full bg-accent"></span>
                            <p className="text-sm text-white/30">
                              {item.company}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-12 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="mx-auto max-w-[75vw] text-white/70 xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[80vh]">
                  <ul className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="flex h-48 flex-col items-center justify-center gap-1 rounded-xl bg-tertiary px-10 py-6 lg:items-start"
                        >
                          <span key={index} className="text-accent">
                            {item.duration}
                          </span>
                          <h3 className="min-w-24 max-w-96 text-center text-xl lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="min-h-2 min-w-2 rounded-full bg-accent"></span>
                            <p className="text-sm text-white/30">
                              {item.institution}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* skills */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-12 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{skills.title}</h3>
                <p className="mx-auto mb-10 max-w-[75vw] text-white/70 xl:mx-0">
                  {skills.description}
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:gap-16">
                {skills.items.map((skill, index) => {
                  return (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="group flex h-24 w-24 items-center justify-center rounded-xl bg-tertiary">
                            <div className="text-6xl transition-all duration-300 group-hover:text-accent">
                              {skill.icon}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  );
                })}
              </ul>
            </TabsContent>
            {/* about */}
            <TabsContent value="about" className="w-full">
              <div className="flex flex-col gap-12 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="mx-auto mb-10 max-w-[75vw] text-white/70 xl:mx-0">
                  {about.description}
                </p>
              </div>
              <ul className="mx-auto grid max-w-[80vw] grid-cols-1 gap-2 gap-y-6 xl:mx-0 xl:grid-cols-2">
                {about.items.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-center gap-4 xl:justify-start"
                    >
                      <span className="text-white/40">{item.fieldName}</span>
                      <span>{item.fieldValue}</span>
                    </li>
                  );
                })}
              </ul>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
