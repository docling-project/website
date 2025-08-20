//Components
import Display from "@/components/ui/Display";

//Styles
import styles from "./styles.module.scss";
import Text from "@/components/ui/text";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={` ${styles.hero_row} container-wide`}>
        <div className={styles.hero_content}>
          <Text size={600} weight={400} className={styles.hero_subTitle}>
            {"Unlock AI-Ready Data from Any Document with Docling Open Source "}
          </Text>
          <Display size={700} className={styles.hero_title}>
            {
              "Do you want to learn how to build agentic apps and AI pipelines that leverage your complex PDFs, Word docs, and tables? "
            }
          </Display>
          <Text
            size={600}
            weight={400}
            className={`${styles.hero_subTitle} ${styles.hero_color}`}
          >
            {"Join Us Thursday, September 11, 9:00 AM PT  "}
          </Text>
        </div>
        <div className={styles.hero_formWrapper}></div>
      </div>
    </section>
  );
};

export default Hero;
