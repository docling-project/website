"use client";

// Dependencies
import { useState } from "react";
import Link from "next/link";

// Utilities
import { LIST } from "@/utils/constants";

// Components
import Logo from "@/components/ui/Logo";
import Social from "@/components/social";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/text";
import Cross from "@/components/icons/Cross";

// Styles
import styles from "./styles.module.scss";

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
                    <Logo />
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
                        text="Get Started"
                        className={`${styles.dark_button} ${styles.mob_button}`}
                        onClick={() => {
                          window.open(
                            "https://docling-project.github.io/docling/getting_started/",
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
            <Logo />
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
                text="Get Started"
                className={styles.dark_button}
                onClick={() => {
                  window.open(
                    "https://docling-project.github.io/docling/getting_started/",
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
