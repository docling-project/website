//Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import Card_v2 from "@/components/ui/Card-v2";

//Styles
import styles from "./styles.module.scss";

//Utils
import { TRANSFORM_CARD } from "@/utils/constants";

const Transform = () => {
  return (
    <section className={styles.transform}>
      <div className="container-wide">
        <Display
          className={`display display--weight-700 ${styles.transform_title}`}
          size={300}
        >
          Transform Your Documents
        </Display>
        <Text
          size={400}
          className={`display display--weight-400 ${styles.transform_detail}`}
        >
          Docling turns messy PDFs, DOCX, and slides into clean, structured
          data—ready for RAG, GenAI apps, or anything downstream. Complex
          layouts? Tables? Formulas? It handles them, so you don’t have to.
        </Text>
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
