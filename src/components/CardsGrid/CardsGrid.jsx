import React from "react";

function CardsGrid(data) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
        gap: "10px",
        textAlign: "center",
        fontSize: "24px",
      }}
    >
      {data?.images?.map((item, index) => {
        console.log(">>> item: ", item);
        return (
          <div key={index}>
            <img src={item.image.original.url} alt={item.category} id="img" />
            <label htmlFor="img">{item.category}</label>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(CardsGrid);
