// Utilities
import { DOCLING_CARD_DATA } from "@/utils/constants";

// Components
import Display from "@/components/ui/Display";
import Card from "./Card";

// Styles
import styles from "./styles.module.scss";

const WhyChoose = () => {
  return (
    <section className={styles.choose}>
      <div className="container-wide">
        <Display size={600} weight={500} className={styles.choose_title}>
          Why Choose Docling?
        </Display>
        <div className={styles.cardContainer}>
          {DOCLING_CARD_DATA.map((card, index) => (
            <Card
              key={index}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              title={card.title}
              details={card.details}
              className={styles.choose_docling_card}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
