//Components
import GetStarted from "../../Home-v2/GetStarted";
import LiveAssistant from "../../Home-v2/LiveAssistant";
import DarkHero from "../DarkHero";
import TransformContent from "../TrasnformContent";
import Features from "../Features/Features";

const Template = () => {
  return (
    <>
      <DarkHero />
      <TransformContent />
      <Features />
      <GetStarted />
      <LiveAssistant />
    </>
  );
};

export default Template;
