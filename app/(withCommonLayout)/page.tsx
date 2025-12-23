import HeroSection from "@/components/ux/Home/HeroSection";
import Spcialist from "@/components/ux/Home/Spcialist/Spcialist";
import TopRatedDoctors from "@/components/ux/Home/TopRateedDoctor/TopRatedDoctor";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Spcialist />
      <TopRatedDoctors />
    </main>
  );
}
