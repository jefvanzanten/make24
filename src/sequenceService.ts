export type Operator = "+" | "-" | "x" | ":";

const operations = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  ["x"]: (a: number, b: number) => a * b,
  ":": (a: number, b: number) => a / b,
};

const calculate = (a: number, operator: Operator, b: number) => {
  console.log("calc: a: " + a + " operator: " + operator + " b: " + b);
  return operations[operator]?.(a, b) ?? 0;
};

async function getRandomSequence(difficulty: string) {
  try {
    const response = await fetch("24sequences.json");
    const data = await response.json();

    const sequences = data.sequences[difficulty];

    if (!sequences || sequences.length === 0) {
      throw new Error(`No sequences found for difficulty: ${difficulty}`);
    }

    const randomIndex = Math.floor(Math.random() * sequences.length);
    const selectedSequence = sequences[randomIndex];

    const numbers = selectedSequence.numbers;

    if (!Array.isArray(numbers)) {
      throw new Error("Numbers is not an array");
    }

    return numbers.map((value: number, index: number) => ({
      id: index,
      value: value,
      isDisabled: false,
    }));
  } catch (error) {
    console.error("Error loading sequences", error);
    return null;
  }
}

export { getRandomSequence, calculate };
