import React from "react";
import GridRow from "../GridRow/GridRow";
import styles from "./SketchGrid.module.css";

const SketchGrid = (props) => {
  const { width, height } = props;

  const rows = [];

  for (let i = 0; i < height; i++) {
    rows.push(<GridRow size={width} />);
  }

  return (
    <div>
      <h1> Sketch Grid</h1>
      <div className={styles.SketchGrid}>{rows}</div>
    </div>
  );
};

export default SketchGrid;
