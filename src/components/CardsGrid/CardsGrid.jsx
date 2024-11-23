import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Card from "../Card";

import styles from "./CardsGrid.module.scss";
import useFetch from "../../hooks/useFetch";

const getKey = () => crypto.randomUUID();

function CardsGrid(data) {
  const [images, setImages] = useState(data?.data?.images);
  const [clickedImages, setClickedImages] = useState([]);
  const [score, setScore] = useLocalStorage("score", 0);
  const [bestScore, setBestScore] = useLocalStorage("bestScore", 0);
  const { data: fetchedData, fetchData } = useFetch();

  // Update images when new data is fetched
  useEffect(() => {
    if (fetchedData?.images) {
      setImages(fetchedData.images);
    }
  }, [fetchedData]);

  function processTurn(imageId) {
    // Store the clicked image ID
    setClickedImages([...clickedImages, imageId]);

    if (clickedImages.includes(imageId)) {
      console.info("Duplicate detected. Reset score and update best score.");

      // Do another API call to fetch new batch of images
      fetchData();

      // Update the best score if it's bigger
      if (score > bestScore) {
        setBestScore(score);
        setScore(0);
      }
    } else {
      console.info("Good choice! Update increment the current score.");
      setScore((old) => old + 1);
    }

    // Create a copy of the original array to avoid mutating it
    const shuffled = [...images];

    for (let i = shuffled.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Swap the elements
      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }

    setImages(shuffled);
  }

  return (
    <div className={styles.container}>
      {images.map((item) => (
        <Card
          key={getKey()}
          imgUrl={item?.image?.original?.url}
          imageId={item?.id}
          categoryName={item?.category}
          processTurn={(imageId) => processTurn(imageId)}
        />
      ))}
    </div>
  );
}

export default React.memo(CardsGrid);
