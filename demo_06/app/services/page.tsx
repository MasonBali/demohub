"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "We build websites that serve as powerful marketing tools and bring memorable brand experiences.",
    href: "",
  },
  {
    num: "02",
    title: "Mobile Applications",
    description:
      "We create mobile applications that support your brand and meet the needs of your customers.",
    href: "",
  },
  {
    num: "03",
    title: "Blockchain",
    description:
      "We provide Blockchain solutions for businesses to help them grow and stay ahead of the competition.",
    href: "",
  },
  {
    num: "04",
    title: "UI/UX Design",
    description:
      "We create unique design solutions that help brands stand out and leave a lasting impression.",
    href: "",
  },
  {
    num: "05",
    title: "QA & Testing",
    description:
      "Our team provides QA and testing services to ensure the highest level of software quality.",
    href: "",
  },
];

const Services = () => {
  return (
    <section className="justiy-center flex min-h-[80vh] flex-col py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 1.5, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 gap-24 md:grid-cols-2"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="group flex flex-1 flex-col justify-center gap-6"
              >
                {/* top */}
                <div className="flex w-full items-center justify-between">
                  <div className="text-outline group-hover:text-outline-hover text-5xl font-extrabold text-transparent transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-all duration-500 hover:-rotate-45 group-hover:bg-accent"
                  >
                    <BsArrowDownRight className="text-2xl text-primary" />
                  </Link>
                </div>
                {/* title */}
                <h2 className="front-bold h2 text-3xl leading-none text-white transition-all duration-500 group-hover:text-accent">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/50"> {service.description}</p>
                {/* border */}
                <div className="w-full border-b border-white/20"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
