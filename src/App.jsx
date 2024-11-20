import { useState, useEffect } from "react";
import CardsGrid from "./components/CardsGrid";
import Header from "./components/Header";

import styles from "./App.module.scss";
import useFetch from "./hooks/useFetch";

function App() {
  const { data, loading, error } = useFetch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <Header />
      <CardsGrid data={data} />
    </div>
  );
}

export default App;
