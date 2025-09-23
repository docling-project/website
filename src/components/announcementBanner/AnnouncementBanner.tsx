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
              href="https://huggingface.co/ibm-granite/granite-docling-258M"
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
