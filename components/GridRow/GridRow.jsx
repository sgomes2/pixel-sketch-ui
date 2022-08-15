import React from "react";
import GridSquare from "../GridSquare/GridSquare";
import styles from "./GridRow.module.css";

const GridRow = (props) => {
  const { width, columns } = props;

  const getSquareSize = (parentWidth, columnCount) => {
    for (let i = width; i > 0; i--) {
      const square = i / columns;
      if (square % 2 === 0) {
        console.log(square);
        return `${square}px`;
      }
    }
  };

  const squareSize = getSquareSize(width, columns);

  console.log(
    `Width: ${width}, Columns: ${columns} Square Size: ${width / columns}`
  );

  const row = [];

  for (let i = 0; i < columns; i++) {
    const border = i === 0 ? "none" : "none none none solid";
    row.push(<GridSquare border={border} squareSize={squareSize} />);
  }

  return <div className={styles.gridRow}>{row}</div>;
};

export default GridRow;
