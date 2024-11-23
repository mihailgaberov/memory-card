import CardsGrid from "./components/CardsGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";

import styles from "./App.module.scss";
import Loader from "./components/Loader";
import Subtitle from "./components/Subtitle";
import useFetch from "./hooks/useFetch";

function App() {
  const { data, loading, error } = useFetch();

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <Header />
      <Subtitle />
      <CardsGrid data={data} />
      <Footer />
    </div>
  );
}

export default App;
