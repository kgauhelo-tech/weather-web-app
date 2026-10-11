import React from "react";
import Text from "../Text/Text";
import styles from "./CustomButton.module.css";

type ButtonVariant = "primary" | "secondary";

type Props = {
  content: string;
  variant: ButtonVariant;
  onClick: () => void;
};

const CustomButton: React.FC<Props> = ({ content, onClick, variant }) => {
  return (
    <button onClick={onClick} className={styles[variant]}>
      <Text variant={"p"}>{content}</Text>
    </button>
  );
};

export default CustomButton;
