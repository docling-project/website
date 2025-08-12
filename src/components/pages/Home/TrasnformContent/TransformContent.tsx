//Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import Button from "@/components/ui/Button";
import Github from "@/components/icons/Github";

// Utilities
import { TRANSFORM } from "@/utils/constants";

//Styles
import styles from "./styles.module.scss";

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
      </div>
    </section>
  );
};

export default TransformContent;
