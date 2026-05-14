import { HeroSection } from '@/components/hero/HeroSection';
import { Manifesto } from '@/components/sections/Manifesto';
import { WhyUs } from '@/components/sections/WhyUs';
import { Products } from '@/components/sections/Products';
import { CompareTable } from '@/components/sections/CompareTable';
import { SamplerCalculator } from '@/components/sections/SamplerCalculator';
import { Segments } from '@/components/sections/Segments';
import { Process } from '@/components/sections/Process';
import { Pricing } from '@/components/sections/Pricing';
import { PdfLeadMagnet } from '@/components/sections/PdfLeadMagnet';
import { Clients } from '@/components/sections/Clients';
import { Quality } from '@/components/sections/Quality';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Contacts } from '@/components/sections/Contacts';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Manifesto />
      <WhyUs />
      <Products />
      <CompareTable />
      <SamplerCalculator />
      <Segments />
      <Process />
      <Pricing />
      <PdfLeadMagnet />
      <Clients />
      <Quality />
      <FAQ />
      <FinalCTA />
      <Contacts />
    </>
  );
}
