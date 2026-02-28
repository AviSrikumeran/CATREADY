import { ScanLine, Mic, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ScanLine,
    title: "Select Machine",
    description: "Choose from your fleet or scan the QR code. See current status and inspection history at a glance.",
  },
  {
    number: "02",
    icon: Mic,
    title: "Capture & Speak",
    description: "Take photos of key areas. Speak your findings. AI transcribes and structures your notes in real-time.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Get Status",
    description: "Receive PASS, FAIL, or MONITOR status. Clear summary, recommended actions, and part identification when needed.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cat-gray py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-cat-black">
            How it works
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative border-t border-cat-black/10 py-12 lg:py-16"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
                {/* Faded Number */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block">
                  <span className="text-[10rem] xl:text-[14rem] font-black text-cat-black/[0.03] leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Mobile Number */}
                <span className="lg:hidden text-6xl font-black text-cat-black/10">
                  {step.number}
                </span>

                {/* Content */}
                <div className="lg:ml-auto lg:max-w-2xl lg:pl-32 xl:pl-48">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 bg-cat-yellow rounded mb-6">
                    <step.icon className="h-7 w-7 text-cat-black" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-cat-black mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
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
