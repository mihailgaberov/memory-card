import React from "react";

import styles from "./Card.module.scss";

function Card({ imgUrl, categoryName, randomizeOrder }) {


  return (
    <div className={styles.container} onClick={randomizeOrder}>
      <img src={imgUrl} alt={categoryName} id="img" />
      <label htmlFor="img">{categoryName}</label>
    </div>
  );
}

export default Card;
