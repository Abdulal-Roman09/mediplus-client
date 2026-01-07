import HeroSection from "@/components/modules/Home/HeroSection/HeroSection";
import Spcialist from "@/components/modules/Home/Spcialist/Spcialist";
import TopRatedDoctors from "@/components/modules/Home/TopRateedDoctor/TopRatedDoctor";
import WhyChooseUs from "@/components/modules/Home/WhyChoiceUs/WhyChoiceUs";

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
