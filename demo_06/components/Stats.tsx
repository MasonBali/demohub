"use client";

import CountUp from "react-countup";

const stats = [
  { num: 19, text: "Years of experience" },
  { num: 34, text: "Projects completed" },
  { num: 625, text: "Code commits" },
  { num: 900, text: "Cups of coffee" },
];

const Stats = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="xl:max-x-none mx-auto flex max-w-[80vw] flex-wrap gap-6">
          {stats.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-1 items-center justify-center gap-4 xl:justify-start"
              >
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  className="text-4xl font-extrabold text-white xl:text-6xl"
                />
                <p
                  className={`${item.text.length < 15 ? "max-w-20" : "max-w-28"} leading-snug text-white/70`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
