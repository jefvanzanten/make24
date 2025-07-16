import { use24Game } from "../../hooks/use24Game";
import styles from "./Header.module.css";

function Header() {
  const { reset, refreshSequence } = use24Game();

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
}

export default Header;
