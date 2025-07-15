import { useEffect, useState } from "react";
import {
  calculate,
  getRandomSequence,
  type Operator,
} from "../sequenceService";

export type NumberButtonState = {
  id: number;
  value: number | null;
  isDisabled: boolean;
};

export const use24Game = () => {
  const [sequence, setSequence] = useState<NumberButtonState[]>();
  const [selectedNumberButtonState, setSelectedNumberButtonState] =
    useState<NumberButtonState | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(
    null
  );

  useEffect(() => {
    const loadSequence = async () => {
      const sequenceData = await getRandomSequence("medium");
      if (sequenceData) {
        setSequence(sequenceData);
      }
    };

    loadSequence();
  }, []);

  function handleNumberClick(state: NumberButtonState) {
    // console.log("selectNumber");

    if (selectedNumberButtonState === state) setSelectedNumberButtonState(null);
    else if (selectedNumberButtonState !== null && selectedOperator !== null)
      performCalculation(state);
    else setSelectedNumberButtonState(state);
  }

  function handleOperatorClick(operator: Operator) {
    // console.log("selectOperator");
    if (selectedOperator === operator || selectedNumberButtonState === null)
      setSelectedOperator(null);
    else setSelectedOperator(operator);
  }

  function performCalculation(state: NumberButtonState) {
    // console.log("handleCalculation");

    const result = calculate(
      selectedNumberButtonState?.value!,
      selectedOperator!,
      state.value!
    );

    // console.log("result: " + result);

    mergeNumberInCard(state, result);
  }

  function mergeNumberInCard(state: NumberButtonState, result: number) {
    // console.log("mergeNumberInCard");
    const newSequence = [...sequence!];

    newSequence[selectedNumberButtonState!.id] = {
      ...newSequence[selectedNumberButtonState!.id],
      isDisabled: true,
      value: null,
    };

    // console.log("first: " + first.value);

    const second = (newSequence[state!.id] = {
      ...newSequence[state?.id!],
      value: result,
    });

    // console.log("second: " + second.value);

    setSequence(newSequence);

    postMerge(second);

    if (hasWon(newSequence)) {
      setTimeout(() => alert("gewonnen!"), 500);
    }
  }

  function hasWon(sequence: NumberButtonState[]) {
    const activeButtons = sequence.filter((s) => !s.isDisabled);
    return activeButtons.length === 1 && activeButtons[0].value === 24;
  }

  function postMerge(state: NumberButtonState) {
    console.log("post merge");
    setSelectedNumberButtonState(state);
    setSelectedOperator(null);
  }

  return {
    selectedNumberButtonState,
    handleNumberClick,
    handleOperatorClick,
    selectedOperator,
    sequence,
  };
};
