//Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";

//Styles
import styles from "./styles.module.scss";

const Introduction = () => {
  return (
    <section className={`${styles.container}`}>
      <div className="container">
        <div className={`${styles.section} ${styles.transform_content}`}>
          <Display className={styles.section_title} size={300} weight={500}>
            {"Meet Docling"}
          </Display>
          <Text className={styles.section_description} size={200} weight={400}>
            {
              "IBM’s open-source, Python-based, dev-friendly toolkit, for turning any document into clean, structured, AI-ready data.  "
            }
          </Text>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
