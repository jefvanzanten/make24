import styles from "./OperatorButton.module.css";

type OperatorButtonProps = {
  operator: string;
  handleClick: () => void;
  isSelected: boolean;
};

const OperatorButton = ({
  operator,
  handleClick,
  isSelected,
}: OperatorButtonProps) => {
  console.log("OperatorButton");
  return (
    <button
      className={`${styles.button} ${isSelected ? `${styles.clicked}` : ""}`}
      onClick={handleClick}
    >
      {operator}
    </button>
  );
};

export default OperatorButton;
