import type { Operator } from "../../sequenceService";
import OperatorButton from "../OperatorButton/OperatorButton";
import styles from "./OperatorBar.module.css";

interface OperatorBarProps {
  handleOperatorClick: (clickedOperator: Operator) => void;
  selectedOperator: Operator | null;
}

function OperatorBar({
  handleOperatorClick,
  selectedOperator,
}: OperatorBarProps) {
  return (
    <div className={styles["operator-container"]}>
      {(["+", "-", "x", ":"] as Operator[]).map((operator, index) => (
        <OperatorButton
          key={index}
          handleClick={() => handleOperatorClick(operator)}
          isSelected={operator === selectedOperator}
          operator={operator}
        />
      ))}
    </div>
  );
}

export default OperatorBar;
