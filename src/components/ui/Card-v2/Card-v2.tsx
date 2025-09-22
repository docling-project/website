// Dependencies
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";
import StaticImage from "@/components/ui/StaticImage";
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  details: string;
  className?: string;
  icon?: React.ReactNode;
  backgroundUrl?: string;
  titleClassName?: string;
  textClassName?: string;
  link?: string;
}

const Card_v2 = ({
  title,
  details,
  icon,
  className,
  backgroundUrl,
  titleClassName,
  textClassName,
  link,
}: CardProps) => {
  const cardContent = (
    <div className={`${styles.card} ${className || ""}`}>
      {backgroundUrl && (
        <StaticImage
          src={backgroundUrl}
          alt="card image"
          fill
          className={styles.card_background}
        />
      )}
      {icon && <div className={styles.card_icon_wrapper}>{icon}</div>}
      <Display
        className={`display display--weight-500 ${styles.card_title} ${
          titleClassName || ""
        }`}
        size={300}
      >
        {title}
      </Display>
      <Text
        className={`${styles.card_text} ${textClassName || ""}`}
        weight={400}
        size={400}
      >
        {details}
      </Text>
    </div>
  );

  // Wrap in Link if `link` prop exists
  if (link) {
    return (
      <Link className={styles.card_link} href={link}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default Card_v2;
