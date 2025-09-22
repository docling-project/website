// Components
import Form from "@/components/pages/LandingPage/Form";

// Styles
import styles from "./styles.module.scss";

const Webinar = () => {
  return (
    <div className={`container ${styles.container}`}>
      <Form className={styles.webinar} isWeb />
    </div>
  );
};

export default Webinar;
