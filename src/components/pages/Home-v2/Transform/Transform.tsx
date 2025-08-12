//Components
import Card_v2 from "@/components/ui/Card-v2";

//Styles
import styles from "./styles.module.scss";

//Utils
import { TRANSFORM_CARD } from "@/utils/constants";

const Transform = () => {
  return (
    <section className={styles.transform}>
      <div className="container-wide">
        <div className={styles.transform_cards}>
          {TRANSFORM_CARD.map((card, index) => (
            <Card_v2
              key={index}
              title={card.title}
              details={card.text}
              icon={card.icon}
              className={styles.transform_card}
              titleClassName={styles.transform_card_title}
              textClassName={styles.transform_card_text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Transform;
