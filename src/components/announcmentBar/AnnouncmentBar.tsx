// Styles
import Linux from "../icons/Linux/Linux";
import styles from "./styles.module.scss";

const AnnouncmentBar = () => {
  return (
    <section className={styles.topBar}>
      <div className={"container-wide"}>
        <Linux />
      </div>
    </section>
  );
};

export default AnnouncmentBar;
