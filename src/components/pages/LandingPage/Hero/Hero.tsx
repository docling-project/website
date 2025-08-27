"use client";
import { useEffect, useState } from "react";

//Components
import Display from "@/components/ui/Display";
//Styles
import styles from "./styles.module.scss";
import Text from "@/components/ui/text";
import StaticImage from "@/components/ui/StaticImage";
import Button from "@/components/ui/Button";

const Hero = () => {
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);

  useEffect(() => {
    const loadCalendarLibrary = async () => {
      try {
        if (typeof window !== "undefined" && (window as any).atcb) {
          setIsLibraryLoaded(true);
          return;
        }

        await import("add-to-calendar-button");

        setTimeout(() => {
          setIsLibraryLoaded(true);
        }, 100);
      } catch (error) {
        console.error("Failed to load Add to Calendar Button:", error);
      }
    };

    loadCalendarLibrary();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={` ${styles.hero_row} container-wide`}>
        <div className={styles.hero_content}>
          <Text size={600} weight={400} className={styles.hero_subTitle}>
            {"Unlock AI-Ready Data from Any Document with Docling Open Source "}
          </Text>
          <Display size={700} className={styles.hero_title}>
            {
              "Learn how to build agentic apps and AI pipelines that leverage your complex PDFs, Word docs, and tables "
            }
          </Display>
          <Text
            size={600}
            weight={400}
            className={`${styles.hero_subTitle} ${styles.hero_color}`}
          >
            {"Join Us Wednesday, September 17th, 9:00 AM PT  "}
          </Text>

          <div className={styles.calendar_wrapper}>
            {isLibraryLoaded ? (
              <add-to-calendar-button
                name="Unlock AI-Ready Data from Any Document with Docling Open Source"
                options="'Apple','Google'"
                location="youtube.com"
                startDate="2025-09-17"
                endDate="2025-09-17"
                startTime="09:00"
                endTime="10:00"
                timeZone="America/Los_Angeles"
                buttonStyle="round"
                trigger="click"
                hideIconButton="true"
                hideBranding="true"
                label="Add to Calendar"
                styleLight="--btn-background: var(--interface-orange-600); --btn-text: var(--primary-black); --btn-border: none; --btn-border-radius: 100px; --font: var(--font-body); --btn-padding: 10px 20px; --btn-font-size: 15px; --btn-font-weight: 500; --btn-line-height: 24px; --btn-max-width: 177px;"
                styleDark="--btn-background: var(--interface-orange-600); --btn-text: var(--primary-black);"
              />
            ) : (
              <div className={styles.loading_button}>Loading...</div>
            )}
          </div>
          <Button
            text={"Add to Calendar"}
            className={`${styles.dark_button} ${styles.mob_button}`}
            onClick={() => {}}
          />
        </div>
        <StaticImage
          src={"/images/assistant.webp"}
          alt={"live image"}
          width={612}
          height={412}
          priority
          className={styles.hero_image}
        />
      </div>
    </section>
  );
};

export default Hero;
