import HeroSection from "@/components/ux/Home/HeroSection";
import Spcialist from "@/components/ux/Home/Spcialist/Spcialist";
import TopRatedDoctors from "@/components/ux/Home/TopRateedDoctor/TopRatedDoctor";
import WhyChooseUs from "@/components/ux/Home/WhyChoiceUs/WhyChoiceUs";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Spcialist />
      <TopRatedDoctors />
      <WhyChooseUs />
    </main>
  );
}
