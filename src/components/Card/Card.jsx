import React, { useState, useCallback } from "react";
import Loader from "../Loader";
import styles from "./Card.module.scss";

const Card = React.memo(function Card({ imgUrl, imageId, categoryName, processTurn }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleClick = useCallback(() => {
    processTurn(imageId);
  }, [processTurn, imageId]);

  return (
    <div className={styles.container} onClick={handleClick}>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader message="Loading..." />
        </div>
      )}
      <img
        src={imgUrl}
        alt={categoryName}
        onLoad={handleImageLoad}
        className={`${styles.image} ${isLoading ? styles.hidden : ''}`}
      />
    </div>
  );
});

export default Card;
