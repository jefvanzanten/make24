import { memo } from "react";
import type { NumberState } from "../../hooks/use24Game";
import styles from "./NumberButton.module.css";

export type NumberButtonProps = {
  state: NumberState;
  isSelected: boolean;
  handleClick: () => void;
};

const NumberButton = memo(function NumberButton({
  state,
  isSelected,
  handleClick,
}: NumberButtonProps) {
  console.log("NumberButton");

  if (state.isDisabled) {
    return <div className={`${styles.button} ${styles.transparent}`}></div>;
  }

  return (
    <button
      className={`${styles.button} ${isSelected ? `${styles.clicked}` : ""}`}
      onClick={handleClick}
    >
      {state.value}
    </button>
  );
});

export default NumberButton;
