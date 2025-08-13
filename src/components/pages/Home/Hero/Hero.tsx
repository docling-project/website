//Components
import Display from "@/components/ui/Display";
import Button from "@/components/ui/Button";
import Github from "@/components/icons/Github";

import StaticImage from "@/components/ui/StaticImage";

// Utilities
import { HERO_TEXT } from "@/utils/constants";

//Styles
import styles from "./styles.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`${styles.hero_content} container-wide`}>
        <Display size={700} className={styles.hero_title}>
          {HERO_TEXT}
        </Display>
        <div className={styles.hero_button_group}>
          <Button text={"Get Started"} />
          <Button
            text={"Star on GitHub"}
            icon={<Github />}
            className={styles.hero_button}
            onClick={() => {window.open('https://github.com/docling-project/docling');}}
          />
        </div>
        <StaticImage
          src={"/images/hero.webp"}
          alt={"Docling Hero Image"}
          width={1096}
          height={731}
          priority
          className={styles.hero_image}
        />
      </div>
    </section>
  );
};

export default Hero;
