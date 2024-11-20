import React from "react";
import styles from "./Score.module.scss";

function Score() {
  return (
    <div className={styles.container}>
      <div>Score: 0</div>
      <div>Best Score: 0</div>
    </div>
  );
}
export default Score;
