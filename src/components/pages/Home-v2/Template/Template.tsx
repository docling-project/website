// Components
import GetStarted from "@/components/pages/Home-v2/GetStarted";
import LiveAssistant from "@/components/pages/Home-v2/LiveAssistant";
import DarkHero from "@/components/pages/Home-v2/DarkHero";
import TransformContent from "@/components/pages/Home-v2/TrasnformContent";
import Features from "@/components/pages/Home-v2/Features/Features";

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
