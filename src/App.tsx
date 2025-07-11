import NumberButton from "./components/NumberButton/NumberButton";
import styles from "./App.module.css";
import OperatorButton from "./components/OperatorButton/OperatorButton";
import { useEffect, useState } from "react";

const numberSequence = [1, 3, 4, 6];

type Operator = "+" | "-" | "*" | "/";

const operations = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  "*": (a: number, b: number) => a * b,
  "/": (a: number, b: number) => a / b,
};

const calculate = (a: number, operator: Operator, b: number) => {
  return operations[operator]?.(a, b) ?? 0;
};

function App() {
  const [sequence, setSequence] = useState<(number | null)[]>(numberSequence);
  const [mem1Index, setMem1Index] = useState<number | null>(null);
  const [mem2Index, setMem2Index] = useState<number | null>(null);
  const [activeOperator, setActiveOperator] = useState<Operator | null>(null);

  function saveToMemory(index: number) {
    if (mem1Index === null) {
      setMem1Index(index);
    } else if (activeOperator === null) setMem1Index(index);
    else if (activeOperator !== null && mem2Index === null) {
      setMem2Index(index);
    }
  }

  useEffect(() => {
    console.log("useeffect trigger");
    if (mem1Index !== null && mem2Index !== null && activeOperator !== null) {
      const num1 = sequence[mem1Index];
      const num2 = sequence[mem2Index];

      console.log("2e check voor calculate");

      if (num1 !== null && num2 !== null) {
        const result = calculate(num1, activeOperator, num2);
        const newSequence = [...sequence];
        newSequence[mem1Index!] = null;
        newSequence[mem2Index] = result;
        setSequence(newSequence);
        reset();
      }
    }
  }, [mem2Index]);

  function reset() {
    setMem1Index(mem2Index);
    setMem2Index(null);
    setActiveOperator(null);
  }

  return (
    <div className={styles.container}>
      <div className={styles["number-container"]}>
        {sequence.map((item, index) => (
          <NumberButton
            num={item}
            key={index}
            passedFunc={() => saveToMemory(index)}
          />
        ))}
      </div>
      <div className={styles["operator-container"]}>
        {(["+", "-", "*", "/"] as Operator[]).map((op, index) => (
          <OperatorButton
            key={index}
            passedFunc={() => setActiveOperator(op)}
            operator={op}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
