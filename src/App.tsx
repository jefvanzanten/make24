import styles from "./App.module.css";
import NumberGrid from "./components/NumberGrid/NumberGrid";
import Header from "./components/Header/Header";
import OperatorBar from "./components/OperatorBar/OperatorBar";
import { use24Game } from "./hooks/use24Game";

function App() {
  const {
    handleOperatorClick,
    selectedOperator,
    sequence,
    handleNumberClick,
    selectedNumber,
    reset,
    refreshSequence,
  } = use24Game();

  return (
    <>
      <Header reset={reset} refreshSequence={refreshSequence} />
      <div className={styles.container}>
        <NumberGrid
          sequence={sequence!}
          handleNumberClick={handleNumberClick}
          selectedNumber={selectedNumber!}
        />
        <OperatorBar
          handleOperatorClick={handleOperatorClick}
          selectedOperator={selectedOperator}
        />
      </div>
    </>
  );
}

export default App;
