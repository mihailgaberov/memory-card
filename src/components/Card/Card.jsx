import React from "react";
import styles from "./Card.module.scss";

function Card({ imgUrl, categoryName }) {
  return (
    <div className={styles.container}>
      <img src={imgUrl} alt={categoryName} id="img" />
      <label htmlFor="img">{categoryName}</label>
    </div>
  );
}

export default Card;
