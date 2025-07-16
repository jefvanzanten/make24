import { use24Game } from "../../hooks/use24Game";
import NumberButton from "../NumberButton/NumberButton";
import styles from "./NumberGrid.module.css";

function NumberGrid() {
  const { sequence, handleNumberClick, selectedNumber } = use24Game();

  return (
    <div className={styles["number-container"]}>
      {sequence?.map((state, index) => (
        <NumberButton
          key={index}
          isSelected={selectedNumber?.id === index}
          state={state}
          handleClick={() => handleNumberClick(state)}
        />
      ))}
    </div>
  );
}

export default NumberGrid;
