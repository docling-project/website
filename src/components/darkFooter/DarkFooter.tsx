// Dependencies
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";
import Social from "@/components/social";
import Logo from "@/components/icons/logo";

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
            <Display size={100} className={styles.content}>
              Docling is an open-source project hosted by the LF AI & Data
              Foundation, originally developed by the AI for Knowledge team at
              IBM Research Zurich.
            </Display>
            <Social darkMode />
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.footerLinks}>
              <Display size={100}>Resources</Display>
              <Display size={100} weight={Weight.Light}>
                Help Center
              </Display>
              <Display size={100} weight={Weight.Light}>
                Contact Support
              </Display>
              <Display size={100} weight={Weight.Light}>
                API Documentation
              </Display>
              <Display size={100} weight={Weight.Light}>
                Community
              </Display>
            </div>
            <div className={styles.footerLinks}>
              <Display size={100}>Legal</Display>
              <Display size={100} weight={Weight.Light}>
                Privacy Policy
              </Display>
              <Display size={100} weight={Weight.Light}>
                Terms of Service
              </Display>
              <Display size={100} weight={Weight.Light}>
                Cookie Policy
              </Display>
            </div>
            <div className={styles.footerLinks}>
              <Display size={100}>Follow Us</Display>
              <Display size={100} weight={Weight.Light}>
                Github
              </Display>
              <Display size={100} weight={Weight.Light}>
                X
              </Display>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkFooter;
