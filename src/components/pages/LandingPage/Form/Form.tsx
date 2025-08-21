"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import InputField from "@/components/ui/InputField/InputField";
import Button from "@/components/ui/Button";
import Display from "@/components/ui/Display";
import StaticImage from "@/components/ui/StaticImage";
interface FormProps {
  className?: string;
  isWeb?: boolean;
}
const Form = ({ className, isWeb }: FormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit}>
      <Display className={styles.title} size={10}>
        Join the Live Webinar
      </Display>
      <div className={className}>
        <InputField
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <InputField
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        {!isWeb && (
          <InputField
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}
      </div>
      {isWeb && (
        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      )}
      <Button
        text={"Register Now"}
        className={`${styles.dark_button} ${styles.mob_button}`}
        onClick={() => {}}
      />
      <StaticImage
        src={"/images/duckPoint.webp"}
        alt={"Docling Hero Image"}
        width={135}
        height={145}
        priority
        className={isWeb ? styles.form_webImage : styles.form_image}
      />
    </form>
  );
};

export default Form;
