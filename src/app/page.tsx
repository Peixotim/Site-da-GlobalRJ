import CertifiersShowcaseV3 from "@/components/Certifiers";
import FooterPremium from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SaibaMais from "@/components/SaibaMais";
import StatsBarNeo from "@/components/Stats";
import EmpresasShowcase from "@/components/EmpresasShowCase";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SaibaMais />
      <StatsBarNeo className="mt-32" />
      <CertifiersShowcaseV3 className="mt-28" />
      <EmpresasShowcase className="mt-32" />

      <FooterPremium />
    </div>
  );
}
