//Components
import Display from "@/components/ui/Display";
import Card_v2 from "@/components/ui/Card-v2";

//Styles
import styles from "./styles.module.scss";

//Utils
import { FEATURES } from "@/utils/constants";

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={"container-wide"}>
        <Display
          className={`display display--weight-700 ${styles.features_title}`}
          size={300}
        >
          Features
        </Display>
        <div className={styles.features_cards}>
          {FEATURES.map((card, index) => (
            <Card_v2
              key={index}
              title={card.title}
              details={card.text}
              className={styles.features_card}
              titleClassName={styles.features_card_title}
              textClassName={styles.features_card_text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
