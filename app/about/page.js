import AboutHero from "@/components/sections/about-hero";
import OurStory from "@/components/sections/our-story";
import CompanyValues from "@/components/sections/company-values";
import { Compliance } from "@/components/sections/compliance";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <CompanyValues />
      <Compliance />
    </main>
  );
}
