import { useState } from "react";
import styles from "./OperatorButton.module.css";

type OperatorButtonProps = {
  operator: string;
  passedFunc: () => void;
};

const OperatorButton = ({ operator, passedFunc }: OperatorButtonProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  function handleClick() {
    setIsSelected(!isSelected);
    passedFunc();
  }

  return (
    <button
      className={`${styles.button} ${isSelected ? `${styles.clicked}` : ""}`}
      onClick={handleClick}
    >
      {operator}
    </button>
  );
};

export default OperatorButton;
