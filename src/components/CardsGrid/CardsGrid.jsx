import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Card from "../Card";
import Loader from "../Loader";

import styles from "./CardsGrid.module.scss";
import useFetch from "../../hooks/useFetch";

const getKey = () => crypto.randomUUID();

function CardsGrid(data) {
  const [images, setImages] = useState(data?.data?.images || []);
  const [clickedImages, setClickedImages] = useLocalStorage("clickedImages", []);
  const [score, setScore] = useLocalStorage("score", 0);
  const [bestScore, setBestScore] = useLocalStorage("bestScore", 0);
  const [isLoading, setIsLoading] = useState(!data?.data?.images?.length);
  const { data: fetchedData, fetchData, error } = useFetch();

  // Update images when new data is fetched
  useEffect(() => {
    if (fetchedData?.images) {
      setImages(fetchedData.images);
      setIsLoading(false);
      // Reset clicked images when new batch is loaded
      setClickedImages([]);
    }
  }, [fetchedData]);

  function updateBestScore(currentScore) {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
  }

  function processTurn(imageId) {
    const newClickedImages = [...clickedImages, imageId];
    setClickedImages(newClickedImages);

    // If clicking the same image twice, reset everything
    if (clickedImages.includes(imageId)) {

      // Update the best score if necessary
      updateBestScore(score);
      
      setClickedImages([]);
      setScore(0);
    } else {
      // Handle successful card selection
      const newScore = score + 1;
      setScore(newScore);

      // If we've clicked all images, fetch new ones
      if (newClickedImages.length === images.length) {
        updateBestScore(newScore);
        fetchData();
        setClickedImages([]);
      } else {
        // Shuffle the images
        const shuffled = [...images].sort(() => Math.random() - 0.5);
        setImages(shuffled);
      }
    }
  }

  if (error) return <p>Failed to fetch data</p>;

  if (isLoading) {
    return <Loader message="Loading new images..." />;
  }

  return (
    <div className={styles.container}>
      {images.map((item) => (
        <Card
          key={getKey()}
          imgUrl={item?.image?.original?.url || ""}
          imageId={item?.id}
          categoryName={item?.category}
          processTurn={(imageId) => processTurn(imageId)}
        />
      ))}
    </div>
  );
}

export default React.memo(CardsGrid);
