"use client";

// Dependencies
import { useEffect, useState } from "react";
import Link from "next/link";

// Utilities
import { DARK_SOCIALS, SOCIALS } from "@/utils/constants";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import Github from "@/components/icons/Github";

// Styles
import styles from "./styles.module.scss";

interface Props {
  darkMode?: boolean;
  isFooter?: boolean;
}

const Social = ({ darkMode = false, isFooter = false }: Props) => {
  const [counts, setCounts] = useState<{ [key: string]: string }>({
    github: "Loading...",
    twitter: "Loading...",
  });
  const [githubColor, setGithubColor] = useState("#E9DBBDE5");

  const handleMouseEnter = () => {
    setGithubColor("#E58C07");
  };

  const handleMouseLeave = () => {
    setGithubColor("#E9DBBDE5");
  };

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
              <Link
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                href={s.url}
                target="_blank"
              >
                <div className={styles.dark_social}>
                  {isFooter ? <Github color={githubColor} /> : s.icon}
                  <Text
                    className={`${styles.count} ${
                      isFooter ? styles.hover : ""
                    }`}
                    size={100}
                  >
                    {s?.url?.toLowerCase()?.includes("github")
                      ? isFooter
                        ? `GitHub | ${counts.github} Stars`
                        : counts.github
                      : s.count}
                  </Text>
                </div>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default Social;
