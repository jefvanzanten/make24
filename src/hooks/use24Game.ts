import { useCallback, useEffect, useState } from "react";
import {
  calculate,
  getRandomSequence,
  type Operator,
} from "../sequenceService";

export type NumberState = {
  id: number;
  value: number | null;
  isDisabled: boolean;
};

export const use24Game = () => {
  const [sequence, setSequence] = useState<NumberState[]>();
  const [sequenceCopy, setSequenceCopy] = useState<NumberState[]>();
  const [selectedNumber, setSelectedNumber] = useState<NumberState | null>(
    null
  );
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(
    null
  );

  useEffect(() => {
    loadSequence();
  }, []);

  const loadSequence = async () => {
    const sequenceData = await getRandomSequence("medium");
    if (sequenceData) {
      setSequence(sequenceData);
      setSequenceCopy(sequenceData);
    }
  };

  const handleNumberClick = useCallback((clickedNumber: NumberState) => {
    if (selectedNumber === clickedNumber) {
      console.log("setSelectedNumber(null)");
      setSelectedNumber(null);
      return;
    }

    if (selectedNumber !== null && selectedOperator !== null) {
      console.log("performCalculation(clickedNumber)");
      performCalculation(clickedNumber);
      return;
    }

    console.log("setSelectedNumber(clickedNumber)");
    setSelectedNumber(clickedNumber);
  }, []);

  const handleOperatorClick = useCallback((clickedOperator: Operator) => {
    if (selectedOperator === clickedOperator) {
      console.log("selectedOperator: " + selectedOperator);
      console.log("selectedNumber: " + selectedNumber);
      setSelectedOperator(null);
      return;
    }

    console.log("setSelectedOperator(clickedOperator)");
    setSelectedOperator(clickedOperator);
  }, []);

  function performCalculation(rhs: NumberState) {
    console.log("performCalculation");
    const result = calculate(
      selectedNumber?.value!,
      selectedOperator!,
      rhs.value!
    );

    mergeNumberInCard(rhs, result);
  }

  function mergeNumberInCard(rhs: NumberState, result: number) {
    const newSequence = [...sequence!];

    newSequence[selectedNumber!.id] = {
      ...newSequence[selectedNumber!.id],
      isDisabled: true,
      value: null,
    };

    const updatedState = (newSequence[rhs!.id] = {
      ...newSequence[rhs?.id!],
      value: result,
    });

    setSequence(newSequence);

    postMerge(updatedState);

    if (hasWon(newSequence)) {
      setTimeout(() => alert("gewonnen!"), 500);
    }
  }

  function hasWon(sequence: NumberState[]) {
    const activeButtons = sequence.filter((s) => !s.isDisabled);
    return activeButtons.length === 1 && activeButtons[0].value === 24;
  }

  function postMerge(state: NumberState) {
    console.log("post merge");
    setSelectedNumber(state);
    setSelectedOperator(null);
  }

  function reset() {
    setSelectedNumber(null);
    setSelectedOperator(null);
    setSequence(sequenceCopy);
  }

  function refreshSequence() {
    loadSequence();
  }

  return {
    selectedNumber,
    handleNumberClick,
    handleOperatorClick,
    selectedOperator,
    sequence,
    reset,
    refreshSequence,
  };
};
