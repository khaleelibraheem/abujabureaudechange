import HeroSection from "@/components/sections/hero";
import FeaturesSection from "@/components/sections/features";
import HowItWorksSection from "@/components/sections/how-it-works";
import TestimonialsSection from "@/components/sections/testimonials";
import CTASection from "@/components/sections/cta";
import TrustedBySection from "@/components/sections/trusted-by";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
