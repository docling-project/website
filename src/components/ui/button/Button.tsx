import React from "react";
import { ButtonTypes } from "./types"; // Import enum
import styles from "./styles.module.scss"; // Import SCSS styles

interface ButtonProps {
  variant: ButtonTypes;
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode; // Accept an icon as a prop
}

const Button: React.FC<ButtonProps> = ({
  variant = ButtonTypes.FILLED,
  children,
  onClick,
  icon,
}) => {
  // Dynamically set the class name for the button
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      <span className={styles.icon}>{icon}</span>
      {children}
    </button>
  );
};

export default Button;
