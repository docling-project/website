"use client";

// Dependences
import { useState } from "react";

// Utilities
import { TRANSFORM, TRANSFORM_CARD } from "@/utils/constants";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import Button from "@/components/ui/Button";
import Github from "@/components/icons/Github";
import Card_v2 from "@/components/ui/Card-v2";

// Styles
import styles from "./styles.module.scss";

const TransformContent = () => {
  const [githubColor, setGithubColor] = useState("#E9DBBDE5");

  const handleMouseEnter = () => {
    setGithubColor("#F8A700");
  };

  const handleMouseLeave = () => {
    setGithubColor("#E9DBBDE5");
  };
  return (
    <section className={`${styles.container}`}>
      <div className="container-wide">
        <div className={styles.section_button_group}>
          <a href="https://docling-project.github.io/docling/">
            <Button text={"Get Started"} className={styles.dark_button} />
          </a>
          <a
            href="https://github.com/docling-project/docling"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              text="Star on GitHub"
              icon={<Github color={githubColor} size="23" />}
              className={`${styles.section_button} ${styles.section_git_button}`}
            />
          </a>
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
