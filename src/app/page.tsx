import CertifiersShowcaseV3 from "@/components/Certifiers";
import FooterPremium from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import SaibaMais from "@/components/SaibaMais";
import EmpresasShowcase from "@/components/EmpresasShowCase";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SaibaMais />
      <Stats className="mt-20" />
      <CertifiersShowcaseV3 className="mt-28" />
      <EmpresasShowcase className="mt-32" />

      <FooterPremium />
    </div>
  );
}
