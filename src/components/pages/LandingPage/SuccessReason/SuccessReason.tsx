import Display from "@/components/ui/Display";
import styles from "./styles.module.scss";
import Text from "@/components/ui/text";
import Eclipse from "@/components/icons/Eclipse/Eclipse";
import StaticImage from "@/components/ui/StaticImage";

const SuccessReason = () => {
  return (
    <div className={`container ${styles.reason}`}>
      <Display className={styles.reason_title} size={500}>
        See why Docling has <span className={styles.reason_num}>35K</span>{" "}
        GitHub Stars
      </Display>
      <Text className={styles.reason_detail} size={100}>
        In this live session, we&apos;ll show how Docling&apos;s high-fidelity
        document parsing + advanced OCR make it easy to feed PDFs, Word docs,
        PowerPoints (and more) straight into your AI workflows. From
        multi-column layouts to math equations, nothing gets lost in
        translation.
        <span className={styles.reason_bold}>We will discuss and demo:</span>
        <br />
        <br />
        <span className={styles.reason_bold}>📄 Use Cases</span>
        <br />
        How are AI developers using Docling?
        <br />
        <br />
        <span className={styles.reason_bold}>🐍 Python API in action</span>
        <br />
        Minimal setup, max power
        <br />
        <br />
        <span className={styles.reason_bold}>📊 Complex document handling</span>
        <br />
        Tables, figures, equations, and structured text, all parsed cleanly
        <br />
        <br />
        <span className={styles.reason_bold}>🤖 AI workflow integration</span>
        <br />
        Feed data directly into RAG systems and LLM pipelines
        <br />
        <br />
        <span className={styles.reason_bold}>⚡ Performance tips</span>
        <br />
        Batch processing at scale, without losing fidelity
        <br />
        <br />
        <span className={styles.reason_bold}>🛠️ Open-source flexibility</span>
        <br />
        Extend, customize, and own your pipeline
        <br />
        <br />
        If your AI project depends on extracting real signal from unstructured
        docs,{" "}
        <span className={styles.reason_bold}>Docling will save you hours!</span>
      </Text>
      <Display className={styles.reason_subTitle} size={500}>
        Speakers
      </Display>
      <div className={styles.reason_speakers}>
        <div className={styles.reason_speaker}>
          <Eclipse />{" "}
          <Text className={styles.reason_speakerDetail} size={100}>
            <span className={styles.reason_bold}> Engineer Name,</span> Docling
            Core Team – IBM Research{" "}
          </Text>
        </div>
        <div className={styles.reason_speaker}>
          {" "}
          <StaticImage
            src={"/images/avatar.webp"}
            alt="image"
            width={32}
            height={32}
            className={styles.reason_speakerAvatar}
          />
          <Text className={styles.reason_speakerDetail} size={100}>
            <span className={styles.reason_bold}>Ming Zhao,</span> Developer
            Relations – IBM
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SuccessReason;
