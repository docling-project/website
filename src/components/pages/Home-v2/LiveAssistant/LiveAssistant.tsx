//Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import StaticImage from "@/components/ui/StaticImage";

//Styles
import styles from "./styles.module.scss";
const LiveAssistant = () => {
  return (
    <section>
      <div className={`container-wide ${styles.live}`}>
        <div>
          <Display
            className={`display display--weight-700 ${styles.live_title}`}
            size={300}
          >
            Live Assistant
          </Display>
          <Text
            size={400}
            className={`display display--weight-400 ${styles.live_detail}`}
          >
            Want to harness the power of AI with live support on Docling? Try{" "}
            <span className={styles.live_chat_with}>Chat with Dosu,</span>{" "}
            powered by our friends at Dosu.{" "}
            <span className={styles.live_chat_now}>Chat Now →</span>
          </Text>
        </div>
        <div>
          <StaticImage
            src={"/images/assistant.webp"}
            alt={"live image"}
            width={498}
            height={332}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default LiveAssistant;
