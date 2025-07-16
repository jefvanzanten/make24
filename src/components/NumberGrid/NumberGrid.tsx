import { use24Game, type NumberState } from "../../hooks/use24Game";
import NumberButton from "../NumberButton/NumberButton";
import styles from "./NumberGrid.module.css";

interface NumberGridProps {
  sequence: NumberState[];
  handleNumberClick: (state: NumberState) => void;
  selectedNumber: NumberState;
}

function NumberGrid({
  sequence,
  handleNumberClick,
  selectedNumber,
}: NumberGridProps) {
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
