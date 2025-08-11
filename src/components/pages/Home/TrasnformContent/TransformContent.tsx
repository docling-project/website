//Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";

// Utilities
import { TRANSFORM } from "@/utils/constants";

//Styles
import styles from "./styles.module.scss";

const TransformContent = () => {
  return (
    <section className={`container-wide ${styles.container}`}>
      <div className={`${styles.section} ${styles.transform_content}`}>
        <Display className={styles.section_title} size={300} weight={500}>
          {TRANSFORM.title}
        </Display>
        <Text className={styles.section_description} size={200} weight={400}>
          {TRANSFORM.description}
        </Text>
      </div>
    </section>
  );
};

export default TransformContent;
