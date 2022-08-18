import React from "react";
import GridSquare from "../GridSquare/GridSquare";
import styles from "./GridRow.module.css";

const GridRow = (props) => {
  const { columns, index } = props;
  const [rowWidth, setRowWidth] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    setRowWidth(ref.current.offsetWidth);
  }, []);

  const getSquareSize = (columnCount) => {
    console.log(columnCount);
    return `${rowWidth / 17}px`;
  };

  const cells = [];

  for (let i = 0; i < columns; i++) {
    cells.push(<GridSquare squareSize={getSquareSize(columns)} />);
  }

  return (
    <div ref={ref} className={styles.gridRow}>
      {cells}
    </div>
  );
};

export default GridRow;
