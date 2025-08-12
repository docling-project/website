//Components;
import Hero from "../Hero";
import TransformContent from "../TrasnformContent";
import GetStarted from "../GetStarted";
import WhyChoose from "../WhyChoose";
import DarkHero from "../DarkHero";

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
