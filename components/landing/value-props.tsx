"use client";

import { useRef } from "react";
import { Clock, ClipboardCheck, Wifi, Wrench, Shield } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const valueProps = [
  {
    number: "01",
    title: "FASTER INSPECTIONS",
    shortTitle: "FASTER",
    icon: Clock,
    description: "Complete inspections in minutes, not hours. Voice input eliminates manual data entry.",
  },
  {
    number: "02",
    title: "STANDARDIZED PROCESS",
    shortTitle: "STANDARD",
    icon: ClipboardCheck,
    description: "Every inspection follows the same structure. No more inconsistent reports or missed checks.",
  },
  {
    number: "03",
    title: "REAL-TIME STATUS",
    shortTitle: "REAL-TIME",
    icon: Wifi,
    description: "Fleet managers see machine status instantly. No waiting for paperwork to arrive.",
  },
  {
    number: "04",
    title: "REDUCED DOWNTIME",
    shortTitle: "DOWNTIME",
    icon: Wrench,
    description: "Catch issues early. AI flags problems before they become expensive failures.",
  },
  {
    number: "05",
    title: "OPERATOR SAFETY",
    shortTitle: "SAFETY",
    icon: Shield,
    description: "Ensure every safety check is completed. Protect your operators and your equipment.",
  },
];

function VerticalCard({
  prop,
  isActive,
}: {
  prop: (typeof valueProps)[0];
  isActive: boolean;
}) {
  return (
    <motion.div
      className={`relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden transition-all duration-500 ease-out ${
        isActive ? "flex-[3]" : "flex-[0.8]"
      }`}
      style={{
        backgroundColor: isActive ? "hsl(45 100% 53%)" : "white",
        border: isActive ? "none" : "1px solid rgba(0,0,0,0.1)",
      }}
      layout
    >
      {/* Number - top left */}
      <span
        className={`absolute top-6 left-6 text-sm font-mono transition-colors duration-300 ${
          isActive ? "text-cat-black/50" : "text-cat-black/30"
        }`}
      >
        {prop.number}
      </span>

      {/* Collapsed state - vertical text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className="text-lg font-black text-cat-black/60 tracking-wider"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          {prop.shortTitle}
        </span>
      </motion.div>

      {/* Expanded state - full content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-8"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, delay: isActive ? 0.15 : 0 }}
      >
        <div className="max-w-xs">
          <h3 className="text-2xl md:text-3xl font-black text-cat-black mb-3 leading-tight">
            {prop.title}
          </h3>
          <p className="text-sm md:text-base text-cat-black/70 leading-relaxed mb-6">
            {prop.description}
          </p>
          <div className="flex items-center justify-start">
            <div className="w-14 h-14 rounded-xl bg-cat-black/10 flex items-center justify-center">
              <prop.icon className="h-7 w-7 text-cat-black" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Icon at bottom for collapsed state */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ opacity: isActive ? 0 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <prop.icon className="h-6 w-6 text-cat-black/40" />
      </motion.div>
    </motion.div>
  );
}

export function ValueProps() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Determine which card is active based on scroll
  const activeIndex = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45, 0.55, 0.65], [0, 1, 2, 3, 4, 4]);

  // Header animation
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  return (
    <section ref={sectionRef} id="features" className="bg-background py-20 lg:py-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-cat-black">
            Why CAT Ready?
          </h2>
        </motion.div>

        {/* Vertical Accordion Cards */}
        <motion.div className="flex gap-3 md:gap-4">
          {valueProps.map((prop, index) => (
            <VerticalCardWrapper
              key={prop.number}
              prop={prop}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Wrapper to handle scroll-based active state
function VerticalCardWrapper({
  prop,
  index,
  scrollYProgress,
}: {
  prop: (typeof valueProps)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each card has a scroll range where it's active
  const ranges = [
    [0.12, 0.24],
    [0.22, 0.34],
    [0.32, 0.44],
    [0.42, 0.54],
    [0.52, 0.70],
  ];

  const isActiveMotion = useTransform(
    scrollYProgress,
    [ranges[index][0], ranges[index][0] + 0.02, ranges[index][1] - 0.02, ranges[index][1]],
    [0, 1, 1, 0]
  );

  return (
    <motion.div className="flex-1" style={{ flex: useTransform(isActiveMotion, [0, 1], [0.8, 3]) }}>
      <VerticalCard prop={prop} isActive={false} />
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: isActiveMotion }}
      >
        <VerticalCard prop={prop} isActive={true} />
      </motion.div>
    </motion.div>
  );
}
