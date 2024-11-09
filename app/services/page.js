import ServicesHero from "@/components/sections/services-hero";
import ExchangeServices from "@/components/sections/exchange-services";
import BusinessSolutions from "@/components/sections/business-solutions";
import ExchangeRates from "@/components/sections/exchange-rates";

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ExchangeServices />
      <ExchangeRates />
      <BusinessSolutions />
    </main>
  );
}
