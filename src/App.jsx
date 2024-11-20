import CardsGrid from "./components/CardsGrid";
import Header from "./components/Header";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <CardsGrid />
    </div>
  );
}

export default App;
