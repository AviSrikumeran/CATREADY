import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Stakes() {
  return (
    <section className="dark-section bg-cat-black py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Stakes Escalation */}
          <div className="space-y-6 sm:space-y-8">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Every missed leak costs{" "}
              <span className="text-cat-yellow">$47K</span>.
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Every delayed repair costs{" "}
              <span className="text-cat-yellow">3 weeks</span>.
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Every skipped inspection is a{" "}
              <span className="text-white/50">risk you didn&apos;t have to take</span>.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mt-16 pt-16 border-t border-white/10">
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-cat-yellow leading-tight">
              Avoid operator disasters entirely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="bg-cat-yellow py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-cat-black mb-6">
          Try CAT Ready
        </h2>
        <p className="text-xl text-cat-black/80 mb-10 max-w-2xl mx-auto">
          Built on Caterpillar inspection standards. Powered by AI.
        </p>

        {/* CAT Wordmark */}
        <div className="mb-10 flex justify-center">
          <CaterpillarWordmark className="h-6 opacity-60" />
        </div>

        <Link
          href="/inspect"
          className="inline-flex items-center justify-center gap-2 bg-cat-black text-white font-bold text-lg px-8 py-4 rounded hover:bg-cat-black/90 transition-all"
        >
          Start Inspection
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

function CaterpillarWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="0"
        y="20"
        fontFamily="Arial Black, sans-serif"
        fontSize="20"
        fontWeight="900"
        fill="#1A1A1A"
        letterSpacing="2"
      >
        CATERPILLAR
      </text>
    </svg>
  );
}
