"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, ArrowRight } from "lucide-react";

// Smooth waveform component with sine-wave based animation
function SmoothWaveform() {
  const [bars, setBars] = useState<number[]>(Array(20).fill(25));
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000; // seconds
      
      const newBars = Array(20).fill(0).map((_, i) => {
        // Multiple sine waves layered for organic feel
        const wave1 = Math.sin(elapsed * 1.5 + i * 0.4) * 12;
        const wave2 = Math.sin(elapsed * 2.3 + i * 0.25) * 8;
        const wave3 = Math.sin(elapsed * 0.8 + i * 0.6) * 5;
        
        // Center bars slightly taller
        const centerBoost = Math.sin((i / 19) * Math.PI) * 10;
        
        return Math.max(8, 25 + wave1 + wave2 + wave3 + centerBoost);
      });
      
      setBars(newBars);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="flex items-center gap-1 w-full justify-center h-16">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-1 bg-cat-yellow rounded-full transition-all duration-150 ease-out"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}

const transcriptText = "Left track tensioner showing minor hydraulic seepage. Recommend monitoring over next 48 hours.";

const checklistItems = [
  { category: "Hydraulics", status: "MONITOR", finding: "Minor seepage detected" },
  { category: "Tracks", status: "PASS", finding: "Within tolerance" },
  { category: "Engine", status: "PASS", finding: "Operating normally" },
];

export function MagicMoment() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [activeItems, setActiveItems] = useState(0);

  useEffect(() => {
    if (!isAnimating) return;

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < transcriptText.length) {
        setDisplayedText(transcriptText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShowChecklist(true);
          let itemIndex = 0;
          const itemInterval = setInterval(() => {
            if (itemIndex < checklistItems.length) {
              setActiveItems(itemIndex + 1);
              itemIndex++;
            } else {
              clearInterval(itemInterval);
            }
          }, 400);
        }, 500);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [isAnimating]);

  const handleStart = () => {
    setIsAnimating(true);
    setDisplayedText("");
    setShowChecklist(false);
    setActiveItems(0);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setDisplayedText("");
    setShowChecklist(false);
    setActiveItems(0);
  };

  return (
    <section className="relative">
      {/* Top gradient: cream to black */}
      <div 
        className="h-24 md:h-32"
        style={{
          background: "linear-gradient(to bottom, hsl(40, 20%, 95%), #1a1a1a)"
        }}
      />
      
      {/* Dark content area */}
      <div className="bg-[#1a1a1a] py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
            Speak It. See It. Submit It.
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Your voice becomes a structured report in seconds.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#2a2a2a] rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${isAnimating ? "bg-cat-red animate-pulse" : "bg-white/20"}`} />
                  <span className="text-sm font-medium text-white/60">
                    {isAnimating ? "Recording..." : "Tap to record"}
                  </span>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6 min-h-[80px] flex items-center">
                  {isAnimating ? (
                    <SmoothWaveform />
                  ) : (
                    <p className="text-sm text-white/40 text-center w-full">
                      Audio waveform will appear here
                    </p>
                  )}
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-4 min-h-[100px]">
                  <p className="text-xs font-medium text-white/40 mb-2">
                    TRANSCRIPT
                  </p>
                  <p className="text-white leading-relaxed">
                    {displayedText}
                    {isAnimating && displayedText.length < transcriptText.length && (
                      <span className="inline-block w-0.5 h-4 bg-cat-yellow ml-1 animate-pulse" />
                    )}
                  </p>
                </div>

                <button
                  onClick={isAnimating ? handleReset : handleStart}
                  className={`mt-6 w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all ${
                    isAnimating ? "bg-white text-cat-black" : "bg-cat-yellow text-cat-black"
                  }`}
                >
                  <Mic className="h-5 w-5" />
                  {isAnimating ? "Reset Demo" : "Try Voice Demo"}
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ArrowRight className="h-4 w-4 text-white/60" />
                  <span className="text-sm font-medium text-white/60">
                    Auto-generated checklist
                  </span>
                </div>

                <div className="space-y-3">
                  {checklistItems.map((item, index) => (
                    <div
                      key={item.category}
                      className={`bg-[#1a1a1a] rounded-xl p-4 transition-all duration-300 ${
                        showChecklist && index < activeItems
                          ? "opacity-100 translate-y-0"
                          : "opacity-30 translate-y-2"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white">{item.category}</span>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            item.status === "PASS"
                              ? "bg-green-500 text-white"
                              : item.status === "MONITOR"
                              ? "bg-cat-yellow text-cat-black"
                              : "bg-cat-red text-white"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">{item.finding}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Bottom gradient: black to cream */}
      <div 
        className="h-24 md:h-32"
        style={{
          background: "linear-gradient(to bottom, #1a1a1a, hsl(40, 20%, 95%))"
        }}
      />
    </section>
  );
}
