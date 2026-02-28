"use client";

import { useRef } from "react";
import Link from "next/link";
import { Camera, Cpu, FileText, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform values for the stacked text
  const inspectX = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const reportX = useTransform(scrollYProgress, [0, 0.5], [32, 80]);
  const deployX = useTransform(scrollYProgress, [0, 0.5], [64, 110]);
  
  const inspectScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
  const reportScale = useTransform(scrollYProgress, [0.1, 0.5], [1, 1.05]);
  const deployScale = useTransform(scrollYProgress, [0.2, 0.6], [1, 1.05]);

  // Background transition to darker
  const bgOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  // Content fade out as you scroll
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.4, 0.8], [0, -50]);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center pt-16 bg-white relative overflow-hidden">
      {/* Dark overlay that fades in on scroll */}
      <motion.div 
        className="absolute inset-0 bg-cat-black pointer-events-none"
        style={{ opacity: bgOpacity }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl">
          {/* Stacked Statement Typography */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cat-black leading-[0.9] tracking-tight">
            <motion.span 
              className="block"
              style={{ 
                x: inspectX, 
                scale: inspectScale,
              }}
            >
              Inspect.
            </motion.span>
            <motion.span 
              className="block pl-8 sm:pl-16"
              style={{ 
                x: reportX, 
                scale: reportScale,
              }}
            >
              Report.
            </motion.span>
            <motion.span 
              className="block pl-16 sm:pl-32"
              style={{ 
                x: deployX, 
                scale: deployScale,
              }}
            >
              Deploy.
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p 
            className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            Voice-first inspection system for field operators. Speak your findings, 
            let AI structure the report. Get machines back to work faster.
          </motion.p>

          {/* CTA */}
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4"
            style={{ opacity: contentOpacity, y: contentY }}
          >
            <Link
              href="/inspect"
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
            >
              Start Inspection
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="btn-secondary inline-flex items-center justify-center gap-2 text-lg"
            >
              See How It Works
            </Link>
          </motion.div>
        </div>

        {/* Flow Icons */}
        <motion.div 
          className="mt-16 lg:mt-24"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <motion.div 
              className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cat-yellow rounded"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Camera className="h-8 w-8 sm:h-10 sm:w-10 text-cat-black" />
            </motion.div>
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden sm:block" />
            <motion.div 
              className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cat-black rounded"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </motion.div>
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden sm:block" />
            <motion.div 
              className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cat-gray border-2 border-cat-black rounded"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-cat-black" />
            </motion.div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Capture &rarr; AI Analysis &rarr; Structured Report
          </p>
        </motion.div>
      </div>
    </section>
  );
}
