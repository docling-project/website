"use client";

// Dependencies
import { useEffect, useState } from "react";
import Link from "next/link";

// Constants
import { LINKS } from "./constants";

// Components
import Logo from "@/components/ui/Logo";
import Social from "@/components/social";
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

const DarkFooter = () => {
  const [links, setLinks] = useState(LINKS);

  useEffect(() => {
    let isMounted = true;
    const fetchInvite = async () => {
      try {
        const res = await fetch("/api/discord_invite", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const inviteUrl = data?.invite_link;
        if (inviteUrl && isMounted) {
          setLinks((prev) =>
            prev.map((l) =>
              l.title === "Community" ? { ...l, href: inviteUrl } : l,
            ),
          );
        }
      } catch {
        // ignore network errors; keep default link
      }
    };
    fetchInvite();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.footer}>
      <div className="container-wide">
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <Logo />
            <div className={styles.footer_links}>
              <Social darkMode isFooter />
              {links.map((link) => (
                <Text size={100} className={styles.text} key={link.title}>
                  <Link className={styles.link} href={link.href}>
                    {link.title}
                  </Link>
                </Text>
              ))}
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
