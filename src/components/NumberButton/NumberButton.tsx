import styles from "./NumberButton.module.css";

type NumberButtonProps = {
  num: number | null;
  handleClick: () => void;
  isSelected: boolean;
};

const NumberButton = ({ num, handleClick, isSelected }: NumberButtonProps) => {
  if (num === null) {
    return <div className={`${styles.button} ${styles.transparent}`}></div>;
  }

  return (
    <button
      className={`${styles.button} ${isSelected ? `${styles.clicked}` : ""}`}
      onClick={handleClick}
    >
      {num}
    </button>
  );
};

export default NumberButton;
