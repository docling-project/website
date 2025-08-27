"use client";
//Components
import Display from "@/components/ui/Display";

//Styles
import styles from "./styles.module.scss";
import Text from "@/components/ui/text";
import StaticImage from "@/components/ui/StaticImage";
import Button from "@/components/ui/Button";

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
              "Learn how to build agentic apps and AI pipelines that leverage your complex PDFs, Word docs, and tables "
            }
          </Display>
          <Text
            size={600}
            weight={400}
            className={`${styles.hero_subTitle} ${styles.hero_color}`}
          >
            {"Join Us Thursday, September 11, 9:00 AM PT  "}
          </Text>
          <Button
            text={"Add to Calendar"}
            className={`${styles.dark_button} ${styles.mob_button}`}
            onClick={() => {}}
          />
        </div>
        <StaticImage
          src={"/images/assistant.webp"}
          alt={"live image"}
          width={612}
          height={412}
          priority
          className={styles.hero_image}
        />
      </div>
    </section>
  );
};

export default Hero;
