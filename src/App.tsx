import styles from "./App.module.css";
import NumberGrid from "./components/NumberGrid/NumberGrid";
import Header from "./components/Header/Header";
import OperatorBar from "./components/OperatorBar/OperatorBar";

function App() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <NumberGrid />
        <OperatorBar />
      </div>
    </>
  );
}

export default App;
