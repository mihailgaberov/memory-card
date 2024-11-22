import React from "react";

import styles from "./Card.module.scss";

function Card({ imgUrl, imageId, categoryName, randomizeOrder }) {
  return (
    <div className={styles.container} onClick={() => randomizeOrder(imageId)}>
      <img src={imgUrl} alt={categoryName} id="img" />
    </div>
  );
}

export default Card;
