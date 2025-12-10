import LayoutWrapper from "@/components/layout/LayoutWrapper";
import HeroSection from "@/components/sections/HeroSection";
import LayananKami from "@/components/sections/LayananKami";
import CekStatus from "@/components/sections/CekStatus";


export default function HomePage() {
  return (
    <LayoutWrapper>
      <HeroSection />
      <LayananKami />
      <CekStatus />
    </LayoutWrapper>
  );
}
