import { useState, useEffect } from "react";
import CardsGrid from "./components/CardsGrid";
import Header from "./components/Header";

import styles from "./App.module.scss";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.nekosia.cat/api/v1/images/catgril?count=21&additionalTags=white-hair,uniform&blacklistedTags=short-hair,sad,maid"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
