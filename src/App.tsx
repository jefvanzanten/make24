import NumberButton from "./components/NumberButton/NumberButton";
import styles from "./App.module.css";
import OperatorButton from "./components/OperatorButton/OperatorButton";
import { use24Game } from "./hooks/use24Game";
import type { Operator } from "./sequenceService";

function App() {
  const { selectOperator, sequence, selectNumberButton, selectedOperator } =
    use24Game();

  return (
    <div className={styles.container}>
      <div className={styles["number-container"]}>
        {sequence?.map((state, index) => (
          <NumberButton
            key={index}
            state={state}
            handleClick={() => selectNumberButton(state)}
          />
        ))}
      </div>
      <div className={styles["operator-container"]}>
        {(["+", "-", "x", ":"] as Operator[]).map((operator, index) => (
          <OperatorButton
            key={index}
            handleClick={() => selectOperator(operator)}
            isSelected={operator === selectedOperator}
            operator={operator}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
