import React from "react";
import styles from "./styles.module.scss";
import StaticImage from "@/components/ui/StaticImage";
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  details: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  title,
  details,
  imageWidth = 432,
  imageHeight = 288,
  className,
}) => {
  return (
    <div className={`${className} ${styles.card}`}>
      <div className={styles.card_text}>
        <Display size={400} weight={500} className={styles.card_title}>
          {title}
        </Display>
        <Text size={600} weight={400} className={styles.card_detail}>
          {details}
        </Text>
      </div>
      <div className={styles.card_image}>
        <StaticImage
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          priority
        />
      </div>
    </div>
  );
};

export default Card;
