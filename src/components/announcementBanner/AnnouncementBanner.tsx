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
            IBM releases Granite-Docling-258M, a compact open-source VLM for
            precise document-to-data conversion.{" "}
            <a
              href="https://www.ibm.com/new/announcements/granite-docling-end-to-end-document-conversion"
              target="_blank"
            >
              Learn More
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AnnouncmentBanner;
