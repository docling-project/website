// Utilities
import { CARD_DATA } from "@/utils/constants";

// Components
import Display from "@/components/ui/Display";
import Card from "@/components/ui/Card";

//Styles
import styles from "./styles.module.scss";

const GetStarted = () => {
  return (
    <section className={styles.getStarted}>
      <div className="container-wide">
        <Display size={600} weight={500} className={styles.getStarted_title}>
          Get Started
        </Display>
        <div className={styles.cardContainer}>
          {CARD_DATA.map((card, index) => (
            <Card
              key={index}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              title={card.title}
              details={card.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
