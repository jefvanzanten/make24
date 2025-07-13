import NumberButton from "./components/NumberButton/NumberButton";
import styles from "./App.module.css";
import OperatorButton from "./components/OperatorButton/OperatorButton";
import { useEffect, useState } from "react";

const numberSequence = [1, 3, 4, 6];

type Operator = "+" | "-" | "x" | ":";

const operations = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  ["x"]: (a: number, b: number) => a * b,
  ":": (a: number, b: number) => a / b,
};

const calculate = (a: number, operator: Operator, b: number) => {
  return operations[operator]?.(a, b) ?? 0;
};

async function getRandomSequence(difficulty: string) {
  try {
    const response = await fetch("24sequences.json");
    const data = await response.json();

    const sequences = data.sequences[difficulty];

    if (!sequences || sequences.length === 0) {
      throw new Error(`Geen sequences gevonden voor difficulty: ${difficulty}`);
    }

    const randomIndex = Math.floor(Math.random() * sequences.length);
    return sequences[randomIndex];
  } catch (error) {
    console.error("Fout bij het laden van sequences:", error);
    return null;
  }
}

function App() {
  const [sequence, setSequence] = useState<(number | null)[]>(numberSequence);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(
    null
  );

  useEffect(() => {
    const loadSequence = async () => {
      const sequenceData = await getRandomSequence("medium");
      if (sequenceData) {
        setSequence(sequenceData.numbers);
      }
    };

    loadSequence();
  }, []);

  function selectNumber(index: number) {
    if (selectedNumber === index) setSelectedNumber(null);
    else if (selectedOperator === null || selectedNumber === null) {
      setSelectedNumber(index);
    } else if (selectedOperator !== null && selectedNumber !== null) {
      const result = calculate(
        sequence[selectedNumber]!,
        selectedOperator,
        sequence[index]!
      );

      const newSequence = [...sequence];
      newSequence[selectedNumber] = null;
      newSequence[index] = result;
      setSequence(newSequence);

      console.log(selectedOperator);
      console.log(result);

      setSelectedNumber(index);
      setSelectedOperator(null);
    }
  }

  function selectOperator(operator: Operator) {
    if (selectedOperator === operator || selectedNumber === null)
      setSelectedOperator(null);
    else setSelectedOperator(operator);
  }

  return (
    <div className={styles.container}>
      <div className={styles["number-container"]}>
        {sequence.map((item, index) => (
          <NumberButton
            num={item}
            key={index}
            isSelected={index === selectedNumber}
            handleClick={() => selectNumber(index)}
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
