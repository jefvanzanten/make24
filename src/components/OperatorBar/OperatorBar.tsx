import { use24Game } from "../../hooks/use24Game";
import type { Operator } from "../../sequenceService";
import OperatorButton from "../OperatorButton/OperatorButton";
import styles from "./OperatorBar.module.css";

function OperatorBar() {
  const { handleOperatorClick, selectedOperator } = use24Game();

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
