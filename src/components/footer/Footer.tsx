// Dependencies
import Link from "next/link";

// Types
import { Weight } from "@/components/ui/Display/types";

// Constants
import { CONTENT } from "./constants";

// Components
import Display from "@/components/ui/Display";
import Social from "@/components/social";
import Logo from "@/components/icons/logo";

// Styles
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <section className={`${styles.footer}`}>
      <div className="container-wide">
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.logo}>
              <Link href={"/"}>
                <Logo />
              </Link>
              <Display size={300} className={styles.left_text}>
                Docling
              </Display>
            </div>
            <Social />
          </div>
          <div className={styles.rightContainer}>
            {CONTENT.map((item) => (
              <div className={styles.footerLinks} key={item.title}>
                <Display size={100}>{item.title}</Display>
                {item.links.map((link) => (
                  <Display size={100} weight={Weight.Light} key={link}>
                    {link}
                  </Display>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
