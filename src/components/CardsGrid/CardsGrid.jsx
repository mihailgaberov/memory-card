import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Card from "../Card";
import Loader from "../Loader";

import styles from "./CardsGrid.module.scss";
import useFetch from "../../hooks/useFetch";

const getKey = () => crypto.randomUUID();

function CardsGrid(data) {
  const [images, setImages] = useState(data?.data?.images || []);
  const [clickedImages, setClickedImages] = useState([]);
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

  function processTurn(imageId) {
    if (clickedImages.includes(imageId)) {
      // If clicking the same image twice, reset everything
      setClickedImages([]);

      // Update the best score if current score is bigger
      if (score > bestScore) {
        setBestScore(score);
      }

      // Reset score to 0
      setScore(0);
      return;
    }

    // Handle successful card selection
    const newScore = score + 1;
    const newClickedImages = [...clickedImages, imageId];
    
    setScore(newScore);
    setClickedImages(newClickedImages);

    // Update best score immediately if we exceed it
    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    // If we've clicked all images, fetch new ones
    if (newClickedImages.length === images.length) {
      fetchData();
      setClickedImages([]);
    } else {
      // Shuffle the images
      const shuffled = [...images].sort(() => Math.random() - 0.5);
      setImages(shuffled);
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
