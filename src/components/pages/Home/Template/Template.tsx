//Components;
import Hero from "../Hero";
import TransformContent from "../../Home-v2/TrasnformContent";
import GetStarted from "../GetStarted";
import WhyChoose from "../WhyChoose";
import DarkHero from "../../Home-v2/DarkHero";

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
