import React from "react";
import styles from "./styles.module.scss";
import StaticImage from "../StaticImage";
import Display from "../Display";
import Text from "../text";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  details: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, imageAlt, title, details }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_image}>
        <StaticImage
          src={imageSrc}
          alt={imageAlt}
          width={432}
          height={288}
          priority
        />
      </div>
      <div className={styles.card_text}>
        <Display size={400} weight={500} className={styles.card_title}>
          {title}
        </Display>
        <Text size={600} weight={400} className={styles.card_detail}>
          {details}
        </Text>
      </div>
    </div>
  );
};

export default Card;
