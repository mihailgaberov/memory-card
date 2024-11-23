import React, { useState } from "react";
import Loader from "../Loader";

import styles from "./Card.module.scss";

function Card({ imgUrl, imageId, categoryName, processTurn }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={styles.container} onClick={() => processTurn(imageId)}>
      {isLoading && <Loader message="Loading image..." />}
      <img
        src={imgUrl}
        alt={categoryName}
        onLoad={handleImageLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default Card;
