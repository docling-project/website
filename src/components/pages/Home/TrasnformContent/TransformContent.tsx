//Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import Button from "@/components/ui/Button";
import Github from "@/components/icons/Github";

// Utilities
import { TRANSFORM, TRANSFORM_CARD } from "@/utils/constants";

//Styles
import styles from "./styles.module.scss";
import Card_v2 from "@/components/ui/Card-v2";

const TransformContent = () => {
  return (
    <section className={`${styles.container}`}>
      <div className="container-wide">
        <div className={styles.section_button_group}>
          <Button text={"Get Started"} className={styles.dark_button} />
          <Button
            text={"Star on GitHub"}
            icon={<Github color="#E9DBBDE5" size="23" />}
            className={styles.section_button}
            // onClick={() => {window.open('https://app.dosu.dev/097760a8-135e-4789-8234-90c8837d7f1c/ask?utm_source=github')}
          />
        </div>
        <div className={`${styles.section} ${styles.transform_content}`}>
          <Display className={styles.section_title} size={300} weight={500}>
            {TRANSFORM.title}
          </Display>
          <Text className={styles.section_description} size={200} weight={400}>
            {TRANSFORM.description}
          </Text>
        </div>
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

export default TransformContent;
