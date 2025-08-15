"use client";

// Dependencies
import { useState } from "react";
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";
import Logo from "@/components/icons/logo/Logo";
import Social from "@/components/social";
import Button from "../ui/Button";
import Text from "../ui/text";

// Utils
import { LIST } from "@/utils/constants";

// Styles
import styles from "./styles.module.scss";
import Cross from "../icons/Cross";

const DarkHeader = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <section className={styles.header}>
      <div className="container-wide">
        <div className={styles.container}>
          {isActive && (
            <>
              <div className={styles.drawer}>
                <div className={styles.wrapper}>
                  <div className={styles.drawerHeader}>
                    <div className={styles.logo}>
                      <Link href={"/"}>
                        <Logo />
                      </Link>
                      <Display size={300} className={styles.left_text}>
                        Docling
                      </Display>
                    </div>
                    {isActive && (
                      <div onClick={toggleMenu}>
                        <Cross />
                      </div>
                    )}
                  </div>
                  <div className={styles.nav_flex}>
                    <div className={styles.drawerContent}>
                      {LIST?.map((item) => {
                        return (
                          <div key={item.title} className={styles.navItem}>
                            {item?.link ? (
                              <Link href={item.link}>
                                <Text
                                  size={100}
                                  className={styles.drawerItem_heading}
                                >
                                  {item.title}
                                </Text>
                              </Link>
                            ) : (
                              <Text
                                size={100}
                                className={styles.drawerItem_heading}
                              >
                                {item.title}
                              </Text>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.mob}>
                      <Button
                        text={"Get Started"}
                        className={`${styles.dark_button} ${styles.mob_button}`}
                        onClick={() => {
                          window.open(
                            "https://docling-project.github.io/docling/installation/",
                            "_blank",
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
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
                        <Text size={100} className={styles.drawerItem_heading}>
                          {item.title}
                        </Text>
                      </Link>
                    ) : (
                      <Text size={100} className={styles.drawerItem_heading}>
                        {item.title}
                      </Text>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          <div className={styles.rightContainer}>
            <Social darkMode />
            <div className={styles.verticalColumn}></div>
            <div>
              <Button
                text={"Get Started"}
                className={styles.dark_button}
                onClick={() => {
                  window.open(
                    "https://docling-project.github.io/docling/installation/",
                    "_blank",
                  );
                }}
              />
            </div>
          </div>
          <div className={styles.menuButton} onClick={toggleMenu}>
            {!isActive && (
              <>
                <span></span>
                <span></span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DarkHeader;
