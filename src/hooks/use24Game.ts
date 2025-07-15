import { useEffect, useState } from "react";
import {
  calculate,
  getRandomSequence,
  type Operator,
} from "../sequenceService";

export type NumberButtonState = {
  id: number;
  value: number | null;
  isSelected: boolean;
  isDisabled: boolean;
};

interface Action {
  type: "add" | "subtract" | "multiply" | "divide";
}

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

  function applyOperation(state: NumberButtonState) {
    const result = calculate(
      selectedNumberButtonState?.value!,
      selectedOperator!,
      state.value!
    );

    mergeNumberInCard(state.id, result);

    postMerge(state);
  }

  function selectNumberButton(state: NumberButtonState) {
    console.log("selectNumber");

    if (selectedNumberButtonState === state) {
      setSelectedNumberButtonState(null);
      toggleSelection(state);
    } else if (
      selectedOperator === null ||
      selectedNumberButtonState === null
    ) {
      state.isSelected = false;
      setSelectedNumberButtonState(state);
    } else if (
      selectedOperator !== null &&
      selectedNumberButtonState !== null
    ) {
      applyOperation(state);
    }
  }

  function reducer(state: NumberButtonState, action: Action) {
    switch (action.type) {
      case "add": {
      }
      case "subtract": {
      }
      case "multiply": {
      }
      case "divide": {
      }
    }
  }

  function toggleSelection(state: NumberButtonState) {
    state.isSelected = !state.isSelected;
  }

  function selectOperator(operator: Operator) {
    console.log("selectOperator");
    if (selectedOperator === operator || selectedNumberButtonState === null)
      setSelectedOperator(null);
    else setSelectedOperator(operator);
  }

  function mergeNumberInCard(index: number, result: number) {
    console.log("mergeNumberInCard");
    const newSequence = [...sequence!];

    newSequence[selectedNumberButtonState!.id] = {
      ...newSequence[selectedNumberButtonState!.id],
      isDisabled: true,
      value: null,
    };

    newSequence[index] = {
      ...newSequence[index],
      value: result,
      isSelected: true,
    };

    setSequence(newSequence);
  }

  function postMerge(state: NumberButtonState) {
    console.log("post merge");
    setSelectedNumberButtonState(state);
    setSelectedOperator(null);
  }

  return {
    selectedNumberButtonState,
    selectNumberButton,
    selectOperator,
    selectedOperator,
    sequence,
  };
};
