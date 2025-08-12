// Dependencies
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";

// Utils
import { DARK_SOCIALS, SOCIALS } from "@/utils/constants";

// Styles
import styles from "./styles.module.scss";

interface Props {
  darkMode?: boolean;
}

const Social = ({ darkMode = false }: Props) => {
  return (
    <div className={styles.social}>
      {!darkMode
        ? SOCIALS?.map((s, index) => (
            <div key={index}>
              <Link href={s.url} target="_blank">
                <div className={styles.social}>
                  {s.icon}
                  <Display size={100}>{s.count}</Display>
                </div>
              </Link>
            </div>
          ))
        : DARK_SOCIALS?.map((s, index) => (
            <div key={index}>
              <Link href={s.url} target="_blank">
                <div className={styles.dark_social}>
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
