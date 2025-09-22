// Dependencies
import Link from "next/link";

// Constants
import { LINKS } from "./constants";

// Components
import Display from "@/components/ui/Display";
import Logo from "@/components/icons/logo";
import Social from "@/components/social";
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

const DarkFooter = () => {
  return (
    <section className={styles.footer}>
      <div className="container-wide">
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.logo}>
              <Link href="/">
                <Logo />
              </Link>
              <Display size={300}>Docling</Display>
            </div>
            <div className={styles.footer_links}>
              <Social darkMode isFooter />
              {LINKS.map((link) => (
                <Text size={100} className={styles.text} key={link.title}>
                  <Link className={styles.link} href={link.href}>
                    {link.title}
                  </Link>
                </Text>
              ))}
            </div>

            <Text size={100} className={styles.content}>
              Copyright © Docling a Series of LF Projects, LLC For web site
              terms of use, trademark policy and general project policies please
              see this{" "}
              <Link
                className={styles.hoverLink}
                href={"https://lfprojects.org"}
              >
                link
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkFooter;
