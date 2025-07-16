import NumberButton from "./components/NumberButton/NumberButton";
import styles from "./App.module.css";
import OperatorButton from "./components/OperatorButton/OperatorButton";
import { use24Game } from "./hooks/use24Game";
import type { Operator } from "./sequenceService";

function App() {
  const {
    handleOperatorClick,
    sequence,
    handleNumberClick,
    selectedNumber,
    selectedOperator,
    reset,
    refreshSequence,
  } = use24Game();

  return (
    <>
      <header className={styles.header}>
        <div className={styles["button-container"]}>
          <button className={styles.reset} onClick={reset}>
            <img src="./reset.png" className={styles.img} />
          </button>
          <button className={styles.reset} onClick={refreshSequence}>
            <img src="./refresh.jpg" className={styles.img} />
          </button>
        </div>
      </header>
      <div className={styles.container}>
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
      </div>
    </>
  );
}

export default App;
