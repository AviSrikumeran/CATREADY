"use client";

import { useState } from "react";
import { Clock, ClipboardCheck, Wifi, Wrench, Shield } from "lucide-react";

const valueProps = [
  {
    number: "01",
    title: "FASTER INSPECTIONS",
    icon: Clock,
    description: "Complete inspections in minutes, not hours. Voice input eliminates manual data entry.",
  },
  {
    number: "02",
    title: "STANDARDIZED PROCESS",
    icon: ClipboardCheck,
    description: "Every inspection follows the same structure. No more inconsistent reports or missed checks.",
  },
  {
    number: "03",
    title: "REAL-TIME STATUS",
    icon: Wifi,
    description: "Fleet managers see machine status instantly. No waiting for paperwork to arrive.",
  },
  {
    number: "04",
    title: "REDUCED DOWNTIME",
    icon: Wrench,
    description: "Catch issues early. AI flags problems before they become expensive failures.",
  },
  {
    number: "05",
    title: "OPERATOR SAFETY",
    icon: Shield,
    description: "Ensure every safety check is completed. Protect your operators and your equipment.",
  },
];

export function ValueProps() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="features" className="bg-cat-gray py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-cat-black">
            Why CAT Ready?
          </h2>
        </div>

        {/* Desktop: Vertical Cards */}
        <div className="hidden lg:flex gap-4 h-[500px]">
          {valueProps.map((prop, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={prop.number}
                className={`relative rounded overflow-hidden cursor-pointer transition-all duration-500 ${
                  isActive ? "flex-[3]" : "flex-1"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Background */}
                <div
                  className={`absolute inset-0 transition-colors duration-300 ${
                    isActive ? "bg-cat-yellow" : "bg-white border border-cat-black/10"
                  }`}
                />

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col">
                  {/* Number */}
                  <span className={`text-sm font-mono ${isActive ? "text-cat-black/60" : "text-cat-black/40"}`}>
                    {prop.number}
                  </span>

                  {/* Vertical Title (when collapsed) */}
                  {!isActive && (
                    <div className="flex-1 flex items-center justify-center">
                      <span
                        className="text-lg font-black text-cat-black whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {prop.title}
                      </span>
                    </div>
                  )}

                  {/* Expanded Content */}
                  {isActive && (
                    <div className="flex-1 flex flex-col justify-end">
                      <prop.icon className="h-10 w-10 text-cat-black mb-4" />
                      <h3 className="text-2xl font-black text-cat-black mb-4">
                        {prop.title}
                      </h3>
                      <p className="text-cat-black/80 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  )}

                  {/* Icon at bottom (when collapsed) */}
                  {!isActive && (
                    <div className="mt-auto">
                      <prop.icon className="h-6 w-6 text-cat-black/60" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="lg:hidden space-y-4">
          {valueProps.map((prop) => (
            <div
              key={prop.number}
              className="bg-white border border-cat-black/10 rounded p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-cat-yellow rounded shrink-0">
                  <prop.icon className="h-6 w-6 text-cat-black" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cat-black/40 block mb-1">
                    {prop.number}
                  </span>
                  <h3 className="text-lg font-black text-cat-black mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
