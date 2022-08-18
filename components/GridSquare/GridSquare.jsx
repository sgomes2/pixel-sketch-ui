import React from "react";
import styles from "./GridSquare.module.css";

const GridSquare = (props) => {
  const { squareSize, border } = props;
  const [colored, setColored] = React.useState(false);

  const backgroundColor = colored ? "#000" : "#FFF";

  return (
    <div
      className={styles.square}
      style={{
        width: squareSize,
        height: squareSize,
        backgroundColor: backgroundColor,
        borderStyle: "solid solid solid solid",
      }}
      onClick={() => {
        setColored(!colored);
      }}
    ></div>
  );
};

export default GridSquare;
