//Styles
import Display from "../Display";
import Text from "../text";
import styles from "./styles.module.scss";

interface CardProps {
  title: string;
  details: string;
  className?: string;
  icon?: React.ReactNode;
}

const Card_v2 = ({ title, details, icon, className }: CardProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {icon && <div className={styles.card_icon_wrapper}> {icon} </div>}
      <Display className="display display--weight-500" size={300}>
        {title}
      </Display>
      <Text className={styles.card_text} weight={400} size={400}>
        {details}
      </Text>
    </div>
  );
};

export default Card_v2;
