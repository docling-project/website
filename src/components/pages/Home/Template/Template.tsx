// Components;
import Hero from "@/components/pages/Home/Hero";
import TransformContent from "@/components/pages/Home-v2/TrasnformContent";
import GetStarted from "@/components/pages/Home/GetStarted";
import WhyChoose from "@/components/pages/Home/WhyChoose";
import DarkHero from "@/components/pages/Home-v2/DarkHero";

const Template = () => {
  return (
    <>
      <DarkHero />
      <TransformContent />
      <WhyChoose />
      <GetStarted />
      <Hero />
      <TransformContent />
      <WhyChoose />
      <GetStarted />
    </>
  );
};

export default Template;
