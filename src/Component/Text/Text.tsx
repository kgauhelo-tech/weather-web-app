import styles from "./Text.module.css";

import React from "react";

type TextVariant = "p" | "title" | "heading" | "subHeading";
interface TextProps {
  variant: TextVariant;
  children: React.ReactNode;
}

const Text = ({ variant, children }: TextProps) => {
  switch (variant) {
    case "p":
      return <p className={styles.paragraph}>{children}</p>;
    case "title":
      return <h1 className={styles.title}>{children}</h1>;
    case "heading":
      return <h2 className={styles.heading}>{children}</h2>;
    case "subHeading":
      return <h3 className={styles.subHeading}>{children}</h3>;
    default:
      return <p className={styles.paragraph}>{children}</p>;
  }
};

export default Text;
