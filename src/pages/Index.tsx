import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ConferenceSection from "@/components/ConferenceSection";
import ThemeSection from "@/components/ThemeSection";
import InfoCardsSection from "@/components/InfoCardsSection";
import SurveySection from "@/components/SurveySection";
import EventSection from "@/components/EventSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ConferenceSection />
      <ThemeSection />
      <InfoCardsSection />
      <SurveySection />
      <EventSection />
      <FooterSection />
    </main>
  );
};

export default Index;
