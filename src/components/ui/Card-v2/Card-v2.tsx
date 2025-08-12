//Components
import Display from "../Display";
import StaticImage from "../StaticImage";
import Text from "../text";

//Styles
import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  details: string;
  className?: string;
  icon?: React.ReactNode;
  backgroundUrl?: string;
  titleClassName?: string;
  textClassName?: string;
}

const Card_v2 = ({
  title,
  details,
  icon,
  className,
  backgroundUrl,
  titleClassName,
  textClassName,
}: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {backgroundUrl && (
        <StaticImage
          src={backgroundUrl || ""}
          alt={"card image"}
          fill
          className={styles.card_background}
        />
      )}
      {icon && <div className={styles.card_icon_wrapper}> {icon} </div>}
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
};

export default Card_v2;
