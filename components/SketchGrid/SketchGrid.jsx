import { stepLabelClasses } from "@mui/material";
import React from "react";
import GridRow from "../GridRow/GridRow";
import styles from "./SketchGrid.module.css";

const SketchGrid = (props) => {
  const ref = React.useRef(null);

  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  const { columns, rows } = props;

  const gridRows = [];

  for (let i = 0; i < rows; i++) {
    gridRows.push(<GridRow width={width} columns={columns} />);
  }

  return (
    <div ref={ref} className={styles.rows}>
      {gridRows}
    </div>
  );
};

export default SketchGrid;
