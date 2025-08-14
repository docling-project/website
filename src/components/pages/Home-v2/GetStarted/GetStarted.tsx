//Components
import Display from "@/components/ui/Display";
import Card_v2 from "@/components/ui/Card-v2";

//Styles
import styles from "./styles.module.scss";

//Utils
import { STARTED_CARD } from "@/utils/constants";

const GetStarted = () => {
  return (
    <section className={styles.getStarted}>
      <div className={"container-wide"}>
        <Display
          className={`display display--weight-700 ${styles.getStarted_title}`}
          size={300}
        >
          Getting Started
        </Display>
        <div className={styles.getStarted_cards}>
          {STARTED_CARD.map((card, index) => (
            <Card_v2
              key={index}
              title={card.title + " →"}
              details={card.text}
              backgroundUrl={card.backgroundUrl}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
