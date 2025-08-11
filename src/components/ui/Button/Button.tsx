// Styles
import styles from "./styles.module.scss";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}
const Button = ({ text, onClick, className, icon }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {icon && <span className={styles.button_icon}>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
