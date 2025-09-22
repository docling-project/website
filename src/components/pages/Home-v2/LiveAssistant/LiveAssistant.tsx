// Dependencies
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import StaticImage from "@/components/ui/StaticImage";

// Styles
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
            <Link
              href="https://app.dosu.dev/097760a8-135e-4789-8234-90c8837d7f1c/ask?utm_source=github"
              className={styles.live_chat_now}
            >
              Chat Now →
            </Link>
          </Text>
        </div>
        <div className={styles.live_image}>
          <StaticImage
            src="/images/assistant.webp"
            alt="live image"
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
