"use client";

// Dependencies
import { useEffect, useState } from "react";
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";

// Utils
import { DARK_SOCIALS, SOCIALS } from "@/utils/constants";

// Styles
import styles from "./styles.module.scss";

interface Props {
  darkMode?: boolean;
}

const Social = ({ darkMode = false }: Props) => {
  const [counts, setCounts] = useState<{ [key: string]: string }>({
    github: "Loading...",
    twitter: "Loading...",
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(
          "https://img.shields.io/github/stars/docling-project/docling.json",
        );
        const data = await response.json();

        setCounts((prev) => ({
          ...prev,
          github: data.value,
        }));
      } catch (error) {
        console.error("Error fetching social counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className={styles.social_container}>
      {!darkMode
        ? SOCIALS?.map((s, index) => (
            <div key={index}>
              <Link href={s.url} target="_blank">
                <div className={styles.social}>
                  {s.icon}
                  <Display size={100}>
                    {s?.url?.toLowerCase()?.includes("github")
                      ? counts.github
                      : s.count}
                  </Display>
                </div>
              </Link>
            </div>
          ))
        : DARK_SOCIALS?.map((s, index) => (
            <div key={index}>
              <Link href={s.url} target="_blank">
                <div className={styles.dark_social}>
                  {s.icon}
                  <Display size={100}>
                    {s?.url?.toLowerCase()?.includes("github")
                      ? counts.github
                      : s.count}
                  </Display>
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Social;
