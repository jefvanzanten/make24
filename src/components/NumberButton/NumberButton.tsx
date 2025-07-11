import { useState } from "react";
import styles from "./NumberButton.module.css";

type NumberButtonProps = {
  num: number | null;
  passedFunc: () => void;
};

const NumberButton = ({ num, passedFunc }: NumberButtonProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  function handleClick() {
    setIsSelected(!isSelected);
    passedFunc();
  }

  if (num === null) {
    return <div className={`${styles.button} ${styles.transparent}`}></div>;
  }

  return (
    <button
      className={`${styles.button} ${isSelected ? `${styles.clicked}` : ""}`}
      onClick={handleClick}
    >
      {num}
    </button>
  );
};

export default NumberButton;
