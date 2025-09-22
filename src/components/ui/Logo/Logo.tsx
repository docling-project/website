// Dependencies
import Link from "next/link";

// Components
import Logo from "@/components/icons/logo";
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";

const DoclingLogo = () => (
  <Link href="/" className={styles.logo}>
    <Logo />
    <Display size={300}>Docling</Display>
  </Link>
);

export default DoclingLogo;
