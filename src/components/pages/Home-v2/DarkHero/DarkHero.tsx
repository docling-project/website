//Components
import Display from "@/components/ui/Display";

import StaticImage from "@/components/ui/StaticImage";

// Utilities
import { HERO_TEXT } from "@/utils/constants";

//Styles
import styles from "./styles.module.scss";

const DarkHero = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.hero_content} container-wide`}>
        <Display size={700} className={styles.hero_title}>
          {HERO_TEXT}
        </Display>
        <StaticImage
          src={"/images/darkHero.webp"}
          alt={"Docling Hero Image"}
          width={439}
          height={439}
          priority
          className={styles.hero_image}
        />
      </div>
    </section>
  );
};

export default DarkHero;
