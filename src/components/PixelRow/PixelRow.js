import React from "react";
import Pixel from "../Pixel/Pixel";

const PixelRow = (props) => {
  const { length } = props;

  const row = [];

  for (let i = 0; i < length; i++) {
    row.push(<Pixel />);
  }

  return row;
};

export default PixelRow;
