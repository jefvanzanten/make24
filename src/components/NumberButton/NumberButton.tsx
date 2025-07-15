import type { NumberButtonState } from "../../hooks/use24Game";
import styles from "./NumberButton.module.css";

export type NumberButtonProps = {
  state: NumberButtonState;
  isSelected: boolean;
  handleClick: () => void;
};

const NumberButton = ({
  state,
  handleClick,
  isSelected,
}: NumberButtonProps) => {
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
};

export default NumberButton;
