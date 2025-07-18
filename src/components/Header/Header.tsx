import { memo } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  reset: () => void;
  refreshSequence: () => void;
}

const Header = memo(function NumberButton({
  reset,
  refreshSequence,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles["button-container"]}>
        <button className={styles.reset} onClick={reset}>
          <img src="./reset.png" className={styles.img} />
        </button>
        <button className={styles.reset} onClick={refreshSequence}>
          <img src="./refresh.jpg" className={styles.img} />
        </button>
      </div>
    </header>
  );
});

export default Header;
