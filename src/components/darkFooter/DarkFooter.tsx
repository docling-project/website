// Dependencies
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";
import Logo from "@/components/icons/logo";
import Social from "../social";

// Types
import { Weight } from "@/components/ui/Display/types";

// Styles
import styles from "./styles.module.scss";

const DarkFooter = () => {
  return (
    <section className={`${styles.footer}`}>
      <div className="container-wide">
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.logo}>
              <Link href={"/"}>
                <Logo />
              </Link>
              <Display size={300}>Docling</Display>
            </div>
            <div className={styles.footer_links}>
              <Social darkMode />
              <Display size={100} weight={Weight.Light}>
                <Link
                  className={styles.link}
                  href="https://docling-project.github.io/docling/"
                >
                  Documentation
                </Link>
              </Display>
              <Display size={100} weight={Weight.Light}>
                <Link
                  className={styles.link}
                  href="https://discord.gg/wJuvux5Q"
                >
                  {" "}
                  Community{" "}
                </Link>
              </Display>
            </div>

            <Display size={100} className={styles.content}>
              Copyright © Docling a Series of LF Projects, LLC For web site
              terms of use, trademark policy and general project policies please
              see this <Link href={"https://lfprojects.org"}>this link</Link>
            </Display>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkFooter;
