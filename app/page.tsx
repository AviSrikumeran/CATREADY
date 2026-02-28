import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { HowItWorks } from "@/components/landing/how-it-works";
import { MagicMoment } from "@/components/landing/magic-moment";
import { ValueProps } from "@/components/landing/value-props";
import { Marquee } from "@/components/landing/marquee";
import { Stakes, CTA } from "@/components/landing/stakes";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Problem />
      <HowItWorks />
      <MagicMoment />
      <ValueProps />
      <Marquee />
      <Stakes />
      <CTA />
      <Footer />
    </main>
  );
}
