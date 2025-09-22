"use client";

// Dependencies
import { useState } from "react";
import Link from "next/link";

// Utilities
import { LIST } from "@/utils/constants";

// Components
import Display from "@/components/ui/Display";
import Logo from "@/components/icons/logo/Logo";
import Social from "@/components/social";
import Button from "@/components/ui/Button";

// Styles
import styles from "./styles.module.scss";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <section className={styles.header}>
      <div className="container-wide">
        <div className={styles.container}>
          {isActive && (
            <div className={styles.drawer}>
              <div className={styles.drawerContent}>
                {LIST.map((item) => (
                  <div key={item.title}>
                    <div className={styles.drawerItem}>
                      <Display
                        tagName="div"
                        className={styles.drawerItem_heading}
                        size={100}
                      >
                        {item.title}
                      </Display>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={styles.left}>
            <div className={styles.logo}>
              <Link href={"/"}>
                <Logo />
              </Link>
              <Display size={300} className={styles.left_text}>
                Docling
              </Display>
            </div>
            <nav className={styles.nav}>
              {LIST?.map((item) => {
                return (
                  <div key={item.title} className={styles.navItem}>
                    {item?.link ? (
                      <Link href={item.link}>
                        <Display
                          size={100}
                          className={styles.drawerItem_heading}
                        >
                          {item.title}
                        </Display>
                      </Link>
                    ) : (
                      <Display size={100} className={styles.drawerItem_heading}>
                        {item.title}
                      </Display>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          <div className={styles.rightContainer}>
            <Social />
            <div className={styles.verticalColumn}></div>
            <div>
              <Button
                text="Get Started"
                className={styles.small_button}
                onClick={() => {
                  window.open(
                    "https://docling-project.github.io/docling/getting_started/",
                    "_blank",
                  );
                }}
              />
            </div>
          </div>
          <div
            className={`${styles.menuButton} ${isActive ? styles.active : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
