const numberSequence = [1, 3, 4, 6];

export type Operator = "+" | "-" | "x" | ":";

const operations = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  ["x"]: (a: number, b: number) => a * b,
  ":": (a: number, b: number) => a / b,
};

const calculate = (a: number, operator: Operator, b: number) => {
  console.log("calc: a:" + a + "operator: " + operator + "b: " + b);
  return operations[operator]?.(a, b) ?? 0;
};

// function createNumberProps(sequence: number[]) {
//     sequence.map((key, item) = {
//         NumberButtonProps = { key, value, setSelectedNumber(key)}
//     });
// }

async function getRandomSequence(difficulty: string) {
  try {
    const response = await fetch("24sequences.json");
    const data = await response.json();

    const sequences = data.sequences[difficulty];

    if (!sequences || sequences.length === 0) {
      throw new Error(`Geen sequences gevonden voor difficulty: ${difficulty}`);
    }

    const randomIndex = Math.floor(Math.random() * sequences.length);
    const selectedSequence = sequences[randomIndex];

    // Gebruik de numbers array uit het sequence object
    const numbers = selectedSequence.numbers;

    if (!Array.isArray(numbers)) {
      throw new Error("Numbers is not an array");
    }

    return numbers.map((value: number, index: number) => ({
      id: index,
      value: value,
      isSelected: false,
      isDisabled: false,
    }));
  } catch (error) {
    console.error("Fout bij het laden van sequences:", error);
    return null;
  }
}

export { getRandomSequence, calculate };
