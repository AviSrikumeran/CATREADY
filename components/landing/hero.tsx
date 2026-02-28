import Link from "next/link";
import { Camera, Cpu, FileText, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          {/* Stacked Statement Typography */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cat-black leading-[0.9] tracking-tight">
            <span className="block">Inspect.</span>
            <span className="block pl-8 sm:pl-16">Report.</span>
            <span className="block pl-16 sm:pl-32">Deploy.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Voice-first inspection system for field operators. Speak your findings, 
            let AI structure the report. Get machines back to work faster.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
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
          </div>
        </div>

        {/* Flow Icons */}
        <div className="mt-16 lg:mt-24">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cat-yellow rounded">
              <Camera className="h-8 w-8 sm:h-10 sm:w-10 text-cat-black" />
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden sm:block" />
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cat-black rounded">
              <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden sm:block" />
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-cat-gray border-2 border-cat-black rounded">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-cat-black" />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Capture &rarr; AI Analysis &rarr; Structured Report
          </p>
        </div>
      </div>
    </section>
  );
}
