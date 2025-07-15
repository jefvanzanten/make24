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
  const [selectedNumber, setSelectedNumber] =
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

  function handleNumberClick(clickedNumber: NumberButtonState) {
    if (selectedNumber === clickedNumber) {
      setSelectedNumber(null);
      return;
    }

    if (selectedNumber !== null && selectedOperator !== null) {
      performCalculation(clickedNumber);
      return;
    }

    setSelectedNumber(clickedNumber);
  }

  function handleOperatorClick(operator: Operator) {
    if (selectedOperator === operator || selectedNumber === null) {
      setSelectedOperator(null);
      return;
    }

    setSelectedOperator(operator);
  }

  function performCalculation(state: NumberButtonState) {
    const result = calculate(
      selectedNumber?.value!,
      selectedOperator!,
      state.value!
    );

    mergeNumberInCard(state, result);
  }

  function mergeNumberInCard(state: NumberButtonState, result: number) {
    const newSequence = [...sequence!];

    newSequence[selectedNumber!.id] = {
      ...newSequence[selectedNumber!.id],
      isDisabled: true,
      value: null,
    };

    const second = (newSequence[state!.id] = {
      ...newSequence[state?.id!],
      value: result,
    });

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
    setSelectedNumber(state);
    setSelectedOperator(null);
  }

  return {
    selectedNumber,
    handleNumberClick,
    handleOperatorClick,
    selectedOperator,
    sequence,
  };
};
