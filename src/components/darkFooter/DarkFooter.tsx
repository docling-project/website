// Dependencies
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";
import Logo from "@/components/icons/logo";
import Social from "../social";

// Styles
import styles from "./styles.module.scss";
import Text from "../ui/text";

const DarkFooter = () => {
  return (
    <section className={`${styles.footer}`}>
      <div className="container-wide">
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.logo}>
              <Link href={"/"}>
                <Logo />
                <Display size={300}>Docling</Display>
              </Link>
            </div>
            <div className={styles.footer_links}>
              <Social darkMode isFooter />
              <Text size={100} className={styles.text}>
                <Link
                  className={styles.link}
                  href="https://docling-project.github.io/docling/"
                >
                  Documentation
                </Link>
              </Text>
              <Text size={100} className={styles.text}>
                <Link
                  className={styles.link}
                  href="https://discord.gg/WczpRJ8y"
                >
                  Community
                </Link>
              </Text>
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
