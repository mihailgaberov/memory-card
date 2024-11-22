import React from "react";
import styles from "./Subtitle.module.scss";

function Subtitle() {
  return (
    <h3 className={styles.container}>
      Get points by clicking on an image but don't click on any more than once!
    </h3>
  );
}

export default Subtitle;
