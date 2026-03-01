"use client";

import { useRef, useEffect, useState } from "react";
import { Clock, ClipboardCheck, Wifi, Wrench, Shield } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

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
    <div
      className={`
        relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer
        transition-all duration-500 ease-out
        ${isActive ? "bg-cat-yellow" : "bg-white border border-cat-black/10 hover:bg-cat-yellow/20"}
      `}
      style={{
        flex: isActive ? 3 : 0.8,
      }}
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
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
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
      </div>

      {/* Expanded state - full content */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionDelay: isActive ? "150ms" : "0ms" }}
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
      </div>

      {/* Icon at bottom for collapsed state */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
          isActive ? "opacity-0" : "opacity-50"
        }`}
      >
        <prop.icon className="h-6 w-6 text-cat-black/40" />
      </div>
    </div>
  );
}

export function ValueProps() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Update active index based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const newIndex = Math.min(4, Math.floor(progress * 5));
    setActiveIndex(newIndex);
  });

  // Header animation
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  return (
    <section ref={sectionRef} id="features" className="bg-background pt-24 md:pt-32 pb-16 md:pb-24">
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
        <div className="flex gap-3 md:gap-4">
          {valueProps.map((prop, index) => (
            <VerticalCard
              key={prop.number}
              prop={prop}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
