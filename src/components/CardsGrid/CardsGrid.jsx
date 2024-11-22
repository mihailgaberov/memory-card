import React, { useState } from "react";
import Card from "../Card";

import styles from "./CardsGrid.module.scss";

const getKey = () => crypto.randomUUID();

function CardsGrid(data) {
  const [images, setImages] = useState(data?.data?.images);
  const [clickedImages, setClickedImages] = useState([]);

  function shuffleArray(imageId) {
    // Store the clicked image ID
    setClickedImages([...clickedImages, imageId]);

    if (clickedImages.includes(imageId)) {
      console.log(">>> KABOOM duplicated clicked!");
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
          randomizeOrder={(imageId) => shuffleArray(imageId)}
        />
      ))}
    </div>
  );
}

export default React.memo(CardsGrid);
