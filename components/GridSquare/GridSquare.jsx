import React from "react";
import styles from "./GridSquare.module.css";

const GridSquare = (props) => {
  const [colored, setColored] = React.useState(false);

  const backgroundColor = colored ? "#000" : "#FFF";

  return (
    <div
      className={styles.square}
      style={{ backgroundColor: backgroundColor }}
      onClick={() => {
        setColored(!colored);
      }}
    ></div>
  );
};

export default GridSquare;
