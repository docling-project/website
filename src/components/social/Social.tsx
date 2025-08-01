// Dependencies
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";

// Utils
import { SOCIALS } from "@/utils/constants";

// Styles
import styles from "./styles.module.scss";

const Social = () => {
  return (
    <div className={styles.social}>
      {SOCIALS?.map((s, index) => (
        <div key={index}>
          <Link href={s.url} target="_blank">
            <div className={styles.social}>
              {s.icon}
              <Display size={100}>{s.count}</Display>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Social;
