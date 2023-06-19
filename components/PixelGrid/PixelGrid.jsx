import React from "react";
import PixelRow from "../PixelRow/PixelRow";

const getGrid = (size) => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    rows.push(<PixelRow length={size} />);
    rows.push(<br />);
  }

  return rows;
};

const PixelGrid = (props) => {
  const { gridSize } = props;

  return getGrid(gridSize);
};

export default PixelGrid;
