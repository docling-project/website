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
            <a
              href="https://luma.com/open-rag-summit?utm_source=docling"
              target="_blank"
            >
              {
                "Be the first to find out what's next for RAG at the OpenRAG Summit on 11/13"
              }
            </a>
            {/* IBM releases Granite-Docling-258M, a compact open-source VLM for
            precise document-to-data conversion.{" "}
            <a
              href="https://huggingface.co/ibm-granite/granite-docling-258M"
              target="_blank"
            >
              Learn More
            </a> */}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AnnouncmentBanner;
