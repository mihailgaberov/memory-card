import React from "react";
import Card from "../Card";

import styles from  './CardsGrid.module.scss'

const getKey = () => crypto.randomUUID();

function CardsGrid(data) {
  return (
    <div className={styles.container}>
      {data?.data?.images?.map((item) => (
        <Card
        key={getKey()}
          imgUrl={item?.image?.original?.url}
          categoryName={item?.category}
        />
      ))}
    </div>
  );
}

export default React.memo(CardsGrid);
