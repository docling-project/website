// Components
import Text, { Weight } from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

const AnnouncmentBanner = () => {
  return (
    <div className="container-wide">
      <div className="d-flex justify-content-center w-100">
        <div className={styles.banner}>
          <Text weight={Weight.Medium} size={300} tagName="p">
            First Docling Office Hours on Wednesday, December 12th at 10:00 AM
            ET.{" "}
            <a
              href="https://zoom-lfx.platform.linuxfoundation.org/meeting/95733266721?password=c4dde8b6-8371-4139-a1d4-44c20df28005"
              target="_blank"
            >
              Click for details
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AnnouncmentBanner;
