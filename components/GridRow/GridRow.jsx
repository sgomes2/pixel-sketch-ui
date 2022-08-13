import React from "react";
import GridSquare from "../GridSquare/GridSquare";
import styles from "./GridRow.module.css";

const GridRow = (props) => {
  const { size } = props;

  const row = [];

  for (let i = 0; i < size; i++) {
    row.push(<GridSquare />);
  }

  return <div className={styles.gridRow}>{row}</div>;
};

export default GridRow;
